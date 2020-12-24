<template>
  <div class="wx-login">
    <div class="qrcode-wrap">
      <div class="qrcode-title">请打开手机微信扫描下方二维码</div>
      <img :src="qrcodeData">
      <div class="qrcode-container" id="qrcode"></div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'wx-login',
  data () {
    return {
      queryList: {},
      qrcodeData: '',
      miniProgrameUrl: 'https://open.weixin.qq.com/sns/getexpappinfo?appid=wx6c938764a398ad5d&path=pages%2Findex%2Findex.html#wechat-redirect',
      wxCofig: {
        appid: 'wx6c938764a398ad5d',
        secret: '8039f0953e1378f282bcfd5f21784c0b',
        accessToken: ''
      }
    }
  },
  components: {
  },
  computed: {
  },
  watch: {
  },
  created () {
    this.getUrlParams()
  },
  mounted () {
    this.getWxQrcode()
  },
  beforeDestroy () {
  },
  methods: {
    // 获取 url 参数
    getUrlParams () {
      if (window.location.href.indexOf('?') === -1) return
      const urlParams = decodeURI(window.location.href.split('?')[1])
      // 判断是否有多个传参
      const paramsItem = urlParams.indexOf('&') === -1 ? [urlParams] : urlParams.split('&')
      const obj = {}
      paramsItem.forEach(item => {
        console.log('item: ', item)
        const key = item.split('=')[0]
        const value = item.split('=')[1]
        obj[key] = value
      })
      this.queryList = obj
    },
    // 初始化 往微信小程序地址带入参数
    init () {
      const socketId = this.queryList.socketId
      console.log('socketId: ', socketId)
      this.miniProgrameUrl.replace('#wechat-redirect', `socketId=${socketId}#wechat-redirect`)
    },
    // 调用微信 API 生成小程序二维码
    async getWxQrcode () {
      try {
        const { appid, secret } = this.wxCofig
        const { data } = await this.$request({
          url: '/api/wx/getAccessToken',
          params: {
            grant_type: 'client_credential',
            appid,
            secret
          }
        })
        console.log('data.accessToken: ', data.accessToken)
        this.wxCofig.accessToken = data.accessToken
        const res = await this.$request({
          url: '/api/wx/getWxQrcode',
          method: 'post',
          data: {
            access_token: this.wxCofig.accessToken,
            path: `page/index/index?socketId=${this.queryList.socketId}`
          }
        })
        this.qrcodeData = res.data.filePath
        console.log('res: ', res)
      } catch (error) {
        console.log('获取微信小程序的accessToken或qrcode时发生了错误', error)
      }
    }
  }
}
</script>

<style lang="scss">
.wx-login{
  height: 100%;
  .qrcode-title{
    margin-bottom: 20px;
    font-size: 18px;
    color: #DC143C;
    font-weight: bold;
  }
  .qrcode-wrap{
    width: 100%;
    height: 100%;
    @include flex-center;
    flex-direction: column;
  }
}
</style>
