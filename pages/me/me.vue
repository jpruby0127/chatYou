<template>
  <view>
    <!-- 导航组件 -->
    <NavBar
      :statusBarHeight="statusBarHeight"
      :navigatorHeight="navigatorHeight"
    >
      My Center
    </NavBar>
    <view class="me-container">
      <!-- 个人信息卡片点击可以编辑 -->
      <view class="user-info">
        <view class="left">
          <view class="user-avatar">
            <img src="../../static/img/im/face/face_1.jpg" alt="" srcset="" />
          </view>
          <view class="username">jpruby</view>
        </view>

        <view class="right">图标</view>
      </view>

      <!-- 配置项目 -->
      <view class="user-settings">
        <view class="setting">
          <view class="left">
            <i>图标</i>
            <text>设置</text>
          </view>

          <i>图标</i>
        </view>

        <button type="warn">退出账号</button>
        <button type="default">注销账号</button>
      </view>
    </view>
  </view>
</template>

<script>
import { navParmsMixin } from '../../static/js/mixin.js'
import NavBar from '../../components/common/NavBar.vue'
export default {
  mixins: [navParmsMixin],
  components: {
    NavBar
  },
  data() {
    return {}
  }
}
</script>

<style lang="scss">
.me-container {
  display: flex;
  flex-direction: column;
  gap: 80rpx;
  padding: 30rpx;
}

.user-info {
  width: 100%;
  box-sizing: border-box;
  background-color: #fff;
  margin: auto;
  border-radius: 30rpx;
  height: 300rpx;
  padding: 30rpx;

  margin-top: 200rpx;
  display: flex;
  justify-content: space-between;
  .left {
    display: flex;
    flex-direction: column;
    align-items: center;
    .user-avatar {
      box-shadow: 2rpx 2rpx 4rpx rgba(0, 0, 0, 0.7);
      width: 100rpx;
      height: 100rpx;
      border-radius: 50%;
      overflow: hidden;
      img {
        width: 100%;
        height: 100%;
      }
    }
    .username {
      font-weight: 800;
    }
  }
}
.user-settings {
  display: flex;
  flex-direction: column;
  gap: 30rpx;
  .setting {
    box-sizing: border-box;
    height: 100rpx;
    background-color: #fff;
    border-radius: 20rpx;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 30rpx;
  }
  button {
    width: 100%;
  }
}
</style>
