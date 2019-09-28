import HttpRequest from '@/libs/axios'
import config from '@/config'

const axios = new HttpRequest(config.baseUrl.api)
export default axios
