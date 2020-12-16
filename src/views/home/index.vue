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
    <div class="home-dialog">
      <custom-dialog/>
    </div>
  </div>
</template>

<script>
import homeHead from './components/head/index.vue'
import homeMenu from './components/menu/index.vue'
import homeAccount from './components/account/index.vue'
import CustomDialog from './components/dialog/index.vue'

export default {
  name: 'home',
  data () {
    return {
    }
  },
  components: {
    homeHead,
    homeMenu,
    homeAccount,
    CustomDialog
  },
  computed: {
  },
  created () {
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
