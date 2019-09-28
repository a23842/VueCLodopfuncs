export const TOKEN_KEY = 'token'

export const setToken = (token) => {
  sessionStorage.setItem(TOKEN_KEY, token)
}

export const getToken = () => {
  return sessionStorage.getItem(TOKEN_KEY) || ''
}
