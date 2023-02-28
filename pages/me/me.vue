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
            <img
              :src="
                hasLogin ? userInfo.avatarUrl : '../../static/defaultAvatar.png'
              "
            />
          </view>
          <view class="username">
            {{ hasLogin ? userInfo.username : '游客' }}
          </view>
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
        <button v-if="!hasLogin" type="primary" @click="loginWx">
          微信登录
        </button>
        <button v-else type="warn" @click="logout">退出账号</button>
        <button type="default">注销账号</button>
      </view>
    </view>
  </view>
</template>

<script>
import { navParmsMixin } from '../../static/js/mixin.js'
import NavBar from '../../components/common/NavBar.vue'

import { $getwxCode } from '../../utils/WechatLoginUtils.js'
import store from '@/store/index.js'
import { mapState, mapGetters } from 'vuex'
const wxlogin = uniCloud.importObject('wxlogin', {
  customUI: true
})

export default {
  mixins: [navParmsMixin],
  components: {
    NavBar
  },
  data() {
    return {}
  },
  computed: {
    ...mapState({
      userInfo: state => state.userStore.userInfo,
      hasLogin: state => state.userStore.hasLogin,
      token: state => state.userStore.token
    })
  },
  methods: {
    //用户与点击登录
    async loginWx() {
      //用户逻辑...
      if (!this.hasLogin) {
        //判断用户是否已经在库，在库直接返回用户信息，不在库跳转到注册页面
        //拿到openid（云对象请求openid）
        // a.获取code(封装)
        let code = await $getwxCode().catch(err => {
          console.log('err: ', err)
        })
        console.log('code: ', code)
        const res = await wxlogin.getOpenId(code).catch(e => {
          console.log('获取openCode失败: ', e)
        })
        console.log('res: ', res)
        if (!res.loginInfo.data) {
          console.log('没有获取到data数据')
        }
        let openid = res.loginInfo.data.openid
        // 用户在库 写入全局
        const tempUserInfo = await wxlogin.queryUserByOpenid(openid)
        // 用户在库,调用全局刷新用户信息
        if (tempUserInfo.user.data[0]) {
          this.$store.dispatch('setUserInfoToDB', { openid }) //因为用户存在只携带openid即可
          return
        }

        // 首次注册登录跳转,
        uni.navigateTo({
          url: '/pages/loginPage/loginPage'
        })
      } else {
        uni.showToast({
          title: '已经是登录状态了',
          icon: 'error'
        })
      }

      //用户逻辑
    },
    //用户退出
    logout() {
      this.$store.commit('userLogout')
    }
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
