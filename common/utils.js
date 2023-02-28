function getHeight() {
  //获取系统信息
  const system = uni.getSystemInfoSync()

  /**
   * 如果定义为微信则要获取很多头信息
   */
  //获取胶囊信息
  // #ifdef MP-WEIXIN
  const menu = uni.getMenuButtonBoundingClientRect()
  //计算组件高度
  const statusBarHeight = system.statusBarHeight //状态栏高度
  const menuHeight = menu.height //胶囊高度
  const menuTop = menu.top //胶囊与顶部的距离
  //导航栏高度= （胶囊顶部距离-状态栏高度） x 2 + 胶囊的高度
  const navigatorHeight =
    (menu.top - system.statusBarHeight) * 2 + menu.height
  //总高度 = 状态栏的高度 + 导航栏高度
  const totalHeight = statusBarHeight + navigatorHeight
  // #endif

  /**
   * 如果定义的是H5以下参数暂时都为0
   */
  // #ifdef H5
  const statusBarHeight = 0
  const menuHeight = 0
  const menuTop = 0
  //导航栏高度= （胶囊顶部距离-状态栏高度） x 2 + 胶囊的高度
  const navigatorHeight = 0
  //总高度 = 状态栏的高度 + 导航栏高度
  const totalHeight = 0
  // #endif


  return {
    statusBarHeight, //状态栏的高度
    navigatorHeight, //导航栏高度
    menuHeight, //胶囊高度
    menuTop, //胶囊与顶部的距离
    totalHeight, //总高度
  }

}

export {
  getHeight
}
