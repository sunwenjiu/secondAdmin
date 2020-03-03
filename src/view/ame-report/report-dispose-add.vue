<template>
  <Row :gutter="16">
    <!--驳回弹窗-->
    <Modal
      v-model="rejectModel"
      @on-ok="eventReturn"
      width="500"
      @on-cancel="cancel">
      <p slot="header" class="warning-title"><span class="warning-title-ico" style="color: #ed4014 !important;"><Icon type="ios-alert" /></span>确认要驳回申请么？</p>
      <div>
        <Form :model="formItem" style="margin-bottom:0px;">
          <FormItem :label="item.fieldName" :label-width="70" v-if="activitiTaskReturnList.length > 0" v-for="item in activitiTaskReturnList" :key="item.fieldId">
            <Input v-model="item.formValue" type="textarea" :rows="3" style="width:380px" :placeholder="item.fieldName" />
            <p class="warning-text">注意:不良事件上报表一经驳回，以后都不能重新处理，请确认无误在点击确定！</p>
          </FormItem>
        </Form>
      </div>
    </Modal>
    <Modal
      v-model="warningModel"
      @on-ok="ok"
      width="400"
      @on-cancel="cancel">
      <p slot="header" class="warning-title"><span class="warning-title-ico"><Icon type="ios-alert" /></span>确认要提交报表么？</p>
      <p class="warning-text">注意:不良事件上报表一经提交，以后都不能修改，请确认所填写信息无误再提交！</p>
    </Modal>
    <Col span="18">
      <Card style="margin-bottom: 25px">
        <p slot="title">不良事件填报表</p>
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
            <div class="add-form-line"></div>
              <!--判断当前节点，动态渲染相关操作-->
              <Row :gutter="16">
                <Col span="24" v-for="item in activitiTaxkContextList" :key="item.fieldId">
                  <FormItem :label="item.fieldName" :label-width="120">
                    <Input v-model="item.formValue" type="textarea" :rows="3" :placeholder="item.formValue" />
                  </FormItem>
                </Col>
              </Row>
              <Row :gutter="16">
                <Col span="24" v-for="item in activitiTaskPullList" :key="item.fieldId" v-if="activitiTaskPullList.length > 0">
                  <FormItem :label="item.fieldName" >
                    <Select  v-model="item.formValue" >
                      <Option v-for="a in JSON.parse(item.itemList)" :value="a.name" :key="a.name">{{a.name}}</Option>
                    </Select>
                  </FormItem>
                </Col>
              </Row>
            <FormItem>
              <Button type="primary" style="margin-left: 25px"  @click="upReportForm">提交报表</Button>
              <Button type="error" style="float: right"  @click="rejectForm">驳回申请</Button>
            </FormItem>
          </Form>
        </div>
      </Card>
    </Col>
    <Col span="6">
        <Card class="step-po-style" >
          <p slot="title">事件流程步骤</p>
          <Steps :current="nowProcess" direction="vertical" v-if="eventTypeProcess.length > 0">
            <Step :title="item.processName" :content="item.processName" v-for="item in eventTypeProcess" :key="item.processName"></Step>
          </Steps>
          <p v-if="eventTypeProcess.length === 0">事件流程暂未激活</p>
        </Card>
    </Col>
  </Row>

</template>

<script>
export default {
  data () {
    return {
      rejectModel: false,
      warningModel: false,
      index: 1,
      model10: [],
      model15: [],
      formDynamic: {
        items: [
          {
            value: '',
            index: 1,
            status: 1
          }
        ]
      },
      value1: [],
      value5: '',
      cityList: [
        {
          value: 'New York',
          label: 'New York啊啊啊啊啊啊啊啊啊啊啊啊啊啊'
        },
        {
          value: 'London',
          label: 'London'
        },
        {
          value: 'Sydney',
          label: 'Sydney'
        },
        {
          value: 'Ottawa',
          label: 'Ottawa'
        },
        {
          value: 'Paris',
          label: 'Paris'
        },
        {
          value: 'Canberra',
          label: 'Canberra'
        }
      ],
      data: [{
        model11: '',
        value: 'beijing',
        label: '北京',
        children: [
          {
            value: 'gugong',
            label: '故宫'
          },
          {
            value: 'tiantan',
            label: '天坛'
          },
          {
            value: 'wangfujing',
            label: '王府井'
          }
        ]
      }, {
        value: 'jiangsu',
        label: '江苏',
        children: [
          {
            value: 'nanjing',
            label: '南京',
            children: [
              {
                value: 'fuzimiao',
                label: '夫子庙'
              }
            ]
          },
          {
            value: 'suzhou',
            label: '苏州',
            children: [
              {
                value: 'zhuozhengyuan',
                label: '拙政园'
              },
              {
                value: 'shizilin',
                label: '狮子林'
              }
            ]
          }
        ]
      }],
      value3: '',
      data3: ['骨科', '儿科', '肠胃科'],
      formItem: {
        input: '',
        select: '',
        radio: 'male',
        checkbox: [],
        switch: true,
        date: '',
        time: '',
        slider: [20, 50],
        textarea: ''
      },
      // ------------------------
      // 事件id
      eventId: '',
      // 事件流程对象实例Id
      processInstanceId: '',
      // 事件详情input数据
      eventInfoModelStr: [],
      // 事件详情text数据
      eventInfoModelText: [],
      // 事件详情reason数据
      eventInfoModelReason: [],
      // 当前节点需要填写内容
      activitiTaxkContextList: [],
      activitiTaskPullList: [],
      // 驳回理由
      activitiTaskReturnList: [],
      // 不同事件类型显示的步骤
      eventTypeProcess: [],
      // 当前的流程步骤
      nowProcess: 0

    }
  },
  mounted () {
    this.eventId = this.$route.query.eventId
    this.loadData()
    this.processShow()
  },
  methods: {
    // 驳回操作
    rejectForm () {
      this.rejectModel = true
    },
    // 驳回确认
    eventReturn () {
      let flag = this.valueCheckShowReturn()
      if (flag) {
        let requestArr = this.eventInfoModelStr.concat(this.eventInfoModelText).concat(this.eventInfoModelReason).concat(this.activitiTaskReturnList)
        let jsonStr = JSON.stringify(requestArr).toString()
        let map = {
          'eventId': this.eventId,
          'json': jsonStr
        }
        this.axios.post('eventInfo/returnEvent', map).then((res) => {
          if (res.data.code === 0) {
            this.$router.push({
              path: '/event_handle'
            })
          } else {
            this.$Message.error('事件驳回失败')
          }
        }).catch()
      } else {
        this.$Message.error('还有未填写驳回内容')
      }
    },
    // 提交流程处理项
    upReportForm () {
      let flag = this.valueCheckShow()
      if (flag) {
        // this.warningModel = true
        // 合并所有提交项
        let requestArr = this.eventInfoModelStr.concat(this.eventInfoModelText).concat(this.eventInfoModelReason).concat(this.activitiTaxkContextList).concat(this.activitiTaskPullList)
        let jsonStr = JSON.stringify(requestArr).toString()
        let map = {
          'eventId': this.eventId,
          'json': jsonStr
        }
        this.axios.post('eventInfo/update', map).then((res) => {
          if (res.data.code === 0) {
            this.$router.push({
              path: '/event_handle'
            })
          } else {
            this.$Message.error('事件处理失败')
          }
        }).catch()
      } else {
        this.$Message.error('还有未填写的内容')
      }
    },
    ok () {
      this.$Message.info('Clicked ok')
    },
    cancel () {
      this.$Message.info('Clicked cancel')
    },
    handleAdd () {
      this.index++
      this.formDynamic.items.push({
        value: '',
        index: this.index,
        status: 1
      })
    },
    handleRemove (index) {
      this.formDynamic.items[index].status = 0
    },
    filterMethod (value, option) {
      return option.toUpperCase().indexOf(value.toUpperCase()) !== -1
    },
    // 加载数据
    loadData () {
      let requestParam = {
        eventId: this.eventId
      }
      this.axios.get('eventInfo/getEventInfo', { params: requestParam }).then((res) => {
        if (res.data.code === 0) {
          let eventDate = res.data.data
          this.processInstanceId = eventDate.processInstanceId
          let jsonData = JSON.parse(eventDate.eventInfoJson)
          // 小字段
          this.eventInfoModelStr = jsonData.filter(item => item.fieldType !== '多行文本框' && item.pullName !== '事件因素')
          // text字段
          this.eventInfoModelText = jsonData.filter(item => item.fieldType === '多行文本框' && item.pullName !== '事件因素')
          // 原因
          this.eventInfoModelReason = jsonData.filter(item => item.pullName === '事件因素')
          // 加载流程填报项目
          this.getNextTaskName()
        }
      }).catch((e) => {
        console.log(e)
      })
    },
    // 动态加载当前节点
    getNextTaskName () {
      let requestParam = {
        processInstanceId: this.processInstanceId
      }
      this.axios.get('eventTypeActiviti/getNowTask', { params: requestParam }).then((res) => {
        if (res.data.code === 0) {
          let nextTaskName = res.data.data
          this.getFromSetByNextTask(nextTaskName)
        }
      }).catch((e) => {
        console.log(e)
      })
    },
    // 获取需要进行下个节点操作的操作字段
    getFromSetByNextTask (nextTaskName) {
      let requestParam = {
        fieldAscion: nextTaskName
      }
      this.axios.get('formset/getFormSetList', { params: requestParam }).then((res) => {
        if (res.data.code === 0) {
          let result = res.data.data
          this.activitiTaxkContextList = result.filter(item => item.fieldType === '多行文本框' && item.fieldName !== '驳回理由')
          this.activitiTaskPullList = result.filter(item => item.fieldType === '下拉框')
          this.activitiTaskReturnList = result.filter(item => item.fieldType === '多行文本框' && item.fieldName === '驳回理由')
        }
      }).catch((e) => {
        console.log(e)
      })
    },
    // 验证填报的流程处理项
    valueCheck (inputList) {
      let result = []
      var arr = new Array()
      inputList.map(item => {
        if (item.formValue != null && item.formValue.length > 0) {
          arr.push(item)
        }
      })
      if (inputList.length !== arr.length) {
        result = []
      } else {
        result = inputList
      }
      return result
    },
    // 提交表单验证流程处理项
    valueCheckShow () {
      let flag = false
      let allList = this.activitiTaxkContextList.concat(this.activitiTaskPullList)
      let result = this.valueCheck(allList)
      if (result != null && result.length > 0) {
        flag = true
      }
      return flag
    },
    // 驳回表单验证处理项
    valueCheckShowReturn () {
      let flag = false
      let result = this.valueCheck(this.activitiTaskReturnList)
      if (result != null && result.length > 0) {
        flag = true
      }
      return flag
    },
    // 显示步骤条
    processShow () {
      this.eventTypeProcess = []
      let requestParam = {
        eventId: this.eventId
      }
      this.axios.get('eventTypeActiviti/getProcessShow', { params: requestParam }).then((res) => {
        if (res.data.code === 0) {
          this.eventTypeProcess = res.data.data
          this.nowProcess = this.eventTypeProcess[0].processNowNumber
        }
      }).catch((e) => {
        console.log(e)
      })
    }

  }
}
</script>

<style scoped>
  .step-po-style{
    position: fixed;
    top: 123px;
    width:20%;
    z-index: 0;
  }
  .report-list{
    font-family: 微软雅黑;
    overflow: hidden;
    list-style: none;
  }
  body{
    font-family: 微软雅黑;
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
  .warning-text{
    font-size: 12px;
    font-family: 微软雅黑;
  }
  .warning-title-ico{
    font-size: 20px;
    color: #ff9900;
    margin-right: 8px;
    /*vertical-align: middle;*/
  }
  .warning-title{
    font-size: 18px;
    font-family: 微软雅黑;
    padding-bottom: 5px;
    font-weight: bold;
    color: #323232;
  }
  .add-form-line{
    margin-bottom: 20px;
    height: 2px;
    width: 100%;
    background-color: #808695;
  }
  .spFormW .ivu-form-item-content{
    margin-left: 100px;
  }
  .spFormW .ivu-form-item-label{
    width: 100px !important;
    height: 100px;
  }
  .addFormWidth{
    width: 33%;
  }
</style>
