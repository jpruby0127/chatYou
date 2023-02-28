/*
 * @Author: jpruby
 * @Date: 2022-12-04 10:40:14
 * @LastEditors: white_queen
 * @LastEditTime: 2022-12-08 08:47:35
 * @FilePath: /uniCloud-aliyun/cloudfunctions/wxlogin/index.obj.js
 * @Description: 云对象发起get请求获取需要的信息
 */

const appid = 'wx3bf6beb9a1aa1755' //微信小程序唯一的id
const appSecret = '3cc1505619d33415399ae06a425ac254' //微信小程序对应的唯一的密钥
const db = uniCloud.database();

module.exports = {
    _before: function() { // 通用预处理器

    },
    /***
     * @description: 改方法获取用户的openid等信息
     * @param {*}code 为用户临时的id
     * @return {*}
     * @author: white_queen
     */
    async getOpenId(code) {
        // 参数校验，如无参数则不需要
        if (!code) {
            return {
                errCode: 'PARAM_IS_NULL',
                errMsg: '参数不能为空'
            }
        }
        // 业务逻辑
        // 发起网络请求
        const loginInfo = await uniCloud.httpclient.request(
            `https://api.weixin.qq.com/sns/jscode2session?appid=${appid}&secret=${appSecret}&js_code=${code}&grant_type=authorization_code`, {
                dataType: 'json'
            })
        // 返回结果
        return {
            loginInfo //请根据实际需要返回值
        }
    },

    /**
     * 根据openid查询用户是否在库
     */
    async queryUserByOpenid(openid) {
        // 参数校验，如无参数则不需要
        if (!openid) {
            return {
                errCode: 'PARAM_IS_NULL',
                errMsg: '参数不能为空'
            }
        }
        let user = await db.collection('my-user').doc(openid).get()
        return {
            user
        }
    }
}
