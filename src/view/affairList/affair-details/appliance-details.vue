<template>
  <div>
    <!--处理表单-->
    <Modal
      v-model="handlerFromModel"
      title="处理填写"
      @on-ok="handlerOk"
      width="1100"
      @on-cancel="cancel">
      <div >
        <form-create v-model="fromF" :rule="rule" :option="option"></form-create>
      </div>
    </Modal>
    <!--委托选择-->
    <Modal
      v-model="assigneeModel"
      title="委托代办选择"
      @on-ok="assigneeOk"
      width="1100"
      @on-cancel="cancel">
      <div >
        <Cascader :data="roleUserList"  @on-change="taskSelect"></Cascader>
      </div>
    </Modal>
    <!--驳回-->
    <Modal
      v-model="rejectModel"
      title="驳回描述"
      @on-ok="rejectOk"
      width="1100"
      @on-cancel="cancel">
      <div >
        <Input v-model="rejectVal" type="textarea" :rows="7" placeholder="请输入驳回描述..." />
      </div>
    </Modal>
    <Card  class="card-title-style bgColor-dark">
      <div slot="title">器械详情</div>
      <div>
        <Form :model="formItem" :label-width="90">
          <div>
            <div class="subhead-box">
              <div class="subhead-text bgTitleColor-blue">
                <p><Icon type="md-arrow-dropright-circle" />&nbsp;患者资料</p>
              </div>
              <div class="subhead-triangle-style borderColor-blue"></div>
              <p class="subhead-ico"><Icon type="md-apps"  /></p>
            </div>
            <Row style="margin-top: 30px">
              <Col span="6">
                <FormItem label="姓名:">
                  <div class="msg-item-box msg-item-sm-width">
                    <p class="msg-item-p">{{ formItemFather.patName}}</p>
                  </div>
                </FormItem>
              </Col>
              <Col span="6">
                <FormItem label="性别:">
                  <div class="msg-item-box msg-item-sm-width">
                    <p class="msg-item-p">{{ formItemFather.patSex}}</p>
                  </div>
                </FormItem>
              </Col>
              <Col span="6">
                <FormItem label="年龄:">
                  <div class="msg-item-box msg-item-sm-width">
                    <p class="msg-item-p">{{ formItemFather.patAge}}</p>
                  </div>
                </FormItem>
              </Col>
            </Row>
            <Row>
              <Col span="24">
                <FormItem label="预期治疗疾病或作用:">
                  <div class="msg-item-box msg-item-sm-width msg-item-lg-width msg-item-sm-width-ao">
                    <p class="msg-item-p">{{ formItemSon.intendedTreatmentOfDiseaseOrEffect}}</p>
                  </div>
                </FormItem>
              </Col>
            </Row>
          </div>
          <div>
            <div class="subhead-box">
              <div class="subhead-text bgTitleColor-blue">
                <p><Icon type="md-arrow-dropright-circle" />&nbsp;不良事件情况</p>
              </div>
              <div class="subhead-triangle-style borderColor-blue"></div>
              <p class="subhead-ico"><Icon type="md-apps"  /></p>
            </div>
            <Row style="margin-top: 30px">
              <Col span="24">
                <FormItem label="事件主要表现:">
                  <div class="msg-item-box msg-item-sm-width msg-item-lg-width msg-item-sm-width-ao">
                    <p class="msg-item-p">{{ formItemSon.mainPerformanceOfTheEvent}}</p>
                  </div>
                </FormItem>
              </Col>
            </Row>
            <Row>
              <Col span="6">
                <FormItem label="事件发生日期:">
                  <div class="msg-item-box msg-item-sm-width">
                    <p class="msg-item-p">{{ formItemFather.happenTime}}</p>
                  </div>
                </FormItem>
              </Col>
              <Col span="6">
                <FormItem label="发现或者知悉时间:" :label-width="120">
                  <div class="msg-item-box msg-item-sm-width">
                    <p class="msg-item-p">{{ formItemSon.timeOfDiscoveryOrKnowledge}}</p>
                  </div>
                </FormItem>
              </Col>
              <Col span="6">
                <FormItem label="医疗器械实际使用场所:" :label-width="140">
                  <div class="msg-item-box msg-item-sm-width">
                    <p class="msg-item-p">{{ formItemSon.actualUsePlaceOfMedicalDevices}}<span v-show="formItemSon.actualUsePlaceOfMedicalDevices && formItemSon.actualUsePlaceOfMedicalDevicesOther">,</span><span>{{ formItemSon.actualUsePlaceOfMedicalDevicesOther}}</span></p>
                  </div>
                </FormItem>
              </Col>
            </Row>
            <Row :gutter="16">
              <Col span="12">
                <FormItem label="事件后果:">
                  <div class="msg-item-box msg-item-sm-width msg-item-sm-width-ao">
                    <p class="msg-item-p">{{ formItemSon.eventConsequence}}<span v-show="formItemSon.eventConsequence === '死亡'" v>，于{{formItemSon.deathTime}}死亡</span></p>
                  </div>
                </FormItem>
              </Col>
              <Col span="12">
                <FormItem label="不良事件等级:">
                  <div class="msg-item-box msg-item-sm-width msg-item-sm-width-ao">
                    <p class="msg-item-p">{{ formItemFather.eventLevelName}}</p>
                  </div>
                </FormItem>
              </Col>
            </Row>
            <Row>
              <Col span="24">
                <FormItem label="事件陈述:">
                  <div class="msg-item-box msg-item-sm-width msg-item-lg-width msg-item-sm-width-ao">
                    <p class="msg-item-p">{{ formItemSon.eventStatement}}</p>
                  </div>
                </FormItem>
              </Col>
            </Row>
          </div>
          <div>
            <div class="subhead-box">
              <div class="subhead-text bgTitleColor-blue">
                <p><Icon type="md-arrow-dropright-circle" />&nbsp;医疗器械情况</p>
              </div>
              <div class="subhead-triangle-style borderColor-blue"></div>
              <p class="subhead-ico"><Icon type="md-apps"  /></p>
            </div>
            <Row style="margin-top: 30px">
              <Col span="6">
                <FormItem label="产品名称:">
                  <div class="msg-item-box msg-item-sm-width">
                    <p class="msg-item-p">{{ formItemSon.productName}}</p>
                  </div>
                </FormItem>
              </Col>
              <Col span="6">
                <FormItem label="商品名称:">
                  <div class="msg-item-box msg-item-sm-width">
                    <p class="msg-item-p">{{ formItemSon.tradeName}}</p>
                  </div>
                </FormItem>
              </Col>
              <Col span="6">
                <FormItem label="注册证号:">
                  <div class="msg-item-box msg-item-sm-width">
                    <p class="msg-item-p">{{ formItemSon.registrationCertificateNo}}</p>
                  </div>
                </FormItem>
              </Col>
              <Col span="6">
                <FormItem label="生产企业名称:">
                  <div class="msg-item-box msg-item-sm-width">
                    <p class="msg-item-p">{{ formItemSon.nameOfManufacturer}}</p>
                  </div>
                </FormItem>
              </Col>
            </Row>
            <Row>
              <Col span="6">
                <FormItem label="生产企业地址:">
                  <div class="msg-item-box msg-item-sm-width">
                    <p class="msg-item-p">{{ formItemSon.addressOfManufacturer}}</p>
                  </div>
                </FormItem>
              </Col>
              <Col span="6">
                <FormItem label="企业联系电话:">
                  <div class="msg-item-box msg-item-sm-width">
                    <p class="msg-item-p">{{ formItemSon.businessContactNumber}}</p>
                  </div>
                </FormItem>
              </Col>
              <Col span="6">
                <FormItem label="型号规格:">
                  <div class="msg-item-box msg-item-sm-width">
                    <p class="msg-item-p">{{ formItemSon.modelSpecification}}</p>
                  </div>
                </FormItem>
              </Col>
              <Col span="6">
                <FormItem label="产品编号:">
                  <div class="msg-item-box msg-item-sm-width">
                    <p class="msg-item-p">{{ formItemSon.productNumber}}</p>
                  </div>
                </FormItem>
              </Col>
            </Row>
            <Row>
              <Col span="6">
                <FormItem label="产品批号:">
                  <div class="msg-item-box msg-item-sm-width">
                    <p class="msg-item-p">{{ formItemSon.productBatchNumber}}</p>
                  </div>
                </FormItem>
              </Col>
              <Col span="6">
                <FormItem label="操作人:">
                  <div class="msg-item-box msg-item-sm-width">
                    <p class="msg-item-p">{{ formItemSon.operator}}<span v-show="formItemSon.operator && formItemSon.operatorOther">,</span><span>{{ formItemSon.operatorOther}}</span></p>
                  </div>
                </FormItem>
              </Col>
              <Col span="6">
                <FormItem label="有效期至:">
                  <div class="msg-item-box msg-item-sm-width">
                    <p class="msg-item-p">{{ formItemSon.termOfValidity}}</p>
                  </div>
                </FormItem>
              </Col>
              <Col span="6">
                <FormItem label="生产日期:">
                  <div class="msg-item-box msg-item-sm-width">
                    <p class="msg-item-p">{{ formItemSon.dateOfManufacture}}</p>
                  </div>
                </FormItem>
              </Col>
            </Row>
            <Row>
              <Col span="6">
                <FormItem label="停用日期:">
                  <div class="msg-item-box msg-item-sm-width">
                    <p class="msg-item-p">{{ formItemSon.deactivationDate}}</p>
                  </div>
                </FormItem>
              </Col>
              <Col span="6">
                <FormItem label="植入日期(若植入):">
                  <div class="msg-item-box msg-item-sm-width">
                    <p class="msg-item-p">{{ formItemSon.dateOfImplantation}}</p>
                  </div>
                </FormItem>
              </Col>
              <Col span="12">
                <FormItem label="事件报告状态:">
                  <div class="msg-item-box msg-item-sm-width msg-item-sm-width-ao">
                    <p class="msg-item-p">{{ formItemSon.eventReportStatus}}</p>
                  </div>
                </FormItem>
              </Col>
            </Row>
            <Row :gutter="16">
              <Col span="12">
                <FormItem label="事件发生初步原因分析:">
                  <div class="msg-item-box msg-item-sm-width msg-item-lg-width msg-item-sm-width-ao">
                    <p class="msg-item-p">{{ formItemSon.preliminaryCauseAnalysisOfTheIncident}}</p>
                  </div>
                </FormItem>
              </Col>
              <Col span="12">
                <FormItem label="事件初步处理情况:">
                  <div class="msg-item-box msg-item-sm-width msg-item-lg-width msg-item-sm-width-ao">
                    <p class="msg-item-p">{{ formItemSon.preliminaryHandlingOfTheIncident}}</p>
                  </div>
                </FormItem>
              </Col>
            </Row>
          </div>
          <div>
            <div class="subhead-box">
              <div class="subhead-text bgTitleColor-blue">
                <p><Icon type="md-arrow-dropright-circle" />&nbsp;审批/处理</p>
              </div>
              <div class="subhead-triangle-style borderColor-blue"></div>
              <p class="subhead-ico"><Icon type="md-apps"  /></p>
            </div>
            <div style="margin-top: 30px" v-if="handlerValList.length > 0">
              <!--存放事件处理相关内容-->
              <Row style="margin-top: 30px" :gutter="16">
                <Col span="24" v-for="item in handlerValList" :key="item.field">
                  <FormItem :label="item.field">
                    <div class="msg-item-box msg-item-sm-width msg-item-sm-width-ao">
                      <p class="msg-item-p">{{ item.value }}</p>
                    </div>
                  </FormItem>
                </Col>
              </Row>
            </div>
            <div style="margin-top: 30px" v-else>
              暂时没有处理相关内容
            </div>
          </div>
          <Button type="info" icon="ios-undo" style="width: 300px;margin: 20px 0;margin-right: 25px" @click="rePage">返回上一页</Button>
          <Button type="warning" icon="ios-ribbon" style="width: 300px;margin: 20px 0;margin-right: 25px" v-if="showType === 'handler'" @click="handlerShow">处理</Button>
          <Button type="success" icon="ios-ribbon" style="width: 300px;margin: 20px 0;margin-right: 25px" v-if="showType === 'handler'" @click="assigneeShow">委托</Button>
          <Button type="error" icon="ios-ribbon" style="width: 300px;margin: 20px 0;margin-right: 25px" v-if="showType === 'handler'" @click="rejectShow">驳回</Button>
        </Form>
      </div>
    </Card>
  </div>
</template>

<script>
  import { formatDate } from '../../../libs/data.js'
export default {
  data () {
    return {
      showType: this.$route.query.showType,
      formItemFather: { },
      formItemSon: { },
      value222: '',
      qxNumber: '',
      causeModel: '',
      causeList: [
        {
          value: '1',
          label: '总值班'
        },
        {
          value: '2',
          label: '质控部'
        },
        {
          value: '3',
          label: '其它'
        }
      ],
      RadioNum: '1',
      cityList: [
        {
          value: 'New York',
          label: '欧阳张三'
        },
        {
          value: 'London',
          label: '慕容李四'
        },
        {
          value: 'Sydney',
          label: '诸葛王五'
        }
      ],
      doctorList: [
        {
          value: 'doc',
          label: '医生'
        },
        {
          value: 'nur',
          label: '护士'
        }
      ],
      staffModel: '',
      formItem: {
        input: '',
        sex: '女',
        radio: 'male',
        checkbox: [],
        date: ''
      },
      // 委托弹窗
      assigneeModel: false,
      // 处理弹窗
      handlerFromModel: false,
      // 驳回弹窗
      rejectModel: false,
      // 驳回内容
      rejectVal: '',
      // 动态字段
      fromF: {},
      rule: [],
      option: {
        submitBtn: {
          show: false
        }
      },
      // 处理内容列表
      handlerValList: [],
      // 下拉角色用户列表
      roleUserList: [],
      // 角色用户值
      roleUserVal: ''
    }
  },
  mounted () {
    this.getRoleList()
    this.getEventContentInfo() // 获取事件详情
  },
  methods: {
// 获取事件详情
    getEventContentInfo () {
      let getShowDate = {
        eventTypeId: this.$route.query.eventTypeId,
        eventContentId: this.$route.query.eventContentId
      }
      this.axios.get('/eventContent/getEventContentInfo', { params: getShowDate }).then((response) => {
        // const result = response.data.data
        // console.log(rename)
        this.showDate(response.data.data.father, response.data.data.son)
        this.showHandlerFrom(response.data.data.handlerFrom)
        this.showHandler(response.data.data.father)
        console.log(response)
      }).catch((error) => {
        alert(error.message)
      })
    },
    // 从后端获取的数据，赋值给页面显示的容器
    showDate (father, son) {
      this.formItemFather = father
      this.formItemSon = son
     // this.formItemFather.patBirthday = formatDate(new Date(father.patBirthday), 'yyyy-MM-dd') // 生日
      this.formItemFather.happenTime = formatDate(new Date(father.happenTime), 'yyyy-MM-dd') // 事件发生时间
      this.formItemSon.timeOfDiscoveryOrKnowledge = formatDate(new Date(son.timeOfDiscoveryOrKnowledge), 'yyyy-MM-dd') // 发现或者知悉时间
      this.formItemSon.deathTime = formatDate(new Date(son.deathTime), 'yyyy-MM-dd hh:mm') // 死亡时间
      this.formItemSon.termOfValidity = formatDate(new Date(son.termOfValidity), 'yyyy-MM-dd') // 有效期
      this.formItemSon.dateOfManufacture = formatDate(new Date(son.dateOfManufacture), 'yyyy-MM-dd') // 生产日期
      this.formItemSon.deactivationDate = formatDate(new Date(son.deactivationDate), 'yyyy-MM-dd') // 停用日期
      this.formItemSon.dateOfImplantation = formatDate(new Date(son.dateOfImplantation), 'yyyy-MM-dd') // 植入日期
      console.log(this.formItemFather)
    },
    // 加载委托角色用户选择
    getRoleList () {
      this.axios.get('role/listRoleAndUserAll').then((res) => {
        if (res.data.code === 0) {
          this.roleUserList = res.data.data
        } else {
          this.roleUserList = []
        }
      }).catch((e) => {
        console.log(e)
      })
    },
    // 动态加载处理内容
    showHandler (father) {
      if (father != null) {
        let handlerInfo = father.eventFlowHandlerJson
        if (handlerInfo.length > 0) {
          this.handlerValList = JSON.parse(handlerInfo)
        }
      }
    },
    // 动态加载待处理内容
    showHandlerFrom (handlerFrom) {
      if (handlerFrom != null) {
        this.rule = handlerFrom
      }
    },
    // 处理确认
    handlerOk () {
      let arr = []
      this.rule.forEach(e => {
        if (e.value != null && e.value.length > 0) {
          let obj = {}
          obj.field = e.field
          obj.value = e.value.toString()
          arr.push(obj)
        }
      })
      if (arr.length !== this.rule.length) {
        this.$Message.error('处理项有未填写内容')
      } else {
        // 执行事件处理操作
        this.handlerBtn(this.$route.query.eventContentId, JSON.stringify(arr))
        // alert(JSON.stringify(arr))
      }
    },
    // 委托确认
    assigneeOk () {
      this.assigneeBtn(this.$route.query.eventContentId, this.roleUserVal)
    },
    // 处理取消
    cancel () {
      this.rule.forEach(e => {
        e.value = ''
      })
    },
    // 处理弹窗
    handlerShow () {
      this.handlerFromModel = true
    },
    // 委托弹窗
    assigneeShow () {
      this.assigneeModel = true
    },
    // 委托角色选择
    taskSelect (event, selectedData) {
      // 用户id
      this.roleUserVal = selectedData[1].value
    },
    // 处理操作
    handlerBtn (eventContentId, handlerVal) {
      let requestBody = {
        eventContentId: eventContentId,
        handlerVal: handlerVal
      }
      this.axios.post('eventContent/activieHandler', requestBody).then((res) => {
        if (res.data.code === 0) {
          this.$Message.info('处理成功')
          this.rePage()
        } else {
          this.$Message.error('处理失败')
        }
      }).catch((e) => {
        console.log(e)
      })
    },
    // 委托操作
    assigneeBtn (eventContentId, userId) {
      let requestParam = {
        eventContentId: eventContentId,
        userId: userId
      }
      this.axios.get('eventContent/activieAssignee', { params: requestParam }).then((res) => {
        if (res.data.code === 0) {
          if (res.data.code === 0) {
            this.$Message.info('委托成功')
            this.rePage()
          } else {
            this.$Message.error('委托失败')
          }
        }
      }).catch((e) => {
        console.log(e)
      })
    },
    // 返回列表页
    rePage () {
      if (this.showType === 'writeView') {
        this.$router.push({
          path: 'event_write'
        })
      } else if (this.showType === 'handler' || this.showType === 'handlerView') {
        this.$router.push({
          path: 'event_handle'
        })
      } else if (this.showType === 'mangerView') {
        this.$router.push({
          path: 'event_manager'
        })
      }
    },
    // 驳回弹窗
    rejectShow () {
      this.rejectModel = true
    },
    // 驳回确认
    rejectOk () {
      if (this.rejectVal.length > 0) {
        this.rejectBtn(this.$route.query.eventContentId, this.rejectVal)
      } else {
        this.$Message.error('驳回描述未填写')
      }
    },
    // 驳回操作
    rejectBtn (eventContentId, rejectReason) {
      let requestParam = {
        eventContentId: eventContentId,
        rejectReason: rejectReason
      }
      this.axios.get('eventContent/activieReject', { params: requestParam }).then((res) => {
        if (res.data.code === 0) {
          if (res.data.code === 0) {
            this.$Message.info('驳回成功')
            this.rePage()
          } else {
            this.$Message.error('驳回失败')
          }
        }
      }).catch((e) => {
        console.log(e)
      })
    }
  },
  watch: {
    causeModel (val) {
      // alert(this.causeModel)
    }
  }
}
</script>

<style>

</style>
