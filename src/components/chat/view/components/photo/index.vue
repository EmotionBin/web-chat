<template>
  <div class="photo-wrap">
    <label class="text-wrap" for="inputFile">
        📷
    </label>
    <input id="inputFile" type='file' multiple='mutiple' accept="image/gif,image/jpeg,image/png,image/webp,image/jpg;capture=camera" style="display: none" @change="choosePhoto">
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
    choosePhoto (event) {
      const file = event.target.files[0]
      const reader = new FileReader()
      reader.readAsDataURL(file)
      reader.onload = () => {
        const limitSize = 1024 * 500
        // 对大于 500KB 的图片进行压缩
        file.size >= limitSize ? this.imageCompress(reader.result) : this.transformImage(reader.result)
      }
    },
    // 进行图片压缩
    imageCompress (base64) {
      const image = new Image()
      image.src = base64
      image.onload = () => {
        const canvas = document.createElement('canvas')
        const ctx = canvas.getContext('2d')
        canvas.width = 400
        canvas.height = 300
        ctx.drawImage(image, 0, 0, 400, 300)
        // 第一个参数是mimeType，第二个参数是压缩质量
        // https://developer.mozilla.org/zh-CN/docs/Web/API/HTMLCanvasElement/toDataURL
        const imageDataURL = canvas.toDataURL('image/png', 0.8)
        this.transformImage(imageDataURL)
      }
    },
    // 传递压缩后的图片
    transformImage (image) {
      this.$emit('choosePhoto', image)
    }
  }
}
</script>

<style lang="scss">
.photo-wrap{
  .text-wrap{
    cursor: pointer;
  }
}
</style>
