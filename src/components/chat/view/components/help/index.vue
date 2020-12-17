<template>
  <div class="help-wrap" @click="help">
    ❓
  </div>
</template>

<script>

export default {
  name: 'help',
  data () {
    return {

    }
  },
  components: {
  },
  computed: {

  },
  created () {

  },
  mounted () {
  },
  beforeDestroy () {
  },
  methods: {
    // 需要帮助
    help () {
      const message = `
      <strong>
        <span>需要帮助?</span>
        <a href="https://github.com/EmotionBin" target="_blank">github传送门</a>
      </strong>
      `
      this.messageId = this.$message({
        showClose: true,
        dangerouslyUseHTMLString: true,
        message,
        duration: 0
      })
    }
  }
}
</script>

<style lang="scss">
.help-wrap{

}
</style>
