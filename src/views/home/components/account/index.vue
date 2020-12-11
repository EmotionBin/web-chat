<template>
  <div class="account-wrap">
    <div class="account-head">
      <span class="head-text">当前在线列表({{list.length}})</span>
    </div>
    <div class="account-list">
      <div class="list-wrap">
        <template v-for="item in list">
          <div class="list-item" :key="item.userId">
            <div class="item-avatar" :style="{'background-image':`url(${item.avatar})`}"></div>
            <div class="item-username">{{item.username}}</div>
          </div>
        </template>
      </div>
    </div>
  </div>
</template>

<script>

export default {
  name: 'indexAccount',
  data () {
    return {
      list: []
    }
  },
  components: {
  },
  computed: {

  },
  created () {
    this.init()
  },
  mounted () {
  },
  beforeDestroy () {
  },
  methods: {
    // 初始化
    init () {
      const that = this
      this.$socket.on('login-success', data => {
        console.log(data)
        that.getOnlineUser()
      })
    },
    // 获取当前在线的用户
    async getOnlineUser () {
      try {
        const { data } = await this.$request({
          url: '/api/getOnlineUser'
        })
        console.log('data: ', data)
        this.list = data
      } catch (error) {
        console.log('error: ', error)
      }
    }
  }
}
</script>

<style lang="scss">
.account-wrap{
  height: 100%;
  background-color: #fff;
  border-left: solid 1px #e6e6e6;
  .account-head{
    height: 50px;
    line-height: 50px;
    padding-left: 10px;
    color: #606266;
    font-size: 18px;
    font-weight: 600;
    background-color: #ececec;
    border-bottom: 1px solid #d1d1d1;
  }
  .account-list{
    .list-item{
      height: 46px;
      display: flex;
      align-items: center;
      padding: 0 6px;
      border-bottom: 1px solid #d1d1d1;
      cursor: pointer;
      .item-avatar{
        width: 36px;
        height: 36px;
        @include bg-icon;
        border-radius: 50%;
      }
      .item-username{
        margin-left: 4px;
      }
    }
  }
}
</style>
