import request from '@/utils/request';

// 用户登陆
export async function login(params: Record<string, any>): Promise<API.ResBasic<API.User>> {
  return request('/login', {
    method: 'GET',
    params,
  });
}

// 注销登录
export async function signOut(params: Record<string, any>): Promise<API.ResBasic<string>> {
  return request('/logout', {
    method: 'GET',
    params,
  });
}
