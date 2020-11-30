<template>
  <div class="index-wrap">
    <!-- 时间背景 -->
    <div class="time-wrap">{{time}}</div>
    <!-- 随机白色方块 -->
    <div class="block-wrap">
      <ul class="circles">
        <li v-for="n in 10" :key="n"></li>
      </ul>
    </div>
    <div class="head-wrap">
      <p class="head-title"> 时间是一切财富中最宝贵的财富 </p>
    </div>
    <div class="main-wrap">
      <div class="main-btn">
        <el-button type="success" size="" @click="start">快速开始</el-button>
      </div>
    </div>
    <div class="foot-wrap">
      <div class="beian-info">
        <div class="beian-num">
          <a href="https://beian.miit.gov.cn/">桂ICP备2020008115号</a>
          <span> • Version 1.0.0 • ALL RIGHTS RESERVED</span>
        </div>
        <div class="beian-year">
          huangweibinupup.cn © 2020
        </div>
      </div>
    </div>
  </div>
</template>

<script>

// https://github.com/iamkun/dayjs/
import dayjs from 'dayjs'

export default {
  name: 'index',
  data () {
    return {
      timeInterval: null,
      time: dayjs().format('HH:mm:ss')
    }
  },
  mounted () {
    this.init()
  },
  beforeDestroy () {
    this.clearTime()
  },
  methods: {
    // 初始化
    init () {
      this.timeInterval = setInterval(() => {
        this.refreshTime()
      }, 1000)
    },
    // 刷新时间
    refreshTime () {
      this.time = dayjs().format('HH:mm:ss')
    },
    // 清除时间定时器
    clearTime () {
      clearInterval(this.timeInterval)
    },
    // 快速开始
    start () {
      this.$router.push({
        name: 'login'
      })
    }
  }
}
</script>

<style lang="scss">

$headHeight:40px;
$footColor:#666;

.index-wrap{
  position: relative;
  height: 100%;
  background-color: #F0F2F5;
  .time-wrap{
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    @include flex-center;
    font-size: 24em;
    font-weight: bold;
    color: rgba(0, 0, 0, 0.03);
    overflow: hidden;
  }
  .block-wrap{
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    overflow: hidden;
    // 背景
    .circles {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      overflow: hidden;
      margin: 0px;
      padding: 0px;
      li {
        position: absolute;
        display: block;
        list-style: none;
        width: 20px;
        height: 20px;
        background: #FFF;
        animation: animate 25s linear infinite;
        bottom: -200px;
        @keyframes animate {
          0%{
            transform: translateY(0) rotate(0deg);
            opacity: 1;
            border-radius: 0;
          }
          100%{
            transform: translateY(-1000px) rotate(720deg);
            opacity: 0;
            border-radius: 50%;
          }
        }
        &:nth-child(1) {
          left: 15%;
          width: 80px;
          height: 80px;
          animation-delay: 0s;
        }
        &:nth-child(2) {
          left: 5%;
          width: 20px;
          height: 20px;
          animation-delay: 2s;
          animation-duration: 12s;
        }
        &:nth-child(3) {
          left: 70%;
          width: 20px;
          height: 20px;
          animation-delay: 4s;
        }
        &:nth-child(4) {
          left: 40%;
          width: 60px;
          height: 60px;
          animation-delay: 0s;
          animation-duration: 18s;
        }
        &:nth-child(5) {
          left: 65%;
          width: 20px;
          height: 20px;
          animation-delay: 0s;
        }
        &:nth-child(6) {
          left: 75%;
          width: 150px;
          height: 150px;
          animation-delay: 3s;
        }
        &:nth-child(7) {
          left: 35%;
          width: 200px;
          height: 200px;
          animation-delay: 7s;
        }
        &:nth-child(8) {
          left: 50%;
          width: 25px;
          height: 25px;
          animation-delay: 15s;
          animation-duration: 45s;
        }
        &:nth-child(9) {
          left: 20%;
          width: 15px;
          height: 15px;
          animation-delay: 2s;
          animation-duration: 35s;
        }
        &:nth-child(10) {
          left: 85%;
          width: 150px;
          height: 150px;
          animation-delay: 0s;
          animation-duration: 11s;
        }
      }
    }
  }
  .head-wrap{
    @include flex-center;
    color: #606266;
    font-size: 12px;
    height: $headHeight;
    .head-title{
      margin: 0;
    }
  }
  .main-wrap{
    position: relative;
    height: calc(100% - #{$headHeight});
    .main-btn{
      position: absolute;
      bottom: 160px;
      width: 100%;
      @include flex-center;
    }
  }
  .foot-wrap{
    position: absolute;
    bottom: 0;
    @include flex-center;
    width: 100%;
    color: $footColor;
    .beian-info{
      position: absolute;
      bottom: 10px;
      color: $footColor;
      a{
        font-size: 16px;
        color: $footColor;
      }
      .beian-year{
        @include flex-center;
      }
    }
  }
}
</style>
