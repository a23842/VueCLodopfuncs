import config from '@/config'
const baseImgUrl = config.baseUrl.image

export default function (url) {
  let str = ''

  if (url) {
    if (url.indexOf('http') === -1) {
      str = baseImgUrl + url
    } else {
      str = url
    }
  }

  return str
}
