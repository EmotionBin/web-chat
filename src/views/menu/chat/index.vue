<template>
  <div class="chat-index-wrap">
    <div class="chat-index-title">
      最近聊天记录
    </div>
    <div class="chat-index-body">
      <template v-for="item in list">
        <div class="list-item" :key="item.roomId">
          <div class="item-icon" :style="{'background-image':`url(${item.avatar})`}"></div>
          <div class="item-text">
            <div class="item-text-title">{{item.name}}</div>
            <div class="item-text-message">{{item.message}}</div>
          </div>
        </div>
      </template>
    </div>
  </div>
</template>

<script>

export default {
  name: 'chat-index',
  data () {
    return {
      list: [
        {
          name: '聊天室1',
          avatar: 'https://s3.qiufengh.com/images/bce5b10ae530f530.png?imageView2/2/w/120/h/120',
          message: 'abc说:你好',
          roomId: 'ssssss'
        },
        {
          name: '聊天室2',
          avatar: 'https://s3.qiufengh.com/images/2016061316082590301.jpg?imageView2/2/w/120/h/120',
          message: 'abc说:你好',
          roomId: 'sss'
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

  }
}
</script>

<style lang="scss">

$padding:12px;

.chat-index-wrap{
  height: 100%;
  overflow: auto;
  .chat-index-title{
    color: rgba(0,0,0,.54);
    font-size: 14px;
    line-height: 36px;
    padding: 0 $padding;
  }
  .list-item{
    height: 56px;
    display: flex;
    align-items: center;
    color: rgba(0,0,0,.87);
    padding: 0 $padding;
    cursor: pointer;
    &:hover{
      background-color: rgba(0,0,0,.1);
    }
    .item-icon{
      width: 40px;
      height: 40px;
      @include bg-icon;
      border-radius: 5px;
    }
    .item-text{
      width: 0; // 防止 flex 布局下 overflow 失效
      flex: 1;
      margin-left: 12px;
    }
    .item-text-title{
      @include text-overflow;
    }
    .item-text-message{
      @include text-overflow;
      font-size: 14px;
      height: 24px;
      color: rgba(0,0,0,.54);
      line-height: 2;
    }
  }
}
</style>
