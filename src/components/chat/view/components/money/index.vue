<template>
  <div class="money-wrap" @click="payMe">
    💰
  </div>
</template>

<script>
import bus from '@/utils/bus'

export default {
  name: 'money',
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
    // 请我和咖啡
    payMe () {
      bus.$emit('pay-me')
    }
  }
}
</script>

<style lang="scss">
.money-wrap{

}
</style>
