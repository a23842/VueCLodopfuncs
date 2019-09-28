import directive from './directives'
const importDirective = Vue => {
  /**
   * 获取焦点 v-focus
   */
  Vue.directive('focus', directive.focus)
  /**
   * 获取正整数 v-integer
   */
  Vue.directive('integer', directive.integer)
}
export default importDirective
