<template>
  <div class="home-wrap">
    <div class="home-head">
      <home-head/>
    </div>
    <div class="home-body">
      <div class="body-menu">
        <home-menu/>
      </div>
      <div class="body-view">
        <router-view/>
      </div>
      <div class="body-panel">
        <home-account/>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import homeHead from './components/head/index.vue'
import homeMenu from './components/menu/index.vue'
import homeAccount from './components/account/index.vue'

export default {
  name: 'home',
  data () {
    return {
    }
  },
  components: {
    homeHead,
    homeMenu,
    homeAccount
  },
  computed: {
    ...mapGetters(['user'])
  },
  created () {
    this.init()
  },
  mounted () {
  },
  beforeDestroy () {
  },
  methods: {
    // 初始化
    init () {
      // socket 初始化
      console.log(this.$socket)
      const { io, server } = this.$socket
      // 初始化完成 原型链覆盖
      this.$socket = io(server)
      // socket 登录 让服务端知道你的 id
      this.$socket.emit('login', this.user)
    }
  }
}
</script>

<style lang="scss">
.home-wrap{
  height: 100%;
  background-color: rgb(250, 250, 250);
  .home-head{
    height: $headHeight;
  }
  .home-body{
    display: flex;
    height: calc(100% - #{$headHeight});
  }
  .body-menu{
    flex: 1;
  }
  .body-view{
    flex: 3;
  }
  .body-panel{
    flex: 1;
  }
}
</style>
