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
        <div slot="title">护理不良事件</div>
        <div>
          <Form :label-width="90">
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
                         <p class="msg-item-p">{{ formItemFather.patName }}</p>
                    </div>
                  </FormItem>
                </Col>
                <Col span="6">
                  <FormItem label="性别:">
                    <div class="msg-item-box msg-item-sm-width">
                      <p class="msg-item-p">{{ formItemFather.patSex }}</p>
                    </div>
                  </FormItem>
                </Col>
                <Col span="6">
                  <FormItem label="出生年月日:">
                    <div class="msg-item-box msg-item-sm-width">
                      <p class="msg-item-p">{{formItemFather.patBirthday }}</p>
                    </div>
                  </FormItem>
                </Col>
                <Col span="6">
                  <FormItem label="年龄:">
                    <div class="msg-item-box msg-item-sm-width">
                      <p class="msg-item-p">{{ formItemFather.patAge }}</p>
                    </div>
                  </FormItem>
                </Col>
              </Row>
              <Row>
                <Col span="6">
                  <FormItem label="床号:">
                    <div class="msg-item-box msg-item-sm-width">
                      <p class="msg-item-p">{{ formItemSon.bedNumber }}</p>
                    </div>
                  </FormItem>
                </Col>
                <Col span="6">
                  <FormItem label="住院号:">
                    <div class="msg-item-box msg-item-sm-width">
                      <p class="msg-item-p">{{ formItemFather.patHisId }}</p>
                    </div>
                  </FormItem>
                </Col>
                <Col span="6">
                  <FormItem label="入院时间:">
                    <div class="msg-item-box msg-item-sm-width">
                      <p class="msg-item-p">{{ formItemSon.admissionTime }}</p>
                    </div>
                  </FormItem>
                </Col>
                <Col span="6">
                  <FormItem label="诊断:">
                    <div class="msg-item-box msg-item-sm-width">
                      <p class="msg-item-p">{{ formItemSon.diagnosis }}</p>
                    </div>
                  </FormItem>
                </Col>
              </Row>
            </div>
            <div>
              <div class="subhead-box">
                <div class="subhead-text bgTitleColor-blue">
                  <p><Icon type="md-arrow-dropright-circle" />&nbsp;事件类型</p>
                </div>
                <div class="subhead-triangle-style borderColor-blue"></div>
                <p class="subhead-ico"><Icon type="md-apps"  /></p>
              </div>
              <Row style="margin-top: 30px">
                <Col span="12">
                  <FormItem label="事件类型选择:">
                    <div class="msg-item-box msg-item-sm-width msg-item-sm-width-ao">
                    <!--  <span class="msg-item-p">{{ formItemSon.typesOfNursingEvents}}</span><span class="msg-item-p">,{{ formItemSon.typesOfNursingEventsOther}}</span>-->
                      <p class="msg-item-p">{{ formItemSon.typesOfNursingEvents}}<span  v-show="formItemSon.typesOfNursingEvents && formItemSon.typesOfNursingEventsOther">,</span><span>{{ formItemSon.typesOfNursingEventsOther}}</span></p>
                    </div>
                  </FormItem>
                </Col>
              </Row>
            </div>
            <div>
              <div class="subhead-box">
                <div class="subhead-text bgTitleColor-blue">
                  <p><Icon type="md-arrow-dropright-circle" />&nbsp;事件类型</p>
                </div>
                <div class="subhead-triangle-style borderColor-blue"></div>
                <p class="subhead-ico"><Icon type="md-apps"  /></p>
              </div>
              <Row style="margin-top: 30px" :gutter="16">
                <Col span="12">
                  <FormItem label="事件发生时间:">
                    <div class="msg-item-box msg-item-sm-width msg-item-sm-width-ao">
                      <p class="msg-item-p">{{ formItemFather.happenTime}}</p>
                    </div>
                  </FormItem>
                </Col>
                <Col span="12">
                  <FormItem label="事件发生地点:">
                    <div class="msg-item-box msg-item-sm-width msg-item-sm-width-ao">
                      <p class="msg-item-p">{{ formItemFather.happenAddress}}<span v-show="formItemFather.happenAddress &&
formItemFather.eventHappenAddressOther">,</span><span>{{ formItemFather.eventHappenAddressOther}}</span></p>
                    </div>
                  </FormItem>
                </Col>
              </Row>
              <Row :gutter="16">
                <Col span="24">
                  <FormItem label="情况说明:">
                    <div class="msg-item-box msg-item-sm-width msg-item-lg-width msg-item-sm-width-ao">
                      <p class="msg-item-p">{{ formItemSon.situationDescription}}</p>
                    </div>
                  </FormItem>
                </Col>
              </Row>
            </div>
            <div>
              <div class="subhead-box">
                <div class="subhead-text bgTitleColor-blue">
                  <p><Icon type="md-arrow-dropright-circle" />&nbsp;事件发生时处理</p>
                </div>
                <div class="subhead-triangle-style borderColor-blue"></div>
                <p class="subhead-ico"><Icon type="md-apps"  /></p>
              </div>
              <Row style="margin-top: 30px" :gutter="16">
                <Col span="24">
                  <FormItem label="处理人员:" v-show="formItemSon.selectiveNurse">
                    <div class="msg-item-box msg-item-sm-width msg-item-sm-width-ao fl ma-right" style="width: 100px">
                      <p class="msg-item-p">{{ formItemSon.participateHandleNurseName }}</p>
                    </div>
                   <!-- <div class="msg-item-box msg-item-sm-width msg-item-sm-width-ao fl ma-right" style="width: 150px">
                      <p class="msg-item-p">欧阳张三</p>
                    </div>-->
                    <span class="fl ma-right">于</span>
                    <div class="msg-item-box msg-item-sm-width msg-item-sm-width-ao fl ma-right" style="width: 150px">
                      <p class="msg-item-p">{{ formItemSon.participateHandleNurseVisitTime }}</p>
                    </div>
                    <span class="fl ma-right">看望患者，</span>
                    <div class="msg-item-box msg-item-sm-width msg-item-sm-width-ao fl ma-right" style="width: 150px">
                      <p class="msg-item-p">{{ formItemSon.participateHandleNurseHandleTime }}</p>
                    </div>
                    <span class="fl ma-right">进行处理。</span>
                  </FormItem>
                  <FormItem label="处理人员:" v-show="formItemSon.selectiveDoctor">
                    <div class="msg-item-box msg-item-sm-width msg-item-sm-width-ao fl ma-right" style="width: 100px">
                      <p class="msg-item-p">{{ formItemSon.participateHandleDoctorName }}</p>
                    </div>
                    <span class="fl ma-right">于</span>
                    <div class="msg-item-box msg-item-sm-width msg-item-sm-width-ao fl ma-right" style="width: 150px">
                      <p class="msg-item-p">{{ formItemSon.participateHandleDoctorVisitTime }}</p>
                    </div>
                    <span class="fl ma-right">看望患者，</span>
                    <div class="msg-item-box msg-item-sm-width msg-item-sm-width-ao fl ma-right" style="width: 150px">
                      <p class="msg-item-p">{{ formItemSon.participateHandleDoctorHandleTime }}</p>
                    </div>
                    <span class="fl ma-right">进行处理。</span>
                  </FormItem>
                </Col>
              </Row>
              <Row :gutter="16">
                <Col span="12">
                  <FormItem label="立即通知:">
                    <div class="msg-item-box msg-item-sm-width msg-item-sm-width-ao">
                      <p class="msg-item-p">{{ formItemSon.immediateNotice }}</p>
                    </div>
                  </FormItem>
                </Col>
                <Col span="12">
                  <FormItem label="通知家属:">
                    <div class="msg-item-box msg-item-sm-width msg-item-sm-width-ao fl ma-right" style="width: 40px">
                      <p class="msg-item-p">{{ formItemSon.informFamilyMembersBoolean }}</p>
                    </div>
                    <div v-if=" formItemSon.informFamilyMembersBoolean === '是'">
                      <span class="fl ma-right">于</span>
                    <div  class="msg-item-box msg-item-sm-width msg-item-sm-width-ao fl ma-right" style="width: 150px">
                      <p class="msg-item-p">{{ formItemSon.informFamilyMembersTime }}</p>
                    </div>
                    <span class="fl ma-right">通知</span>
                    </div>
                    <div v-else class="msg-item-box msg-item-sm-width msg-item-sm-width-ao fl ma-right" style="width: 300px">
                      <p class="msg-item-p">{{ formItemSon.informFamilyMembersReason }}</p>
                    </div>
                  </FormItem>
                </Col>
              </Row>
              <Row :gutter="16">
                <Col span="12">
                  <FormItem label="发生严重不良事件时还同时通知:" :label-width="110">
                    <div class="msg-item-box msg-item-sm-width msg-item-sm-width-ao">
                      <p class="msg-item-p">{{ formItemSon.tooInform }}<span v-show="formItemSon.tooInform && formItemSon.tooInformOther">,</span><span>{{ formItemSon.tooInformOther }}</span></p>
                    </div>
                  </FormItem>
                </Col>
                <Col span="12">
                  <FormItem label="处理情况:">
                    <div class="msg-item-box msg-item-sm-width msg-item-sm-width-ao">
                      <p class="msg-item-p">{{ formItemSon.handlingSituation }}<span v-show="formItemSon.handlingSituation && formItemSon.handlingSituationOther">,</span><span>{{ formItemSon.handlingSituationOther }}</span></p>
                    </div>
                  </FormItem>
                </Col>
              </Row>
            </div>
            <div>
              <div class="subhead-box">
                <div class="subhead-text bgTitleColor-blue">
                  <p><Icon type="md-arrow-dropright-circle" />&nbsp;上报情况</p>
                </div>
                <div class="subhead-triangle-style borderColor-blue"></div>
                <p class="subhead-ico"><Icon type="md-apps"  /></p>
              </div>
              <Row style="margin-top: 30px" :gutter="16">
                <Col span="6">
                  <FormItem label="当事人:">
                    <div class="msg-item-box msg-item-sm-width msg-item-sm-width-ao">
                      <p class="msg-item-p">{{ formItemSon.personConcerned }}</p>
                    </div>
                  </FormItem>
                </Col>
                <Col span="6">
                  <FormItem label="是否主动上报:">
                    <div class="msg-item-box msg-item-sm-width msg-item-sm-width-ao">
                      <p class="msg-item-p">{{ formItemSon.personConcernedActiveReport }}</p>
                    </div>
                  </FormItem>
                </Col>
                <Col span="6">
                  <FormItem label="护士分级:">
                    <div class="msg-item-box msg-item-sm-width msg-item-sm-width-ao">
                      <p class="msg-item-p">{{ formItemSon.nurseGrading }}</p>
                    </div>
                  </FormItem>
                </Col>
                <Col span="6">
                  <FormItem label="职称:">
                    <div class="msg-item-box msg-item-sm-width msg-item-sm-width-ao">
                      <p class="msg-item-p">{{ formItemSon.nurseTitle }}</p>
                    </div>
                  </FormItem>
                </Col>
              </Row>
              <Row :gutter="16">
                <Col span="6">
                  <FormItem label="任职年限:">
                    <div class="msg-item-box msg-item-sm-width msg-item-sm-width-ao">
                      <p class="msg-item-p">{{ formItemSon.nurseTenureOfService }}</p>
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
       // eventTypeId: this.$route.query.eventTypeId,
       // eventContentId: this.$route.query.eventContentId,
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
        this.formItemFather.patBirthday = formatDate(new Date(father.patBirthday), 'yyyy-MM-dd') // 生日
        this.formItemFather.happenTime = formatDate(new Date(father.happenTime), 'yyyy-MM-dd') // 生日
        this.formItemSon.admissionTime = formatDate(new Date(son.admissionTime), 'yyyy-MM-dd') // 入院时间
        this.formItemSon.participateHandleNurseVisitTime = formatDate(new Date(son.participateHandleNurseVisitTime), 'yyyy-MM-dd hh:mm') // 护士看望时间
        this.formItemSon.participateHandleNurseHandleTime = formatDate(new Date(son.participateHandleNurseHandleTime), 'yyyy-MM-dd hh:mm') // 护士处理时间
        this.formItemSon.participateHandleDoctorVisitTime = formatDate(new Date(son.participateHandleDoctorVisitTime), 'yyyy-MM-dd hh:mm') // 医生看望时间
        this.formItemSon.participateHandleDoctorHandleTime = formatDate(new Date(son.participateHandleDoctorHandleTime), 'yyyy-MM-dd hh:mm') // 医生处理时间
        this.formItemSon.informFamilyMembersTime = formatDate(new Date(son.informFamilyMembersTime), 'yyyy-MM-dd hh:mm') // 通知家属时间
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
