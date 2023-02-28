'use strict';
let jwt = require('jsonwebtoken')
const db = uniCloud.database();
const jwtSecret = "jprubysdf324523#$@##!@" //token加密秘钥，自定义

exports.main = async (event, context) => {
    //event为客户端上传的参数
    console.log('event : ', event)
    let userOpenId = event.openid
    if (!userOpenId) {
        throw Error("获取openId失败")
    }
    //根据openid查询一下数据库有没有这个用户数据
    let user = await db.collection('my-user').doc(userOpenId).get()
    let tokenExpired = Math.floor(Date.now() / 1000) + (60 * 60)
    let token = jwt.sign({ //对象数据可以填一个userId也可以加一些权限之类的例如admin
        userOpenId,
        exp: tokenExpired,
    }, jwtSecret)
    if (user.data[0]) { //如果有用户数据直接返回
        return {
            errSubject: 'loginDemo',
            errCode: 0,
            errMsg: '登录成功',
            user: user.data[0],
            token,
            tokenExpired
        }
    } else if (event.username && event.avatarFileName && event.avatarUrl) {
        // 如果没有新增一个数据
        let data = {
            _id: userOpenId,
            createAt: Date.now(),
            username: event.username,
            avatarUrl: event.avatarUrl,
            avatarFileName: event.avatarFileName,
        }
        await db.collection('my-user').add(data) //新增入库一组数据 返回token tokenExpired(注意这是秒)

        return {
            errSubject: 'loginDemo',
            errCode: 0,
            errMsg: '登录成功',
            user: data,
            token,
            tokenExpired
        }
    }

};
