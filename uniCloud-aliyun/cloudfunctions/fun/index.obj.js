const API_KEY = '*************'
const baseUrl = 'https://api.openai.com/v1'
const header = {
  Authorization: "Bearer " + API_KEY //api_key引用全局变量
}

module.exports = {
  _before: function() {},

  async getRPTres(sendData) {
    // 参数校验，如无参数则不需要
    if (!sendData) {
      return {
        errCode: 'PARAM_IS_NULL',
        errMsg: '参数不能为空'
      }
    }
    // 业务逻辑
    // 发起网络请求
    const res = await uniCloud.httpclient.request(baseUrl + '/completions', {
      method: 'POST',
      data: sendData,
      headers: header,
      contentType: 'json', // 指定以application/json发送data内的数据
      dataType: 'json' // 指定返回值为json格式，自动进行parse
    })
    return {
      res //请根据实际需要返回值
    }


  }
}
