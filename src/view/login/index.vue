<style lang="less">
  @import './index.less';
</style>

<template>
  <div class="login">
    <div class="login-box">
      <div class="login-con">
        <Card icon="log-in" :bordered="false" dis-hover>
          <div class="login-header">
            <div class="title">您好！</div>
            <div class="sub">欢迎登录<span>XXX后台系统</span></div>
          </div>
          <div class="form-con">
            <Form ref="loginForm" :model="form" :rules="rules" @keydown.enter.native="handleSubmit">
              <FormItem prop="userName">
                <Input v-model="form.userName" placeholder="请输入用户名">
              <span slot="prepend">
                <Icon :size="16" type="ios-person"></Icon>
              </span>
                </Input>
              </FormItem>
              <FormItem prop="password">
                <Input type="password" v-model="form.password" placeholder="请输入密码">
              <span slot="prepend">
                <Icon :size="14" type="md-lock"></Icon>
              </span>
                </Input>
              </FormItem>
              <FormItem>
                <Button @click="handleSubmit" type="primary" shape="circle" :loading="loginLoading">登录</Button>
              </FormItem>
            </Form>
          </div>
        </Card>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions } from 'vuex'
export default {
  data () {
    return {
      loginLoading: false,
      form: {
        userName: '',
        password: ''
      },
      rules: {
        userName: [{ required: true, message: '账号不能为空', trigger: 'blur' }],
        password: [{ required: true, message: '密码不能为空', trigger: 'blur' }]
      }
    }
  },
  methods: {
    ...mapActions([
      'handleLogin',
      'getUserInfo'
    ]),
    handleSubmit () {
      let _this = this
      _this.loginLoading = true
      _this.$refs.loginForm.validate((valid) => {
        if (valid) {
          _this.handleLogin(_this.form).then(res => {
            _this.getUserInfo().then(res => {
              _this.loginLoading = false
              _this.$router.push({
                name: _this.$config.homeName
              })
            })
            _this.loginLoading = false
          }).catch(() => {
            _this.loginLoading = false
          })
        } else {
          _this.loginLoading = false
        }
      })
    }
  },
  created () {}
}
</script>
