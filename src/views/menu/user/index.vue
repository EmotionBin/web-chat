<template>
  <div class="user-wrap">
    这是用户信息面板
  </div>
</template>

<script>

export default {
  name: 'user',
  data () {
    return {

    }
  },
  components: {
  },
  computed: {
    getUserId () {
      return this.$route.params.id
    }
  },
  created () {
    console.log(this.getUserId)
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
.user-wrap{

}
</style>
