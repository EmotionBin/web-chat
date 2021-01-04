<template>
  <div class="third-part-login-wrap">
    <el-tooltip effect="dark" content="微信登录" placement="top">
      <div class="third-login wechat" @click="wxLogin"></div>
    </el-tooltip>
    <el-tooltip effect="dark" content="支付宝登录" placement="top">
      <div class="third-login alipay" @click="showTips"></div>
    </el-tooltip>
    <el-tooltip effect="dark" content="钉钉登录" placement="top">
      <div class="third-login dingding" @click="showTips"></div>
    </el-tooltip>
  </div>
</template>

<script>

export default {
  name: 'third-part-login',
  data () {
    return {
    }
  },
  computed: {
  },
  created () {
    this.init()
  },
  mounted () {
  },
  beforeDestroy () {
    // 在销毁之前要取消监听 防止重复监听 不能取消监听 否则从登录切换到注册再切换回登录会监听不到事件
    // this.$socket.removeAllListeners('wx-login')
  },
  methods: {
    // 初始化 监听 socket 事件
    init () {
      this.$socket.on('wx-login', this.wxClose)
      this.loginWindow = this.$route.params.wxLoginWindow || null
      console.log('this.loginWindow: ', this.loginWindow)
    },
    showTips () {
      this.$alert('该功能暂未开放，请使用微信登录!', {
        confirmButtonText: '确定'
      }).catch(() => {
        console.log('关闭提示')
      })
    },
    // 微信登录
    wxLogin () {
      const width = 1200
      const height = 600
      const top = 100
      const left = 300
      const socketId = this.$socket.id
      const url = `/wx/login?socketId=${socketId}`
      this.loginWindow = window.open(url, 'wx-login', `width=${width}, height=${height}, top=${top}, left=${left}`)
      // 如果不在登录页面强制跳转到登录页面
      if (this.$route.name !== 'login') {
        this.$router.push({
          name: 'login',
          params: {
            wxLoginWindow: this.loginWindow
          }
        })
      }
    },
    // 微信登录结束
    wxClose () {
      this.loginWindow.close()
    }
  }
}
</script>

<style lang="scss">
.third-part-login-wrap{
  margin: 20px 0;
  @include flex-center;
  .third-login{
    display: inline-block;
    width: 28px;
    height: 28px;
    margin: 0 15px;
    @include bg-icon;
    outline: none;
    cursor: pointer;
    &.wechat{
      background-image: url('~@/assets/login/wechat.png');
    }
    &.alipay{
      background-image: url('~@/assets/login/alipay.png');
    }
    &.dingding{
      background-image: url('~@/assets/login/dingding.png');
    }
  }
}
</style>
