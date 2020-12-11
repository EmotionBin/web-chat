<template>
  <div class="home-head-wrap">
    <div class="head-title">
      <span class="title-text">{{title}}</span>
    </div>
    <div class="head-info">
      <div class="info-location">
        <span class="location-text">{{location}}</span>
      </div>
      <div class="info-weather">
        <span class="weather-text">{{weather}}</span>
      </div>
      <div class="info-user">
        <el-dropdown @command="clickItem">
          <span class="el-dropdown-link">
            {{user.username}}
          </span>
          <el-dropdown-menu slot="dropdown">
            <template v-for="item in commandList">
              <el-dropdown-item :key="item.name" :command="item.command" :icon="item.icon">{{item.name}}</el-dropdown-item>
            </template>
          </el-dropdown-menu>
        </el-dropdown>
      </div>
    </div>
  </div>
</template>

<script>
import socket from '@/utils/socket'
import { mapGetters } from 'vuex'

export default {
  name: 'indexHead',
  data () {
    return {
      title: 'web-chat',
      location: '',
      weather: '',
      commandList: [
        {
          name: '注销',
          command: 'logout',
          icon: 'el-icon-switch-button',
          path: {
            name: 'login'
          }
        }
      ]
    }
  },
  components: {
  },
  computed: {
    ...mapGetters(['user'])
  },
  created () {
    this.init()
    this.getLocation()
  },
  mounted () {
  },
  beforeDestroy () {
  },
  methods: {
    // 初始化
    init () {
      // 初始化 socket 建立 socket 连接
      socket.init()
      // socket 登录 让服务端知道你的 id
      this.$socket.emit('login', this.user)
    },
    // 获取定位
    async getLocation () {
      try {
        const { data: { location, code } } = await this.$request({ url: '/api/getLocation' })
        this.location = location
        this.getWeather(code)
      } catch (error) {
        console.log('error: ', error)
      }
    },
    // 获取天气
    async getWeather (code) {
      try {
        const { data: { temperature, weather } } = await this.$request({ url: `/api/getWeather?code=${code}` })
        this.weather = `${temperature}°C ${weather}`
      } catch (error) {
        console.log('error: ', error)
      }
    },
    // 点击下拉菜单
    clickItem (command) {
      const item = this.commandList.find(item => item.command === command)
      this.$router.push(item.path)
      if (item.command === 'logout') {
        // 进行注销操作
        localStorage.removeItem('uuid')
        // vuex 清空用户信息
      }
    }
  }
}
</script>

<style lang="scss">
.home-head-wrap{
  @include flex-between;
  height: 100%;
  background-color: #52b95f;
  padding: 0 20px;
  color: #fff;
  .head-title{
    font-size: 24px;
  }
  .head-info{
    display: flex;
    align-items: center;
    height: 100%;
  }
  .info-location,
  .info-weather{
    height: 100%;
    line-height: $headHeight;
    margin: 0 10px;
  }
  .info-user{
    margin: 0 10px;
    .el-dropdown{
      max-width: 160px;
      @include text-overflow;
    }
    .el-dropdown-link{
      cursor: pointer;
    }
  }
}
</style>
