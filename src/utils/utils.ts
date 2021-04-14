const createUrlQuery = (params: { [x: string]: any }) => {
  let result = '';
  Object.keys(params).forEach((item) => {
    if (params[item]) {
      result += `&${item}=${params[item]}`;
    }
  });
  return result ? `?${result.substring(1)}` : '';
};

export { createUrlQuery };
