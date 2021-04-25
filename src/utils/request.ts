import { extend } from 'umi-request';
import { history } from 'umi';
import { notification } from 'antd';

const codeMessage: { [index: number]: string } = {
  200: '服务器成功返回请求的数据。',
  201: '新建或修改数据成功。',
  202: '一个请求已经进入后台排队（异步任务）。',
  204: '删除数据成功。',
  400: '发出的请求有错误，服务器没有进行新建或修改数据的操作。',
  401: '用户没有权限（令牌、用户名、密码错误）。',
  403: '用户得到授权，但是访问是被禁止的。',
  404: '发出的请求针对的是不存在的记录，服务器没有进行操作。',
  406: '请求的格式不可得。',
  410: '请求的资源被永久删除，且不会再得到的。',
  422: '当创建一个对象时，发生一个验证错误。',
  500: '服务器发生错误，请检查服务器。',
  502: '网关错误。',
  503: '服务不可用，服务器暂时过载或维护。',
  504: '网关超时。',
};

/**
 * 异常处理程序
 */
const errorHandler = (error: { response: Response }): Response => {
  const { response } = error;
  if (response && response.status) {
    const errorText = codeMessage[response.status] || response.statusText;
    const { status, url } = response;

    notification.error({
      message: `请求错误 ${status}: ${url}`,
      description: errorText,
    });

    if (status === 403) {
      history.push('/exception/403');
    }
    if (status <= 504 && status >= 500) {
      history.push('/exception/500');
    }
    if (status >= 404 && status < 422) {
      history.push('/exception/404');
    }
  } else if (!response) {
    notification.error({
      description: '您的网络发生异常，无法连接服务器',
      message: '网络异常',
    });
  }
  return response;
};

/**
 * 响应code异常处理程序
 */
const codeHandler = (response: { code: number; msg: string }) => {
  const { pathname } = window.location;
  const { code, msg } = response;
  if (code === 1000) {
    notification.error({
      message: msg,
    });
    localStorage.clear();
    if (!(pathname.indexOf('login') > -1)) {
      history.push(`/login?redirect=${encodeURIComponent(pathname)}`);
    }

    return;
  }
  if (code === 403) {
    history.push('/exception/403');
    return;
  }
  if (code <= 504 && code >= 500) {
    history.push('/exception/500');
    return;
  }
  if (code >= 404 && code < 422) {
    history.push('/exception/404');
  }
};

const request = extend({
  errorHandler,
  credentials: 'include',
});

request.interceptors.request.use((url: string, options: any) => {
  const { headers } = options;

  return {
    url: `${process.env.apiUrl}${url}`,
    options: { ...options, headers },
  };
});

request.interceptors.response.use(async (response) => {
  const data = await response.clone().json();
  codeHandler(data);
  return response;
});

export default request;
