<template>
  <div>
    <iframe ref="iframe" id="bdIframe" frameborder=0 name="showHere" scrolling=auto :src="iframUrl">
    </iframe>
  </div>
</template>

<script>
export default {
  name: 'adverse-desginadd',
  data () {
    return {
      iframUrl: ''
    }
  },
  created () {
    this.load()
  },
  mounted () {
    const oIframe = document.getElementById('bdIframe')
    const deviceWidth = document.documentElement.clientWidth
    const deviceHeight = document.documentElement.clientHeight
    oIframe.style.width = (Number(deviceWidth) - 220) + 'px' // 数字是页面布局宽度差值
    oIframe.style.height = (Number(deviceHeight) - 120) + 'px' // 数字是页面布局高度差
    this.load()
  },
  methods: {
    load () {
      let baseUrl = process.env.NODE_ENV === 'development' ? this.$config.baseUrl.dev : this.$config.baseUrl.pro
      this.iframUrl = baseUrl + 'activiti/create'
    }
  }
}
</script>

<style scoped>

</style>
