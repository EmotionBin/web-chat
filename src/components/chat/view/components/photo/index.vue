<template>
  <div class="photo-wrap">
    📷
  </div>
</template>

<script>

export default {
  name: 'photo',
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
    // 选择了图片
    choosePhoto (value) {
      this.$emit('choosePhoto', value)
    }
  }
}
</script>

<style lang="scss">
.photo-wrap{

}
</style>
