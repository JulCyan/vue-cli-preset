import { SuccessStatus, ServerErrorStatus, UnauthorizedStatus, Prefix } from '@/configs/const'
import axios, { AxiosRequestConfig, AxiosResponse } from 'axios'
let baseURL = process.env.VUE_APP_API_URL + Prefix

let instance = axios.create({
  baseURL,
  timeout: 30 * 1000,
  headers: {
    post: {
      'Content-Type': 'application/json'
    }
  },
  // post json 转 表单 
  // transformRequest: [function (data) {
  //   let ret = ''
  //   for (let it in data) {
  //     ret += encodeURIComponent(it) + '=' + encodeURIComponent(data[it]) + '&'
  //   }
  //   return ret
  // }],
})

instance.interceptors.request.use((request: AxiosRequestConfig): any => {
  return request
}, (requestError) => { })

instance.interceptors.response.use((response: AxiosResponse): any => {
  if (SuccessStatus.includes(response && response.status)) {
    return response
  }
}, (responseError) => {
  let { response } = responseError
  if (ServerErrorStatus.includes(response && response.status)) {
    response.data = {}
    return response
  } else if (UnauthorizedStatus.includes(response && response.status)) {
    return response
  }
})

export default {
  install(Vue: any) {
    Vue.prototype.$axios = instance
  }
}
