<template>
  <div>
    <!--更新配置流程节点角色-->
    <Modal
      v-model="updateTaskRoleModel"
      @on-ok="ok"
      width="600"
      class="adverse-modal"
      @on-cancel="cancel">
      <div class="adverse-modal-header" slot="header">
        <p>节点角色设置</p>
      </div>
      <div class="modal-box">
        <div class="modal-box-left">
          <ul class="adverse-dispose-list">
            <li v-for="(item,index) in taskData" :class="{disListActive:disIndex==index}" class="adverse-dispose-li" @click="disPoseSP(index,item.taskKey,item.taskName)">{{item.taskName}}
              <span class="aa" style="margin-left: 10px;color: #ffffff !important;">{{item.groupName}}</span>
                <!--暂时注掉-->
                <!--<span style="margin-left: 10px;color: #ffffff!important;" v-if="item.userId != null">{{item.groupName}}-{{item.userName}}</span>-->
                <!-- <span class="aa" style="margin-left: 10px;color: #ffffff !important;" v-else>{{item.groupName}}</span>-->
            </li>
          </ul>
        </div>
        <div class="modal-box-right">
       <!--暂时注掉角色人员选择-->
       <!-- <Cascader :data="roleList" v-model="model15" @on-change="taskSelect"></Cascader>-->
          <Select v-model="model15" style="width:300px" :label-in-value=true  @on-change="taskSelect">
            <Option v-for="item in roleList" :value="item.key" :key="item.key">{{ item.label }}</Option>
          </Select></br>
          <Button type="success" style="margin-top: 15px" size="small" @click="updateActivitiTaskRoleSetClick" >更新流程节点角色配置</Button>
        </div>

      </div>
      <div slot="footer">

      </div>
    </Modal>
    <!--更新配置流程节点字段-->
    <Modal
      v-model="updateTaskItemModel"
      @on-ok="ok"
      width="800"
      class="adverse-modal"
      @on-cancel="cancel">
      <div class="adverse-modal-header" slot="header">
        <p>节点字段设置</p>
      </div>
      <div class="modal-box">
        <div class="modal-box-left">
          <ul class="adverse-dispose-list">
            <li v-for="(item,index) in taskData" :class="{disListActive:disIndex==index}" class="adverse-dispose-li" @click="disPoseSPItem(index,item.taskKey,item.taskName)">{{item.taskName}}<span style="margin-left: 10px"></span></li>
          </ul>
        </div>
        <div class="modal-box-right">
            <Button type="success" @click="addItemVal">新增字段</Button>
          <div style="width: 500px">
            <Table :columns="taskItemcolumns" :data="flowTaskSetItemList"></Table>
          </div>
        </div>

      </div>
      <div slot="footer">

      </div>
    </Modal>
<!--    字段设置新加字段-->
    <Modal
      v-model="addItemValModel"
      :title="itemTitleShow"
      width="460"
      @on-ok="ok"
      @on-cancel="cancel">
      <div>
        <Form ref="formValidate" :label-width="80" :model="formValidate" :rules="ruleValidate">
          <FormItem label="字段名称" prop="fieldName">
            <Input v-model="formValidate.fieldName" placeholder="设置字段名称..." style="width: 300px" />
          </FormItem>
          <FormItem label="字段类型" prop="fieldType">
            <RadioGroup v-model="formValidate.fieldType" @on-change="radioClick">
              <Radio label="输入框"></Radio>
              <Radio label="文本框"></Radio>
              <Radio label="单选框"></Radio>
              <Radio label="多选框"></Radio>
              <Radio label="单选下拉框"></Radio>
              <Radio label="多选下拉框"></Radio>
            </RadioGroup>
          </FormItem>
          <div label="aaa" v-if="valShowAll && formValidate.fieldType != '输入框' && formValidate.fieldType != '文本框'">
            <FormItem
              v-for="(item, index) in formDynamic.items"
              :key="index"
              :label="'值 '">
              <Row>
                <Col span="18">
                  <Input type="text" v-model="item.value" placeholder="设置选项值..."></Input>
                </Col>
                <Col span="4" offset="1">
                  <Button @click="removeRadioValue(index)" size="small" type="error">删除</Button>
                </Col>
              </Row>
            </FormItem>
            <FormItem>
              <Row>
                <Col span="12">
                  <Button type="dashed" long @click="addRadioValue" icon="md-add">新增单选值</Button>
                </Col>
              </Row>
            </FormItem>
          </div>
        </Form>
      </div>
      <div slot="footer">
        <Button type="primary" @click="fieldSave('formValidate')">确定</Button>
      </div>
    </Modal>
    <!--查看图片-->
    <Modal
      v-model="modalImg"
      title="查看完整大图"
      @on-ok="ok"
      width="1100"
      @on-cancel="cancel">
     <div >
       <img :src="targetProcessImageUrl"/>
     </div>
    </Modal>
    <!--激活-禁用弹窗-->
    <Modal
      v-model="accessModel"
      title="激活/禁用流程提示"
      @on-ok="accessOrNotAccess"
      @on-cancel="cancel">
      <p>您确定要取消此流程吗？</p>
    </Modal>
    <!--取消流程部署弹窗-->
    <Modal
      v-model="deleteFlowModel"
      title="删除流程部署提示"
      @on-ok="deleteFlowBtn"
      @on-cancel="cancel">
      <p>删除流程部署将无法使用，您确定要删除此流程吗？</p>
    </Modal>
    <Card shadow title="不良事件处理方式" style="margin-bottom: 30px">
     <Row :gutter="16">
        <Col span="6">
          <div dis-hover class="adverse-dispose">
            <div class="adverse-dispose-title-box">
              <p class="adverse-dispose-title"><Icon type="ios-list-box" />&nbsp;事件类别</p>
            </div>
            <div class="adverse-dispose-text-box">
              <ul class="adverse-dispose-list">
                 <li v-for="(iteams,index) in dislist" :class="{disListActive:disPoseIndex==index}" class="adverse-dispose-li" @click="disPose(index,iteams.eventTypeId,iteams.name)">{{iteams.name}}</li>
              </ul>
            </div>
          </div>
        </Col>
        <Col span="18">
          <div dis-hover class="adverse-dispose">
            <div class="adverse-dispose-title-box">
              <p class="adverse-dispose-title"><Icon type="md-git-branch" />&nbsp;事件处理流程选择</p>
            </div>
            <div class="adverse-dispose-text-box"  style="overflow-y: auto;height: 700px;">
              <Row :gutter="16" class="adverse-dispose-img-box" v-for="item in activitiImageList" :key="item.processDefinitionId">
                <Col span="16">
                  <div class="adverse-dispose-img" @click="modalImgShow(item.processImageUrl)">
                    <img :src="item.processImageUrl" />
                  </div>
                </Col>
                <Col span="4">
                  <div class="adverse-dispose-state stateBlue" v-if="item.access === true">
                     <p><span><Icon type="md-checkmark-circle" /></span>已激活此流程</p>
                  </div>
                  <div class="adverse-dispose-state stateGray" v-if="item.access === false">
                    <p><span><Icon type="md-close-circle" /></span>未激活流程</p>
                  </div>
                </Col>
                <Col span="4">
                  <div class="adverse-dispose-btn" v-if="item.access === true">
                    <Button size="large" icon="md-log-out" type="error" @click="accessModelShow(item.processDefinitionId)">取消使用此流程</Button>
                  </div>
                  <div class="adverse-dispose-btn" v-if="item.access === false">
                    <Button @click="config(item.processDefinitionId)" size="large" icon="md-log-in" type="success">激活此流程</Button>
                    <Button type="info" style="margin-top: 15px" size="large" icon="md-build" @click="updateActivitiTaskRoleSet(item.processDefinitionId)">设置流程节点角色</Button>
                    <Button type="info" style="margin-top: 15px" size="large" icon="md-build" @click="updateActivitiTaskItemSet(item.processDefinitionId)">设置流程节点字段</Button>
                    <Button type="info" style="margin-top: 15px" size="large" icon="md-build" @click="deleteFlow(item.processDefinitionId)">删除部署流程</Button>
                  </div>
                </Col>
              </Row>
            </div>
          </div>
        </Col>
      </Row>
    </Card>
  </div>
</template>

<script>
export default {
  name: 'adverse-dispose',
  data () {
    return {
      // 删除流程部署流程
      deleteFlowModel: false,
      disIndex: 0,
      modalImg: false,
      // role 下拉选择
      roleList: [],
      model15: [],
      // 处理人员
      data6: [
        {
          name: 'A医生',
          age: 18,
          address: '眼科'
        },
        {
          name: 'B医生',
          age: 24,
          address: '眼科'
        },
        {
          name: 'C医生',
          age: 30,
          address: '眼科'
        },
        {
          name: 'D医生',
          age: 26,
          address: '眼科'
        }
      ],
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
      disPoseIndex: 0,
      // 事件类型
      dislist: [
        {
          eventTypeId: '1',
          name: '护理不良事件'
        },
        {
          eventTypeId: '2',
          name: '可疑医疗器械不良事件'
        },
        {
          eventTypeId: '3',
          name: '输血不良反应事件'
        },
        {
          eventTypeId: '4',
          name: '药品不良反应事件'
        },
        {
          eventTypeId: '5',
          name: '用药差错不良事件'
        },
        {
          eventTypeId: '6',
          name: '其他不良事件'
        }
      ],
      // 部署的流程图
      activitiImageList: [],
      gradeTableModal: false,
      // 点击后的流程图id
      targetProcessImageUrl: '',
      // 默认第一个事件类型的id
      targetEventTypeId: '',
      // task节点
      taskData: [],
      // 查看节点人员设置
      taskRoleSet: false,
      // 流程激活/禁用设置
      accessModel: false,
      // 更新流程节点角色配置弹窗
      updateTaskRoleModel: false,
      // 更新流程节点字段配置弹窗
      updateTaskItemModel: false,
      // 保存task设置的参数请求体
      requestBody: {
        eventTypeId: '',
        eventTypeName: '',
        processDefinitionId: '',
        processDefinitionName: '',
        taskKey: '',
        taskName: '',
        groupId: '',
        groupName: '',
        userId: '',
        userName: ''
      },
      // ---------------流程节点字段设置-----------------------
      itemTitleShow: '新增字段',
      // 多选值显示
      valShowAll: false,
      formValidate: {
        fieldName: '',
        fieldType: '输入框'
      },
      index: 1,
      // 单选按钮设置值
      formDynamic: {
        items: [
          {
            value: ''
          }
        ]
      },
      // 表单验证
      ruleValidate: {
        fieldName: [
          { required: true, message: '请输入字段名称', trigger: 'blur' }
        ],
        fieldType: [
          { required: true, message: '请输入字段类型', trigger: 'change' }
        ],
        fieldAscion: [
          { required: true, message: '请选择字段归属', trigger: 'change' }
        ],
        fieldMax: [
          { required: true, message: '请设置字段最大值', trigger: 'blur' }
        ]
      },
      // 字段类型值列表
      cityList: [
        {
          value: '输入框',
          label: '输入框'
        },
        {
          value: '单选框',
          label: '单选框'
        },
        {
          value: '多选框',
          label: '多选框'
        },
        {
          value: '下拉框',
          label: '下拉框'
        },
        {
          value: '多选下拉框',
          label: '多选下拉框'
        }
      ],
      // 字段新增值弹窗
      addItemValModel: false,
      // 字段值主键
      activitiTaskItemSetId: '',
      // 流程节点字段列表
      flowTaskSetItemList: [],
      // 流程节点字段列
      taskItemcolumns: [
        {
          title: '字段名称',
          key: 'itemTitle'
        },
        {
          title: '字段类别',
          key: 'itemValType'
        },
        {
          title: '操作',
          key: 'action',
          width: 150,
          align: 'center',
          render: (h, params) => {
            return h('div', [
              h('Button', {
                props: {
                  type: 'primary',
                  size: 'small'
                },
                style: {
                  marginRight: '5px'
                },
                on: {
                  click: () => {
                    this.updateItemVal(params.row)
                  }
                }
              }, '更改'),
              h('Button', {
                props: {
                  type: 'error',
                  size: 'small'
                },
                on: {
                  click: () => {
                    this.deleteItemVal(params.row.activitiTaskItemSetId)
                  }
                }
              }, '删除')
            ])
          }
        }
      ],
      // 删除部署流程的processDefinitionId
      deleteFlowProcessDefinitionId: ''
    }
  },
  mounted () {
    this.getEventTypeByParient()
    this.getRoleList()
  },
  methods: {
    // 查看流程大图
    modalImgShow (processImageUrl) {
      this.modalImg = true
      this.targetProcessImageUrl = processImageUrl
    },
    // 配置流程相关人员(激活流程)
    config (processDefinitionId) {
      let eventTypeId = this.requestBody.eventTypeId
      let request = {
        eventTypeId: eventTypeId,
        processDefinitionId: processDefinitionId
      }
      this.axios.get('eventTypeActiviti/isAccess', { params: request }).then((res) => {
        if (res.data.data) {
          // 直接激活
          this.accessFlow(processDefinitionId)
        } else {
          // 弹窗提示
          let msg = res.data.msg
          this.$Notice.info({
            title: '流程节点设置提示',
            desc: msg
          })
        }
      }).catch((e) => {
        console.log(e)
      })
    },
    // 配置流程相关人员时，回显
    showActivitiTask (processDefinitionId, eventId) {
      let requestParam = {
        processDefinitionId: processDefinitionId,
        eventId: eventId
      }
      this.axios.get('eventTypeActiviti/getTaskSetByProcessDefinitionId', { params: requestParam }).then((res) => {
        if (res.data.code === 0) {
          let a = res.data.data
          this.taskData = res.data.data
          // 默认显示第一个的请求体赋值
          this.requestBody.taskKey = a[0].taskKey
          this.requestBody.taskName = a[0].taskName
          // 配置请求体参数
          this.requestBody.processDefinitionId = processDefinitionId
        } else {
          this.taskData = []
        }
      }).catch((e) => {
        console.log(e)
      })
    },
    // 配置流程相关字段时，回显
    showActivitiTaskItem (processDefinitionId, eventId) {
      let requestParam = {
        processDefinitionId: processDefinitionId,
        eventId: eventId
      }
      this.axios.get('eventTypeActiviti/getTaskSetByProcessDefinitionId', { params: requestParam }).then((res) => {
        if (res.data.code === 0) {
          let a = res.data.data
          this.taskData = res.data.data
          // 默认显示第一个的请求体赋值
          this.requestBody.taskKey = a[0].taskKey
          this.requestBody.taskName = a[0].taskName
          // 配置请求体参数
          this.requestBody.processDefinitionId = processDefinitionId
          // 默认显示第一个
          this.loadTaskItemSetList(processDefinitionId, this.requestBody.taskKey, eventId)
        } else {
          this.taskData = []
        }
      }).catch((e) => {
        console.log(e)
      })
    },
    // 判断流程是否设置了角色
    remove (index) {
      this.data6.splice(index, 1)
    },
    // 点击不同的task节点(节点角色设置)
    disPoseSP (index, taskKey, taskName) {
      this.disIndex = index
      // 设置请求体赋值
      this.requestBody.taskKey = taskKey
      this.requestBody.taskName = taskName
    },
    // 点击不同的task节点(节点字段设置)
    disPoseSPItem (index, taskKey, taskName) {
      this.disIndex = index
      // 设置请求体赋值
      this.requestBody.taskKey = taskKey
      this.requestBody.taskName = taskName
      // 加载节点字段设置列表
      this.loadTaskItemSetList(this.requestBody.processDefinitionId, this.requestBody.taskKey, this.requestBody.eventTypeId)
    },
    // 点击不同的事件类型
    disPose (index, eventTypeId, eventTypeName) {
      this.disPoseIndex = index
      // 设置请求体赋值
      this.requestBody.eventTypeId = eventTypeId
      this.requestBody.eventTypeName = eventTypeName
      // 查询相关的流程图列表
      this.getActivitiImageList(eventTypeId)
    },
    ok () {
      // 重置相关参数
      this.targetProcessImageUrl = ''
      this.model15 = []
      this.disIndex = 0
      this.requestBody.groupId = ''
      this.requestBody.groupName = ''
      this.requestBody.userId = ''
      this.requestBody.userName = ''
      this.getRoleList()
      this.getActivitiImageList(this.requestBody.eventTypeId)
    },
    cancel () {
      this.targetProcessImageUrl = ''
      this.model15 = []
      this.disIndex = 0
      this.requestBody.groupId = ''
      this.requestBody.groupName = ''
      this.requestBody.userId = ''
      this.requestBody.userName = ''
      this.getRoleList()
      this.getActivitiImageList(this.requestBody.eventTypeId)
      this.showActivitiTaskItem(this.requestBody.processDefinitionId, this.requestBody.eventTypeId)
    },
    addClick () {
      this.gradeTableModal = true
    },
    // 依旧事件类型id获取不同的流程图列表
    getActivitiImageList (eventTypeId) {
      let requestParam = {
        eventTypeId: eventTypeId
      }
      this.axios.get('eventTypeActiviti/getActivitiImageListByEventTypeId', { params: requestParam }).then((res) => {
        if (res.data.code === 0) {
          this.activitiImageList = res.data.data
        } else {
          this.activitiImageList = []
        }
      }).catch((e) => {
        console.log(e)
      })
    },
    // 获取父级事件类型
    getEventTypeByParient () {
      this.targetEventTypeId = this.dislist[0].eventTypeId
      // 默认初始化的请求体赋值
      this.requestBody.eventTypeId = this.dislist[0].eventTypeId
      this.requestBody.eventTypeName = this.dislist[0].name
      // 默认显示第一个
      this.getActivitiImageList(this.targetEventTypeId)
      // this.axios.get('eventType/getEventTypeByParientId').then((res) => {
      //   if (res.data.code === 0) {
      //     let a = res.data.data
      //     this.dislist = res.data.data
      //     this.targetEventTypeId = a[0].eventTypeId
      //     // 默认初始化的请求体赋值
      //     this.requestBody.eventTypeId = a[0].eventTypeId
      //     this.requestBody.eventTypeName = a[0].name
      //     // 默认显示第一个
      //     this.getActivitiImageList(this.targetEventTypeId)
      //   } else {
      //     this.dislist = []
      //   }
      // }).catch((e) => {
      //   console.log(e)
      // })
    },
    // 获取角色下拉选择列表
    getRoleList () {
      this.axios.get('role/list').then((res) => {
        if (res.data.code === 0) {
          let sourceData = res.data.data
          this.roleList = sourceData.filter(e => e.label !== '上报角色')
        } else {
          this.roleList = []
        }
      }).catch((e) => {
        console.log(e)
      })
      // 暂时注掉角色用户选择
      // this.axios.get('role/listRoleAndUserAll').then((res) => {
      //   if (res.data.code === 0) {
      //     this.roleList = res.data.data
      //   } else {
      //     this.roleList = []
      //   }
      // }).catch((e) => {
      //   console.log(e)
      // })
    },
    // task设置选择
    taskSelect (event) {
      // 角色--暂时注掉
      // this.requestBody.groupId = selectedData[0].value
      // this.requestBody.groupName = selectedData[0].label
      // 用户--暂时注掉
      // this.requestBody.userId = selectedData[1].value
      // this.requestBody.userName = selectedData[1].label
      this.requestBody.groupId = event.value
      this.requestBody.groupName = event.label
    },
    // 激活流程（先判定是否可以激活）
    accessFlow (processDefinitionId) {
      let requestObject = {
        eventTypeId: this.requestBody.eventTypeId,
        eventTypeName: this.requestBody.eventTypeName,
        processDefinitionId: processDefinitionId,
        processDefinitionName: this.requestBody.processDefinitionName,
        taskKey: this.requestBody.taskKey,
        taskName: this.requestBody.taskName,
        groupId: this.requestBody.groupId,
        groupName: this.requestBody.groupName,
        userId: this.requestBody.userId,
        userName: this.requestBody.userName
      }
      this.axios.post('eventTypeActiviti/saveOrUpdateActivitiSet', requestObject).then((res) => {
        if (res.data.code === 0) {
          this.getActivitiImageList(this.requestBody.eventTypeId)
        }
      }).catch((e) => {
        console.log(e)
      })
    },
    // 取消激活
    accessModelShow (processDefinitionId) {
      this.accessModel = true
      this.requestBody.processDefinitionId = processDefinitionId
    },
    // 激活/禁用确认按钮点击
    accessOrNotAccess () {
      let requestParam = {
        eventTypeId: this.requestBody.eventTypeId,
        processDefinitionId: this.requestBody.processDefinitionId
      }
      this.axios.get('eventTypeActiviti/updateAccess', { params: requestParam }).then((res) => {
        if (res.data.code === 0) {
          this.getActivitiImageList(this.requestBody.eventTypeId)
        }
      }).catch((e) => {
        console.log(e)
      })
    },
    // 修改人员配置
    updateActivitiTaskRoleSet (processDefinitionId) {
      this.updateTaskRoleModel = true
      let eventTypeId = this.requestBody.eventTypeId
      this.showActivitiTask(processDefinitionId, eventTypeId)
    },
    // 修改字段配置
    updateActivitiTaskItemSet (processDefinitionId) {
      this.updateTaskItemModel = true
      let eventTypeId = this.requestBody.eventTypeId
      this.showActivitiTaskItem(processDefinitionId, eventTypeId)
    },
    // 修改人员配置确认点击(整合保存)
    updateActivitiTaskRoleSetClick () {
      let requestObject = {
        eventTypeId: this.requestBody.eventTypeId,
        eventTypeName: this.requestBody.eventTypeName,
        processDefinitionId: this.requestBody.processDefinitionId,
        processDefinitionName: this.requestBody.processDefinitionName,
        taskKey: this.requestBody.taskKey,
        taskName: this.requestBody.taskName,
        groupId: this.requestBody.groupId,
        groupName: this.requestBody.groupName,
        userId: this.requestBody.userId,
        userName: this.requestBody.userName
      }
      if (this.requestBody.groupId == null || this.requestBody.groupId === '') {
        this.$Notice.info({
          title: '流程节点设置提示',
          desc: '请至少选择一个角色'
        })
      } else {
        this.axios.post('eventTypeActiviti/updateAccessActivitiRoleSet', requestObject).then((res) => {
          if (res.data.code === 0) {
            this.showActivitiTask(requestObject.processDefinitionId, requestObject.eventTypeId)
          }
        }).catch((e) => {
          console.log(e)
        })
      }
    },
    // -----------------------流程节点字段设置---------------------------
    // 新增单选按钮值
    addRadioValue () {
      // this.index++
      this.formDynamic.items.push({
        value: ''
      })
    },
    // 删除单选按钮值
    removeRadioValue (index) {
      // this.formDynamic.items[index].status = 0
      this.formDynamic.items.splice(index, 1)
    },
    // 字段类型切换
    radioClick (obj) {
      console.log(obj)
      if (obj === '单选框' || obj === '多选框' || obj === '单选下拉框' || obj === '多选下拉框') {
        this.valShowAll = true
        let requestParam = {
          id: this.activitiTaskItemSetId,
          itemValType: obj
        }
        this.axios.get('eventTypeActiviti/getTaskItemSetByIdAndItemValType', { params: requestParam }).then((res) => {
          if (res.data.code === 0) {
            let itemOption = res.data.data.itemOption
            let itemOptionArr = []
            if (itemOption != null && itemOption.length > 0) {
              if (itemOption.indexOf(',') !== -1) {
                // 包含
                let arr = itemOption.split(',')
                arr.forEach((e) => {
                  let obj = {}
                  obj.value = e
                  itemOptionArr.push(obj)
                })
              } else {
                let obj = {}
                obj.value = itemOption
                itemOptionArr.push(obj)
              }
              this.formDynamic.items = itemOptionArr
            }
          } else {
            this.formDynamic.items = [{ value: '' }]
          }
        }).catch((e) => {
          console.log(e)
        })
      } else {
        this.valShowAll = false
      }
    },
    // 字段设置新增弹窗
    addItemVal () {
      this.formValidate.fieldName = ''
      this.formValidate.fieldType = '输入框'
      this.activitiTaskItemSetId = ''
      this.itemTitleShow = '新增字段'
      this.addItemValModel = true
    },
    // 加载字段设置
    loadTaskItemSetList (processDefinitionId, taskKey, eventId) {
      let requestParam = {
        processDefinitionId: processDefinitionId,
        taskKey: taskKey,
        eventId: eventId
      }
      this.axios.get('eventTypeActiviti/getTaskItemSetList', { params: requestParam }).then((res) => {
        if (res.data.code === 0) {
          this.flowTaskSetItemList = res.data.data
        } else {
          this.flowTaskSetItemList = []
        }
      }).catch((e) => {
        console.log(e)
      })
    },
    // 字段新增确定
    fieldSave (name) {
      this.$refs[name].validate((valid) => {
        if (valid) {
          this.addItemValModel = false
          let radioValues = this.formDynamic.items.map(item => {
            return item.value.trim()
          })
          let itemType = ''
          if (this.formValidate.fieldType === '输入框') {
            itemType = 'input'
          } else if (this.formValidate.fieldType === '文本框') {
            itemType = 'input'
          } else if (this.formValidate.fieldType === '单选框') {
            itemType = 'radio'
          } else if (this.formValidate.fieldType === '多选框') {
            itemType = 'checkbox'
          } else if (this.formValidate.fieldType === '单选下拉框') {
            itemType = 'select'
          } else if (this.formValidate.fieldType === '多选下拉框') {
            itemType = 'select'
          }
          let requestBody = {
            activitiTaskItemSetId: this.activitiTaskItemSetId,
            eventId: this.requestBody.eventTypeId,
            eventName: this.requestBody.eventTypeName,
            processDefinitionId: this.requestBody.processDefinitionId,
            processDefinitionName: this.requestBody.processDefinitionName,
            taskKey: this.requestBody.taskKey,
            taskName: this.requestBody.taskName,
            itemField: this.formValidate.fieldName,
            itemTitle: this.formValidate.fieldName,
            itemValType: this.formValidate.fieldType,
            itemType: itemType,
            itemOption: radioValues.toString(),
            itemValue: ''
          }
          this.axios.post('eventTypeActiviti/saveTaskItemSet', requestBody).then((res) => {
            if (res.data.code === 0) {
              this.loadTaskItemSetList(this.requestBody.processDefinitionId, this.requestBody.taskKey, this.requestBody.eventTypeId)
            } else {
              this.$Message.error('失败')
            }
          }).catch((e) => {
            console.log(e)
          })
        }
      })
    },
    // 字段更新
    updateItemVal (item) {
      this.addItemValModel = true
      this.itemTitleShow = '更新字段'
      let activitiTaskItemSetId = item.activitiTaskItemSetId
      let itemTitle = item.itemTitle
      let itemValType = item.itemValType
      this.formValidate.fieldName = itemTitle
      this.formValidate.fieldType = itemValType
      this.activitiTaskItemSetId = activitiTaskItemSetId
      if (itemValType === '单选框' || itemValType === '多选框' || itemValType === '单选下拉框' || itemValType === '多选下拉框') {
        let requestParam = {
          id: activitiTaskItemSetId,
          itemValType: itemValType
        }
        this.axios.get('eventTypeActiviti/getTaskItemSetByIdAndItemValType', { params: requestParam }).then((res) => {
          if (res.data.code === 0) {
            let itemOption = res.data.data.itemOption
            let itemOptionArr = []
            if (itemOption != null && itemOption.length > 0) {
              if (itemOption.indexOf(',') !== -1) {
                // 包含
                let arr = itemOption.split(',')
                arr.forEach((e) => {
                  let obj = {}
                  obj.value = e
                  itemOptionArr.push(obj)
                })
              } else {
                let obj = {}
                obj.value = itemOption
                itemOptionArr.push(obj)
              }
              this.formDynamic.items = itemOptionArr
            }
          } else {
            this.formDynamic.items = [{ value: '' }]
          }
        }).catch((e) => {
          console.log(e)
        })
        this.valShowAll = true
      } else {
        this.valShowAll = false
      }
    },
    // 字段删除
    deleteItemVal (id) {
      let requestParam = {
        id: id
      }
      this.axios.get('eventTypeActiviti/deleteTaskItemSet', { params: requestParam }).then((res) => {
        if (res.data.code === 0) {
          this.loadTaskItemSetList(this.requestBody.processDefinitionId, this.requestBody.taskKey, this.requestBody.eventTypeId)
        } else {
          this.$Message.error('删除失败')
        }
      }).catch((e) => {
        console.log(e)
      })
    },
    // 删除流程部署
    deleteFlow (processDefinitionId) {
      this.deleteFlowProcessDefinitionId = processDefinitionId
      this.deleteFlowModel = true
    },
    // 删除流程部署确定
    deleteFlowBtn () {
      let requestParam = {
        processDefinitionId: this.deleteFlowProcessDefinitionId
      }
      this.axios.get('eventTypeActiviti/deleteProcessDefinition', { params: requestParam }).then((res) => {
        if (res.data.code === 0) {
          this.getActivitiImageList(this.requestBody.eventTypeId)
          this.deleteFlowProcessDefinitionId = ''
        }
      }).catch((e) => {
        console.log(e)
      })
    }
  }
}
</script>

<style scoped>
  .adverse-dispose-li span{
    color: #2d8cf0;
  }
  .ivu-notice{
    z-index: 999999999999 !important;
  }
  .modal-box{
    overflow: hidden;
  }
  .modal-box-right{
    float: left;
    margin-left: 25px;
  }
  .modal-box-left{
    float: left;
    /*width: 150px;*/
  }
  .adverse-modal-title{
     font-size: 14px;
     color: #17233d;
    font-weight: bold;
     margin-bottom: 6px;
  }
  .stateGray span{
    color: #808695;
    margin-right:6px;
  }
  .stateGray{
    background-color:#e8eaec;
    border: 1px solid #dcdee2;
    font-size: 14px;
  }
  .stateBlue span{
    color: #2d8cf0;
    margin-right:6px;
  }
  .stateBlue{
    background-color:#f0faff;
    border: 1px solid #abdcff;
    font-size: 14px;
  }
  .adverse-dispose-btn{
    margin-top: 55%;
  }
  .adverse-dispose-state{
    border-radius: 4px;
    padding: 6px 10px;
    margin-top: 55%;
  }
  .adverse-dispose-img:hover{
    border: solid 1px #5cadff;
    cursor:pointer;
  }
  .adverse-dispose-img{
    border: solid 1px #ffffff;
    overflow: hidden;
    height: 240px;
    margin: 10px 0;
  }
  .adverse-dispose-img img{
    width: 100%;
    margin-left: -5%;
    margin-top: -70px;
  }
  .adverse-dispose-img-box{
    border-bottom: dashed 1px #5c6b77;
  }
  .adverse-dispose-text-box{
    padding: 16px 20px;
    border: solid 1px #2d8cf0;
  }
  .adverse-dispose-title-box{
    background-color:#2d8cf0;
    padding: 3px 6px;
    color: #ffffff;
    border-radius: 6px 6px 0 0;
  }
  .disListActive{
    background-color: #808695;
    color: #ffffff;
    border-radius: 3px;
  }
  .adverse-dispose-li{
    cursor: pointer;
    padding:3px 10px;
    border-bottom: dashed 1px #dcdee2;
  }
  .adverse-dispose-list{
     list-style: none;
     width: 200px;
  }
  .userTable-title-btn{
    margin-bottom: 20px;
  }
</style>
