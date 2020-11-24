<template>
  <div class="chat-view-wrap">
    <div class="chat-view-head">
      <div class="view-head-back">
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
      <div class="view-head-info"></div>
    </div>
  </div>
</template>

<script>

export default {
  name: 'chat-view',
  data () {
    return {
      roomInfo: {
        name: '测试房间',
        num: '房间人数',
        type: 0
      }
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

  }
}
</script>

<style lang="scss">
.chat-view-wrap{

}
</style>
