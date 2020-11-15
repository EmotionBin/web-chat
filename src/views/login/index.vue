<template>
  <div class="login-wrap">
    <div class="login-container">
      <div class="title-wrap">
        <span class="title-text">登录</span>
      </div>
      <div class="form-wrap">
        <el-form class="login-form" ref="loginForm" :rules="rules" :model="form">
          <el-form-item prop="username">
            <el-input v-model="form.username" prefix-icon="el-icon-user" placeholder="请输入用户名"></el-input>
          </el-form-item>
          <el-form-item prop="password">
            <el-input v-model="form.password" prefix-icon="el-icon-lock" placeholder="请输入密码" type="password"
              @keyup.enter.native="login" show-password></el-input>
          </el-form-item>
          <div class="login-btn-wrap">
            <el-button class="login-btn" type="success"  @click="login">登录</el-button>
          </div>
        </el-form>
      </div>
    </div>
  </div>
</template>

<script>

export default {
  name: 'login',
  data () {
    return {
      form: {
        username: '',
        password: ''
      },
      rules: {
        username: [
          { required: true, message: '请输入用户名', trigger: 'blur' },
          { min: 3, max: 16, message: '长度在 3 到 16 个字符', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' },
          { min: 3, max: 16, message: '长度在 3 到 16 个字符', trigger: 'blur' }
        ]
      }
    }
  },
  mounted () {
  },
  beforeDestroy () {
  },
  methods: {
    // 点击登录
    login () {
      console.log('登录')
    }
  }
}
</script>

<style lang="scss">
.login-wrap{
  height: 100%;
  background-color: rgb(250, 250, 250);
  @include flex-center;
  .login-container{
    width: 400px;
    background-color: #fff;
    padding: 20px;
    @include card-mode;
    .title-wrap{
      height: 50px;
      @include flex-center;
      .title-text{
        font-size: 20px;
        color: #262626;
      }
    }
  }
  .login-btn{
    width: 100%;
    span{
      font-size: 18px;
      letter-spacing: 4px;
    }
  }
}
</style>
