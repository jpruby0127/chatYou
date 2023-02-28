/***
 * @description: 获取微信临时code
 * @param {*}
 * @return {*} promise
 * @author: jpruby
 */

const $getwxCode = function() {
  return new Promise((resovle, reject) => {
    uni.login({
      provider: 'weixin', //微信登录
      onlyAuthorize: true, //仅授权使用
      success({
        code
      }) {
        if (!code) console.log('服务器异常: ', 服务器异常)
        resovle(code)
      },
      fail(err) {
        reject(err)
      }
    })
  })
}


export {
  $getwxCode
}
