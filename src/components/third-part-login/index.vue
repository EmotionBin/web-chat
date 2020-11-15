<template>
  <div class="third-part-login-wrap">
    <el-tooltip effect="dark" content="微信登录" placement="top">
      <div class="third-login wechat"></div>
    </el-tooltip>
    <el-tooltip effect="dark" content="支付宝登录" placement="top">
      <div class="third-login alipay"></div>
    </el-tooltip>
    <el-tooltip effect="dark" content="钉钉登录" placement="top">
      <div class="third-login dingding"></div>
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
  mounted () {
  },
  beforeDestroy () {
  },
  methods: {
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
    background-repeat: no-repeat;
    background-size: 100%;
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
