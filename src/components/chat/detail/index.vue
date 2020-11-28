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
          聊天信息
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

    }
  },
  components: {
  },
  computed: {
    getRoomId () {
      return this.$route.params.roomId
    },
    getType () {
      return this.$route.query.type
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
}
</style>
