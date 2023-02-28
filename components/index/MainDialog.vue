<template>
  <view
    class="dialog-board"
    :style="{ paddingTop: totalHeight === 0 ? '80rpx' : totalHeight + 'px' }"
  >
    <block v-for="(item, index) in dataList" :key="index">
      <!-- 便利数组后通过item.type判断是谁发的对话内容，并展现出来 -->
      <!-- 系统消息 -->
      <view v-if="item.type === 'systemInfo'" class="system-info canger">
        <text>{{ item.msg }}</text>
      </view>

      <!-- 机器人消息 -->
      <view v-if="item.type === 'robotInfo'" class="robot-info">
        <view class="avatar">
          <image :src="item.avatar" mode="aspectFill"></image>
        </view>
        <view class="chatContent">
          <view class="top-info">
            <text>{{ item.name }}</text>
            <uni-dateformat
              :date="item.createTime"
              format="hh:mm"
              :threshold="[600000, 3600000]"
            ></uni-dateformat>
          </view>
          <view class="chat-box">
            <rich-text :nodes="item.msg"></rich-text>
          </view>
        </view>
      </view>

      <!-- 用户消息 -->
      <view v-if="item.type === 'userInfo'" class="user-info">
        <view class="avatar">
          <image :src="item.avatar" mode="aspectFill"></image>
        </view>
        <view class="chatContent">
          <view class="top-info">
            <text style="margin-right: 10rpx;">{{ item.name }}</text>
            <view>
              <uni-dateformat
                :date="item.createTime"
                format="hh:mm"
                :threshold="[600000, 3600000]"
              ></uni-dateformat>
            </view>
          </view>
          <view class="chat-box">
            <rich-text :nodes="item.msg"></rich-text>
          </view>
        </view>
      </view>
    </block>
  </view>
</template>

<script>
export default {
  name: 'MainDialog',
  props: {
    totalHeight: {
      type: Number,
      default: 0
    },
    dataList: {
      type: Array
    }
  },
  data() {
    return {}
  }
}
</script>

<style lang="scss">
.dialog-board {
  padding: 0 15rpx;
  /* 兼容IOS < 11.2  */
  padding-bottom: calc(120rpx + constant(safe-area-inset-bottom));
  /* 兼容IOS > 11.2  */
  padding-bottom: calc(120rpx + env(safe-area-inset-bottom));

  display: flex;
  flex-direction: column;
  gap: 30rpx;
  .system-info {
    text-align: center;
    margin: 20rpx 0 30rpx 0;
    text {
      font-size: 24rpx;
      background-color: #cacaca;
      border-radius: 20rpx;
      padding: 4rpx 20rpx;
      color: #fff;
      font-weight: 600;
    }
  }
  .robot-info,
  .user-info {
    display: flex;
    .avatar {
      display: flex;
      align-items: flex-start;
      image {
        width: 80rpx;
        height: 80rpx;
        border-radius: 50%;
      }
    }
    .chatContent {
      // transform: translateY(-20rpx);
      padding-left: 10rpx;
      padding-right: 40rpx;
      // width: 80%;
      .top-info {
        font-size: 24rpx;
      }
      .chat-box {
        background-color: #fff;
        padding: 26rpx;
        border-radius: 0rpx 40rpx 40rpx 40rpx;
      }
    }
  }
  .user-info {
    display: flex;
    flex-flow: row-reverse;
    .avatar {
      display: flex;
      align-items: flex-start;
    }
    .chatContent {
      // transform: translateY(-20rpx);
      padding-left: 40rpx;
      padding-right: 10rpx;
      // width: 80%;
      .top-info {
        display: flex;
        justify-content: flex-end;
        font-size: 24rpx;
      }
      .chat-box {
        background-color: #7838c5;
        color: #fff;
        padding: 26rpx;
        border-radius: 40rpx 0rpx 40rpx 40rpx;
      }
    }
  }
}
</style>
