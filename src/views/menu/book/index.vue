<template>
  <div class="book-wrap">
    <div class="book-title">
      我的好友
    </div>
    <div class="book-body">
      <template v-for="(item, index) in friendList">
        <div class="list-item" :class="{last:index === friendList.length - 1}" :key="item.userId" @click="goUserDetail(index)">
          <div class="item-icon" :style="{'background-image':`url(${item.avatar})`}"></div>
          <div class="item-text">
            <div class="item-text-title">{{item.username}}</div>
          </div>
        </div>
      </template>
    </div>
  </div>
</template>

<script>

export default {
  name: 'book',
  data () {
    return {
      friendList: [
        // {
        //   username: '小明',
        //   userId: 'asdasd',
        //   avatar: 'https://s3.qiufengh.com/images/bce5b10ae530f530.png?imageView2/2/w/120/h/120'
        // },
        // {
        //   username: '小红',
        //   userId: 'asdasff',
        //   avatar: 'https://s3.qiufengh.com/images/2016061316082590301.jpg?imageView2/2/w/120/h/120'
        // },
        // {
        //   username: '小张',
        //   userId: 'aqqqw',
        //   avatar: '//s3.qiufengh.com/avatar/15.jpeg'
        // },
        // {
        //   username: '小李',
        //   userId: 'sdfqw',
        //   avatar: '//s3.qiufengh.com/avatar/14.jpeg'
        // },
        // {
        //   username: '小杜',
        //   userId: 'bxcbds',
        //   avatar: '//s3.qiufengh.com/avatar/16.jpeg'
        // }
      ]
    }
  },
  components: {
  },
  computed: {

  },
  created () {
    this.getFriend()
  },
  mounted () {
  },
  beforeDestroy () {
  },
  methods: {
    // 获取通讯录列表
    async getFriend () {
      try {
        const { data } = await this.$request({
          url: '/api/getUserList'
        })
        this.friendList = data
      } catch (error) {
        console.log('获取通讯录列表时发生了错误', error)
      }
    },
    // 查看用户详细信息
    goUserDetail (index) {
      const { userId } = this.friendList[index]
      this.$router.push(`/home/user/${userId}`)
    }
  }
}
</script>

<style lang="scss">
$padding:12px;

.book-wrap{
  height: 100%;
  overflow: auto;
  .book-title{
    color: rgba(0,0,0,.54);
    font-size: 14px;
    line-height: 36px;
    padding: 0 $padding;
  }
  .book-body{
    background-color: #fff;
    box-shadow: 0 0 3px #d1d1d1;
  }
  .list-item{
    height: 56px;
    display: flex;
    align-items: center;
    color: rgba(0,0,0,.87);
    padding: 0 $padding;
    cursor: pointer;
    border-bottom: 1px solid #d1d1d1;
    &.last{
      border: none;
    }
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
      color: #666;
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
