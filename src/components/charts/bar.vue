<template>
  <div ref="dom" class="charts chart-bar"></div>
</template>

<script>
import echarts from 'echarts'
import tdTheme from './theme.json'
import { on, off } from '@/libs/tools'
echarts.registerTheme('tdTheme', tdTheme)
export default {
  name: 'ChartBar',
  props: {
    value: Object,
    text: String,
    subtext: String
  },
  watch: {
    value: {
      handler (newVal, oldVal) {
        if (this.dom != null) {
          if (newVal) {
            this.chartBarShow(newVal)
          } else {
            this.chartBarShow(oldVal)
          }
        } else {
          this.dom = echarts.init(this.$refs.dom, 'tdTheme')
        }
      },
      deep: true
    }
  },
  data () {
    return {
      dom: null
    }
  },
  methods: {
    resize () {
      this.dom.resize()
    },
    chartBarShow (value) {
      let xAxisData = Object.keys(value)
      let seriesData = Object.values(value)
      let option = {
        title: {
          text: this.text,
          subtext: this.subtext,
          x: 'center'
        },
        xAxis: {
          type: 'category',
          data: xAxisData
        },
        yAxis: {
          type: 'value'
        },
        series: [{
          data: seriesData,
          type: 'bar'
        }]
      }
      this.dom.setOption(option)
      on(window, 'resize', this.resize)
    }
  },
  mounted () {
    this.$nextTick(() => {
      this.dom = echarts.init(this.$refs.dom, 'tdTheme')
      this.chartBarShow(this.value)
    })
  },
  beforeDestroy () {
    off(window, 'resize', this.resize)
  }
}
</script>
