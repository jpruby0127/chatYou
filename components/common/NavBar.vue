<template>
  <!-- 如果是微信小程序则顶部导航栏的样式如下 -->
  <!-- #ifdef MP-WEIXIN -->
  <view
    class="navi-box"
    :style="{
      paddingTop: statusBarHeight + 'px'
    }"
  >
    <view
      class="title righteous"
      :style="{ lineHeight: navigatorHeight + 'px' }"
    >
      chatYou
    </view>
  </view>
  <!-- #endif -->
  <!-- 如果是h5的页面顶部导航栏的样式如下 -->
  <!-- #ifndef MP-WEIXIN -->
  <view class="navi-box">
    <view class="title righteous" style="line-height: 80rpx;">chatYou</view>
  </view>
  <!-- #endif -->
</template>

<script>
export default {
  name: 'NavBar',
  props: {
    statusBarHeight: {
      type: Number,
      default: 0
    },
    navigatorHeight: {
      type: Number,
      default: 0
    }
  },
  data() {
    return {}
  }
}
</script>

<style lang="scss">
.navi-box {
  z-index: 1;
  position: fixed;
  width: 100%;
  background-color: #7838c5;
  .title {
    color: #fff;
    text-align: center;
  }
}
</style>
