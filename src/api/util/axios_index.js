import axios from 'axios'
export function generate ({baseUrl, headers}) {
  const instance = axios.create({
    baseURL: baseUrl,
    timeout: 900000,
    validateStatus: function (status) {
      return status >= 200 && status < 300
    },
    withCredentials: false,
    headers: headers ||
      {
        'Content-Type': 'application/json;charset=utf-8',
        'Accept': 'application/json'
      }
  })
  // 请求拦截器
  instance.interceptors.request.use(config => {
    if (config.method === 'get') {
      config.params = {
        ...config.params
      }
    }
    return config
  }, (error) => {
    return Promise.reject(error)
  })

  // 响应拦截器
  instance.interceptors.response.use(response => {
    return Promise.resolve(response)
  }, (error) => {
    // 响应错误
    return Promise.resolve(error.response)
  })
  function post (url, data, config) {
    return instance
      .post(url, JSON.stringify(data), config)
      .then(
        (response) => {
          return response
        }
      ).then(
        (response) => {
          return response
        }
      ).then(
        (response) => {
          return response.data
        }
      )
  }

  function get (url, config) {
    return instance.get(url, config)
      .then(
        (response) => {
          return response
        }
      ).then(
        (response) => {
          return response
        }
      ).then(
        (response) => {
          return response.data
        }
      )
  }
  return {get: get, post: post}
}
