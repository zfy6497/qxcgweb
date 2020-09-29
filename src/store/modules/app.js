import { home, pcRouter } from '@/router/router'

const app = {
  state: {
    routers: [
      home,
      pcRouter
    ],
    dontCache: ['text-editor', 'artical-publish'],
    mmkey: 'ZD4417JEFFDDSCC50H3FAE3C78fgh635',
    expressCompanys: ['顺丰快递', '圆通速递', '中通速递', '邮政小包', '申通快递', '天天快递', '宅急送', '全峰快递', 'EMS', '韵达快递', '芝麻开门', '德邦快递', '百世汇通'],
    baseurl: 'http://mmsoft.51jiuqu.com/WeiXin',
    wxloginurl: 'https://open.weixin.qq.com/connect/qrconnect?',
    appid: 'wxe9ec3f3de2c4eb21',
    wxredirecturi: 'http://www.yxylqx.cn/Home/WeiXinCallback'
  },
  mutations: {

  }
}

export default app
