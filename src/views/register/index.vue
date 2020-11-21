<template>
  <div class="register-wrap">
    <div class="register-container">
      <div class="title-wrap">
        <span class="title-text">快速注册</span>
      </div>
      <div class="form-wrap">
        <el-form class="register-form" ref="registerForm" :rules="rules" :model="form">
          <el-form-item prop="username">
            <el-input v-model="form.username" prefix-icon="el-icon-user" placeholder="请输入用户名"></el-input>
          </el-form-item>
          <el-form-item prop="password">
            <el-input v-model="form.password" prefix-icon="el-icon-lock" placeholder="请输入密码" type="password"
              @keyup.enter.native="register" show-password></el-input>
          </el-form-item>
          <div class="register-btn-wrap">
            <el-button class="register-btn" type="success" :disabled="!enableRegister" @click="register">快速注册</el-button>
          </div>
          <div class="register-foot">
            <div class="register-protocol">
              <span class="protocol-text">
                注册即表明同意
                <router-link to="#">《服务协议》</router-link>
              </span>
            </div>
            <third-part-login/>
            <div class="foot-menu">
              <router-link to="/login">直接登录</router-link>
              <span class="divider"></span>
              <router-link to="#" @click.native="showTips">遇到问题</router-link>
            </div>
          </div>
        </el-form>
      </div>
    </div>
  </div>
</template>

<script>
import thirdPartLogin from '@/components/third-part-login/index.vue'

export default {
  name: 'register',
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
    enableRegister () {
      return this.form.username.length && this.form.password.length
    }
  },
  mounted () {
  },
  beforeDestroy () {
    this.closeMessage()
  },
  methods: {
    // 点击快速注册
    register () {
      this.$refs.registerForm.validate(async valid => {
        if (valid) {
          const { username, password } = this.form
          try {
            const { data } = await this.$request({
              url: '/api/register',
              method: 'post',
              data: {
                username,
                password: this.$md5(password)
              }
            })
            const duration = 2000
            const messageId = this.$message({
              type: 'success',
              message: `注册成功,您的用户名为 ${data},即将前往登录页面`,
              duration
            })
            setTimeout(() => {
              this.$router.push({
                name: 'login',
                params: {
                  username: data
                }
              })
              messageId.close()
            }, duration)
          } catch (error) {
            console.log('error: ', error)
          }
        } else {
          this.$message.warning('输入的信息有误，请仔细核对')
          return false
        }
      })
    },
    // 点击 遇到问题
    showTips () {
      this.closeMessage()
      this.messageId = this.$message({
        type: 'info',
        showClose: true,
        duration: 0,
        message: '请联系邮箱313200064@qq.com'
      })
    },
    // 关闭弹窗
    closeMessage () {
      this.messageId && this.messageId.close()
      this.messageId = null
    }
  }
}
</script>

<style lang="scss">
.register-wrap{
  height: 100%;
  background-color: rgb(250, 250, 250);
  @include flex-center;
  .register-container{
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
      .register-btn{
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
      .register-protocol{
        margin-top: 8px;
        font-size: 14px;
        color: #8c8c8c;
        text-align: center;
      }
    }
  }
}
</style>
