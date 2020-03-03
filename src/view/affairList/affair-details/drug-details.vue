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
      <div slot="title">药品不良反应详情</div>
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
                <FormItem label="出生年月日:">
                  <div class="msg-item-box msg-item-sm-width">
                    <p class="msg-item-p">{{eventContent.patBirthday != null ? this.xdate.format(eventContent.patBirthday, 'yyyy-MM-dd') : eventContent.patBirthday}}</p>
                  </div>
                </FormItem>
              </Col>
              <Col span="6">
                <FormItem label="年龄:">
                  <div class="msg-item-box msg-item-sm-width">
                    <p class="msg-item-p">{{eventContent.patAge}}</p>
                  </div>
                </FormItem>
              </Col>
            </Row>
            <Row>
              <Col span="6">
                <FormItem label="体重（kg）:">
                  <div class="msg-item-box msg-item-sm-width">
                    <p class="msg-item-p">{{eventDrug.weight}}</p>
                  </div>
                </FormItem>
              </Col>
              <Col span="6">
                <FormItem label="联系方式:">
                  <div class="msg-item-box msg-item-sm-width">
                    <p class="msg-item-p">{{eventDrug.phone}}</p>
                  </div>
                </FormItem>
              </Col>
              <Col span="6">
                <FormItem label="原患疾病:">
                  <div class="msg-item-box msg-item-sm-width">
                    <p class="msg-item-p">{{eventDrug.primaryDisease}}</p>
                  </div>
                </FormItem>
              </Col>
            </Row>
            <Row>
              <Col span="6">
                <FormItem label="科别:">
                  <div class="msg-item-box msg-item-sm-width">
                    <p class="msg-item-p">{{eventContent.patDeptName}}</p>
                  </div>
                </FormItem>
              </Col>
              <Col span="6">
                <FormItem label="病历号/门诊号:">
                  <div class="msg-item-box msg-item-sm-width">
                    <p class="msg-item-p">{{eventContent.patNumber}}</p>
                  </div>
                </FormItem>
              </Col>
            </Row>
            <Row :gutter="22">
              <Col span="6">
                <FormItem label="既往药品不良反应/事件:" :label-width="140">
                  <div class="msg-item-box msg-item-sm-width msg-item-sm-width-ao">
                    <p class="msg-item-p">{{eventDrug.pastdrugs === 0 ? '无' : eventDrug.pastdrugs === 1 ? '有' : '不详'}}</p>
                  </div>
                </FormItem>
              </Col>
              <Col span="6">
                <FormItem label="既往药品名:" :label-width="140">
                  <div class="msg-item-box msg-item-sm-width msg-item-sm-width-ao">
                    <p class="msg-item-p">{{eventDrug.pastdrugsDesc}}</p>
                  </div>
                </FormItem>
              </Col>
              <Col span="6">
                <FormItem label="家族药品不良反应/事件:" :label-width="140">
                  <div class="msg-item-box msg-item-sm-width msg-item-sm-width-ao">
                    <p class="msg-item-p">{{eventDrug.familydrugs === 0 ? '无' : eventDrug.familydrugs === 1 ? '有' : '不详'}}</p>
                  </div>
                </FormItem>
              </Col>
              <Col span="6">
                <FormItem label="家族药品名:" :label-width="140">
                  <div class="msg-item-box msg-item-sm-width msg-item-sm-width-ao">
                    <p class="msg-item-p">{{eventDrug.familydrugsDesc}}</p>
                  </div>
                </FormItem>
              </Col>
            </Row>
            <Row>
              <Col span="6">
                <FormItem label="相关重要信息:">
                  <div class="msg-item-box msg-item-sm-width">
                    <p class="msg-item-p">{{eventDrug.importantMsg}}</p>
                  </div>
                </FormItem>
              </Col>
              <Col span="6">
                <FormItem label="过敏史:">
                  <div class="msg-item-box msg-item-sm-width">
                    <p class="msg-item-p">{{eventDrug.importantAllergy}}</p>
                  </div>
                </FormItem>
              </Col>
              <Col span="6">
                <FormItem label="其他:">
                  <div class="msg-item-box msg-item-sm-width">
                    <p class="msg-item-p">{{eventDrug.importantOtherMsg}}</p>
                  </div>
                </FormItem>
              </Col>
            </Row>
<!--            <Row>-->
<!--              <Col span="24">-->
<!--                <FormItem label="不良事件描述:">-->
<!--                  <div class="msg-item-box msg-item-sm-width msg-item-lg-width msg-item-sm-width-ao">-->
<!--                    <p class="msg-item-p">欧阳张三</p>-->
<!--                  </div>-->
<!--                </FormItem>-->
<!--              </Col>-->
<!--            </Row>-->
          </div>
          <div>
            <div class="subhead-box">
              <div class="subhead-text bgTitleColor-blue">
                <p><Icon type="md-arrow-dropright-circle" />&nbsp;药品信息</p>
              </div>
              <div class="subhead-triangle-style borderColor-blue"></div>
              <p class="subhead-ico"><Icon type="md-apps"  /></p>
            </div>
            <div style="margin-top: 30px">
              <div style="overflow: hidden">
                <Row v-for="(iteam, index) in suspectedDrugs" :key="index" >
                  <Col span="2"><p class="drug-title">怀疑药品{{index + 1}}</p></Col>
                  <Col span="22">
                    <Row>
                      <Col span="6">
                        <FormItem label="批准文号:">
                          <div class="msg-item-box msg-item-sm-width">
                            <p class="msg-item-p">{{iteam.approvalNumber}}</p>
                          </div>
                        </FormItem>
                      </Col>
                      <Col span="6">
                        <FormItem label="商品名称:">
                          <div class="msg-item-box msg-item-sm-width">
                            <p class="msg-item-p">{{iteam.productName}}</p>
                          </div>
                        </FormItem>
                      </Col>
                      <Col span="6">
                        <FormItem label="通用名称(含剂型):">
                          <div class="msg-item-box msg-item-sm-width">
                            <p class="msg-item-p">{{iteam.commonName}}</p>
                          </div>
                        </FormItem>
                      </Col>
                      <Col span="6">
                        <FormItem label="生产厂家:">
                          <div class="msg-item-box msg-item-sm-width">
                            <p class="msg-item-p">{{iteam.manufacturer}}</p>
                          </div>
                        </FormItem>
                      </Col>
                    </Row>
                    <Row>
                      <Col span="6">
                        <FormItem label="生产批号:">
                          <div class="msg-item-box msg-item-sm-width">
                            <p class="msg-item-p">{{iteam.batchNumber}}</p>
                          </div>
                        </FormItem>
                      </Col>
                      <Col span="6">
                        <FormItem label="用法用量:">
                          <div class="msg-item-box msg-item-sm-width">
                            <p class="msg-item-p">{{iteam.usageAndDosage}}</p>
                          </div>
                        </FormItem>
                      </Col>
                      <Col span="6">
                        <FormItem label="用药起止时间:">
                          <div class="msg-item-box msg-item-sm-width">
                            <p class="msg-item-p">{{iteam.startAndEnd}}</p>
                          </div>
                        </FormItem>
                      </Col>
                      <Col span="6">
                        <FormItem label="用药原因:">
                          <div class="msg-item-box msg-item-sm-width">
                            <p class="msg-item-p">{{iteam.MedicalReasons}}</p>
                          </div>
                        </FormItem>
                      </Col>
                    </Row>
                  </Col>
                </Row>
              </div>

            </div>
            <div class="drug-line"></div>
            <div style="margin-top: 30px">
              <div style="overflow: hidden">
                <Row v-for="(iteam, index) in combinedDrugs" :key="index">
                  <Col span="2"><p class="drug-title">并用药品{{index + 1}}</p></Col>
                  <Col span="22">
                    <Row>
                      <Col span="6">
                        <FormItem label="批准文号:">
                          <div class="msg-item-box msg-item-sm-width">
                            <p class="msg-item-p">{{iteam.approvalNumber}}</p>
                          </div>
                        </FormItem>
                      </Col>
                      <Col span="6">
                        <FormItem label="商品名称:">
                          <div class="msg-item-box msg-item-sm-width">
                            <p class="msg-item-p">{{iteam.productName}}</p>
                          </div>
                        </FormItem>
                      </Col>
                      <Col span="6">
                        <FormItem label="通用名称(含剂型):">
                          <div class="msg-item-box msg-item-sm-width">
                            <p class="msg-item-p">{{iteam.commonName}}</p>
                          </div>
                        </FormItem>
                      </Col>
                      <Col span="6">
                        <FormItem label="生产厂家:">
                          <div class="msg-item-box msg-item-sm-width">
                            <p class="msg-item-p">{{iteam.manufacturer}}</p>
                          </div>
                        </FormItem>
                      </Col>
                    </Row>
                    <Row>
                      <Col span="6">
                        <FormItem label="生产批号:">
                          <div class="msg-item-box msg-item-sm-width">
                            <p class="msg-item-p">{{iteam.batchNumber}}</p>
                          </div>
                        </FormItem>
                      </Col>
                      <Col span="6">
                        <FormItem label="用法用量:">
                          <div class="msg-item-box msg-item-sm-width">
                            <p class="msg-item-p">{{iteam.usageAndDosage}}</p>
                          </div>
                        </FormItem>
                      </Col>
                      <Col span="6">
                        <FormItem label="用药起止时间:">
                          <div class="msg-item-box msg-item-sm-width">
                            <p class="msg-item-p">{{iteam.startAndEnd}}</p>
                          </div>
                        </FormItem>
                      </Col>
                      <Col span="6">
                        <FormItem label="用药原因:">
                          <div class="msg-item-box msg-item-sm-width">
                            <p class="msg-item-p">{{iteam.MedicalReasons}}</p>
                          </div>
                        </FormItem>
                      </Col>
                    </Row>
                  </Col>
                </Row>
              </div>
            </div>
          </div>
          <div>
            <div class="subhead-box">
              <div class="subhead-text bgTitleColor-blue">
                <p><Icon type="md-arrow-dropright-circle" />&nbsp;不良事件信息</p>
              </div>
              <div class="subhead-triangle-style borderColor-blue"></div>
              <p class="subhead-ico"><Icon type="md-apps"  /></p>
            </div>
            <Row style="margin-top: 30px" :gutter="22">
              <Col span="6">
                <FormItem label="不良反应/事件名称:" :label-width="140">
                  <div class="msg-item-box msg-item-sm-width">
                    <p class="msg-item-p">{{eventDrug.eventTitle}}</p>
                  </div>
                </FormItem>
              </Col>
              <Col span="6">
                <FormItem label="不良反应/事件发生时间:" :label-width="140">
                  <div class="msg-item-box msg-item-sm-width">
                    <p class="msg-item-p">{{eventDrug.happenTime != null ? this.xdate.format(eventDrug.happenTime, 'yyyy-MM-dd HH:mm:ss') : eventDrug.happenTime}}</p>
                  </div>
                </FormItem>
              </Col>
              <Col span="6">
                <FormItem label="不良反应/事件发生地点:" :label-width="140">
                  <div class="msg-item-box msg-item-sm-width">
                    <p class="msg-item-p">{{happenAddress}}</p>
                  </div>
                </FormItem>
              </Col>
            </Row>
            <Row>
              <Col span="24">
                <FormItem :label-width="140" label="不良反应/事件过程描述（包括症状、体征、临床检验等）及处理情况:">
                  <div class="msg-item-box msg-item-sm-width msg-item-lg-width msg-item-sm-width-ao">
                    <p class="msg-item-p">{{eventDrug.eventDesc}}</p>
                  </div>
                </FormItem>
              </Col>
            </Row>
            <Row>
              <Col span="6">
                <FormItem label="不良反应/事件的结果:" :label-width="140">
                  <div class="msg-item-box msg-item-sm-width">
                    <p class="msg-item-p">{{eventDrug.eventResult}}</p>
                  </div>
                </FormItem>
              </Col>
              <Col span="6">
                <FormItem label="后遗症表现:" :label-width="140">
                  <div class="msg-item-box msg-item-sm-width">
                    <p class="msg-item-p">{{eventDrug.eventPerformance}}</p>
                  </div>
                </FormItem>
              </Col>
              <Col span="6">
                <FormItem label="直接死因:" :label-width="140">
                  <div class="msg-item-box msg-item-sm-width">
                    <p class="msg-item-p">{{eventDrug.dealReason}}</p>
                  </div>
                </FormItem>
              </Col>
              <Col span="6">
                <FormItem label="死亡时间:" :label-width="140">
                  <div class="msg-item-box msg-item-sm-width">
                    <p class="msg-item-p">{{eventDrug.dealTime ? this.xdate.format(eventDrug.dealTime, 'yyyy-MM-dd HH:mm:ss') : eventDrug.dealTime}}</p>
                  </div>
                </FormItem>
              </Col>
            </Row>
            <Row :gutter="22">
              <Col span="8">
                <FormItem label="停药或减量后，反应/事件是否消失或减轻？:" :label-width="160">
                  <div class="msg-item-box msg-item-sm-width msg-item-sm-width-ao">
                    <p class="msg-item-p">{{eventDrug.stopDrug}}</p>
                  </div>
                </FormItem>
              </Col>
              <Col span="8">
                <FormItem label="再次使用可疑药品后是否再次出现同样反应/事件？:" :label-width="160">
                  <div class="msg-item-box msg-item-sm-width msg-item-sm-width-ao">
                    <p class="msg-item-p">{{eventDrug.againDrug}}</p>
                  </div>
                </FormItem>
              </Col>
              <Col span="8">
                <FormItem label="对原患疾病的影响:" :label-width="160">
                  <div class="msg-item-box msg-item-sm-width msg-item-sm-width-ao">
                    <p class="msg-item-p">{{eventDrug.originaldisease}}</p>
                  </div>
                </FormItem>
              </Col>
            </Row>
          </div>
          <div>
            <div class="subhead-box">
              <div class="subhead-text bgTitleColor-blue">
                <p><Icon type="md-arrow-dropright-circle" />&nbsp;报告人信息</p>
              </div>
              <div class="subhead-triangle-style borderColor-blue"></div>
              <p class="subhead-ico"><Icon type="md-apps"  /></p>
            </div>
            <Row style="margin-top: 30px">
              <Col span="6">
                <FormItem label="报告人评价:">
                  <div class="msg-item-box msg-item-sm-width">
                    <p class="msg-item-p">{{eventDrug.writeEvaluate}}</p>
                  </div>
                </FormItem>
              </Col>
              <Col span="6">
                <FormItem label="报告人:">
                  <div class="msg-item-box msg-item-sm-width">
                    <p class="msg-item-p">{{eventContent.writeUserName}}</p>
                  </div>
                </FormItem>
              </Col>
            </Row>
            <p class="blood-subhead">报告人信息</p>
            <Row style="margin-top: 20px">
              <Col span="6">
                <FormItem label="职业:">
                  <div class="msg-item-box msg-item-sm-width">
                    <p class="msg-item-p">{{eventDrug.writeOccupation}}</p>
                  </div>
                </FormItem>
              </Col>
              <Col span="6">
                <FormItem label="其它职业名称:">
                  <div class="msg-item-box msg-item-sm-width">
                    <p class="msg-item-p">{{eventDrug.writeOccupationOther}}</p>
                  </div>
                </FormItem>
              </Col>
            </Row>
            <p class="blood-subhead">报告单位信息</p>
            <Row style="margin-top: 20px">
              <Col span="6">
                <FormItem label="单位名称:">
                  <div class="msg-item-box msg-item-sm-width">
                    <p class="msg-item-p">{{eventDrug.reportingUnitName}}</p>
                  </div>
                </FormItem>
              </Col>
              <Col span="6">
                <FormItem label="联系人:">
                  <div class="msg-item-box msg-item-sm-width">
                    <p class="msg-item-p">{{eventDrug.reportingUnitUser}}</p>
                  </div>
                </FormItem>
              </Col>
              <Col span="6">
                <FormItem label="电话:">
                  <div class="msg-item-box msg-item-sm-width">
                    <p class="msg-item-p">{{eventDrug.reportingUnitTel}}</p>
                  </div>
                </FormItem>
              </Col>
              <Col span="6">
                <FormItem label="报告日期:">
                  <div class="msg-item-box msg-item-sm-width">
                    <p class="msg-item-p">{{eventDrug.reportTime ? this.xdate.format(eventDrug.reportTime, 'yyyy-MM-dd HH:mm:ss') : eventDrug.reportTime}}</p>
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
        eventDrug: {},
        eventContent: {},
        formItem: {},
        suspectedDrugs: [],
        combinedDrugs: [],
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
            this.eventDrug = res.data.data.son
            this.eventContent = res.data.data.father
            this.suspectedDrugs = this.eventDrug.suspectedDrugs ? JSON.parse(this.eventDrug.suspectedDrugs) : []
            this.combinedDrugs = this.eventDrug.combinedDrugs ? JSON.parse(this.eventDrug.suspectedDrugs) : []
            this.happenAddressValue()
            this.showHandlerFrom(res.data.data.handlerFrom)
            this.showHandler(res.data.data.father)
          }
        })
          .catch((error) => {
            console.log(error)
          })
      },
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
    }
  }
</script>

<style>

</style>
