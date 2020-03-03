<template>
  <Card>
    <p slot="title">不良事件上报分析</p>
    <div>
      <Tabs>
        <TabPane label="事件报告" icon="md-list-box">
          <div class="report-audit-add-form-box">
            <Form :model="formItem" :label-width="95">
              <!--小字段-->
              <Row class="report-dispose-list-style">
                <Col span="6" class="report-dispose-list-md" v-for="item in eventInfoModelStr" :key="item.fieldId"><p><span>{{item.fieldName}}:</span>{{item.formValue}}</p></Col>
              </Row>
              <div class="add-form-line"></div>
              <!--大字段-->
              <Row class="report-dispose-list-style">
                <Col span="24" class="report-dispose-list-md" v-for="item in eventInfoModelText" :key="item.fieldId"><p><span>{{item.fieldName}}:</span>{{item.formValue}}。</p></Col>
              </Row>
              <div class="add-form-line"></div>
              <!--原因信息-->
              <Row class="report-dispose-list-style">
                <Col span="24" class="report-dispose-list-md" v-for="item in eventInfoModelReason" :key="item.fieldId"><p><span>{{item.fieldName}}:</span>{{item.formValue}}。</p></Col>
              </Row>
            </Form>
          </div>
          <Button style="margin-top: 8px" type="primary" icon="md-share-alt" @click="exportWord(eventId)">导出为word</Button>
        </TabPane>
        <TabPane label="分析报告" icon="ios-list-box">
          <div class="reason-box" v-for="item in eventInfoModelReason" :key="item.fieldId">
            <h1 class="reason-title">—————— {{item.fieldName}} ——————</h1>
            <span>{{item.formValue}}</span>
          </div>
        </TabPane>
        <TabPane label="追踪报告" icon="md-git-network">
          <Row :gutter="16">
            <Col span="5">
            <div>
              <Timeline style="margin-top: 20px">
                <TimelineItem v-for="item in flowUsers" :key="item.flowName">
                  <p class="time ">{{item.time}}</p>
                  <p class="content allAdd-text-style">{{item.flowName}}:{{item.flowUser}}</p>
                </TimelineItem>
              </Timeline>
            </div>
            </Col>
          </Row>
        </TabPane>
        <TabPane label="图表分析图" icon="ios-podium">
          <div>
            <chart-reson style="height: 500px;" :value="resaonData"  :text="reasonText"></chart-reson>
          </div>
        </TabPane>
      </Tabs>
    </div>
  </Card>
</template>

<script>
import { ChartPie, ChartBar, ChartReson } from '_c/charts'
import axios from 'axios'
export default {
  name: 'report-all-add',
  components: {
    ChartReson
  },
  data () {
    return {
      // 事件id
      eventId: '',
      formItem: {},
      // 参与人员
      flowUsers: [],
      // 信息数据
      eventData: {},
      // 原因因素项
      reasonOne: [],
      reasonTwo: [],
      reasonThree: [],
      reasonFour: [],
      reasonFiv: [],
      reasonSix: [],
      // 原因分析图
      resaonData: {},
      // 事件分析图id
      reasonText: '',

      // 事件详情input数据
      eventInfoModelStr: [],
      // 事件详情text数据
      eventInfoModelText: [],
      // 事件详情reason数据
      eventInfoModelReason: []

    }
  },
  mounted () {
    // 获取当前事件id
    let eventId = this.$route.query.eventId
    this.eventId = eventId
    this.reasonText = '事件原因分析图（id: ' + eventId + ')'
    this.getEventInfo(this.eventId)
    this.getEventReasonChart(this.eventId)
  },
  methods: {
    // 事件基本数据
    getEventInfo (eventId) {
      let requestParam = {
        eventId: eventId
      }
      this.axios.get('eventInfo/getEventInfo', { params: requestParam }).then((res) => {
        if (res.data.code === 0) {
          let eventDate = res.data.data
          // this.processInstanceId = eventDate.processInstanceId;
          let jsonData = JSON.parse(eventDate.eventInfoJson)
          // 小字段
          this.eventInfoModelStr = jsonData.filter(item => item.fieldType !== '多行文本框' && item.pullName !== '事件因素')
          // text字段
          this.eventInfoModelText = jsonData.filter(item => item.fieldType === '多行文本框' && item.pullName !== '事件因素')
          // 原因
          this.eventInfoModelReason = jsonData.filter(item => item.pullName === '事件因素')
          // 追踪报告
          this.flowUsers = JSON.parse(eventDate.eventFlowJson)
        }
      }).catch((e) => {
        console.log(e)
      })
    },
    // 事件原因图
    getEventReasonChart (eventId) {
      let requestParam = {
        eventId: eventId
      }
      this.axios.get('eventInfo/getResonChart', { params: requestParam }).then((res) => {
        if (res.data.code === 0) {
          this.resaonData = res.data.data
        } else {
          this.resaonData = {}
        }
      }).catch((e) => {
        console.log(e)
      })
    },
    // 导出word文档
    exportWord (eventId) {
      let baseUrl = process.env.NODE_ENV === 'development' ? this.$config.baseUrl.dev : this.$config.baseUrl.pro
      axios.get(baseUrl + `eventInfo/exportWord`, {
        params: {
          eventId: eventId
        },
        responseType: `arraybuffer`
      }).then(res => {
        if (res.status === 200) {
          let blob = new Blob([res.data], {
            type: `application/msword`
          })
          let objectUrl = URL.createObjectURL(blob)
          let link = document.createElement('a')
          let fname = eventId + `.docx`
          link.href = objectUrl
          link.setAttribute('download', fname)
          document.body.appendChild(link)
          link.click()
        } else {
          alert('导出word失败')
        }
      })
    }
  }
}
</script>

<style scoped>
  .reason-box{
    width: 30%;
    text-align: center;
  }
  .reason-title{
    font-size: 14px;
    border-left: solid 3px #2d8cf0;
    /*padding-left: 20px;*/
    background-color: #e8eaec;
    line-height: 30px;
    font-weight: 300;
    font-family: 微软雅黑;
  }
  .reason-list{
    list-style: none;

  }
  .reason-md{
    /*padding-left: 30px;*/
    text-align: center;
    font-size: 14px;
    padding-bottom: 4px;
    color: #348EED;
    margin-top: 3px;
    border-bottom: dashed 1px #808695;
  }
  .spMaBottomSP p{
    font-size: 14px !important;
  }
  .spMaBottomSP{
    margin-top: 5px;
  }
  .spMaBottom p{
    font-size: 14px !important;
  }
  .spMaBottom{
    margin-top: 25px !important;

  }
  .allAdd-text-style{
    font-size: 14px;
    color: #808695;
    font-weight: 200;
  }
  .time{
    font-size: 14px;
    color: #323232;
    font-weight: 600;
  }
  .content{
    padding-left: 5px;
  }
  .add-form-line{
    margin-bottom: 20px;
    height: 2px;
    width: 100%;
    background-color: #808695;
  }
  .report-dispose-list-md{
    margin-bottom: 8px;
  }
  .report-dispose-list-style p span{
    font-weight: bold;
    margin-right: 8px;
    color: #000000;
  }
  .report-dispose-list-style p{
    font-size: 13px;
    color: #515a6e;
  }
</style>
