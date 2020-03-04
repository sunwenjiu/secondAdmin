<template>
  <Form ref="loginForm" class="super-form-style" :model="form" :rules="rules" @keydown.enter.native="handleSubmit">
    <FormItem prop="userName">
      <p class="user-input-title">用户账号：</p>
      <Input class="super-input-style" v-model="form.userName" placeholder="请输入用户名">
        <span slot="prepend">
          <img style="width: 22px" src="../../assets/images/ico3.png"/>
        </span>
      </Input>
    </FormItem>
    <FormItem prop="password">
      <p class="user-input-title">用户密码：</p>
      <Input class="super-input-style" type="password" v-model="form.password" placeholder="请输入密码">
        <span slot="prepend">
          <img style="width: 22px" src="../../assets/images/ico4.png"/>
        </span>
      </Input>
      <div style="float: right;margin-right: 70px">
        <!--<Checkbox>勾选记住用户名和密码</Checkbox>-->
      </div>
    </FormItem>
    <FormItem style="margin-bottom: 10px !important;">
      <Button class="super-login-btn" @click="handleSubmit" type="primary" long>登录</Button>
    </FormItem>
  </Form>
</template>
<script>
export default {
  name: 'LoginForm',
  props: {
    userNameRules: {
      type: Array,
      default: () => {
        return [
          { required: true, message: '账号不能为空', trigger: 'blur' }
        ]
      }
    },
    passwordRules: {
      type: Array,
      default: () => {
        return [
          { required: true, message: '密码不能为空', trigger: 'blur' }
        ]
      }
    }
  },
  data () {
    return {
      form: {
        userName: 'admin',
        password: ''
      }
    }
  },
  computed: {
    rules () {
      return {
        userName: this.userNameRules,
        password: this.passwordRules
      }
    }
  },
  methods: {
    handleSubmit () {
      this.$refs.loginForm.validate((valid) => {
        if (valid) {
          this.$emit('on-success-valid', {
            userName: this.form.userName,
            password: this.form.password
          })
        }
      })
    }
  }
}
</script>
<style>
  .super-login-btn{
    width: 340px;
    height: 50px;
    font-size: 18px;
    margin-left: 80px;
    font-family: 微软雅黑;
    letter-spacing:8px;
    margin-top: 10px;
  }
  .user-input-title{
    margin-left: 80px;
    font-size: 10px;
    line-height: 14px;
  }

    .ivu-input-group-prepend:focus{
      background-color: #ddf1f5 !important;
      border: none;
    }
    .super-form-style .ivu-form-item{
      margin-bottom:30px;
    }
    .super-form-style .ivu-form-item-error-tip{
      margin-left: 80px;
    }
    .ivu-input-group-prepend{
      background-color: #ddf1f5 !important;
      border: none !important;
      height: 45px;
    }
    .super-input-style .ivu-input:focus{
      background-color: #ddf1f5 !important;
      border: none;
      box-shadow: none;
    }
   .super-input-style .ivu-input{
        background-color: #ddf1f5 !important;
        border: 0;
        height: 45px;
   }
   .super-input-style{
         width: 340px;
         margin: 0 auto;
   }
</style>
