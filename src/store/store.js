const KEY = 'hmtt_key'

export default {
  setUser (user) {
    const localuser = this.getUser()
    const setUser = { ...localuser, ...user }
    window.sessionStorage.setItem(KEY, JSON.stringify(setUser))
  },
  getUser () {
    return JSON.parse(window.sessionStorage.getItem(KEY) || '{}')
  },
  clearUser () {
    window.sessionStorage.removeItem(KEY)
  }
}
