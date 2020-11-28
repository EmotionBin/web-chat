<template>
  <div class="emoji-wrap">
    <!-- 这里的样式会写在 '@/styles/element/element-ui.scss' 下 -->
    <el-popover
      popper-class="emoji-el-popover"
      placement="top"
      trigger="click">
      <div class="emoji-list" v-for="(value, index) in emojiList" :key="index" @click="chooseEmoji(value)">{{value}}</div>
      <div slot="reference">😃</div>
    </el-popover>
  </div>
</template>

<script>

export default {
  name: 'emoji',
  data () {
    return {
      emojiList: ['😃', '😆', '😊', '😅', '😒', '😕', '😢']
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
    // 选择了表情
    chooseEmoji (value) {
      this.$emit('chooseEmoji', value)
    }
  }
}
</script>

<style lang="scss">
.emoji-wrap{

}
</style>
