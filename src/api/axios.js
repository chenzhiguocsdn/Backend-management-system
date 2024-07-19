import axios from "axios";

// 创建axios实例
const service = axios.create({
  baseURL: "http://127.0.0.1:4523/m1/4830109-4485096-default/mock/666ac12ca76326606e5e092a", // 根据实际情况修改为你的API基础URL
  timeout: 5000, // 请求超时时间
});

// 请求拦截器
service.interceptors.request.use(
  (config) => {
    // 在发送请求之前做些什么，例如添加请求头、设置token等
    // config.headers['Authorization'] = 'Bearer ' + token; // 示例：添加token到请求头
    return config;
  },
  (error) => {
    // 对请求错误做些什么
    return Promise.reject(error);
  }
);

// 响应拦截器
service.interceptors.response.use(
  (response) => {
    // 对响应数据做点什么，例如统一处理状态码、错误信息等
    return response.data;
  },
  (error) => {
    // 对响应错误做点什么，例如统一处理网络错误、服务器错误等
    return Promise.reject(error);
  }
);

// 导出封装好的axios实例
export default service;
