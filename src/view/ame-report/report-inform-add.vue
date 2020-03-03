<template>
  <Row :gutter="16">
    <Modal
      v-model="rejectModel"
      @on-ok="ok"
      width="500"
      @on-cancel="cancel">
      <p slot="header" class="warning-title" ><span class="warning-title-ico" style="color: #ed4014 !important;"><Icon type="ios-alert" /></span>确认要驳回申请么？</p>
      <div>
        <Form :model="formItem" style="margin-bottom:0px;">
          <FormItem label="驳回理由:" :label-width="70">
            <Input v-model="value5" type="textarea" :rows="3" style="width:380px" placeholder="Enter something..." />
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
        <p slot="title">不良事件审核</p>
        <div class="report-audit-add-form-box">
          <Form :model="formItem" :label-width="95">
            <Row class="report-dispose-list-style">
              <Col span="6" class="report-dispose-list-md"><p><span>患者姓名:</span>欧阳张三</p></Col>
              <Col span="6" class="report-dispose-list-md"><p><span>患者病案号:</span>kmyg12138</p></Col>
              <Col span="6" class="report-dispose-list-md"><p><span>患者生日:</span>2019-07-28</p></Col>
              <Col span="6" class="report-dispose-list-md"><p><span>患者性别:</span>男</p></Col>
              <Col span="6" class="report-dispose-list-md"><p><span>患者科室:</span>这里是一个科室的名字</p></Col>
              <Col span="6" class="report-dispose-list-md"><p><span>事件发生场所:</span>事件发生的场所</p></Col>
              <Col span="6" class="report-dispose-list-md"><p><span>事件类型:</span>这里是事件类型的名字</p></Col>
              <Col span="6" class="report-dispose-list-md"><p><span>填报人类型:</span>医生</p></Col>
              <Col span="8" class="report-dispose-list-md"><p><span>填报人部门:</span>这里是一个名字很长的部门</p></Col>
              <Col span="8" class="report-dispose-list-md"><p><span>填报人病区:</span>这里是一个名字很长的病区</p></Col>
            </Row>
            <div class="add-form-line"></div>
            <Row class="report-dispose-list-style">
              <Col span="24" class="report-dispose-list-md"><p><span>临床诊断:</span>中国空军新闻发言人申进科上校14日早间表示，中国空军13日组织多批战机起飞，对向中国边境抵近飞行的缅甸军机进行跟踪、监视、警告、外逼。申进科上校说，中国空军常年保持高度戒备，严密监视空中动态，近一时期重点加强了中缅边境地区空情监控。申进科上校指出，中国空军将采取措施加强中缅边境空中应对行动，严密关注空情动态，维护国家领空主权。</p></Col>
              <Col span="24" class="report-dispose-list-md"><p><span>事件描述:</span>中国空军新闻发言人申进科上校14日早间表示，中国空军13日组织多批战机起飞，对向中国边境抵近飞行的缅甸军机进行跟踪、监视、警告、外逼。申进科上校说，中国空军常年保持高度戒备，严密监视空中动态，近一时期重点加强了中缅边境地区空情监控。申进科上校指出，中国空军将采取措施加强中缅边境空中应对行动，严密关注空情动态，维护国家领空主权。</p></Col>
              <Col span="24" class="report-dispose-list-md"><p><span>采取措施:</span>中国空军新闻发言人申进科上校14日早间表示，中国空军13日组织多批战机起飞，对向中国边境抵近飞行的缅甸军机进行跟踪、监视、警告、外逼。申进科上校说，中国空军常年保持高度戒备，严密监视空中动态，近一时期重点加强了中缅边境地区空情监控。申进科上校指出，中国空军将采取措施加强中缅边境空中应对行动，严密关注空情动态，维护国家领空主权。</p></Col>
              <Col span="24" class="report-dispose-list-md"><p><span>事件处理情况:</span>中国空军新闻发言人申进科上校14日早间表示，中国空军13日组织多批战机起飞，对向中国边境抵近飞行的缅甸军机进行跟踪、监视、警告、外逼。申进科上校说，中国空军常年保持高度戒备，严密监视空中动态，近一时期重点加强了中缅边境地区空情监控。申进科上校指出，中国空军将采取措施加强中缅边境空中应对行动，严密关注空情动态，维护国家领空主权。</p></Col>
            </Row>
            <div class="add-form-line"></div>
            <ul class="report-list" style="margin-bottom: 20px">
              <li class="report-list-md" style="width: 100%">
                <Collapse v-model="value1">
                  <Panel name="1">
                    主要原因：这里是原因名字
                    <div slot="content">
                      <ul>
                        <li>这里是子原因这里是子原因这里是子原因</li>
                        <li>这里是子原因这里是子原因这里是子原因</li>
                        <li>这里是子原因这里是子原因这里是子原因</li>
                        <li>这里是子原因这里是子原因这里是子原因</li>
                      </ul>
                    </div>
                  </Panel>
                  <Panel name="2">
                    主要原因：这里是原因名字2
                    <div slot="content">
                      <ul>
                        <li>这里是子原因这里是子原因这里是子原因</li>
                        <li>这里是子原因这里是子原因这里是子原因</li>
                        <li>这里是子原因这里是子原因这里是子原因</li>
                        <li>这里是子原因这里是子原因这里是子原因</li>
                      </ul>
                    </div>
                  </Panel>
                  <Panel name="3">
                    主要原因：这里是原因名字3
                    <div slot="content">
                      <ul>
                        <li>这里是子原因这里是子原因这里是子原因</li>
                        <li>这里是子原因这里是子原因这里是子原因</li>
                        <li>这里是子原因这里是子原因这里是子原因</li>
                        <li>这里是子原因这里是子原因这里是子原因</li>
                      </ul>
                    </div>

                  </Panel>
                </Collapse>

              </li>
            </ul>
            <div class="add-form-line"></div>
            <Row class="report-dispose-list-style">
              <Col span="24" class="report-dispose-list-md"><p><span>填报人姓名:</span>慕容李四</p></Col>
            </Row>
            <div class="add-form-line"></div>
            <Row class="report-dispose-list-style">
              <Col span="24" class="report-dispose-list-md"><p><span>事件处理评价:</span>中国空军新闻发言人申进科上校14日早间表示，中国空军13日组织多批战机起飞，对向中国边境抵近飞行的缅甸军机进行跟踪、监视、警告、外逼。申进科上校说，中国空军常年保持高度戒备，严密监视空中动态，近一时期重点加强了中缅边境地区空情监控。申进科上校指出，中国空军将采取措施加强中缅边境空中应对行动，严密关注空情动态，维护国家领空主权。</p></Col>
              <Col span="24" class="report-dispose-list-md"><p><span>事件处理建议措施:</span>中国空军新闻发言人申进科上校14日早间表示，中国空军13日组织多批战机起飞，对向中国边境抵近飞行的缅甸军机进行跟踪、监视、警告、外逼。申进科上校说，中国空军常年保持高度戒备，严密监视空中动态，近一时期重点加强了中缅边境地区空情监控。申进科上校指出，中国空军将采取措施加强中缅边境空中应对行动，严密关注空情动态，维护国家领空主权。</p></Col>
            </Row>
            <div class="add-form-line"></div>
            <Row :gutter="16">
              <Col span="24">
                <FormItem label="事件等级评定:" :label-width="120">
                  <Select v-model="model1" style="width:200px">
                    <Option v-for="item in cityList" :value="item.value" :key="item.value">{{ item.label }}</Option>
                  </Select>
                </FormItem>
              </Col>
              <Col span="24">
                <FormItem label="事件结案评价:" :label-width="120">
                  <Input v-model="value5" type="textarea" :rows="3" placeholder="Enter something..." />
                </FormItem>
              </Col>
              <Col span="24">
                <FormItem label="事件结案建议措施:" :label-width="120">
                  <Input v-model="value5" type="textarea" :rows="3" placeholder="Enter something..." />
                </FormItem>
              </Col>
            </Row>
            <FormItem>
              <Button type="primary" style="margin-left: 25px"  @click="upReportForm()">提交报表</Button>
              <Button type="error" style="float: right"  @click="rejectForm()">驳回申请</Button>
            </FormItem>
          </Form>
        </div>
      </Card>
    </Col>
    <Col span="6">
      <Card class="step-po-style">
        <p slot="title">事件填报步骤</p>
        <Steps :current="2" direction="vertical">
          <Step title="进行中" content="创建表单并填报，填报完成后提交下步处理"></Step>
          <Step title="待处理" content="填报成功后，等待处理结果"></Step>
          <Step title="待结案" content="填报成功后，等待医务科结案处理"></Step>
          <Step title="已结案" content="不良事件结束"></Step>
        </Steps>
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
      }
    }
  },
  methods: {
    rejectForm () {
      this.rejectModel = true
    },
    upReportForm () {
      this.warningModel = true
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
    }
  }
}
</script>

<style scoped>
  .step-po-style{
    position: fixed;
    top: 123px;
    width:auto;
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
    line-height: 14px !important;
    margin-top: 10px;
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
    font-weight: bold;
    padding-bottom: 5px;
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
