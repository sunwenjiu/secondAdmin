<template>
  <div>
    <Row :gutter="16">
      <Col span="12">
        <Card  style="padding-bottom: 100px">
          <div slot="title" style="overflow: hidden">
            <p class="chat-title-style" style="float: left">统计图表</p>
            <div style="float: right">
              <DatePicker type="year" placeholder="选择年份" style="width: 200px;margin-right: 10px" @on-change="timeChangeone"></DatePicker>
              <Select v-model="deptIdOne" clearable style="width:200px;margin-right: 10px">-->
                <Option v-for="item in deptList" :value="item.value" :key="item.value">{{ item.label }}</Option>
              </Select>
              <Button type="primary" @click="echartOneBtn">筛选</Button>
            </div>
          </div>
          <div id="chart1" style="width:100%;height:600px"></div>
        </Card>
      </Col>
      <Col span="12">
        <Card  style="padding-bottom: 100px">
          <div slot="title" style="overflow: hidden">
            <p class="chat-title-style" style="float: left">统计图表</p>
            <div style="float: right">
              <DatePicker type="year" placeholder="选择年份" style="width: 200px;margin-right: 10px" @on-change="timeChangetwo"></DatePicker>
              <Select v-model="deptIdTwo" clearable style="width:260px;margin-right: 10px">-->
                <Option v-for="item in deptList" :value="item.value" :key="item.value">{{ item.label }}</Option>
              </Select>
              <Button type="primary" @click="echartTwoBtn">筛选</Button>
            </div>
          </div>
          <div id="chart3" style="width:100%;height:600px"></div>
        </Card>
      </Col>
    </Row>
  </div>
</template>

<script>
  export default {
    data () {
      return {
        nowTimeStr: '',
        timeStrOne: '',
        deptIdOne: '',
        deptList: [
          {
            value: '1',
            label: '骨科'
          },
          {
            value: '2',
            label: '肝胆科'
          },
          {
            value: '3',
            label: '皮肤科'
          }
        ],
        timeStrTwo: '',
        deptIdTwo: '',
        // echart 第一个option
        optionOne: {
          title: {
            text: '',
            subtext: '数据来自信息科资源管理系统'
          },
          tooltip: {
            trigger: 'axis',
            axisPointer: {
              type: 'shadow'
            }
          },
          xAxis: {
            type: 'category',
            data: ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月'],
            axisTick: {
              alignWithLabel: true
            }
          },
          yAxis: {
            type: 'value'
          },
          series: [{
            name: '工单量',
            barWidth: '60%',
            data: [120, 200, 150, 80, 70, 110, 130, 70, 86, 109, 94, 38],
            type: 'bar'
          }]
        },
        // echart 第二个option
        optionTwo: {
          title: {
            text: '',
            subtext: '数据来自信息科资源管理系统',
            x: 'center'
          },
          tooltip: {
            trigger: 'item',
            formatter: '{a} <br/>{b} : {c} ({d}%)'
          },
          legend: {
            orient: 'vertical',
            left: 'left',
            data: ['硬件工单', '软件工单', '其他工单']
          },
          series: [
            {
              name: '占比详情',
              type: 'pie',
              radius: '55%',
              center: ['50%', '60%'],
              data: [
                { value: 335, name: '硬件工单' },
                { value: 310, name: '软件工单' },
                { value: 234, name: '其他工单' }
              ],
              itemStyle: {
                emphasis: {
                  shadowBlur: 10,
                  shadowOffsetX: 0,
                  shadowColor: 'rgba(0, 0, 0, 0.5)'
                }
              }
            }
          ]
        }
      }
    },
    mounted () {
      this.loadEchartData1()
      this.loadEchartData2()
    },
    methods: {
      // 日期改变
      timeChangeone (val) {
        this.timeStrOne = val.toString()
      },
      timeChangetwo (val) {
        this.timeStrTwo = val.toString()
      },
      // 柱状图筛选
      echartOneBtn () {
        this.loadEchartData1(this.optionOne)
      },
      // 拼图筛选
      echartTwoBtn () {
        console.log(this.deptIdTwo)
        this.loadEchartData2()
      },
      // 初始化echart
      getEchartData1 (option) {
        var myChart = this.echarts.init(document.getElementById('chart1'))
        myChart.setOption(option)
      },
      // 初始化数据
      loadEchartData1 () {
        if (!this.deptIdOne) {
          this.deptIdOne = ''
        }
        this.axios.get('/eventContent/getBarCount',
          {
            params: {
              year: this.timeStrOne,
              deptId: this.deptIdOne
            }
          }).then((res) => {
          if (res.data.code === 0) {
            this.optionOne.series[0].data = res.data.data
            this.getEchartData1(this.optionOne)
          }
        }).catch((e) => {
          console.log(e)
        })
      },
      // 初始化echart
      getEchartData2 (option) {
        var myChart = this.echarts.init(document.getElementById('chart3'))
        myChart.setOption(option)
      },
      // 初始化数据
      loadEchartData2 (time) {
        if (!this.deptIdTwo) {
          this.deptIdTwo = ''
        }
        this.axios.get('/eventContent/getPieCount',
          {
            params: {
              year: this.timeStrTwo,
              deptId: this.deptIdTwo
            }
          }).then((res) => {
          if (res.data.code === 0) {
            this.optionTwo.legend.data = res.data.data.types.name
            this.optionTwo.series[0].data = res.data.data.mapList
            this.getEchartData2(this.optionTwo)
          }
        }).catch((e) => {
          console.log(e)
        })
      }
    }
  }
</script>

<style>
  .chat-title-style{
    float: left;
    width: auto !important;
    margin-top: 6px;
    font-weight: 200 !important;
    font-size: 16px !important;
  }
</style>
