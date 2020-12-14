<template>
  <div class="account-wrap">
    <div class="account-head">
      <span class="head-text">当前在线列表({{list.length}})</span>
    </div>
    <div class="account-list">
      <div class="list-wrap">
        <template v-for="(item, index) in list">
          <div class="list-item" :key="item.userId" @click="goUserDetail(index)">
            <div class="item-avatar" :style="{'background-image':`url(${item.avatar})`}"></div>
            <div class="item-username">{{item.username}}</div>
          </div>
        </template>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

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
    ...mapGetters(['user'])
  },
  created () {
    this.init()
  },
  mounted () {
  },
  beforeDestroy () {
    // 在销毁之前要取消监听 防止重复监听
    this.$socket.removeAllListeners('login-success')
    this.$socket.removeAllListeners('exit')
  },
  methods: {
    // 初始化
    init () {
      const that = this
      this.$socket.on('login-success', () => {
        console.log('socket 登录成功')
        that.getOnlineUser()
      })
      this.$socket.on('exit', () => {
        console.log('socket 退出成功')
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
        console.log('获取当前在线的用户信息时发生了错误', error)
      }
    },
    // 查看用户详细信息
    goUserDetail (index) {
      const { userId } = this.list[index]
      // 避免跳转到相同路由
      // const path = userId === this.user.userId ? '/home/my' : `/home/user/${userId}`
      const path = `/home/user/${userId}`
      path !== this.$route.path && this.$router.push(path)
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
        font-weight: 600;
        color: rgba(0,0,0,.5);
        margin-left: 10px;
      }
    }
  }
}
</style>
