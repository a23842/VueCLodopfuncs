import config from '@/config'
import { getToken } from '@/libs/util'

export const uploadConfig = {
  url: `${config.baseUrl.api}/v1/sys/tutorial/upload`,
  authorization: getToken()
}
