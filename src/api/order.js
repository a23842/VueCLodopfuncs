import axios from '@/libs/api.request'

/**
 * 购买记录
 * @param data
 * @returns {*}
 */
export const getBuyList = (data) => {
  return axios.request({
    url: '/v1/cus/userorder/selectPage',
    params: data,
    method: 'get'
  })
}

/**
 * 购买记录合计
 * @param data
 * @returns {*}
 */
export const getBuySummary = (data) => {
  return axios.request({
    url: '/v1/cus/userorder/selectTotalMoney',
    params: data,
    method: 'get'
  })
}
