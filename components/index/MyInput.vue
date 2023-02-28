<template>
  <view class="box" :style="{ marginBottom: onfocusBottom }">
    <textarea
      v-model="msg"
      :auto-height="true"
      :cursor-spacing="100"
      :adjust-position="true"
      :disable-default-padding="true"
      placeholder="请输入"
      @focus="inputFocus"
      @blur="inputBlur"
    ></textarea>
    <i @click="mysubmit" class="t-icon t-icon-submit"></i>
  </view>
</template>

<script>
export default {
  name: 'MyInput',
  data() {
    return {
      onfocusBottom: null,
      msg: ''
    }
  },
  methods: {
    mysubmit() {
      //发射数据
      this.$emit('getMsg', this.msg)
      //清空绑定数据
      this.msg = ''
    },
    inputFocus() {
      this.onfocusBottom = '0rpx'
      uni.hideTabBar()
    },
    inputBlur() {
      this.onfocusBottom = null
      uni.showTabBar()
    }
  }
}
</script>

<style scoped lang="scss">
.box {
  position: fixed;
  box-sizing: border-box;
  // padding: 0 40rpx;
  padding: 0 10rpx;
  overflow: hidden;
  background-color: #fff;
  border-radius: 40rpx;
  z-index: 1;
  width: 90%;
  left: 0;
  right: 0;
  margin: 0 auto;
  bottom: var(--window-bottom, 0);
  display: flex;
  align-items: center;
  justify-content: space-between;
  /* 兼容IOS < 11.2  */
  margin-bottom: constant(safe-area-inset-bottom);
  /* 兼容IOS > 11.2  */
  margin-bottom: env(safe-area-inset-bottom);
  textarea {
    flex: 1;
    background-color: #fff;
    padding: 20rpx;
    font-size: 36rpx;
  }
}
</style>
