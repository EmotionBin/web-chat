<template>
  <div class="chat-detail-wrap">
    这是聊天详情页
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
.chat-detail-wrap{

}
</style>
