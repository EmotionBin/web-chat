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
    <div class="chat-view-message">
      <div class="chat-list">
        <template v-for="item in messageList">
          <div class="list-item" :key="item.messageId">
            <template v-if="user.userId === item.userId">
              <!-- 当前用户发出的消息 -->
              <div class="item-wrap current">
                <div class="item-info">
                  <div class="info-time">{{item.time}}</div>
                  <div class="info-username">{{item.username}}</div>
                </div>
                <div class="message-wrap">
                  <div class="item-message">
                    <div class="message-container">
                      <span class="message-text">{{item.message}}</span>
                    </div>
                    <div class="message-angle"></div>
                  </div>
                  <div class="item-avatar" :style="{'background-image':`url(${item.avatar})`}"></div>
                </div>
              </div>
            </template>
            <template v-else-if="item.userId === 'system'">
              <!-- 系统发出的消息 -->
              <div class="item-wrap system">
                系统
              </div>
            </template>
            <template v-else>
              <!-- 其他用户发出的消息 -->
              <div class="item-wrap other">
                其他用户
              </div>
            </template>
          </div>
        </template>
      </div>
    </div>
    <div class="chat-view-control">

    </div>
  </div>
</template>

<script>
import dayjs from 'dayjs'
import { mapGetters } from 'vuex'

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
          messageId: 'ddda',
          messageType: 0, // 0-文字 1-图片
          userId: 'rvnaro6puro0',
          type: 0, // 0-群聊 1-单聊
          avatar: '//s3.qiufengh.com/avatar/15.jpeg',
          username: 'asdas'
        },
        {
          roomId: this.getRoomId,
          time: dayjs().format('YYYY-MM-DD HH:mm:ss'),
          img: '', // messageType 为 1 的时候才有值
          message: '测试消息1',
          messageId: 'ddds',
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
          messageId: 'dddf',
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
    },
    ...mapGetters(['user'])
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
$headHeight:48px;

.chat-view-wrap{
  height: 100%;
  .chat-view-head{
    height: $headHeight;
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
  .chat-view-message{
    height: calc(100% - #{$headHeight});
    .chat-list{
      height: 100%;
      overflow: auto;
    }
    .list-item{
      margin: 4px 0;
    }
    .item-wrap{
      display: flex;
      justify-content: center;
      flex-direction: column;
      &.current{
        align-items: flex-end;
      }
      &.system{
        align-items: center;
      }
      &.other{
        align-items: flex-start;
      }
    }
    .item-info{
      @include flex-between;
      color: #313035;
      .info-time{
        margin-right: 30px;
      }
    }
    .message-wrap{
      display: flex;
      align-items: center;
    }
    .item-message{
      position: relative;
      .message-container{
        @include flex-center;
        @include card-mode;
        background-color: #52b95f;
        color: #fff;
        .message-text{
          margin: 12px;
        }
      }
      .message-angle{
        position: absolute;
        right: -15px;
        top: 50%;
        transform: translate(0, -50%);
        border: 8px solid #52b95f;
        border-right-color: transparent;
        border-top-color: transparent;
        border-bottom-color: transparent;
      }
    }
    .item-avatar{
      width: 36px;
      height: 36px;
      margin: 12px;
      @include bg-icon;
      border-radius: 5px;
    }
  }
}
</style>
