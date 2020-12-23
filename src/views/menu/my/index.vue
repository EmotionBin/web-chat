<template>
  <div class="my-wrap">
    <div class="my-head-wrap">
      <div class="avatar-background" :style="{'background-image':`url(${user.avatar})`}"></div>
      <div class="avatar-wrap" :style="{'background-image':`url(${user.avatar})`}"></div>
      <div class="username">{{user.username}}</div>
    </div>
    <div class="my-body-wrap">
      <template v-for="item in setList">
        <div class="item-wrap" :key="item.title" @click="clickItem(item.alias)">
          <i class="item-icon" :class="[item.icon]"></i>
          <span class="item-name">{{item.title}}</span>
        </div>
      </template>
    </div>
  </div>
</template>

<script>
import bus from '@/utils/bus'
import { mapGetters } from 'vuex'

export default {
  name: 'my',
  data () {
    return {
      setList: [
        {
          title: '请我喝杯饮料',
          alias: 'drink',
          icon: 'el-icon-milk-tea'
        },
        {
          title: 'github',
          alias: 'github',
          icon: 'el-icon-link'
        },
        {
          title: '设置',
          alias: 'setting',
          icon: 'el-icon-setting'
        },
        {
          title: '表情',
          alias: 'expression',
          icon: 'el-icon-thumb'
        },
        {
          title: '敬请期待~',
          alias: 'forward',
          icon: 'el-icon-magic-stick'
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
  },
  mounted () {
  },
  beforeDestroy () {
  },
  methods: {
    // 设置列表的点击事件
    clickItem (value) {
      if (value === 'github') {
        this.$utils.open('https://github.com/EmotionBin/web-chat')
      } else if (value === 'drink') {
        bus.$emit('payMe')
      } else {
        // 暂未开放的功能列表
        const noDemoList = ['setting', 'expression']
        const index = noDemoList.findIndex(item => item === value)
        index > -1 && this.$message.info('该功能暂未开放，敬请期待')
      }
    }
  }
}
</script>

<style lang="scss">
.my-wrap{
  height: 100%;
  overflow: auto;
  .my-head-wrap{
    position: relative;
    height: 300px;
    @include flex-center;
    flex-direction: column;
    overflow: hidden;
    .avatar-background{
      @include absolute-full;
      @include bg-icon;
      filter: blur(10px);
      z-index: 1;
    }
    .avatar-wrap{
      width: 80px;
      height: 80px;
      margin-bottom: 10px;
      @include bg-icon;
      border-radius: 50%;
      z-index: 2;
    }
    .username{
      height: 30px;
      line-height: 30px;
      color: #fff;
      font-size: 18px;
      text-align: center;
      z-index: 2;
    }
  }
  .my-body-wrap{
    padding: 10px 0;
    background-color: #fff;
    box-shadow: 0 0 3px #d1d1d1;
    .item-wrap{
      display: flex;
      align-items: center;
      padding: 10px 12px;
      margin: 4px 0;
      font-size: 18px;
      color: #666;
      cursor: pointer;
      &:hover{
        background-color: rgba(0,0,0,.1);
      }
    }
    .item-icon{
      color: #666;
      font-size: 24px;
    }
    .item-name{
      margin-left: 20px;
    }
  }
}
</style>
