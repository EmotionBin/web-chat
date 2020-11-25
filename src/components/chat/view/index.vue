<template>
  <div class="chat-view-wrap">
    <div class="chat-view-head">
      <div class="view-head-back" @click="back">
        <i class="el-icon-arrow-left"></i>
      </div>
      <div class="view-head-title">
        <template v-if="!roomInfo.type">
          {{roomInfo.name}}({{roomInfo.num}})
        </template>
        <template v-else>
          {{roomInfo.name}}
        </template>
      </div>
      <div class="view-head-info" @click="showDetail">
        <i class="el-icon-more"></i>
      </div>
    </div>
  </div>
</template>

<script>
import dayjs from 'dayjs'

export default {
  name: 'chat-view',
  data () {
    return {
      roomInfo: {
        name: '测试房间',
        num: 6,
        type: 0
      },
      messageList: [
        {
          roomId: this.getRoomId,
          time: dayjs().format('YYYY-MM-DD HH:mm:ss'),
          img: '', // messageType 为 1 的时候才有值
          message: '测试消息',
          messageId: 'ddd',
          messageType: 0, // 0-文字 1-图片
          userId: 'sadasd',
          type: 0, // 0-群聊 1-单聊
          avatar: '//s3.qiufengh.com/avatar/15.jpeg',
          username: 'asdas'
        },
        {
          roomId: this.getRoomId,
          time: dayjs().format('YYYY-MM-DD HH:mm:ss'),
          img: '', // messageType 为 1 的时候才有值
          message: '测试消息1',
          messageId: 'ddd',
          messageType: 0, // 0-文字 1-图片
          userId: 'sadasd',
          type: 0, // 0-群聊 1-单聊
          avatar: '//s3.qiufengh.com/avatar/16.jpeg',
          username: 'sdfgdfg'
        },
        {
          roomId: this.getRoomId,
          time: dayjs().format('YYYY-MM-DD HH:mm:ss'),
          img: '', // messageType 为 1 的时候才有值
          message: '测试消息2',
          messageId: 'ddd',
          messageType: 0, // 0-文字 1-图片
          userId: 'sadasd',
          type: 0, // 0-群聊 1-单聊
          avatar: '//s3.qiufengh.com/avatar/17.jpeg',
          username: 'sdfgsdgfd'
        },
        {
          roomId: this.getRoomId,
          time: dayjs().format('YYYY-MM-DD HH:mm:ss'),
          img: '', // messageType 为 1 的时候才有值
          message: '测试消息3',
          messageId: 'ddd',
          messageType: 0, // 0-文字 1-图片
          userId: 'sadasd',
          type: 0, // 0-群聊 1-单聊
          avatar: '//s3.qiufengh.com/avatar/18.jpeg',
          username: 'cvcvb'
        }
      ]
    }
  },
  components: {
  },
  computed: {
    getRoomId () {
      return this.$route.params.roomId
    }
  },
  created () {
    console.log(this.getRoomId)
  },
  mounted () {
  },
  beforeDestroy () {
  },
  methods: {
    // 返回
    back () {
      this.$router.push({
        name: 'chat-index'
      })
    },
    // 查看聊天详情
    showDetail () {
      this.$router.push({
        name: 'chat-detail'
      })
    }
  }
}
</script>

<style lang="scss">
.chat-view-wrap{
  height: 100%;
  .chat-view-head{
    height: 48px;
    color: #fff;
    background-color: #1890ff;
    @include flex-between;
    padding: 0 10px;
    .view-head-title{
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
}
</style>
