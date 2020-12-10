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
    <div class="chat-view-message" :class="{'isEdit':isEdit}">
      <div class="chat-list" ref="chatList">
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
                  <div class="item-avatar" :style="{'background-image':`url(${item.avatar})`}" @click="goUserDetail(item.userId)"></div>
                </div>
              </div>
            </template>
            <template v-else-if="item.userId === 'system'">
              <!-- 系统发出的消息 -->
              <div class="item-wrap system">
                <span class="message-text">{{item.message}}</span>
              </div>
            </template>
            <template v-else>
              <!-- 其他用户发出的消息 -->
              <div class="item-wrap other">
                <div class="item-info">
                  <div class="info-time">{{item.time}}</div>
                  <div class="info-username">{{item.username}}</div>
                </div>
                <div class="message-wrap">
                  <div class="item-avatar" :style="{'background-image':`url(${item.avatar})`}" @click="goUserDetail(item.userId)"></div>
                  <div class="item-message">
                    <div class="message-container">
                      <span class="message-text">{{item.message}}</span>
                    </div>
                    <div class="message-angle"></div>
                  </div>
                </div>
              </div>
            </template>
          </div>
        </template>
      </div>
    </div>
    <div class="chat-view-reply" :class="{'isEdit':isEdit}">
      <div class="reply-wrap">
        <div class="arrow-wrap">
          <div class="arrow-icon" @click="toggleEdit"></div>
          <div class="arrow-mask"></div>
        </div>
        <div class="input-wrap">
          <div class="input-media">
            <div class="media-item">
              <emoji @chooseEmoji="chooseEmoji"/>
            </div>
            <div class="media-item">
              <photo @choosePhoto="choosePhoto"/>
            </div>
            <div class="media-item">
              <money/>
            </div>
            <div class="media-item">
              <help/>
            </div>
          </div>
          <div class="input-container">
            <div class="input-data">
              <el-input
                type="textarea"
                :autosize="{ minRows: 1, maxRows: 4}"
                placeholder="请输入内容"
                v-model="reply.message">
              </el-input>
            </div>
            <div class="input-btn">
              <el-button size="mini" type="success" @click="sendMessage">发送</el-button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import dayjs from 'dayjs'
import { mapGetters } from 'vuex'
import emoji from './components/emoji/index.vue'
import photo from './components/photo/index.vue'
import money from './components/money/index.vue'
import help from './components/help/index.vue'

export default {
  name: 'chat-view',
  data () {
    return {
      isEdit: true,
      roomInfo: {
        name: '测试房间',
        num: 6,
        avatar: '',
        type: 0 // 0-群聊 1-单聊
      },
      messageList: [
        // {
        //   roomId: this.getRoomId,
        //   time: dayjs().format('YYYY-MM-DD HH:mm:ss'),
        //   img: '', // messageType 为 1 的时候才有值
        //   message: '测试消息',
        //   messageId: 'ddda',
        //   messageType: 0, // 0-文字 1-图片
        //   userId: 'rvnaro6puro0',
        //   type: 0, // 0-群聊 1-单聊
        //   avatar: '//s3.qiufengh.com/avatar/15.jpeg',
        //   username: 'asdas'
        // },
        // {
        //   roomId: this.getRoomId,
        //   time: dayjs().format('YYYY-MM-DD HH:mm:ss'),
        //   img: '', // messageType 为 1 的时候才有值
        //   message: '测试消息1',
        //   messageId: 'ddds',
        //   messageType: 0, // 0-文字 1-图片
        //   userId: 'rj9n15ckrk00',
        //   type: 0, // 0-群聊 1-单聊
        //   avatar: '//s3.qiufengh.com/avatar/16.jpeg',
        //   username: 'sdfgdfg'
        // },
        // {
        //   roomId: this.getRoomId,
        //   time: dayjs().format('YYYY-MM-DD HH:mm:ss'),
        //   img: '', // messageType 为 1 的时候才有值
        //   message: '这是系统消息~',
        //   messageId: 'dddsadsda',
        //   messageType: 0, // 0-文字 1-图片
        //   userId: 'rj9n15ckrk00',
        //   type: 0, // 0-群聊 1-单聊
        //   avatar: '//s3.qiufengh.com/avatar/13.jpeg',
        //   username: 'system'
        // },
        // {
        //   roomId: this.getRoomId,
        //   time: dayjs().format('YYYY-MM-DD HH:mm:ss'),
        //   img: '', // messageType 为 1 的时候才有值
        //   message: '测试消息2',
        //   messageId: 'dddf',
        //   messageType: 0, // 0-文字 1-图片
        //   userId: 'rj9n15ckrk00',
        //   type: 0, // 0-群聊 1-单聊
        //   avatar: '//s3.qiufengh.com/avatar/17.jpeg',
        //   username: 'sdfgsdgfd'
        // },
        // {
        //   roomId: this.getRoomId,
        //   time: dayjs().format('YYYY-MM-DD HH:mm:ss'),
        //   img: '', // messageType 为 1 的时候才有值
        //   message: '测试消息3',
        //   messageId: 'ddd',
        //   messageType: 0, // 0-文字 1-图片
        //   userId: 'ne7ih98gqf40',
        //   type: 0, // 0-群聊 1-单聊
        //   avatar: '//s3.qiufengh.com/avatar/18.jpeg',
        //   username: 'cvcvb'
        // },
        // {
        //   roomId: this.getRoomId,
        //   time: dayjs().format('YYYY-MM-DD HH:mm:ss'),
        //   img: '', // messageType 为 1 的时候才有值
        //   message: '测试消息',
        //   messageId: 'dddasdsada',
        //   messageType: 0, // 0-文字 1-图片
        //   userId: 'rvnaro6puro0',
        //   type: 0, // 0-群聊 1-单聊
        //   avatar: '//s3.qiufengh.com/avatar/15.jpeg',
        //   username: 'asdas'
        // },
        // {
        //   roomId: this.getRoomId,
        //   time: dayjs().format('YYYY-MM-DD HH:mm:ss'),
        //   img: '', // messageType 为 1 的时候才有值
        //   message: '测试消息1',
        //   messageId: 'dddasdasds',
        //   messageType: 0, // 0-文字 1-图片
        //   userId: 'sadasd',
        //   type: 0, // 0-群聊 1-单聊
        //   avatar: '//s3.qiufengh.com/avatar/16.jpeg',
        //   username: 'sdfgdfg'
        // },
        // {
        //   roomId: this.getRoomId,
        //   time: dayjs().format('YYYY-MM-DD HH:mm:ss'),
        //   img: '', // messageType 为 1 的时候才有值
        //   message: '这是系统消息~',
        //   messageId: 'dddsasdasdaadsda',
        //   messageType: 0, // 0-文字 1-图片
        //   userId: 'system',
        //   type: 0, // 0-群聊 1-单聊
        //   avatar: '//s3.qiufengh.com/avatar/13.jpeg',
        //   username: 'system'
        // },
        // {
        //   roomId: this.getRoomId,
        //   time: dayjs().format('YYYY-MM-DD HH:mm:ss'),
        //   img: '', // messageType 为 1 的时候才有值
        //   message: '测试消息2',
        //   messageId: 'dddfasdasd',
        //   messageType: 0, // 0-文字 1-图片
        //   userId: 'sadasd',
        //   type: 0, // 0-群聊 1-单聊
        //   avatar: '//s3.qiufengh.com/avatar/17.jpeg',
        //   username: 'sdfgsdgfd'
        // },
        // {
        //   roomId: this.getRoomId,
        //   time: dayjs().format('YYYY-MM-DD HH:mm:ss'),
        //   img: '', // messageType 为 1 的时候才有值
        //   message: '测试消息3',
        //   messageId: 'dasdasddasdasdd',
        //   messageType: 0, // 0-文字 1-图片
        //   userId: 'sadasd',
        //   type: 0, // 0-群聊 1-单聊
        //   avatar: '//s3.qiufengh.com/avatar/18.jpeg',
        //   username: 'cvcvb'
        // },
        // {
        //   roomId: this.getRoomId,
        //   time: dayjs().format('YYYY-MM-DD HH:mm:ss'),
        //   img: '', // messageType 为 1 的时候才有值
        //   message: '这是系统消息~',
        //   messageId: 'dddsxzcasdasdaadsda',
        //   messageType: 0, // 0-文字 1-图片
        //   userId: 'system',
        //   type: 0, // 0-群聊 1-单聊
        //   avatar: '//s3.qiufengh.com/avatar/13.jpeg',
        //   username: 'system'
        // },
        // {
        //   roomId: this.getRoomId,
        //   time: dayjs().format('YYYY-MM-DD HH:mm:ss'),
        //   img: '', // messageType 为 1 的时候才有值
        //   message: '测试消息2',
        //   messageId: 'dddfzxcasdasd',
        //   messageType: 0, // 0-文字 1-图片
        //   userId: 'sadasd',
        //   type: 0, // 0-群聊 1-单聊
        //   avatar: '//s3.qiufengh.com/avatar/17.jpeg',
        //   username: 'sdfgsdgfd'
        // }
      ],
      reply: {
        message: '',
        socketId: ''
      }
    }
  },
  components: {
    emoji,
    photo,
    money,
    help
  },
  computed: {
    getRoomId () {
      return this.$route.params.roomId
    },
    ...mapGetters(['user'])
  },
  created () {
    console.log(this.getRoomId)
    this.getRoomInfo()
    this.getMessage()
    this.getMsg()
  },
  mounted () {
  },
  beforeDestroy () {
    // 在销毁之前要取消监听 防止重复监听
    this.$socket.removeAllListeners('broadcast')
  },
  methods: {
    // 获取当前房间信息
    getRoomInfo () {
      const { name, type, avatar } = this.$route.query
      this.roomInfo.name = name
      this.roomInfo.type = +type
      this.roomInfo.avatar = avatar
    },
    // 返回
    back () {
      this.$router.go(-1)
    },
    // 查看聊天详情
    showDetail () {
      const { name, avatar } = this.roomInfo
      this.$router.push({
        name: 'chat-detail',
        query: {
          name,
          avatar
        }
      })
    },
    // 选择了表情
    chooseEmoji (value) {
      this.reply.message += value
    },
    // 选择了照片
    choosePhoto (value) {
      console.log(value)
    },
    // 接收聊天消息
    getMsg () {
      const { $socket, $refs, reply, roomInfo, user } = this
      const that = this
      // 告诉服务器加入的聊天室类型 群聊 或者 单聊
      const message = {
        roomId: '',
        time: '',
        img: '', // messageType 为 1 的时候才有值
        message: '',
        messageType: 0, // 0-文字 1-图片
        userId: user.username,
        type: roomInfo.type, // 0-群聊 1-单聊
        avatar: '',
        username: user.username
      }
      $socket.emit('joinRoom', message)
      // 接收聊天消息
      $socket.on('broadcast', data => {
        console.log($socket.id)
        if (reply.socketId === $socket.id) {
          // 如果接收到了自己发的消息 说明消息发送成功 清空
          reply.message = ''
        }
        // 忽略空消息
        if (!data.message) return
        that.messageList.push({
          ...data,
          time: dayjs(+data.time).format('YYYY-MM-DD HH:mm:ss')
        })
        that.$nextTick(() => {
          const { clientHeight, scrollHeight } = $refs.chatList
          // 有新消息 滚动条强制触底
          $refs.chatList.scrollTop = scrollHeight - clientHeight
        })
      })
    },
    // 点击发送
    sendMessage () {
      console.log('发送')
      const { reply, getRoomId, roomInfo, user, $socket } = this
      const { userId, avatar, username } = user
      if (!reply.message) {
        this.$message.warning('不能发送空消息!')
        return
      }
      reply.socketId = $socket.id
      const message = {
        roomId: getRoomId,
        time: +new Date(),
        img: '', // messageType 为 1 的时候才有值
        message: reply.message,
        messageType: 0, // 0-文字 1-图片
        userId,
        type: roomInfo.type, // 0-群聊 1-单聊
        avatar,
        username
      }
      $socket.emit('message', message)
    },
    // 切换编辑状态
    toggleEdit () {
      this.isEdit = !this.isEdit
    },
    // 查看用户详细信息
    goUserDetail (userId) {
      console.log('userId: ', userId)
      this.$router.push(`/home/user/${userId}`)
    },
    // 获取聊天信息
    async getMessage () {
      try {
        const { data } = await this.$request({
          url: '/api/getMessage',
          params: {
            roomId: this.getRoomId
          }
        })
        console.log('data: ', data)
        this.messageList = data.map(item => {
          return {
            ...item,
            time: dayjs(+item.time).format('YYYY-MM-DD HH:mm:ss')
          }
        })
      } catch (error) {
        console.log(error)
      }
    }
  }
}
</script>

<style lang="scss">
$headHeight:48px;
$commonShadow:0 0 3px #d1d1d1;
$replyHeight:100px;

.chat-view-wrap{
  height: 100%;
  position: relative;
  overflow: hidden;
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
    &.isEdit{
      height: calc(100% - #{$headHeight + $replyHeight});
    }
    .chat-list{
      height: 100%;
      overflow: auto;
      padding: 0px 10px;
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
        .message-angle{
          right: -15px;
          border: 8px solid #52b95f;
          border-right-color: transparent;
          border-top-color: transparent;
          border-bottom-color: transparent;
        }
      }
      &.system{
        align-items: center;
        height: 60px;
        line-height: 60px;
        text-align: center;
        color: #949494;
      }
      &.other{
        align-items: flex-start;
        .message-container{
          background-color: #fff;
        }
        .message-text{
          color: #666;
        }
        .message-angle{
          left: -15px;
          border: 8px solid #fff;
          border-left-color: transparent;
          border-top-color: transparent;
          border-bottom-color: transparent;
        }
      }
    }
    .item-info{
      @include flex-between;
      color: #666;
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
        border-radius: 10px;
        background-color: #52b95f;
        color: #fff;
        .message-text{
          margin: 12px;
        }
      }
      .message-angle{
        position: absolute;
        top: 50%;
        transform: translate(0, -50%);
      }
    }
    .item-avatar{
      width: 40px;
      height: 40px;
      margin: 12px;
      @include bg-icon;
      border-radius: 5px;
      cursor: pointer;
    }
  }
  .chat-view-reply{
    position: absolute;
    bottom: 0;
    width: 100%;
    height: $replyHeight;
    @include card-mode;
    box-shadow: $commonShadow;
    transform: translateY(90px);
    transition: transform .3s cubic-bezier(.9,0,.3,.7),-webkit-transform .3s cubic-bezier(.9,0,.3,.7);
    &.isEdit{
      transform: translateY(0);
      .arrow-icon{
        transform:rotate(0deg) !important;
      }
    }
    .reply-wrap{
      position: relative;
      height: 100%;
    }
    .arrow-wrap{
      position: absolute;
      top: -24px;
      width: 100%;
      display: flex;
      justify-content: center;
      .arrow-icon{
        width: 60px;
        height: 24px;
        background-image: url('~@/assets/chat/view/arrow.svg');
        @include bg-icon;
        background-size: 40%;
        background-color: #fff;
        border-radius: 3px;
        transform:rotate(180deg);
        cursor: pointer;
        box-shadow: $commonShadow;
      }
      .arrow-mask{
        position: absolute;
        z-index: 1;
        top: 20px;
        left: 50%;
        width: 60px;
        height: 10px;
        background-color: #fff;
        transform: translateX(-50%);
      }
    }
    .input-wrap{
      display: flex;
      flex-direction: column;
      align-items: center;
      height: 100%;
      overflow: auto;
      padding: 10px;
      .input-media{
        width: 100%;
        height: 30px;
        display: flex;
        align-items: center;
      }
      .media-item{
        @include flex-center;
        width: 24px;
        height: 24px;
        margin-right: 6px;
        cursor: pointer;
      }
      .input-container{
        @include flex-between;
        width: 100%;
        margin-top: 10px;
      }
      .input-data{
        width: 100%;
        margin-right: 10px;
      }
    }
  }
}
</style>
