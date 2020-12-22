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
            <el-button class="login-btn" type="success" :disabled="!enableLogin" @click="login">登录</el-button>
          </div>
          <div class="login-foot">
            <third-part-login/>
            <div class="foot-menu">
              <router-link to="/register">快速注册</router-link>
              <span class="divider"></span>
              <router-link to="#" @click.native="showTips">邮箱登录</router-link>
              <span class="divider"></span>
              <router-link to="#" @click.native="showTips">找回密码</router-link>
            </div>
          </div>
        </el-form>
      </div>
    </div>
  </div>
</template>

<script>
import socket from '@/utils/socket'
import thirdPartLogin from '@/components/third-part-login/index.vue'
import { mapMutations } from 'vuex'

export default {
  name: 'login',
  props: {
    username: {
      type: String,
      default: ''
    }
  },
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
  components: {
    thirdPartLogin
  },
  computed: {
    enableLogin () {
      return this.form.username.length && this.form.password.length
    }
  },
  created () {
    this.getUserInfo()
    this.createSocket()
  },
  mounted () {
  },
  beforeDestroy () {
    // 在销毁之前要取消监听 防止重复监听
    this.$socket.removeAllListeners('wx-login')
  },
  methods: {
    ...mapMutations('user', [
      'updateUser'
    ]),
    // 初始化 socket 建立 socket 连接
    createSocket () {
      if (!this.$socket) socket.init()
      this.$socket.on('wx-login', this.loginSuccess)
    },
    // 获取用户信息
    getUserInfo () {
      this.username && (this.form.username = this.username)
    },
    // 点击登录
    login () {
      this.$refs.loginForm.validate(async valid => {
        if (valid) {
          const { username, password } = this.form
          try {
            const { data } = await this.$request({
              url: '/api/login',
              method: 'post',
              data: {
                username,
                password: this.$md5(password)
              }
            })
            this.loginSuccess(data)
          } catch (error) {
            console.log('登录时发生了错误', error)
          }
        } else {
          this.$message.warning('输入的信息有误，请仔细核对')
          return false
        }
      })
    },
    // 登录成功
    loginSuccess (data) {
      console.log('data: ', data)
      this.$message.success('登录成功')
      // 写入 token
      localStorage.setItem('uuid', data.uuid)
      // vuex 写入用户信息
      this.updateUser(data.userInfo)
      // 登录成功进行重定向 若没有重定向参数 默认进入首页
      this.$router.replace(this.$route.query.redirect || '/home')
    },
    // 点击 邮箱登录 快速注册
    showTips () {
      this.$message.info('该功能暂未开放，敬请期待')
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
      margin: 20px 0;
      @include flex-center;
      .title-text{
        font-size: 26px;
        color: #262626;
      }
    }
    .form-wrap{
      .login-btn{
        width: 100%;
        span{
          font-size: 18px;
          letter-spacing: 4px;
        }
      }
      .foot-menu{
        margin-top: 10px;
        @include flex-center;
      }
      .divider{
        display: inline-block;
        width: 1px;
        height: 14px;
        vertical-align: middle;
        margin: 0 8px;
        background-color: #e8e8e8;
      }
    }
  }
}
</style>
