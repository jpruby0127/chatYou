<template>
  <view class="container">
    <!-- 导航组件 -->
    <NavBargit
      :statusBarHeight="statusBarHeight"
      :navigatorHeight="navigatorHeight"
    >
      chatYou
    </NavBar>

    <!-- 对话面板 -->
    <MainDialog :totalHeight="totalHeight" :dataList="dataList"></MainDialog>
    <!-- 底部标没有任何作用 -->
    <view id="bottom"></view>
    <!-- 输入面板 -->
    <MyInput @getMsg="getMsg"></MyInput>
  </view>
</template>

<script>
const gptFun = uniCloud.importObject('fun', {
  customUI: true // 取消自动展示的交互提示界面
})
import { mapState, mapGetters } from 'vuex'
import NavBar from '../../components/common/NavBar.vue'
import MainDialog from '../../components/index/MainDialog.vue'
import MyInput from '../../components/index/MyInput.vue'
import { navParmsMixin } from '../../static/js/mixin.js'
import { getHeight } from '../../common/utils.js'
export default {
  mixins: [navParmsMixin],
  components: {
    NavBar,
    MainDialog,
    MyInput
  },
  data() {
    return {
      onfocusBottom: null, //H5页面键盘弹起后会附带底部必然尺寸这里通过这个参数解决
      dataList: [
        {
          id: 0,
          type: 'systemInfo', //类型为系统通知
          msg: '欢迎进入chatGPT的世界',
          createTime: Date.now()
        },
        {
          id: 1,
          type: 'robotInfo', //对话框种类
          name: 'chatGPT（达芬奇3号）', //机器人名称
          avatar: '/static/img/im/face/robot.jpeg', //机器人头像路径
          msg:
            '你好，我是chatGPT,可以开始和我聊天啦, 例如："帮我写封情书", "怎么学习英语"',
          createTime: Date.now()
        }
      ],
      //发送参数
      sendData: {
        model: 'text-davinci-003', //机器人编号
        prompt: '',
        temperature: 0.5,
        max_tokens: 2048,
        top_p: 0.3
      }
    }
  },

  computed: {
    ...mapState({
      userInfo: state => state.userStore.userInfo,
      hasLogin: state => state.userStore.hasLogin,
      token: state => state.userStore.token
    })
  },

  watch: {
    //监听对话数据列表变化如果有变化就直接自动滚动到底部
    dataList: {
      handler(newName, oldName) {
        setTimeout(() => {
          uni.pageScrollTo({
            selector: '#bottom',
            duration: 100
          })
        }, 10)
      },
      immediate: true
    }
  },
  onLoad() {},
  methods: {
    //提交后刷新聊天记录
    getMsg(e) {
      console.log(e)
      //判断用户是否登录如果没有登录跳转到个人中心
      // if (!this.hasLogin) {
      //   uni.showToast({
      //     title: '请先登录一下,3秒后跳转',
      //     icon: 'none'
      //   })
      //   setTimeout(() => {
      //     uni.switchTab({
      //       url: '/pages/me/me'
      //     })
      //   }, 3000)
      //   return
      // }

      if (!e) {
        return uni.showToast({
          title: '提交问题不能为空'
        })
      }
      // 保存变量并清空
      //发送机器人数据准备
      this.sendData.prompt = e
      //push 用户的提问问题 （这里有重复代码可以封装）
      this.dataList.push({
        id: 2,
        type: 'userInfo', //对话框种类
        name: this.userInfo.username, //用户人名称
        avatar: this.hasLogin
          ? this.userInfo.avatarUrl
          : '/static/img/im/face/user.png', //用户人头像路径
        msg: e,
        createTime: Date.now()
      })

      uni.showLoading({
        title: '机器人在地里挖姜中...'
      })
      gptFun.getRPTres(this.sendData).then(res => {
        uni.hideLoading()
        console.log(res)
        if (res.res.data.choices[0].text) {
          // 拿到数据把机器人恢复的数据push进去
          this.dataList.push({
            id: 1,
            type: 'robotInfo', //对话框种类
            name: 'chatGPT（达芬奇3号）', //机器人名称
            avatar: '/static/img/im/face/robot.jpeg', //机器人头像路径
            msg: res.res.data.choices[0].text,
            createTime: Date.now()
          })
        }
      })
      //调用封装的全局请求方法

      // this.$request('/completions', this.sendData, 'POST').then(res => {
      //   uni.hideLoading()
      //   // 打印调用成功回调
      //   console.log(res.choices[0].text)
      //   if (res.choices[0].text) {
      //     // 拿到数据把机器人恢复的数据push进去
      //     this.dataList.push({
      //       id: 1,
      //       type: 'robotInfo', //对话框种类
      //       name: 'chatGPT（达芬奇3号）', //机器人名称
      //       avatar: '/static/img/im/face/robot.jpeg', //机器人头像路径
      //       msg: res.choices[0].text,
      //       createTime: Date.now()
      //     })
      //   }
      // })
    },

    //方法2：通过实力去访问openai 这个方法在微信小程序中使用异常因此暂时不做任何处理
    async method2(userquestion) {
      const openai = new OpenAIApi(configuration)
      const res = await openai.listEngines()
      this.sendData.prompt = userquestion
      const res2 = await openai.createCompletion(this.sendData)
      console.log('res:', res)
      console.log('res2:', res2)
    }
  }
}
</script>

<style lang="scss" scoped></style>
