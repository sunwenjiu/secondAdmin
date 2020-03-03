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
      <div slot="title">输血不良反应详情</div>
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
                    <p class="msg-item-p">{{eventContent.patName}}</p>
                  </div>
                </FormItem>
              </Col>
              <Col span="6">
                <FormItem label="性别:">
                  <div class="msg-item-box msg-item-sm-width">
                    <p class="msg-item-p">{{eventContent.patSex}}</p>
                  </div>
                </FormItem>
              </Col>
              <Col span="6">
                <FormItem label="科别:">
                  <div class="msg-item-box msg-item-sm-width">
                    <p class="msg-item-p">{{eventContent.patDeptName}}</p>
                  </div>
                </FormItem>
              </Col>
              <Col span="6">
                <FormItem label="床号:">
                  <div class="msg-item-box msg-item-sm-width">
                    <p class="msg-item-p">{{eventContent.patNumber}}</p>
                  </div>
                </FormItem>
              </Col>
            </Row>
            <Row>
              <Col span="6">
                <FormItem label="年龄:">
                  <div class="msg-item-box msg-item-sm-width">
                    <p class="msg-item-p">{{eventContent.patAge}}</p>
                  </div>
                </FormItem>
              </Col>
              <Col span="6">
                <FormItem label="住院号:">
                  <div class="msg-item-box msg-item-sm-width">
                    <p class="msg-item-p">{{eventContent.patHisId}}</p>
                  </div>
                </FormItem>
              </Col>
              <Col span="6">
                <FormItem label="患者血型:">
                  <div class="msg-item-box msg-item-sm-width">
                    <p class="msg-item-p">{{eventBlood.patBlood}}</p>
                  </div>
                </FormItem>
              </Col>
              <Col span="6">
                <FormItem label="供者血型:">
                  <div class="msg-item-box msg-item-sm-width">
                    <p class="msg-item-p">{{eventBlood.supplyBlood}}</p>
                  </div>
                </FormItem>
              </Col>
            </Row>
            <Row>
              <Col span="6">
                <FormItem label="输血史:">
                  <div class="msg-item-box msg-item-sm-width">
                    <p class="msg-item-p">{{eventBlood.bloodHistory === 0 ? "无" : eventBlood.bloodHistory === 1 ? "有" : eventBlood.bloodHistory}}</p>
                  </div>
                </FormItem>
              </Col>
              <Col span="6">
                <FormItem label="次数:">
                  <div class="msg-item-box msg-item-sm-width">
                    <p class="msg-item-p">{{eventBlood.bloodHistoryCount}}</p>
                  </div>
                </FormItem>
              </Col>
              <Col span="6">
                <FormItem label="妊娠史:">
                  <div class="msg-item-box msg-item-sm-width">
                    <p class="msg-item-p">{{eventBlood.gestationHistory === 0 ? "无" : eventBlood.gestationHistory === 1 ? "有" : eventBlood.gestationHistory}}</p>
                  </div>
                </FormItem>
              </Col>
              <Col span="6">
                <FormItem label="孕产:">
                  <div class="msg-item-box msg-item-sm-width">
                    <p class="msg-item-p">{{eventBlood.maternity}}</p>
                  </div>
                </FormItem>
              </Col>
            </Row>
            <Row :gutter="16">
              <Col span="12">
                <FormItem label="临床诊断:">
                  <div class="msg-item-box msg-item-sm-width msg-item-lg-width msg-item-sm-width-ao">
                    <p class="msg-item-p">{{eventBlood.diagnosis}}</p>
                  </div>
                </FormItem>
              </Col>
              <Col span="12">
                <FormItem label="用药史:">
                  <div class="msg-item-box msg-item-sm-width msg-item-lg-width msg-item-sm-width-ao">
                    <p class="msg-item-p">{{eventBlood.drugHistory}}</p>
                  </div>
                </FormItem>
              </Col>
            </Row>
            <Row>
              <Col span="6">
                <FormItem label="过敏史:">
                  <div class="msg-item-box msg-item-sm-width">
                    <p class="msg-item-p">{{eventBlood.allergy === 0 ? "无" : eventBlood.allergy === 1 ? "有" : eventBlood.allergy}}</p>
                  </div>
                </FormItem>
              </Col>
              <Col span="6">
                <FormItem label="主管医生:">
                  <div class="msg-item-box msg-item-sm-width">
                    <p class="msg-item-p">{{eventBlood.mainDoctor}}</p>
                  </div>
                </FormItem>
              </Col>
            </Row>
          </div>
          <div>
            <div class="subhead-box">
              <div class="subhead-text bgTitleColor-blue">
                <p><Icon type="md-arrow-dropright-circle" />&nbsp;输注信息</p>
              </div>
              <div class="subhead-triangle-style borderColor-blue"></div>
              <p class="subhead-ico"><Icon type="md-apps"  /></p>
            </div>
            <Row style="margin-top: 30px">
              <Col span="6">
                <FormItem label="输注成分:">
                  <div class="msg-item-box msg-item-sm-width">
                    <p class="msg-item-p">{{eventBlood.infusionComponents}}</p>
                  </div>
                </FormItem>
              </Col>
              <Col span="6">
                <FormItem label="血袋号:">
                  <div class="msg-item-box msg-item-sm-width">
                    <p class="msg-item-p">{{eventBlood.bloodNumber}}</p>
                  </div>
                </FormItem>
              </Col>
              <Col span="6">
                <FormItem label="已输血量:">
                  <div class="msg-item-box msg-item-sm-width">
                    <p class="msg-item-p">{{eventBlood.bloodVol}}</p>
                  </div>
                </FormItem>
              </Col>
              <Col span="6">
                <FormItem label="剩余量:">
                  <div class="msg-item-box msg-item-sm-width">
                    <p class="msg-item-p">{{eventBlood.bloodVolSurplus}}</p>
                  </div>
                </FormItem>
              </Col>
            </Row>
            <Row>
              <Col span="6">
                <FormItem label="其它输注成分:">
                  <div class="msg-item-box msg-item-sm-width">
                    <p class="msg-item-p">{{eventBlood.infusionComponentsOther}}</p>
                  </div>
                </FormItem>
              </Col>
              <Col span="6">
                <FormItem label="输血日期:">
                  <div class="msg-item-box msg-item-sm-width">
                    <p class="msg-item-p">{{eventBlood.joinBloodTime != null ? this.xdate.format(eventBlood.joinBloodTime, 'yyyy-MM-dd') : eventBlood.joinBloodTime}}</p>
                  </div>
                </FormItem>
              </Col>
              <Col span="6">
                <FormItem label="输血开始时间:">
                  <div class="msg-item-box msg-item-sm-width">
                    <p class="msg-item-p">{{eventBlood.enterBloodTime != null ? this.xdate.format(eventBlood.enterBloodTime, 'yyyy-MM-dd HH:mm:ss') : eventBlood.enterBloodTime}}</p>
                  </div>
                </FormItem>
              </Col>
              <Col span="6">
                <FormItem label="停止时间:">
                  <div class="msg-item-box msg-item-sm-width">
                    <p class="msg-item-p">{{eventBlood.endBloodTime != null ? this.xdate.format(eventBlood.endBloodTime, 'yyyy-MM-dd HH:mm:ss') : eventBlood.endBloodTime}}</p>
                  </div>
                </FormItem>
              </Col>
            </Row>
            <Row>
              <Col span="12">
                <FormItem label="输血反应发生时间:" :label-width="120">
                  <span class="fl ma-right">输血过程中</span>
                  <div class="msg-item-box msg-item-sm-width msg-item-sm-width-ao fl ma-right" style="width: 200px;margin-right: 40px">
                    <p class="msg-item-p">{{eventBlood.transfusionreactionTimeIng != null ? this.xdate.format(eventBlood.transfusionreactionTimeIng, 'yyyy-MM-dd HH:mm:ss') : eventBlood.transfusionreactionTimeIng}}</p>
                  </div>
                  <span class="fl ma-right">输血后</span>
                  <div class="msg-item-box msg-item-sm-width msg-item-sm-width-ao fl ma-right" style="width: 50px">
                    <p class="msg-item-p">{{eventBlood.transfusionreactionTimeEndday}}</p>
                  </div>
                  <span class="fl ma-right">天</span>
                  <div class="msg-item-box msg-item-sm-width msg-item-sm-width-ao fl ma-right" style="width: 50px">
                    <p class="msg-item-p">{{eventBlood.transfusionreactionTimeEndTime}}</p>
                  </div>
                  <span class="fl ma-right">小时</span>
                </FormItem>
              </Col>
              <Col span="12">
                <FormItem label="输血反应的症状与体征:" :label-width="140">
                  <div class="msg-item-box msg-item-sm-width  msg-item-sm-width-ao" style="width: 200px">
                    <p class="msg-item-p">{{eventBlood.transfusionreactionSymptoms}}</p>
                  </div>
                </FormItem>
              </Col>
            </Row>
            <Row>
              <Col span="12">
                <FormItem label="其它输血反应的症状与体征:" :label-width="140">
                  <div class="msg-item-box msg-item-sm-width  msg-item-sm-width-ao">
                    <p class="msg-item-p">{{eventBlood.transfusionreactionSymptomsOther}}</p>
                  </div>
                </FormItem>
              </Col>
            </Row>
          </div>
          <div>
            <div class="subhead-box">
              <div class="subhead-text bgTitleColor-blue">
                <p><Icon type="md-arrow-dropright-circle" />&nbsp;临床处置</p>
              </div>
              <div class="subhead-triangle-style borderColor-blue"></div>
              <p class="subhead-ico"><Icon type="md-apps"  /></p>
            </div>
            <Row style="margin-top: 30px">
              <Col span="12">
                <FormItem label="临床处理程序:" :label-width="90">
                  <div class="msg-item-box msg-item-sm-width  msg-item-sm-width-ao">
                    <p class="msg-item-p">{{eventBlood.clinicalProcedures}}</p>
                  </div>
                </FormItem>
              </Col>
            </Row>
            <Row :gutter="16">
              <Col span="24">
                <FormItem label="临床诊断:">
                  <div class="msg-item-box msg-item-sm-width msg-item-lg-width msg-item-sm-width-ao">
                    <p class="msg-item-p">{{eventBlood.clinicalProceduresDesc}}</p>
                  </div>
                </FormItem>
              </Col>
            </Row>
            <Row>
              <Col span="6">
                <FormItem label="临床科室汇报时间:" :label-width="130">
                  <div class="msg-item-box msg-item-sm-width">
                    <p class="msg-item-p">{{eventBlood.clinicalDeptReportTime != null ? this.xdate.format(eventBlood.clinicalDeptReportTime, 'yyyy-MM-dd HH:mm:ss') : eventBlood.clinicalDeptReportTime}}</p>
                  </div>
                </FormItem>
              </Col>
              <Col span="6">
                <FormItem label="报告人:">
                  <div class="msg-item-box msg-item-sm-width">
                    <p class="msg-item-p">{{eventBlood.clinicalDeptReportUser}}</p>
                  </div>
                </FormItem>
              </Col>
              <Col span="6">
                <FormItem label="记录时间:">
                  <div class="msg-item-box msg-item-sm-width">
                    <p class="msg-item-p">{{eventBlood.reportTime != null ? this.xdate.format(eventBlood.reportTime, 'yyyy-MM-dd HH:mm:ss') : eventBlood.reportTime}}</p>
                  </div>
                </FormItem>
              </Col>
              <Col span="6">
                <FormItem label="记录人:">
                  <div class="msg-item-box msg-item-sm-width">
                    <p class="msg-item-p">{{eventBlood.reportUser}}</p>
                  </div>
                </FormItem>
              </Col>
            </Row>
            <Row>
              <Col span="6">
                <FormItem label="事件发生时间:">
                  <div class="msg-item-box msg-item-sm-width">
                    <p class="msg-item-p">{{eventContent.happenTime != null ? this.xdate.format(eventContent.happenTime, 'yyyy-MM-dd HH:mm:ss') : eventContent.happenTime}}</p>
                  </div>
                </FormItem>
              </Col>
              <Col span="6">
                <FormItem label="事件发生地点:">
                  <div class="msg-item-box msg-item-sm-width">
                    <p class="msg-item-p">{{happenAddress}}</p>
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
  export default {
    data () {
      return {
        showType: this.$route.query.showType,
        eventBlood: {},
        eventContent: {},
        formItem: {},
        happenAddress: '',
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
      this.pageByIdAndTypeId()
    },
    methods: {
      pageByIdAndTypeId () {
        this.axios.get('/eventContent/getEventContentInfo',
          {
            params: {
              eventContentId: this.$route.query.eventContentId,
              eventTypeId: this.$route.query.eventTypeId
            }
          }).then((res) => {
           if (res.data.code === 0) {
             this.eventBlood = res.data.data.son
             this.eventContent = res.data.data.father
             this.happenAddressValue()
             this.showHandlerFrom(res.data.data.handlerFrom)
             this.showHandler(res.data.data.father)
           }
          })
          .catch((error) => {
            console.log(error)
          })
      },
      // 将事件发生地的id转化为name
      happenAddressValue () {
        if (this.eventContent.happenAddress === '1') {
          this.happenAddress = '骨科'
        } else if (this.eventContent.happenAddress === '2') {
          this.happenAddress = '肝胆科'
        } else if (this.eventContent.happenAddress === '3') {
          this.happenAddress = '皮肤科'
        }
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

    }
  }
</script>

<style>

</style>
