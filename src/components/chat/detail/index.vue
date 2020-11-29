<template>
  <div class="chat-detail-wrap">
    <div class="chat-detail-head">
      <div class="detail-head-back" @click="back">
        <i class="el-icon-arrow-left"></i>
      </div>
      <div class="detail-head-title">
        <template v-if="!getType">
          群聊信息
        </template>
        <template v-else>
          聊天信息{{getType}}
        </template>
      </div>
    </div>
    <div class="chat-detail-body">
      <div class="avatar-wrap">
        <template v-for="item in avatarList">
          <div :key="item.id" class="avatar-item" :style="{'background-image':`url(${item.avatar})`}"></div>
        </template>
      </div>
      <div class="info-wrap">
        <div class="info-title">声音开启设置</div>
        <template v-for="item in setList">
          <div :key="item.title" class="info-item">
            <div class="item-name">{{item.title}}</div>
            <el-switch
              v-model="item.active"
              active-color="#52b95f">
            </el-switch>
          </div>
        </template>
      </div>
    </div>
  </div>
</template>

<script>

export default {
  name: 'chat-detail',
  data () {
    return {
      avatarList: [
        {
          id: 'asfasf',
          avatar: '//s3.qiufengh.com/avatar/212.jpeg'
        }
      ],
      setList: [
        {
          title: '事件和提醒',
          active: false
        },
        {
          title: '电话',
          active: false
        },
        {
          title: '信息',
          active: false
        },
        {
          title: '以上功能都暂未开启~',
          active: true
        }
      ]
    }
  },
  components: {
  },
  computed: {
    getRoomId () {
      return this.$route.params.roomId
    },
    getType () {
      return +this.$route.query.type
    },
    getName () {
      return this.$route.query.name
    }
  },
  created () {
    console.log(this.getRoomId)
    console.log(this.getType)
    console.log(this.getName)
  },
  mounted () {
  },
  beforeDestroy () {
  },
  methods: {
    // 后退
    back () {
      this.$router.go(-1)
    }
  }
}
</script>

<style lang="scss">
$boxShadow: 0 0 3px #d1d1d1;

.chat-detail-wrap{
  height: 100%;
  .chat-detail-head{
    position: relative;
    height: $headHeight;
    color: #fff;
    background-color: #1890ff;
    @include flex-between;
    padding: 0 10px;
    .detail-head-title{
      position: absolute;
      left: 50%;
      transform: translate(-50%, 0);
      font-size: 18px;
      font-weight: 600;
    }
    .detail-head-back{
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
  .chat-detail-body{
    .avatar-wrap{
      display: flex;
      align-items: center;
      padding: 4px 10px;
      background-color: #fff;
      box-shadow: $boxShadow;
      .avatar-item{
        width: 40px;
        height: 40px;
        margin: 4px;
        @include bg-icon;
        border-radius: 5px;
        cursor: pointer;
      }
    }
    .info-wrap{
      margin-top: 10px;
      padding: 10px 0;
      background-color: #fff;
      box-shadow: $boxShadow;
      .info-title{
        padding: 0 10px;
        margin: 10px 0 20px 0;
        color: rgba(0,0,0,.54);
        font-size: 14px;
      }
      .info-item{
        padding: 15px 10px;
        @include flex-between;
        cursor: pointer;
        &:hover{
          background-color: rgba(0, 0, 0, .1);
        }
      }
    }
  }
}
</style>
