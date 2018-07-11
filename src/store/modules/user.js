import Cookies from 'js-cookie'

const user = {
  state: {token: '', id: 0, type: 1},
  mutations: {
    logout (state, vm) {
      Cookies.remove('user')
      Cookies.remove('password')
      Cookies.remove('access')
      Cookies.remove('token')
      Cookies.remove('mmnum')
      Cookies.remove('mmtype')
      // 恢复默认样式
      //  let themeLink = document.querySelector('link[name="theme"]');
      // themeLink.setAttribute('href', '');
      // 清空打开的页面等数据，但是保存主题数据
      let theme = ''
      if (localStorage.theme) {
        theme = localStorage.theme
      }
      localStorage.clear()
      if (theme) {
        localStorage.theme = theme
      }
    },
    loginin (state, data) {
      state.token = data.token
      state.id = data.id
      state.type = data.type
    }
  }
}

export default user
