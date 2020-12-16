<template>
  <div class="dialog-wrap">
    <el-dialog
    width="80%"
    top="0"
    :visible.sync="dialogVisible"
    @close="closeDialog">
      <div class="image-conatiner" @click="closeDialog">
        <div :class="['image-wrap', isPayMe ? 'payMe' : '']" :style="{'background-image':`url(${data.image})`}"></div>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import bus from '@/utils/bus'
import payImage from '@/assets/dialog/pay.png'

export default {
  name: 'custom-dialog',
  data () {
    return {
      dialogVisible: false,
      data: {
        image: ''
      },
      payImage,
      isPayMe: false
    }
  },
  components: {
  },
  computed: {
  },
  watch: {
  },
  created () {
    this.init()
  },
  mounted () {
  },
  beforeDestroy () {
  },
  methods: {
    // 初始化 监听事件
    init () {
      bus.$on('showBigImage', this.showBigImage)
      bus.$on('payMe', this.payMe)
    },
    // 查看大图
    showBigImage (value) {
      this.dialogVisible = true
      this.data.image = value
    },
    // 请我喝咖啡
    payMe () {
      this.dialogVisible = true
      this.isPayMe = true
      this.data.image = this.payImage
    },
    // 关闭弹窗
    closeDialog () {
      this.dialogVisible = false
      setTimeout(() => {
        this.isPayMe = false
      }, 1000)
    }
  }
}
</script>

<style lang="scss">
.dialog-wrap{
  .el-dialog{
    height: 100%;
    margin: 0 auto;
    background: transparent;
    box-shadow: none;
    .el-dialog__header{
      display: none;
    }
    .el-dialog__body{
      height: 100%;
      padding: 0;
    }
  }
  .image-conatiner{
    width: 100%;
    height: 100%;
    @include flex-center;
  }
  .image-wrap{
    width: 100%;
    height: 100%;
    @include bg-icon;
    background-size: contain;
    &.payMe{
      width: 300px;
    }
  }
}
</style>
