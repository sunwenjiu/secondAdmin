<template>
  <div ref="dom"></div>
</template>

<script>
import echarts from 'echarts'
import { on, off } from '@/libs/tools'
export default {
  name: 'serviceRequests',
  props: {
    value: Array
  },
  watch: {
    value: {
      handler (newVal, oldVal) {
        if (this.dom != null) {
          if (newVal) {
            this.chartExpampleShow(newVal)
          } else {
            this.chartExpampleShow(oldVal)
          }
        } else {
          this.dom = echarts.init(this.$refs.dom)
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
    chartExpampleShow (value) {
      const option = {
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'cross',
            label: {
              backgroundColor: '#6a7985'
            }
          }
        },
        grid: {
          top: '3%',
          left: '1.2%',
          right: '1%',
          bottom: '3%',
          containLabel: true
        },
        xAxis: [
          {
            type: 'category',
            boundaryGap: false,
            data: ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月']
            // data: key
          }
        ],
        yAxis: [
          {
            type: 'value'
          }
        ],
        series: value
        //   [
        //   {
        //     name: 'A级事件',
        //     type: 'line',
        //     stack: '总量',
        //     // areaStyle: { normal: {
        //     //   color: '#2d8cf0'
        //     // } },
        //     data: [120, 132, 101, 134, 90, 230, 210, 234, 569, 678, 876, 234]
        //   },
        //   {
        //     name: 'B级事件',
        //     type: 'line',
        //     stack: '总量',
        //     // areaStyle: { normal: {
        //     //   color: '#10A6FF'
        //     // } },
        //     data: [257, 358, 278, 234, 290, 330, 310, 234, 279, 678, 876, 234]
        //   },
        //   {
        //     name: 'C级事件',
        //     type: 'line',
        //     stack: '总量',
        //     // areaStyle: { normal: {
        //     //   color: '#0C17A6'
        //     // } },
        //     data: [379, 268, 354, 269, 310, 256, 208, 234, 380, 109, 268, 108]
        //   },
        //   {
        //     name: 'D级事件',
        //     type: 'line',
        //     stack: '总量',
        //     // areaStyle: { normal: {
        //     //   color: '#4608A6'
        //     // } },
        //     data: [320, 332, 301, 334, 390, 330, 320, 234, 345, 108, 280, 201]
        //   },
        //   {
        //     name: 'E级事件',
        //     type: 'line',
        //     stack: '总量',
        //     // label: {
        //     //   normal: {
        //     //     show: true,
        //     //     position: 'top'
        //     //   }
        //     // },
        //     // areaStyle: { normal: {
        //     //   color: '#398DBF'
        //     // } },
        //     data: [820, 645, 546, 745, 872, 624, 258, 178, 95, 46, 245, 105]
        //   },
        //   {
        //     name: 'F级事件',
        //     type: 'line',
        //     stack: '总量',
        //     // areaStyle: { normal: {
        //     //   color: '#4608A6'
        //     // } },
        //     data: [320, 332, 301, 334, 390, 330, 320, 234, 345, 108, 280, 201]
        //   },
        // ]
      }
      this.dom.setOption(option)
      on(window, 'resize', this.resize)
    }
  },
  mounted () {
    this.$nextTick(() => {
      this.dom = echarts.init(this.$refs.dom)
      this.chartExpampleShow(this.value)
    })
  },
  beforeDestroy () {
    off(window, 'resize', this.resize)
  }
}
</script>
