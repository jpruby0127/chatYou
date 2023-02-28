<script>
export default {
  onLaunch: function() {
    console.log('App Launch')
  },
  onShow: function() {
    console.log('App Show')
  },
  onHide: function() {
    console.log('App Hide')
  }
}
</script>

<style lang="scss">
@import 'static/css/iconfont.scss'; //引入阿里巴巴公开字体，普惠和苍耳
@import 'static/css/iconfont-weapp-icon.scss'; //引入swager图标

page {
  background-color: #e5e5e5;
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  font-family: 'AlibabaPuHuiTi';
}
</style>
