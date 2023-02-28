// 根目录的static下创建js文件夹并创建mixin.js文件
import {
  getHeight
} from '../../common/utils.js'
export const navParmsMixin = {
  data() {
    return {
      //获得距离
      statusBarHeight: 0, //状态栏的高度
      navigatorHeight: 0, //导航栏高度
      totalHeight: 0 //总高度
    }
  },
  onLoad() {
    /**
     * 获取系统高度信息，这里特指微信小程序
     */
    const {
      navigatorHeight,
      statusBarHeight,
      totalHeight
    } = getHeight()
    this.navigatorHeight = navigatorHeight
    this.statusBarHeight = statusBarHeight
    this.totalHeight = totalHeight
  },

}
