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
        <el-dropdown>
          <span class="el-dropdown-link">
            {{username}}
          </span>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item icon="el-icon-switch-button">注销</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </div>
    </div>
  </div>
</template>

<script>

export default {
  name: 'home-head',
  data () {
    return {
      // username 要从 vuex 中读取
      username: 'admin',
      title: 'web-chat',
      location: '',
      code: '',
      weather: ''
    }
  },
  components: {
  },
  computed: {

  },
  async created () {
    await this.getLocation()
    await this.getWeather()
  },
  mounted () {
  },
  beforeDestroy () {
  },
  methods: {
    // 获取定位
    async getLocation () {
      try {
        const { data: { location, code } } = await this.$request({ url: '/api/getLocation' })
        this.location = location
        this.code = code
      } catch (error) {
        console.log('error: ', error)
      }
    },
    // 获取天气
    async getWeather () {
      try {
        const { data: { temperature, weather } } = await this.$request({ url: `/api/getWeather?code=${this.code}` })
        this.weather = `${temperature}°C ${weather}`
      } catch (error) {
        console.log('error: ', error)
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
    .el-dropdown-link{
      cursor: pointer;
    }
  }
}
</style>
