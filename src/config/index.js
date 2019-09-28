let apiHost = process.env.NODE_ENV === 'development' ? '/catch' : 'http://192.168.1.5:8090'
export default {
  title: '后台管理系统',
  homeName: 'buyList',
  baseUrl: {
    api: apiHost
  }
}
