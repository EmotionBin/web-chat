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
import { mapGetters, mapMutations } from 'vuex'

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
  },
  mounted () {
  },
  beforeDestroy () {
  },
  methods: {
    ...mapMutations('user', [
      'updateUser'
    ]),
    // 初始化
    async init () {
      try {
        // 初始化 socket 建立 socket 连接
        if (!this.$socket) socket.init()
        // socket 登录 让服务端知道你的 id
        this.user.userId && this.$socket.emit('login', this.user)
        const code = await this.getLocation()
        this.getWeather(code)
      } catch (error) {
        console.log('初始化失败', error)
      }
    },
    // 获取定位
    async getLocation () {
      try {
        const { data: { location, code } } = await this.$request({ url: '/api/getLocation' })
        this.location = location
        return code
      } catch (error) {
        console.log('获取位置信息时发生了错误', error)
      }
    },
    // 获取天气
    async getWeather (code) {
      try {
        const { data: { temperature, weather } } = await this.$request({ url: `/api/getWeather?code=${code}` })
        this.weather = `${temperature}°C ${weather}`
      } catch (error) {
        console.log('获取天气信息时发生了错误', error)
      }
    },
    // 点击下拉菜单
    clickItem (command) {
      const item = this.commandList.find(item => item.command === command)
      this.$router.push(item.path)
      if (item.command === 'logout') {
        // 进行注销操作
        localStorage.removeItem('uuid')
        // 删除 cookie
        document.cookie = 'web-chat-uuid ='
        // vuex 清空用户信息
        this.updateUser({
          username: '',
          userId: '',
          avatar: ''
        })
        // socket 退出
        this.$socket.emit('logout', this.user)
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
    display: flex;
    align-items: center;
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
