//获取用户信息，获取token过期时间
let hostUserInfo = uni.getStorageSync('userInfo') || {}
let tokenExpired = uni.getStorageSync('tokenExpired') || 0
let token = uni.getStorageSync('token') || ''
// let tokenExpired = Date.now() + 200 //假数据 token没有过期
console.log("hostUserInfo: ", hostUserInfo);
if (tokenExpired * 1000 <= Date.now()) { //如果token过期用户信息赋值为空,token也置空
  hostUserInfo = {}
  token = ''
}
const data = {
  userInfo: hostUserInfo,
  hasLogin: Object.keys(hostUserInfo).length != 0 && tokenExpired * 1000 > Date
    .now(), //如果用户信息存在，且token没有过期表明用户已经登录（其实这里有bug如果用户伪造登录信息则判断不准，如严谨判断应该拿到token去后台验证）
  token,
  tokenExpired
}

export default {
  state: {
    ...data,
  },
  getters: {

  },
  mutations: {

    //把用户信息注入缓存
    setUserInfo(state, data, cover = {
      cover: false
    }) {
      console.log("要设置的用户信息: ", data);
      let userInfo = cover ? data.user : Object.assign(state.userInfo, data.user) //如果不是覆盖就追加或者更新
      state.userInfo = Object.assign({}, userInfo)
      state.hasLogin = Object.keys(state.userInfo).length != 0
      state.token = data.token
      state.tokenExpired = data.tokenExpired
      console.log("state.userInfo: ", state.userInfo);
      uni.setStorage({
        key: 'userInfo',
        data: state.userInfo
      })
      uni.setStorage({
        key: 'token',
        data: state.token
      })
      uni.setStorage({
        key: 'tokenExpired',
        data: state.tokenExpired
      })
    },
    //清空用户信息，清空缓存信息，退出登录
    userLogout(state) {
      state.hasLogin = false
      state.userInfo = {}
      state.token = ''
      state.tokenExpired = 0
      uni.removeStorage({
        key: 'userInfo',
      })
      uni.removeStorage({
        key: 'token',
      })
      uni.removeStorage({
        key: 'tokenExpired',
      })
    }
  },
  actions: {
    //把用户信息写入数据库
    async setUserInfoToDB(context, data) {
      uni.showLoading({
        title: '用户信息注册中'
      })
      const res = await uniCloud.callFunction({
        name: "setUserInfoToDB",
        data: data
      }).catch(e => {
        console.log("服务器出错: ", e);
      })

      uni.hideLoading()
      console.log("上传数据库结果: ", res);
      if (res) {
        context.commit('setUserInfo', res.result)
      }

    }

  }
}
