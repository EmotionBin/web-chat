<template>
  <div class="chat-view-wrap">
    这是聊天面板
  </div>
</template>

<script>

export default {
  name: 'chat-view',
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
.chat-view-wrap{

}
</style>
