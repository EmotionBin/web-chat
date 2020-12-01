<template>
  <div class="about-wrap">
    <div class="about-head">
      关于web-chat
    </div>
    <div class="about-body">
      <div class="list-wrap">
        <template v-for="item in staticData">
          <div class="list-item" :key="item.title">
            <div class="item-text">{{item.title}}</div>
          </div>
        </template>
      </div>
    </div>
    <div class="list-wrap hover">
      <template v-for="(item, index) in list">
        <div class="list-item" :class="{hover: item.src}" :key="item.title" @click="clickItem(index)">
          <div class="item-text">{{item.title}}</div>
        </div>
      </template>
      <!-- <div class="list-item">
        <div class="item-text">github</div>
      </div>
      <div class="list-item">
        <div class="item-text">我的博客</div>
      </div>
      <div class="list-item last">
        <div class="item-text">我的邮箱</div>
      </div> -->
    </div>
  </div>
</template>

<script>

export default {
  name: 'about',
  data () {
    return {
      staticData: [
        {
          title: 'Version 1.0.0'
        },
        {
          title: 'Made by huangweibin'
        },
        {
          title: 'All rights reserved'
        },
        {
          title: 'huangweibinupup.cn © 2020'
        },
        {
          title: '备案号: 桂ICP备2020008115号'
        }
      ],
      list: [
        {
          title: 'github',
          src: 'https://github.com/EmotionBin'
        },
        {
          title: '我的博客',
          src: 'https://huangweibinupup.cn'
        },
        {
          title: '我的邮箱',
          src: ''
        }
      ]
    }
  },
  components: {
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
    // 点击列表
    clickItem (index) {
      const { src } = this.list[index]
      src && this.$utils.open(src)
    }
  }
}
</script>

<style lang="scss">
$padding: 12px;

.about-wrap{
  height: 100%;
  overflow: auto;
  .about-head{
    color: rgba(0,0,0,.54);
    font-size: 14px;
    line-height: 36px;
    padding: 0 $padding;
  }
  .list-wrap{
    margin-bottom: 20px;
    background-color: #fff;
    box-shadow: 0 0 3px #e2e2e2;
    .list-item{
      height: 56px;
      display: flex;
      align-items: center;
      color: rgba(0,0,0,.87);
      padding: 0 $padding;
      border-bottom: 1px solid #e2e2e2;
      &.hover:hover{
        cursor: pointer;
        background-color: rgba(0,0,0,.1);
      }
      &.last{
        border: none;
      }
      .item-text{
        flex: 1;
      }
    }
  }
}
</style>
