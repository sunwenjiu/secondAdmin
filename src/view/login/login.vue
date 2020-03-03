
<style lang="less">
  @import './login.less';

</style>

<template>
  <div class="loginBox">
    <div class="login-title-box">
         <img src="../../assets/images/logo1.png"/>
    </div>
    <div class="login">
      <div class="login-box">
        <div class="login-box-middle">
          <div class="login-left">
               <div class="login-left-text">
                     <h1>不良事件上报/管理</h1>
                     <p>上报、管理、统计、事件分析，通过直观的图表分析对事件原因、过程、结果一目了然。</p>
               </div>
               <img class="login-left-ico" src="../../assets/images/ico.png"/>
          </div>
          <div class="login-con" >
            <div class="login-con-title">
                  <div class="login-con-title-img">
                       <img style="width: 45px" src="../../assets/images/ico2.png"/>
                  </div>
                  <div class="login-con-title-text">
                       <h1>管理系统后台登录</h1>
                       <p>Management System Background Login</p>
                  </div>
            </div>
                <login-form @on-success-valid="handleSubmit"></login-form>
                <p style="text-align: center" class="login-tip">忘记密码？<a herf="#" style="text-decoration: underline">点击找回密码</a></p>
          </div>
        </div>
        <div class="login-box-bottom">
          <p>滇ICP备15007158号&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;地址:云南省昆明市青年路176号&nbsp;&nbsp;&nbsp;&nbsp;邮政编码:650021 </p>
        </div>
      </div>
    </div>
  </div>

</template>

<script>
import LoginForm from '_c/login-form'
import { mapActions } from 'vuex'
export default {
  components: {
    LoginForm
  },
  data () {
    return {
      clientId: 'admin'
    }
  },
  mounted () {
    // WebSocket
    /* if ('WebSocket' in window) {
      this.websocket = new WebSocket(this.webSocketUrl + this.clientId)
      this.initWebSocket()
    } else {
      alert('当前浏览器 Not support websocket')
    } */
  },
  beforeDestroy () {
    // this.onbeforeunload()
  },
  methods: {

    ...mapActions([
      'handleLogin',
      'getUserInfo'
    ]),
    handleSubmit ({ userName, password }) {
        this.handleLogin({ userName, password }).then(res => { //eslint-disable-line
        let aa = this.$store.state.user.loginCode
        if (aa === 0) {
          this.getUserInfo().then(res => {
            this.$router.push({
              name: this.$config.homeName
            })
          })
        } else {
          this.$Message.error('用户名和密码错误，请重新输入！')
        }
      })
    },
    // 测试axios的使用
    text () {
      let reequest = {
        aa: '',
        bb: ''
      }
      this.axios.get('roles/text1', { params: reequest }).then((res) => {
          if (res.data.code === 0) { //eslint-disable-line
          alert(JSON.stringify(res.data.data))
        }
      }).catch((e) => {
        console.log(e)
      })
    }

    // --------- websocket相关---------
    /* initWebSocket () {
      // 连接错误
      this.websocket.onerror = this.setErrorMessage

      // 连接成功
      this.websocket.onopen = this.setOnopenMessage

      // 收到消息的回调
      this.websocket.onmessage = this.setOnmessageMessage

      // 连接关闭的回调
      this.websocket.onclose = this.setOncloseMessage

      // 监听窗口关闭事件，当窗口关闭时，主动去关闭websocket连接，防止连接还没断开就关闭窗口，server端会抛异常。
      window.onbeforeunload = this.onbeforeunload
    },
    setErrorMessage () {
      console.log('WebSocket连接发生错误   状态码：' + this.websocket.readyState)
    },
    setOnopenMessage () {
      console.log('WebSocket连接成功    状态码：' + this.websocket.readyState)
    },
    setOnmessageMessage (event) {
      // 根据服务器推送的消息做自己的业务处理
      console.log('服务端返回：' + event.data)
      alert(event.data)
    },
    setOncloseMessage () {
      console.log('WebSocket连接关闭    状态码：' + this.websocket.readyState)
    },
    onbeforeunload () {
      this.closeWebSocket()
    },
    closeWebSocket () {
      this.websocket.close()
    } */

  }
}
</script>

<style>

</style>
