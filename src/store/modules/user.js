import Cookies from 'js-cookie'

const user = {
  state: { token: '', id: 0, type: 1, name: '', photo: '' },
  mutations: {
    logout (state, vm) {
      Cookies.remove('qxweb_name')
      Cookies.remove('qxweb_password')
      Cookies.remove('qxweb_access')
      Cookies.remove('qxweb_token')
      Cookies.remove('qxweb_mmnum')
      Cookies.remove('qxweb_photo')
      state.token = ''
      state.id = 0
      state.name = ''
      state.photo = ''
      // 恢复默认样式
      //  let themeLink = document.querySelector('link[name="theme"]');
      // themeLink.setAttribute('href', '');
      // 清空打开的页面等数据，但是保存主题数据
    },
    loginin (state, data) {
      state.token = data.token
      state.id = data.id
      state.type = data.type
      state.name = data.name
      state.photo = data.photo
    }
  }
}

export default user
