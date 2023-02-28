<template>
  <view>
    <!-- 导航组件 -->
    <NavBar
      :statusBarHeight="statusBarHeight"
      :navigatorHeight="navigatorHeight"
    >
      User Login
    </NavBar>
    <view class="userInfo">
      <view class="row avatar">
        <text>头像</text>
        <button
          class="avatar-btn"
          open-type="chooseAvatar"
          @chooseavatar="onChooseAvatar"
        >
          <image class="img" :src="avatarUrl" mode="aspectFit"></image>
        </button>
      </view>
      <view class="row username">
        <text>昵称</text>
        <input
          class="input"
          v-model.lazy.trim="username"
          type="nickname"
          placeholder="请输入您的昵称"
        />
      </view>

      <view class="tips">
        <text>昵称限2-32个字符</text>
        <view class="notice">
          <text
            :style="
              username.length < 2 || username.length > 32 ? 'color:red' : ''
            "
          >
            {{ username.length }}
          </text>
          <text>/32</text>
        </view>
      </view>

      <button class="btn" type="default" @click="submit">提交</button>
    </view>
  </view>
</template>

<script>
import { navParmsMixin } from '../../static/js/mixin.js'
import NavBar from '../../components/common/NavBar.vue'
const defaultAvatarUrl = '../../static/defaultAvatar.png'
import { $getwxCode } from '../../utils/WechatLoginUtils.js'
const wxlogin = uniCloud.importObject('wxlogin', {
  customUI: true //取消自动交互展示界面
})
export default {
  mixins: [navParmsMixin],
  components: {
    NavBar
  },
  data() {
    return {
      avatarUrl: defaultAvatarUrl,
      username: '',
      cloudPath: ''
    }
  },
  onLoad() {},
  methods: {
    onChooseAvatar(e) {
      console.log('获取到的头像的完整信息： ', e.detail)
      const { avatarUrl } = e.detail
      this.avatarUrl = avatarUrl
      const tempArr = avatarUrl.split('/')
      this.cloudPath = tempArr[tempArr.length - 1]
    },
    async submit() {
      //用户名规则判断
      if (this.username.length < 2 || this.username.length > 32) {
        uni.showToast({
          title: '昵称长度不符合规范，请重新填写',
          icon: 'none'
        })
        this.username = ''
        return
      }
      // 头像未选择提醒
      if (this.avatarUrl === defaultAvatarUrl) {
        uni.showToast({
          title: '头像还没有选择呢',
          icon: 'none'
        })
      }

      const userInfo = {
        username: this.username,
        avatarUrl: this.avatarUrl
      }
      //上传用户头像
      const uploadRes = await uniCloud.uploadFile({
        cloudPath: this.cloudPath,
        filePath: userInfo.avatarUrl
      })
      //更新userInfo
      if (uploadRes.success) {
        userInfo.avatarUrl = uploadRes.fileID
        userInfo.avatarFileName = this.cloudPath
      }
      //获取code openid 因为比较敏感需要在云函数或者云对象中进行
      // a.获取code(封装)
      let code = await $getwxCode().catch(err => {
        console.log('err: ', err)
      })
      console.log('code: ', code)
      // b.通过code拿到openid(封装到云对象了)
      let openid = ''
      try {
        const res = await wxlogin.getOpenId(code)
        console.log('恭喜你你拿到了用户信息！', res)
        openid = res.loginInfo.data.openid
        uni.showToast({
          title: '获取成功'
        })
      } catch (e) {
        uni.showModal({
          title: '获取失败',
          content: e.errMsg,
          showCancel: false
        })
      }
      console.log('openid: ', openid)
      if (openid) {
        userInfo.openid = openid
        console.log('用户准备传库用的微信用户信息: ', userInfo)

        //后续逻辑！！！！！！！！

        //!!!!把获得用户信息上传到数据库（注意必须携带openid）
        this._setUserInfoToDBTest(userInfo)
      } else {
        //如果没有拿到openid 给一个错误提示到用户
        uni.showToast({
          title: 'openid获取失败，请稍后再试',
          icon: 'none'
        })
      }
    },
    //上传用户信息到数据库并且更新本地缓存
    async _setUserInfoToDBTest(userInfo) {
      uni.showLoading({
        title: '注册中'
      })
      await this.$store.dispatch('setUserInfoToDB', userInfo)
      uni.hideLoading()
      uni.switchTab({
        url: '/pages/me/me'
      })
    }
  }
}
</script>

<style lang="scss">
.userInfo {
  display: flex;
  flex-direction: column;
  font-size: 30rpx;
  // padding-top: 60rpx;
  padding: 200rpx 30rpx 0 30rpx;

  .row {
    height: 100rpx;
    color: #4f4f4f;
    padding: 0 20rpx;
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-bottom: 2rpx solid #f0f0f0;

    .avatar-btn {
      padding: 0;
      margin: 0;
      background-color: #fff;
      line-height: 0;

      &::after {
        border: none;
      }

      .img {
        width: 86rpx;
        height: 86rpx;
      }
    }

    .input {
      height: 100%;
      width: 260rpx;
      // font-size: 35rpx;
      text-align: right;
    }
  }

  .tips {
    display: flex;
    gap: 20rpx;
    margin: 20rpx 0 60rpx 0;
    color: #b7b7b7;
    font-size: 25rpx;
  }

  .btn {
    background-color: #2979ff;
    width: 100%;
    height: 90rpx;
    line-height: 90rpx;
    color: #fff;

    &:active {
      background-color: #94bcff;
      color: #f4f4f4;
    }
  }
}
</style>
