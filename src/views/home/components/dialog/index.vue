<template>
  <div class="dialog-wrap">
    <el-dialog
    width="100%"
    top="0"
    :visible.sync="dialogVisible"
    @close="closeDialog">
      <div class="image-conatiner" @click="closeDialog" v-loading="loading" element-loading-background="rgba(0, 0, 0, 0)">
        <img class="image-wrap" :src="data.image">
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
      loading: false
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
      this.imageLoading()
    },
    // 请我喝咖啡
    payMe () {
      this.dialogVisible = true
      this.data.image = this.payImage
      this.imageLoading()
    },
    // 图片加载动画
    imageLoading () {
      this.loading = true
      const image = new Image()
      image.src = this.data.image
      image.onload = () => {
        console.log('图片加载完成')
        this.loading = false
      }
    },
    // 关闭弹窗
    closeDialog () {
      this.dialogVisible = false
      this.data.image = ''
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
    // el-loading icon
    .el-loading-spinner .path{
      stroke: #fff;
    }
  }
  .image-wrap{
    max-width: 100%;
    max-height: 100%;
    display: block;
    position: absolute;
    left: 0;
    top: 0;
    bottom: 0;
    right: 0;
    margin: auto;
  }
}
</style>
