import filter from './filters'

const importFilter = Vue => {
  Vue.filter('image', filter.image)
  Vue.filter('number', filter.number)
  Vue.filter('time', filter.time)
}
export default importFilter
