/**
 * request 网络请求工具
 * 更详细的 api 文档: https://github.com/umijs/umi-request
 */
import { extend } from 'umi-request';
import { message, notification } from 'antd';
const codeMessage = {
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

const errorHandler = (error) => {

  
  const { response } = error;

  console.log(response,'response')

  if (response && response.status) {
    const errorText = codeMessage[response.status] || response.statusText;
    const { status, url } = response;
    notification.error({
      message: `请求错误 ${status}: ${url}`,
      description: errorText,
    });
  } else if (!response) {
    notification.error({
      description: '您的网络发生异常，无法连接服务器',
      message: '网络异常',
    });
  }

  return response;
};
/**
 * 配置request请求时的默认参数
 */

const request = extend({
  // errorHandler,
  // 默认错误处理
  credentials: 'include', // 默认请求是否带上cookie
});

// request拦截器, 改变url 或 options.
request.interceptors.request.use(async (url, options) => {
  let c_token = localStorage.getItem('token');
  if (c_token) {
    const headers = {
      'Content-Type': 'application/json; charset=UTF-8',
      Accept: 'application/json',
      'Authorization': c_token,
    };
    return {
      url: url,
      options: { ...options, headers: headers },
    };
  } else {
    return {
      url: url,
      options: { ...options },
    };
  }
});


request.interceptors.response.use(async response => {

  const data = await response.clone().json();

  if(response?.status==401){
    location.href = '/user/login';
    localStorage.clear()
    return 
  }
  if(response?.status==400){
    message.error(data?.msg)
    return 
  }
  if(response?.status==500){
    message.error('系统错误')
    return 
  }
  return response;
});



// response拦截器, 处理response
// request.interceptors.response.use(
//   (response, options) => {
//     if (response.status == 401) {
//       message.error('请重新登录');
//       localStorage.clear();
//       window.location.reload();
//       window.location.replace('/user/login');
//       return Promise.reject(response.statusText);
//     }

//     if (response.status !== 200) {
//       message.error(response.data.msg);
//       return Promise.reject(response.data.msg);
//     }
//     return response;
//   },
//   function (error) {
//     const status = error.response && error.response.status;
//     if (status == 400) {
//       message.error(error.response);
//     } else {
//       message.error('超时，请稍后再试');
//     }
//     return Promise.reject(error);
//   },
// );
export default request;


