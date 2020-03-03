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
      <div slot="title">用药差错/用药接近差错</div>
      <div>
        <Form :model="formItem" :label-width="90">
          <div>
            <div class="subhead-box">
              <div class="subhead-text bgTitleColor-blue">
                <p><Icon type="md-arrow-dropright-circle" />&nbsp;差错信息</p>
              </div>
              <div class="subhead-triangle-style borderColor-blue"></div>
              <p class="subhead-ico"><Icon type="md-apps"  /></p>
            </div>
            <Row :gutter="20">
              <Col span="12">
                <FormItem label="差错发生日期:">
                  <div class="msg-item-box msg-item-sm-width msg-item-sm-width-ao">
                    <p class="msg-item-p">{{eventMistake.mistakesHappenTime !== null ? this.xdate.format(eventMistake.mistakesHappenTime, 'yyyy-MM-dd') : '暂无'}}</p>
                  </div>
                </FormItem>
              </Col>
              <Col span="12">
                <FormItem label="发现差错日期:">
                  <div class="msg-item-box msg-item-sm-width msg-item-sm-width-ao">
                    <p class="msg-item-p">{{eventMistake.mistakesDiscoverableTime !== null ? this.xdate.format(eventMistake.mistakesHappenTime, 'yyyy-MM-dd') : '暂无'}}</p>
                  </div>
                </FormItem>
              </Col>
            </Row>
            <Row :gutter="20">
              <Col span="20">
                <FormItem label="差错内容:">
                  <div class="msg-item-box msg-item-sm-width msg-item-sm-width-ao">
                    <p class="msg-item-p">{{eventMistake.mistakesContent === null?eventMistake.mistakesContentOther:eventMistake.mistakesContent}}</p>
                  </div>
                </FormItem>
              </Col>
            </Row>
            <Row>
              <Col span="6">
                <FormItem label="差错药品是否发给患者:">
                  <div class="msg-item-box msg-item-sm-width">
                    <p class="msg-item-p">{{eventMistake.isDispensing === 0?'无':eventMistake.isDispensing === 1?'有':'不详'}}</p>
                  </div>
                </FormItem>
              </Col>
              <Col span="6">
                <FormItem label="患者是否使用了差错药品:">
                  <div class="msg-item-box msg-item-sm-width">
                    <p class="msg-item-p">{{eventMistake.isUseDrug === 0?'无':eventMistake.isUseDrug === 1?'有':'不详'}}</p>
                  </div>
                </FormItem>
              </Col>
            </Row>
            <Row :gutter="20">
              <Col span="12">
                <FormItem label="引发差错的原因选择:">
                  <div class="msg-item-box msg-item-sm-width msg-item-sm-width-ao">
                    <p class="msg-item-p">{{eventMistake.mistakesCause == null?eventMistake.mistakesCauseOther:eventMistake.mistakesCause}}</p>
                  </div>
                </FormItem>
              </Col>
              <Col span="12">
                <FormItem label="发生差错的场所:">
                  <div class="msg-item-box msg-item-sm-width msg-item-sm-width-ao">
                    <p class="msg-item-p">{{eventMistake.mistakesPlace == null?eventMistake.mistakesPlaceOther:eventMistake.mistakesPlace}}</p>
                  </div>
                </FormItem>
              </Col>
            </Row>
            <Row :gutter="20">
              <Col span="12">
                <FormItem label="引起差错的工作人员职位:">
                  <div class="msg-item-box msg-item-sm-width msg-item-sm-width-ao">
                    <p class="msg-item-p">{{eventMistake.mistakesHappenJob === null?eventMistake.mistakesHappenJobOther:eventMistake.mistakesHappenJob}}</p>
                  </div>
                </FormItem>
              </Col>
              <Col span="12">
                <FormItem label="发现差错的人员:">
                  <div class="msg-item-box msg-item-sm-width msg-item-sm-width-ao">
                    <p class="msg-item-p">{{eventMistake.mistakesDiscoverableJob === null?eventMistake.mistakesDiscoverableJobOther:eventMistake.mistakesDiscoverableJob}}</p>
                  </div>
                </FormItem>
              </Col>
            </Row>
            <Row>
              <Col span="24">
                <FormItem label="不良事件描述:">
                  <div class="msg-item-box msg-item-sm-width msg-item-lg-width msg-item-sm-width-ao">
                    <p class="msg-item-p">{{eventMistake.describes}}</p>
                  </div>
                </FormItem>
              </Col>
            </Row>
          </div>
          <div>
            <div class="subhead-box">
              <div class="subhead-text bgTitleColor-blue">
                <p><Icon type="md-arrow-dropright-circle" />&nbsp;患者信息</p>
              </div>
              <div class="subhead-triangle-style borderColor-blue"></div>
              <p class="subhead-ico"><Icon type="md-apps"  /></p>
            </div>
            <Row style="margin-top: 30px">
              <Col span="6">
                <FormItem label="患者姓名:">
                  <div class="msg-item-box msg-item-sm-width">
                    <p class="msg-item-p">{{eventContent.patName}}</p>
                  </div>
                </FormItem>
              </Col>
              <Col span="6">
                <FormItem label="出生年月日:">
                  <div class="msg-item-box msg-item-sm-width">
                    <p class="msg-item-p">{{eventContent.patBirthday !== null ? this.xdate.format(eventContent.patBirthday, 'yyyy-MM-dd') : '暂无'}}</p>
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
                <FormItem label="性别:">
                  <div class="msg-item-box msg-item-sm-width">
                    <p class="msg-item-p">{{eventContent.patSex}}</p>
                  </div>
                </FormItem>
              </Col>
            </Row>
            <Row>
              <Col span="6">
                <FormItem label="临床诊断:">
                  <div class="msg-item-box msg-item-sm-width">
                    <p class="msg-item-p">{{eventMistake.diagnosis}}</p>
                  </div>
                </FormItem>
              </Col>
              <Col span="6">
                <FormItem label="患者联系方式:">
                  <div class="msg-item-box msg-item-sm-width">
                    <p class="msg-item-p">{{eventMistake.patTel}}</p>
                  </div>
                </FormItem>
              </Col>
            </Row>
            <Row>
              <Col span="24">
                <FormItem label="差错发生的经过：请简述时间经过、后果、相关人员职位、工作环境（药师填写）:" :label-width="150">
                  <div class="msg-item-box msg-item-sm-width msg-item-lg-width msg-item-sm-width-ao">
                    <p class="msg-item-p">{{eventMistake.describes}}</p>
                  </div>
                </FormItem>
              </Col>
            </Row>
            <Row>
              <Col span="24">
                <FormItem label="对预防类似差错发生的建议（药师填写）:" :label-width="150">
                  <div class="msg-item-box msg-item-sm-width msg-item-lg-width msg-item-sm-width-ao">
                    <p class="msg-item-p">{{eventMistake.advice}}</p>
                  </div>
                </FormItem>
              </Col>
            </Row>
          </div>
          <div>
            <div class="subhead-box">
              <div class="subhead-text bgTitleColor-blue">
                <p><Icon type="md-arrow-dropright-circle" />填报信息</p>
              </div>
              <div class="subhead-triangle-style borderColor-blue"></div>
              <p class="subhead-ico"><Icon type="md-apps"  /></p>
            </div>
            <Row style="margin-top: 30px">
              <Col span="6">
                <FormItem label="报告人:">
                  <div class="msg-item-box msg-item-sm-width">
                    <p class="msg-item-p">{{eventContent.writeUserName}}</p>
                  </div>
                </FormItem>
              </Col>
              <Col span="6">
                <FormItem label="科室:">
                  <div class="msg-item-box msg-item-sm-width">
                    <p class="msg-item-p">{{eventContent.eventDeptName}}</p>
                  </div>
                </FormItem>
              </Col>
              <Col span="6">
                <FormItem label="联系方式（必填）:">
                  <div class="msg-item-box msg-item-sm-width">
                    <p class="msg-item-p">{{eventMistake.writeUserTel}}</p>
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
        eventMistake: {},
        eventContent: {},
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
    mounted() {
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
            this.eventMistake = res.data.data.son
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
      causeModel (val) {
        // alert(this.causeModel)
      }
    }
  }
</script>

<style>

</style>
