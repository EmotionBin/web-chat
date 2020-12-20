<template>
  <div class="user-wrap">
    <div class="user-view-head">
      <div class="view-head-back" @click="back">
        <i class="el-icon-arrow-left"></i>
      </div>
      <div class="view-head-title">
        {{userInfo.username}}
      </div>
    </div>
    <div class="user-body-wrap">
      <div class="body-background">
        <div class="avatar-background" :style="{'background-image':`url(${userInfo.avatar})`}"></div>
        <div class="avatar-wrap" :style="{'background-image':`url(${userInfo.avatar})`}"></div>
        <div class="username">{{userInfo.username}}</div>
      </div>
      <div class="body-userinfo">
        <template v-for="item in userInfo1">
          <div class="list-item" :key="item.title">
            <div class="item-title">{{item.title}}</div>
            <div class="item-value">{{item.value}}</div>
          </div>
        </template>
      </div>
    </div>
    <!-- 自己不能和自己发起聊天 -->
    <div class="user-footer-wrap" v-if="getUserId !== user.userId">
      <el-button class="footer-btn" type="success" @click="startChat">发起聊天</el-button>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'user',
  data () {
    return {
      userInfo: {
        username: '',
        userId: '',
        avatar: ''
      },
      userInfo1: [
        {
          title: '地区',
          value: '中国'
        },
        {
          title: '性别',
          value: '？'
        },
        {
          title: '电话',
          value: '12563154782'
        },
        {
          title: '签名',
          value: '冲就完事了嗷'
        }
      ]
    }
  },
  components: {
  },
  computed: {
    getUserId () {
      return this.$route.params.userId
    },
    ...mapGetters(['user'])
  },
  watch: {
    getUserId (userId) {
      console.log('userId: ', userId)
      this.getUserInfo()
    }
  },
  created () {
    console.log(this.getUserId)
    this.getUserInfo()
  },
  mounted () {
  },
  beforeDestroy () {
  },
  methods: {
    // 获取用户信息
    async getUserInfo () {
      try {
        const { data } = await this.$request({
          url: '/api/getUser',
          params: {
            userId: this.getUserId
          }
        })
        console.log('data: ', data)
        const { avatar, userId, username } = data
        this.userInfo.avatar = avatar
        this.userInfo.userId = userId
        this.userInfo.username = username
      } catch (error) {
        console.log('获取用户信息发生了错误', error)
      }
    },
    // 发起聊天
    startChat () {
      const { username, userId, avatar } = this.userInfo
      // 两位用户中 userID 大的排在前面 id 统一化
      const roomId = this.user.userId > userId ? `${this.user.userId}${userId}` : `${userId}${this.user.userId}`
      this.$router.push({
        path: `/home/chat/view/${roomId}`,
        query: {
          name: username,
          type: 1,
          avatar: window.encodeURIComponent(avatar)
        }
      })
    },
    // 返回
    back () {
      this.$router.go(-1)
    }
  }
}
</script>

<style lang="scss">
$headHeight:48px;

.user-wrap{
  height: 100%;
  overflow: auto;
  .user-view-head{
    height: $headHeight;
    color: #fff;
    background-color: #1890ff;
    @include flex-between;
    padding: 0 10px;
    .view-head-title{
      position: absolute;
      left: 50%;
      transform: translate(-50%, 0);
      font-size: 18px;
      font-weight: 600;
    }
    .view-head-back,
    .view-head-info{
      width: 36px;
      height: 36px;
      @include flex-center;
      border-radius: 50%;
      cursor: pointer;
      &:hover{
        background-color: rgba(255, 255, 255, .12);
      }
    }
  }
  .user-body-wrap{
    .body-background{
      position: relative;
      height: 300px;
      @include flex-center;
      flex-direction: column;
      overflow: hidden;
      .avatar-background{
        position: absolute;
        left: 0;
        top: 0;
        right: 0;
        bottom: 0;
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
    .body-userinfo{
      margin: 10px 0;
      background-color: #fff;
      box-shadow: 0 0 3px #d1d1d1;
      .list-item{
        @include flex-between;
        color: #666;
        padding: 10px;
      }
    }
  }
  .user-footer-wrap{
    margin-top: 10px;
    .footer-btn{
      width: 100%;
      font-size: 18px;
      font-weight: 600;
    }
  }
}
</style>
