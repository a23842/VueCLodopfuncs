import axios from 'axios'
import { Message } from 'iview'
import { getToken } from '@/libs/util'
const GLOBAL_RESPONSE_CODE = { SUCCESS: 100 }

class HttpRequest {
  constructor (baseUrl = '') {
    this.baseUrl = baseUrl
    this.queue = {}
  }
  getInsideConfig () {
    const config = {
      baseURL: this.baseUrl,
      headers: {
        //
      }
    }
    return config
  }
  destroy (url) {
    delete this.queue[url]
    if (!Object.keys(this.queue).length) {
    }
  }
  interceptors (instance, url) {
    // 请求拦截
    instance.interceptors.request.use(config => {
      // 添加全局的loading...
      if (!Object.keys(this.queue).length) {
        // Spin.show() // 不建议开启，因为界面不友好
      }
      this.queue[url] = true
      config.headers.Authorization = getToken()
      return config
    }, error => {
      return Promise.reject(error)
    })
    // 响应拦截
    instance.interceptors.response.use(res => {
      this.destroy(url)
      if (res.data.code && res.data.code !== GLOBAL_RESPONSE_CODE.SUCCESS) {
        Message.error(res.data.msg)
        return Promise.reject(res)
      }
      return res.data
    }, error => {
      this.destroy(url)
      if (error.response.data.error === 'invalid_grant') {
        Message.error('用户名或密码错误')
      } else {
        Message.error(error.response.data.error_description)
      }
      return Promise.reject(error)
    })
  }
  request (options) {
    const instance = axios.create()
    options = Object.assign(this.getInsideConfig(), options)
    this.interceptors(instance, options.url)
    return instance(options)
  }
}
export default HttpRequest
