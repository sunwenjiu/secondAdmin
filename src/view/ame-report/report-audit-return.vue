<template>
  <Row :gutter="16" class="ppp">
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
                       <!--input字段-->
                      <Row :gutter="16">
                        <Col span="6" v-if="formFiledInputList.length > 0" v-for="item in formFiledInputList" :key="item.fieldId">
                            <FormItem :label="item.fieldName" style="position: relative">
                              <Input type="text"  v-model="item.formValue" />
                              <span v-if="item.formValue == null || item.formValue === ''" class="ts-msg">*请输入{{item.fieldName}}</span>
                            </FormItem>
                        </Col>
                      </Row>
                      <div class="add-form-line"></div>
                       <!--pull字段-->
                      <Row :gutter="16">
                        <Col span="6" v-if="formFiledPullList.length > 0" v-for="item in formFiledPullList" :key="item.fieldId">
                          <FormItem :label="item.fieldName" >
                            <Select  filterable v-model="item.formValue" v-if="item.pullName === '病区列表' && item.itemList != null">
                              <Option v-for="a in JSON.parse(item.itemList)" :value="a.name" :key="a.wardId">{{ a.name }}</Option>
                            </Select>
                            <span v-if="item.formValue == null || item.formValue === ''" class="ts-msg">*请输入{{item.fieldName}}</span>
                            <Select  filterable v-model="item.formValue" v-if="item.pullName === '科室列表' && item.itemList != null" >
                              <Option v-for="a in JSON.parse(item.itemList)" :value="a.name" :key="a.wardId">{{ a.name }}</Option>
                            </Select>
                            <span v-if="item.formValue == null || item.formValue === ''" class="ts-msg">*请输入{{item.fieldName}}</span>
                            <Select  v-model="item.formValue"  v-if="item.pullName === '事件类型' && item.itemList != null" >
                              <OptionGroup :label="one.title" v-for="one in JSON.parse(item.itemList)" :key="one.title" >
                                <Option v-for="two in one.children" :value="two.title" :key="two.id">{{ two.title }}</Option>
                              </OptionGroup>
                            </Select>
                            <span v-if="item.formValue == null || item.formValue === ''" class="ts-msg">*请输入{{item.fieldName}}</span>
                          </FormItem>
                        </Col>
                      </Row>
                      <div class="add-form-line"></div>
                      <!--单选按钮-->
                      <Row :gutter="16">
                        <Col span="6" v-if="formFiledRadioList.length > 0" v-for="item in formFiledRadioList" :key="item.fieldId">
                        <FormItem :label="item.fieldName" >
                          <RadioGroup v-model="item.formValue">
                            <Radio :label="a.label" v-for="a in JSON.parse(item.radioValues)" :key="a.label">{{a.value}}</Radio>
                          </RadioGroup>
                          <span v-if="item.formValue == null || item.formValue === ''" class="ts-msg">*请输入{{item.fieldName}}</span>
                        </FormItem>
                        </Col>
                      </Row>
                      <div class="add-form-line"></div>
                       <!--text字段-->
                      <Row :gutter="16">
                          <Col span="12" v-if="formFiledTextList.length > 0" v-for="item in formFiledTextList" :key="item.fieldId">
                            <FormItem :label="item.fieldName" >
                              <Input v-model="item.formValue" :rows="3" type="textarea"  />
                              <span v-if="item.formValue == null || item.formValue === ''" class="ts-msg">*请输入{{item.fieldName}}</span>
                            </FormItem>
                          </Col>
                      </Row>
                      <div class="add-form-line"></div>
                       <!--事件因素-->
                      <FormItem>
                        <Row>
                          <Col span="18">
                            <Row :gutter="16" >
                              <Col span="16" v-if="formFiledReasonList.length > 0" v-for="item in formFiledReasonList" :key="item.fieldId">
                                <span style="float: left;margin-right: 10px">{{item.fieldName}}子因素:</span>
                                <div style="float: left;width: 80%">
                                  <Select multiple v-model="item.formValue" v-if="item.itemList != null">
                                    <OptionGroup :label="one.title" v-for="one in JSON.parse(item.itemList)" :key="one.title"  >
                                      <Option v-for="two in one.children" :value="two.title" :key="two.id">{{ two.title }}</Option>
                                    </OptionGroup>
                                  </Select>
                                </div>
                              </Col>
                            </Row>
                          </Col>
                        </Row>
                      </FormItem>
                      <div class="add-form-line"></div>
                      <FormItem>
                         <Button type="primary"  @click="upReportForm">确认重新上报</Button>
                      </FormItem>
                </Form>
           </div>
       </Card>
    </Col>
    <Col span="6">
       <Card class="step-po-style" >
        <p slot="title">事件填报步骤</p>
         <Steps :current="0" direction="vertical">
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
import { treeToRename } from './treeToRename'
export default {
  data () {
    return {
      tsMsg: false,
      aaList: [
        {
          label: 'aaaa',
          inputIf: true
        },
        {
          label: 'bbbb',
          selectIf: true
        }
      ],
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
      eventType: [],
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
      // 事件发生场所
      eventAddress: [
        {
          value: '急诊',
          label: '急诊'
        },
        {
          value: '门诊',
          label: '门诊'
        },
        {
          value: '病区',
          label: '病区'
        },
        {
          value: '其他',
          label: '其他'
        }
      ],
      // 填报人类型
      writeUserType: [
        {
          value: '医生',
          label: '医生'
        },
        {
          value: '医师',
          label: '医师'
        },
        {
          value: '技师',
          label: '技师'
        },
        {
          value: '护士',
          label: '护士'
        },
        {
          value: '行政',
          label: '行政'
        }
      ],
      // 填报人部门
      writeUserDept: [
        {
          value: '骨科',
          label: '骨科'
        },
        {
          value: '肝胆科',
          label: '肝胆科'
        },
        {
          value: '眼科',
          label: '眼科'
        }
      ],
      // 填报人病区
      writeUserWard: [
        {
          value: '一病区',
          label: '一病区'
        },
        {
          value: '二病区',
          label: '二病区'
        }
      ],
      // 事件主因素
      eventReasonParent: [
        {
          value: '个人因素',
          label: '个人因素'
        },
        {
          value: '设施因素',
          label: '设施因素'
        },
        {
          value: '耗材因素',
          label: '耗材因素'
        },
        {
          value: '制度因素',
          label: '制度因素'
        },
        {
          value: '业务流程因素',
          label: '业务流程因素'
        },
        {
          value: '工作环境因素',
          label: '工作环境因素'
        }
      ],
      // 事件子因素
      eventReasonChildren: [
        {
          value: '手术操作与管理错误',
          label: '手术操作与管理错误'
        },
        {
          value: '检查操作与管理错误',
          label: '检查操作与管理错误'
        },
        {
          value: '标本采集错误',
          label: '标本采集错误'
        },
        {
          value: '护理操作错误',
          label: '护理操作错误'
        },
        {
          value: '患者不遵循规定',
          label: '患者不遵循规定'
        }
      ],
      // 事件类型
      eventTypeData: [
        {
          model11: '',
          value: '医疗管理类',
          label: '医疗管理类',
          children: [
            {
              value: '麻醉阵痛类',
              label: '麻醉阵痛类'
            },
            {
              value: '康复治疗类',
              label: '康复治疗类'
            },
            {
              value: '计划分娩类',
              label: '计划分娩类'
            }
          ]
        },
        {
          model11: '',
          value: '药品管理类',
          label: '药品管理类',
          children: [
            {
              value: '药品治疗类',
              label: '药品治疗类'
            },
            {
              value: '药品不良反应类',
              label: '药品不良反应类'
            },
            {
              value: '药品滥用类',
              label: '药品滥用类'
            }
          ]
        }
      ],
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

      // -------自定义字段super----------
      // 输入框
      formFiledInputList: [],
      // text框
      formFiledTextList: [],
      // 下拉选项
      formFiledPullList: [],
      // 单选选项
      formFiledRadioList: [],
      // 原因块
      formFiledReasonList: [],
      // 事件上报的所有字段内容
      requestArr: [],

      // 事件id
      eventId: ''

    }
  },
  mounted () {
    this.eventId = this.$route.query.eventId
    // 后台获取事件类型
    this.getEventTypeFromService()

    this.getFormSet()
  },
  methods: {
    // 后台获取事件类型
    getEventTypeFromService () {
      this.axios.get('/eventType/show').then((response) => {
        const result = response.data.data
        const rename = treeToRename(result)
        console.log(rename)
        this.eventTypeData = rename
      }).catch((error) => {
        alert(error.message)
      })
    },
    // 确认提交事件
    upReportForm () {
      // this.warningModel = true
      let flag = this.valueCheckShow()
      if (flag === 5) {
        // 可进行上报操作
        // alert(JSON.stringify(this.requestArr))
        let json = JSON.stringify(this.requestArr).toString()
        let map = {
          'eventId': this.eventId,
          'json': json
        }
        this.axios.post('eventInfo/saveReturn', map).then((res) => {
          if (res.data.code === 0) {
            this.$router.push({
              name: 'event_write'
            })
          } else {
            this.$Message.error(res.data.msg)
            this.setFormPullAndReasion()
          }
        }).catch((e) => {
          console.log(e)
        })
      } else {
        // 初始化值
        this.setFormPullAndReasion()
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

    // --------------------------------
    // 初始化上报form
    getFormSet () {
      let requestParam = {
        fieldAscion: '事件填报'
      }
      this.axios.get('formset/getFormSetList', { params: requestParam }).then((res) => {
        if (res.data.code === 0) {
          let result = res.data.data
          this.formFiledInputList = result.filter(item => item.fieldType === '输入框')
          this.formFiledTextList = result.filter(item => item.fieldType === '多行文本框')
          this.formFiledPullList = result.filter(item => item.fieldType === '下拉框' && item.pullName !== '事件因素')
          this.formFiledRadioList = result.filter(item => item.fieldType === '单选框')
          this.formFiledReasonList = result.filter(item => item.fieldType === '下拉框' && item.pullName === '事件因素')
        }
      }).catch((e) => {
        console.log(e)
      })
    },
    // 重置pull 和原因
    setFormPullAndReasion () {
      this.axios.get('formset/getFormSetList').then((res) => {
        if (res.data.code === 0) {
          let result = res.data.data
          this.formFiledPullList = result.filter(item => item.fieldType === '下拉框' && item.pullName !== '事件因素')
          this.formFiledReasonList = result.filter(item => item.fieldType === '下拉框' && item.pullName === '事件因素')
        }
      }).catch((e) => {
        console.log(e)
      })
    },
    // input text radio pull 数值验证
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
    // 原因填写验证
    valueCheckReason (reasonList) {
      var arr = new Array()
      reasonList.map(item => {
        if (item.formValue != null && item.formValue.length > 0) {
          item.formValue = item.formValue.toString()
          arr.push(item)
        }
      })
      return arr
    },
    // 提交上报的检测
    valueCheckShow () {
      let flag = 0
      // 填写信息 验证
      let inputList = this.formFiledInputList.map(item => {
        this.$delete(item, 'itemList')
        return item
      })
      let result = this.valueCheck(inputList)
      if (result == null || result.length === 0) {
        this.$Message.error('输入框有未填报的字段')
      } else {
        flag++
        for (var i = 0; i <= inputList.length; i++) {
          this.requestArr.push(inputList[i])
        }
      }
      // radio 验证
      let radioList = this.formFiledRadioList.map(item => {
        this.$delete(item, 'itemList')
        return item
      })
      let result2 = this.valueCheck(radioList)
      if (result2 == null || result2.length === 0) {
        this.$Message.error('单选按钮有未填报的字段')
      } else {
        flag++
        for (var i = 0; i <= radioList.length; i++) {
          this.requestArr.push(radioList[i])
        }
      }
      // pull 下拉
      let pullList = this.formFiledPullList.map(item => {
        this.$delete(item, 'itemList')
        return item
      })
      let result3 = this.valueCheck(pullList)
      if (result3 == null || result3.length === 0) {
        this.$Message.error('pull下拉框有未填报的字段')
      } else {
        flag++
        for (var i = 0; i <= pullList.length; i++) {
          this.requestArr.push(pullList[i])
        }
      }
      // text 文本框
      let textList = this.formFiledTextList.map(item => {
        this.$delete(item, 'itemList')
        return item
      })
      let result4 = this.valueCheck(textList)
      if (result4 == null || result4.length === 0) {
        this.$Message.error('文本框有未填报的字段')
      } else {
        flag++
        for (var i = 0; i <= textList.length; i++) {
          this.requestArr.push(textList[i])
        }
      }
      // 事件原因因素
      let reasonList = this.formFiledReasonList.map(item => {
        this.$delete(item, 'itemList')
        return item
      })
      let result5 = this.valueCheckReason(reasonList)
      if (result5 == null || result5.length === 0) {
        this.$Message.error('事件原因因素至少选择填写一个')
      } else {
        flag++
        for (var i = 0; i <= result5.length; i++) {
          this.requestArr.push(result5[i])
        }
      }
      this.requestArr = this.requestArr.filter(item => item != null)
      return flag
    }

  }
}
</script>

<style scoped>
  .ts-msg{
    font-size: 12px;
    color: #ff0000;
    line-height: 12px;
    top: 38px;
    width: 100%;
    left: 0;
    position: absolute;
  }
  .step-po-style{
    position: fixed;
    top: 123px;
    width:auto;
    z-index: 0;
  }
  .warning-text{
    font-size: 12px;
    font-family: 微软雅黑;
  }
  .warning-title-ico{
    font-size: 24px;
    color: #ff9900;
    margin-right: 8px;
    /*vertical-align: middle;*/
  }
  .warning-title{
    font-size: 18px;
    font-family: 微软雅黑;
    font-weight: bold;
    color: #323232;
    padding-bottom: 5px;
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
