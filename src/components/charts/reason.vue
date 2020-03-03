<template>
  <div ref="dom" class="charts chart-pie"></div>
</template>

<script>
import echarts from 'echarts'
import tdTheme from './theme.json'
import { on, off } from '@/libs/tools'
echarts.registerTheme('tdTheme', tdTheme)
export default {
  name: 'ResaonChart',
  props: {
    value: Object,
    text: String
  },
  watch: {
    // 观察组件value的变化
    value: {
      handler (newVal, oldVal) {
        if (this.dom != null) {
          if (newVal) {
            this.option = {
              title: {
                text: this.text,
                x: 'center'
              },
              tooltip: {
                trigger: 'item',
                triggerOn: 'mousemove'
              },
              series: [{
                data: [newVal],
                type: 'tree',
                top: '10%',
                left: '7%',
                bottom: '10%',
                right: '20%',

                symbolSize: 12,
                label: {
                  normal: {
                    position: 'left',
                    verticalAlign: 'middle',
                    align: 'right',
                    fontSize: 16
                  }
                },

                leaves: {
                  label: {
                    normal: {
                      position: 'right',
                      verticalAlign: 'middle',
                      align: 'left'
                    }
                  }
                },
                expandAndCollapse: true,
                animationDuration: 550,
                animationDurationUpdate: 750
              }]
            }
            this.chartShow(this.option)
          } else {
            this.option = {
              title: {
                text: this.text,
                x: 'center'
              },
              tooltip: {
                trigger: 'item',
                triggerOn: 'mousemove'
              },
              series: [{
                data: [oldVal],
                type: 'tree',
                top: '10%',
                left: '7%',
                bottom: '10%',
                right: '20%',

                symbolSize: 12,
                label: {
                  normal: {
                    position: 'left',
                    verticalAlign: 'middle',
                    align: 'right',
                    fontSize: 16
                  }
                },

                leaves: {
                  label: {
                    normal: {
                      position: 'right',
                      verticalAlign: 'middle',
                      align: 'left'
                    }
                  }
                },
                expandAndCollapse: true,
                animationDuration: 550,
                animationDurationUpdate: 750
              }]
            }
            this.chartShow(this.option)
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
      dom: null,
      // echart 数据渲染对象
      option: {
        title: {
          text: this.text,
          x: 'center'
        },
        tooltip: {
          trigger: 'item',
          triggerOn: 'mousemove'
        },
        series: [{
          data: [this.value],
          type: 'tree',
          top: '10%',
          left: '7%',
          bottom: '10%',
          right: '20%',

          symbolSize: 12,
          label: {
            normal: {
              position: 'left',
              verticalAlign: 'middle',
              align: 'right',
              fontSize: 16
            }
          },

          leaves: {
            label: {
              normal: {
                position: 'right',
                verticalAlign: 'middle',
                align: 'left'
              }
            }
          },
          expandAndCollapse: true,
          animationDuration: 550,
          animationDurationUpdate: 750
        }]
      }
    }
  },
  methods: {
    resize () {
      this.dom.resize()
    },
    // echart渲染方法
    chartShow (option) {
      this.dom.setOption(option)
      on(window, 'resize', this.resize)
    }
  },
  mounted () {
    this.$nextTick(() => {
      this.dom = echarts.init(this.$refs.dom, 'tdTheme')
      this.chartShow(this.option)
    })
  },
  beforeDestroy () {
    off(window, 'resize', this.resize)
  }
}
</script>
