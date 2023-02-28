const constVar = require('./common/const') // 引入常量文件

module.exports = {
  chainWebpack: config => {
    // 添加环境变量,项目中当作常量使用，效果同.env
    config.plugin("define")
      .tap(args => {
        // 全局变量
        for (let key in constVar) { // 循环赋值
          args[0][key] = JSON.stringify(constVar[key]);
        }
        return args;
      });
  }
}
