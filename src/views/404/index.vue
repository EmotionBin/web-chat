<template>
  <div class="page-wrap">
    <p class="page-title">404 page not found</p>
    <el-button @click="$router.replace({ path: '/' })">
      返回首页
    </el-button>
  </div>
</template>

<style lang="scss" scoped>
.page-wrap {
  background: #303133;
  background-blend-mode: multiply,multiply;
  height: 100%;
  @include flex-center;
  flex-direction: column;
  .page-title {
    font-size: 20px;
    color: #FFF;
  }
}
</style>
