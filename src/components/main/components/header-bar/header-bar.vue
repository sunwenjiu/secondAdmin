<template>
  <div class="header-bar">
    <sider-trigger :collapsed="collapsed" icon="md-menu" @on-change="handleCollpasedChange"></sider-trigger>
    <custom-bread-crumb show-icon style="margin-left: 30px;" :list="breadCrumbList"></custom-bread-crumb>
    <div class="custom-content-con">
      <slot></slot>
    </div>

  </div>
</template>
<script>
  import siderTrigger from './sider-trigger'
  import customBreadCrumb from './custom-bread-crumb'
  import './header-bar.less'
  import { mapActions, mapState } from 'vuex'
  export default {
    name: 'HeaderBar',
    /* data () {
       return {
         clientId:'admin',
         clientName:''
       }
     }, */
    components: {
      siderTrigger,
      customBreadCrumb
    },
    props: {
      collapsed: Boolean
    },
    computed: {
      breadCrumbList () {
        return this.$store.state.app.breadCrumbList
      },
      ...mapState({
        userId: state => state.user.userId,
        userName: state => state.user.userName

      })
    },
    mounted () {
      // WebSocket
      if ('WebSocket' in window) {
        this.websocket = new WebSocket(this.webSocketUrl + this.userId)
        this.initWebSocket()
      } else {
        alert('当前浏览器 Not support websocket')
      }
    },
    beforeDestroy () {
      this.onbeforeunload()
    },
    methods: {
      ...mapActions([
        'getUnreadMessageCount',
        'getMessageList'

      ]),
      handleCollpasedChange (state) {
        this.$emit('on-coll-change', state)
      },

      // --------- websocket相关---------
      initWebSocket () {
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

        // console.log('服务端返回：' )
        // console.log( event.data)
        // 消息提示
        // this.$Message.success("您有新的消息，请及时处理")

        this.$Message.warning({
          content: event.data,
          duration: 10
        })
        // 发送请求得到新的未读消息
        this.getMessageList()
        this.getUnreadMessageCount()
        // alert(event.data)
      },
      setOncloseMessage () {
        console.log('WebSocket连接关闭    状态码：' + this.websocket.readyState)
      },
      onbeforeunload () {
        this.closeWebSocket()
      },
      closeWebSocket () {
        this.websocket.close()
      }
      // --------- websocket相关end---------
    }
  }
</script>
