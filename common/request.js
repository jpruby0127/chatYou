/**
 * request 简单封装
 */

const baseUrl = 'https://api.openai.com/v1'
const request = (url = '', date = {}, type = 'GET', header = {
  Authorization: "Bearer " + API_KEY //api_key引用全局变量
}) => {
  return new Promise((resolve, reject) => {
    uni.request({
      method: type,
      url: baseUrl + url,
      data: date,
      header: header,
      dataType: 'json',
    }).then((response) => {
      setTimeout(function() {
        uni.hideLoading();
      }, 200);
      let [error, res] = response;
      resolve(res.data);
    }).catch(error => {
      let [err, res] = error;
      reject(err)
    })
  });
}
export default request
