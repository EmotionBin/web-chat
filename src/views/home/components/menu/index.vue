<template>
  <div class="home-menu-wrap">
    <el-menu text-color="#666" active-text-color="#52b95f" unique-opened :default-active="getCurrentRoute">
      <template v-for="item in menuList">
        <el-submenu v-if="item.subMenu" :index="item.path" :key="item.title">
          <template slot="title">
            <i class="menu-icon" :class="[item.icon]"></i>
            <span class="menu-title">{{item.title}}</span>
          </template>
          <template v-for="item1 in item.subMenu">
            <el-menu-item :index="item1.path" :key="item1.title" @click="clickMenuItem(item1.path)">{{item1.title}}</el-menu-item>
          </template>
        </el-submenu>
        <el-menu-item v-else :index="item.path" :key="item.title" @click="clickMenuItem(item.path)">
          <i class="menu-icon" :class="[item.icon]"></i>
          <span class="menu-title">{{item.title}}</span>
        </el-menu-item>
      </template>
    </el-menu>
  </div>
</template>

<script>
import menu from '@/data/menu/index.js'

export default {
  name: 'homeMenu',
  data () {
    return {
      menuList: []
    }
  },
  components: {
  },
  computed: {
    getCurrentRoute () {
      return this.$route.path
    },
    getUserId () {
      return this.$store.state.user.userId
    }
  },
  created () {
    this.init()
  },
  mounted () {
  },
  beforeDestroy () {
  },
  methods: {
    // 初始化 获取用户信息
    init () {
      this.menuList = menu(this.getUserId || '')
    },
    // 点击菜单
    clickMenuItem (path) {
      if (this.getCurrentRoute === path) return
      this.$router.push(path)
    }
  }
}
</script>

<style lang="scss">
.home-menu-wrap{
  height: 100%;
  .el-menu{
    height: 100%;
  }
  .el-menu-item{
    font-size: 16px;
    .menu-title{
      margin-left: 8px;
    }
    &:hover,
    &:focus{
      background-color: rgba(0,0,0,.1);
    }
  }
}
</style>
