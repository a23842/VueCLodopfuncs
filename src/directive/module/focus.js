import $ from 'jquery'

export default {
  inserted: function (el) {
    const tagNameList = ['INPUT', 'SELECT', 'TEXTAREA']
    setTimeout(function () {
      if (tagNameList.includes($(el).prop('tagName')) && $(el).is(':visible')) {
        $(el).focus()
      } else {
        $(el).find('input:visible').focus()
      }
    }, 100)
  }
}
