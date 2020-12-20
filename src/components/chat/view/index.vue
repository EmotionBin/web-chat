<template>
  <div class="chat-view-wrap">
    <div class="chat-view-head">
      <div class="view-head-back" @click="back">
        <i class="el-icon-arrow-left"></i>
      </div>
      <div class="view-head-title">
        {{roomInfo.name}}
      </div>
      <div class="view-head-info" @click="showDetail">
        <i class="el-icon-more"></i>
      </div>
    </div>
    <div class="chat-view-message" :class="{'isEdit':isEdit}">
      <div class="chat-list" ref="chatList" @scroll="this.scrollToTop">
        <div class="loading-wrap" v-show="isLoading">
          <i class="el-icon-loading"></i>
        </div>
        <template v-for="item in messageList">
          <div class="list-item" :key="item.messageId">
            <template v-if="item.userId === 'system'">
              <!-- 系统发出的消息 -->
              <div class="item-wrap system">
                <span class="message-text">{{item.message}}</span>
              </div>
            </template>
            <template v-else>
              <div :class="['item-wrap', user.userId === item.userId ? 'current' : 'other']">
                <div class="item-info">
                  <div class="info-time">{{item.time}}</div>
                  <div class="info-username">{{item.username}}</div>
                </div>
                <div class="message-wrap">
                  <template v-if="user.userId !== item.userId">
                    <div class="item-avatar" :style="{'background-image':`url(${item.avatar})`}" @click="goUserDetail(item.userId)"></div>
                  </template>
                  <div class="item-message">
                    <div class="message-container">
                      <template v-if="item.messageType === 0">
                        <span class="message-text">{{item.message}}</span>
                      </template>
                      <template v-else>
                        <div class="message-img" :style="dynamicImageSize(item.img)" @click="showImage(item.img)"></div>
                      </template>
                    </div>
                    <div class="message-angle"></div>
                  </div>
                  <template v-if="user.userId === item.userId">
                    <div class="item-avatar" :style="{'background-image':`url(${item.avatar})`}" @click="goUserDetail(item.userId)"></div>
                  </template>
                </div>
              </div>
            </template>
          </div>
        </template>
      </div>
    </div>
    <div class="chat-view-reply" :class="{'isEdit':isEdit}">
      <div class="reply-wrap">
        <div class="arrow-wrap" v-show="false">
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
                maxlength="30"
                show-word-limit
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
import bus from '@/utils/bus'
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
        name: '',
        avatar: '',
        type: 0, // 0-群聊 1-单聊
        roomId: ''
      },
      messageList: [],
      reply: {
        message: '',
        socketId: ''
      },
      isLoading: false,
      isFirstJoin: true
    }
  },
  components: {
    emoji,
    photo,
    money,
    help
  },
  computed: {
    ...mapGetters(['user'])
  },
  created () {
    this.getRoomInfo()
    this.getMessage()
    this.getMsg()
    this.toggleRoom(0)
    window.addEventListener('beforeunload', this.beforeunload)
  },
  mounted () {
  },
  beforeDestroy () {
    this.toggleRoom(1)
    // 在销毁之前要取消监听 防止重复监听
    this.$socket.removeAllListeners('broadcast')
    window.removeEventListener('beforeunload', this.beforeunload)
  },
  methods: {
    // 关闭前的回调
    beforeunload () {
      this.toggleRoom(1)
    },
    // 获取当前房间信息
    getRoomInfo () {
      const { name, type, avatar } = this.$route.query
      this.roomInfo.name = name
      this.roomInfo.type = +type
      this.roomInfo.avatar = avatar
      this.roomInfo.roomId = this.$route.params.roomId
    },
    // 加入或离开房间 flag = 0 加入房间 flag = 1 离开房间
    toggleRoom (flag) {
      const message = {
        roomId: this.roomInfo.roomId,
        time: '',
        img: '', // messageType 为 1 的时候才有值
        message: '',
        messageType: 0, // 0-文字 1-图片
        userId: this.user.userId,
        type: this.roomInfo.type, // 0-群聊 1-单聊
        avatar: '',
        username: this.user.username
      }
      const eventName = flag ? 'leaveRoom' : 'joinRoom'
      // 离开聊天室
      this.$socket.emit(eventName, message)
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
      const { roomInfo, user, $socket } = this
      const { userId, avatar, username } = user
      const message = {
        roomId: roomInfo.roomId,
        time: +new Date(),
        img: value, // messageType 为 1 的时候才有值
        message: '',
        messageType: 1, // 0-文字 1-图片
        userId,
        type: roomInfo.type, // 0-群聊 1-单聊
        avatar,
        username
      }
      $socket.emit('message', message)
    },
    // 点击查看图片大图
    showImage (image) {
      bus.$emit('showBigImage', image)
    },
    // 动态生成图片宽高
    dynamicImageSize (image) {
      const imageData = this.$utils.dynamicImageSize(image)
      return {
        width: `${imageData.width}px`,
        height: `${imageData.height}px`,
        'background-image': `url(${image})`
      }
    },
    // 接收聊天消息
    getMsg () {
      const { $socket, reply } = this
      const that = this
      // 接收聊天消息
      $socket.on('broadcast', data => {
        console.log($socket.id)
        if (reply.socketId === $socket.id) {
          // 如果接收到了自己发的消息 说明消息发送成功 清空
          reply.message = ''
        }
        that.messageList.push({
          ...data,
          time: dayjs(+data.time).format('YYYY-MM-DD HH:mm:ss')
        })
        that.scrollToBottom()
      })
    },
    // 点击发送
    sendMessage () {
      console.log('发送')
      const { reply, roomInfo, user, $socket } = this
      const { userId, avatar, username } = user
      if (!reply.message) {
        this.$message.warning('不能发送空消息!')
        return
      }
      reply.socketId = $socket.id
      const message = {
        roomId: roomInfo.roomId,
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
            roomId: this.roomInfo.roomId,
            messageId: this.messageList[0] ? this.messageList[0].messageId : ''
          }
        })
        console.log('data: ', data)
        const messageInfo = data.map(item => {
          return {
            ...item,
            time: dayjs(+item.time).format('YYYY-MM-DD HH:mm:ss')
          }
        })
        this.messageList.unshift(...messageInfo)
        // 只有第一次进入的时候会执行 滚动到底部 查看最新消息
        if (this.isFirstJoin) {
          this.isFirstJoin = false
          this.scrollToBottom()
        }
      } catch (error) {
        console.log('获取聊天信息发生了错误', error)
      }
    },
    // 滚动条滚动到顶部
    async scrollToTop () {
      const { scrollTop } = this.$refs.chatList
      if (scrollTop === 0) {
        console.log('滚动收到了顶部')
        // 强制更改滚动条距离 否则滚动条会一直在顶部
        this.$refs.chatList.scrollTop = 1
        if (this.isLoading) {
          // 在加载数据的时候不做判断 否则会造成请求容易 必要时可以用防抖处理
          return
        }
        this.isLoading = true
        await this.getMessage()
        this.isLoading = false
      }
    },
    // 滚动条自动触底
    scrollToBottom () {
      this.$nextTick(() => {
        const { clientHeight, scrollHeight } = this.$refs.chatList
        this.$refs.chatList.scrollTop = scrollHeight - clientHeight
      })
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
      position: relative;
      height: 100%;
      overflow-x: hidden;
      overflow-y: auto;
      padding: 0px 10px;
    }
    .loading-wrap{
      position: absolute;
      top: 0;
      width: 100%;
      @include flex-center;
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
        height: 30px;
        line-height: 30px;
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
        .message-img{
          margin: 12px;
          @include bg-icon;
          cursor: zoom-in;
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
