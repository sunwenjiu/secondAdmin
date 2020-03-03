<template>
    <div :class="classes" :style="styles" @click="back">
        <slot>
            <div :class="innerClasses">
                <i class="ivu-icon ivu-icon-ios-arrow-up"></i>
            </div>
        </slot>
    </div>
</template>
<script>
import { scrollTop } from '@/libs/util'
import { on, off } from '@/libs/tools'
const prefixCls = 'ivu-back-top'

export default {
  name: 'ABackTop',
  props: {
    height: {
      type: Number,
      default: 400
    },
    bottom: {
      type: Number,
      default: 30
    },
    right: {
      type: Number,
      default: 30
    },
    duration: {
      type: Number,
      default: 1000
    },
    container: {
      type: null,
      default: window
    }
  },
  data () {
    return {
      backTop: false
    }
  },
  mounted () {
    // window.addEventListener('scroll', this.handleScroll, false)
    // window.addEventListener('resize', this.handleScroll, false)
    on(this.containerEle, 'scroll', this.handleScroll)
    on(this.containerEle, 'resize', this.handleScroll)
    // WebSocket连接
    let userId = this.$store.state.user.userId
    /* if ('WebSocket' in window) {
      this.websocket = new WebSocket(this.webSocketUrl + userId)
      this.initWebSocket()
    } else {
      alert('当前浏览器 Not support websocket')
    } */
  },
  beforeDestroy () {
    // window.removeEventListener('scroll', this.handleScroll, false)
    // window.removeEventListener('resize', this.handleScroll, false)
    off(this.containerEle, 'scroll', this.handleScroll)
    off(this.containerEle, 'resize', this.handleScroll)
    // WebSocket连接销毁
    // this.onbeforeunload()
  },
  computed: {
    classes () {
      return [
        `${prefixCls}`,
        {
          [`${prefixCls}-show`]: this.backTop
        }
      ]
    },
    styles () {
      return {
        bottom: `${this.bottom}px`,
        right: `${this.right}px`
      }
    },
    innerClasses () {
      return `${prefixCls}-inner`
    },
    containerEle () {
      return this.container === window ? window : document.querySelector(this.container)
    }
  },
  methods: {
    handleScroll () {
      this.backTop = this.containerEle.scrollTop >= this.height
    },
    back () {
      let target = typeof this.container === 'string' ? this.containerEle : (document.documentElement || document.body)
      const sTop = target.scrollTop
      scrollTop(this.containerEle, sTop, 0, this.duration)
      this.$emit('on-click')
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
     // alert(event.data)
      // this.$Message.info('您新增一条待办事件，请您及时处理。')
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
