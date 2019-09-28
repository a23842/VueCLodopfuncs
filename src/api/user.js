import axios from '@/libs/api.request'

/**
 * 用户登录
 * @param userName
 * @param password
 * @returns {*}
 */
export const login = ({ userName, password }) => {
  const data = {
    username: userName,
    password: password,
    grant_type: 'password',
    client_id: 'ztech',
    client_secret: 'ztech'
  }
  return axios.request({
    url: '/oauth/token',
    params: data,
    method: 'get'
  })
}

export const updatePassword = (data) => {
  return axios.request({
    url: '/v1/sys/userinfo/updatePwd',
    params: data,
    method: 'get'
  })
}

/**
 * 获取登录用户信息
 * @returns {*}
 */
export const getUserInfo = () => {
  return axios.request({
    url: '/v1/sys/userinfo/getUser',
    method: 'get'
  })
}
