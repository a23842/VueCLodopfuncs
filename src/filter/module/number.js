export default function (num, len) {
  let str = ''
  len = len || 0
  if (num !== '') {
    str = Number(num).toFixed(len)
  }

  return str
}
