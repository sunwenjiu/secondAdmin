export default {
  state: {
    permissionList: window.sessionStorage.getItem('per'),
    roleList: window.sessionStorage.getItem('role')
  },
  mutations: {
    setPer (state, data) {
      state.permissionList = data
      window.sessionStorage.setItem('per', data)
    },
    setRole (state, data) {
      state.roleList = data
      window.sessionStorage.setItem('role', data)
    }
  },
  actions: {}
}
