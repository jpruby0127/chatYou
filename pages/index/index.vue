<template>
  <view class="container">
    <!-- 导航组件 -->
    <NavBargit
      :statusBarHeight="statusBarHeight"
      :navigatorHeight="navigatorHeight"
    ></NavBar>

    <!-- 对话面板 -->
    <MainDialog :totalHeight="totalHeight" :dataList="dataList"></MainDialog>
    <!-- 底部标没有任何作用 -->
    <view id="bottom"></view>
    <!-- 输入面板 -->
    <MyInput @getMsg="getMsg"></MyInput>
  </view>
</template>

<script>
import NavBar from '../../components/common/NavBar.vue'
import MainDialog from '../../components/index/MainDialog.vue'
import MyInput from '../../components/index/MyInput.vue'
import { getHeight } from '../../common/utils.js'
export default {
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
        },
        {
          id: 1,
          type: 'robotInfo', //对话框种类
          name: 'chatGPT（达芬奇3号）', //机器人名称
          avatar: '/static/img/im/face/robot.jpeg', //机器人头像路径
          msg:
            '你好，我是chatGPT,可以开始和我聊天啦, 例如："帮我写封情书", "怎么学习英语"',
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
        },
        {
          id: 1,
          type: 'robotInfo', //对话框种类
          name: 'chatGPT（达芬奇3号）', //机器人名称
          avatar: '/static/img/im/face/robot.jpeg', //机器人头像路径
          msg:
            '你好，我是chatGPT,可以开始和我聊天啦, 例如："帮我写封情书", "怎么学习英语"',
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
        },
        {
          id: 2,
          type: 'userInfo', //对话框种类
          name: 'jpruby', //用户人名称
          avatar: '/static/img/im/face/user.png', //用户人头像路径
          msg: '好的，我知道了，不要烦我',
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
      },
      //获得距离
      statusBarHeight: 0, //状态栏的高度
      navigatorHeight: 0, //导航栏高度
      totalHeight: 0 //总高度
    }
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
  onLoad() {
    /**
     * 获取系统高度信息，这里特指微信小程序
     */
    const { navigatorHeight, statusBarHeight, totalHeight } = getHeight()
    this.navigatorHeight = navigatorHeight
    this.statusBarHeight = statusBarHeight
    this.totalHeight = totalHeight
  },
  methods: {
    //提交后刷新聊天记录
    getMsg(e) {
      console.log(e)
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
        name: 'jpruby', //用户人名称
        avatar: '/static/img/im/face/user.png', //用户人头像路径
        msg: e,
        createTime: Date.now()
      })

      //调用封装的全局请求方法
      this.$request('/completions', this.sendData, 'POST').then(res => {
        // 打印调用成功回调
        console.log(res.choices[0].text)
        if (res.choices[0].text) {
          // 拿到数据把机器人恢复的数据push进去
          this.dataList.push({
            id: 1,
            type: 'robotInfo', //对话框种类
            name: 'chatGPT（达芬奇3号）', //机器人名称
            avatar: '/static/img/im/face/robot.jpeg', //机器人头像路径
            msg: res.choices[0].text,
            createTime: Date.now()
          })
        }
      })
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
