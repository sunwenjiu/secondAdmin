<template>
     <div>
       <Card  class="card-title-style bgColor-gray">
         <div slot="title">输血不良反应回报</div>
         <div>
           <Form ref="formValidate" :model="formItem" :rules="ruleValidate" :label-width="90">
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
                   <FormItem label="姓名:" prop="patName">
                     <Input v-model="formItem.patName" placeholder="Enter something..." style="width: 250px"></Input>
                   </FormItem>
                 </Col>
                 <Col span="6">
                   <FormItem label="性别:" prop="patSex">
                     <RadioGroup v-model="formItem.patSex">
                       <Radio label="男"></Radio>
                       <Radio label="女"></Radio>
                     </RadioGroup>
                   </FormItem>
                 </Col>
                 <Col span="6">
                   <FormItem label="科别:" prop="patDeptName">
                     <Select v-model="formItem.patDeptName" style="width:250px">
                       <Option v-for="item in cityList" :value="item.value" :key="item.value">{{ item.label }}</Option>
                     </Select>
                   </FormItem>
                 </Col>
                 <Col span="6">
                   <FormItem label="床号:" prop="patNumber">
                     <Input v-model="formItem.patNumber" placeholder="Enter something..." style="width: 250px"></Input>
                   </FormItem>
                 </Col>
               </Row>
               <Row>
                 <Col span="6">
                   <FormItem label="年龄:" prop="patAge">
                     <Input v-model="formItem.patAge" placeholder="Enter something..." style="width: 250px"></Input>
                   </FormItem>
                 </Col>
                 <Col span="6">
                   <FormItem label="住院号:" prop="patHisId">
                     <Input v-model="formItem.patHisId" placeholder="Enter something..." style="width: 250px"></Input>
                   </FormItem>
                 </Col>
                 <Col span="6">
                   <FormItem label="患者血型:" prop="patBlood">
                     <Select v-model="formItem.patBlood" style="width:250px">
                       <Option v-for="item in bloodTypeList" :value="item.value" :key="item.value">{{ item.label }}</Option>
                     </Select>
                   </FormItem>
                 </Col>
                 <Col span="6">
                   <FormItem label="供者血型:" prop="supplyBlood">
                     <Select v-model="formItem.supplyBlood" style="width:250px">
                       <Option v-for="item in bloodTypeList" :value="item.value" :key="item.value">{{ item.label }}</Option>
                     </Select>
                   </FormItem>
                 </Col>
               </Row>
               <Row>
                 <Col span="6">
                   <FormItem label="输血史:" prop="bloodHistory">
                     <RadioGroup v-model="formItem.bloodHistory">
                       <Radio v-for="item in radioList" :label="item.value" :key="item.value">
                         <span>{{item.label}}</span>
                       </Radio>
                     </RadioGroup>
                   </FormItem>
                 </Col>
                 <Col span="6">
                   <FormItem label="次数:">
                     <Input v-model="formItem.bloodHistoryCount" placeholder="Enter something..." style="width: 250px" />
                   </FormItem>
                 </Col>
                 <Col span="6">
                   <FormItem label="妊娠史:" prop="gestationHistory">
                     <RadioGroup v-model="formItem.gestationHistory">
                       <Radio v-for="item in radioList" :label="item.value" :key="item.value">
                         <span>{{item.label}}</span>
                       </Radio>
                     </RadioGroup>
                   </FormItem>
                 </Col>
                 <Col span="6">
                   <FormItem label="孕产:">
                     <Input v-model="formItem.maternity" placeholder="Enter something..." style="width: 250px" />
                   </FormItem>
                 </Col>
               </Row>
               <Row>
                 <Col span="12">
                   <FormItem label="临床诊断:">
                     <Input v-model="formItem.diagnosis" type="textarea" placeholder="Enter something..." />
                   </FormItem>
                 </Col>
                 <Col span="12">
                   <FormItem label="用药史:">
                     <Input v-model="formItem.drugHistory" type="textarea" placeholder="Enter something..." />
                   </FormItem>
                 </Col>
               </Row>
               <Row>
                 <Col span="6">
                   <FormItem label="过敏史:" prop="allergy">
                     <RadioGroup v-model="formItem.allergy">
                       <Radio v-for="item in radioList" :label="item.value" :key="item.value">
                         <span>{{item.label}}</span>
                       </Radio>
                     </RadioGroup>
                   </FormItem>
                 </Col>
                 <Col span="6">
                   <FormItem label="主管医生:" prop="mainDoctor">
                     <Input v-model="formItem.mainDoctor"  placeholder="Enter something..." />
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
                   <FormItem label="输注成分:" prop="infusionComponents">
                     <Select v-model="formItem.infusionComponents" style="width:250px">
                       <Option v-for="item in infusionComponentList" :value="item.value" :key="item.value">{{ item.label }}</Option>
                     </Select>
                   </FormItem>
                 </Col>
                 <Col span="6">
                   <FormItem label="其他输注成分:">
                     <Input type="textarea" v-model="formItem.infusionComponentsOther" placeholder="Enter something..." style="width: 250px"></Input>
                   </FormItem>
                 </Col>
                 <Col span="6">
                   <FormItem label="血袋号:" prop="bloodNumber">
                     <Input v-model="formItem.bloodNumber" placeholder="Enter something..." style="width: 250px"></Input>
                   </FormItem>
                 </Col>
                 <Col span="6">
                   <FormItem label="已输血量:" prop="bloodVol">
                     <Input v-model="formItem.bloodVol" placeholder="Enter something..." style="width: 250px"></Input>
                   </FormItem>
                 </Col>
               </Row>
               <Row>
                 <Col span="6">
                   <FormItem label="剩余量:">
                     <Input v-model="formItem.bloodVolSurplus" placeholder="Enter something..." style="width: 250px"></Input>
                   </FormItem>
                 </Col>
                 <Col span="6">
                   <FormItem label="输血日期:" prop="joinBloodTime">
                     <DatePicker v-model="formItem.joinBloodTime" type="date" placeholder="Select date" style="width: 250px"></DatePicker>
                   </FormItem>
                 </Col>
                 <Col span="6">
                   <FormItem label="输血开始时间:" prop="enterBloodTime">
                     <DatePicker v-model="formItem.enterBloodTime" type="datetime" placeholder="Select date and time" ></DatePicker>
                   </FormItem>
                 </Col>
                 <Col span="6">
                   <FormItem label="停止时间:" prop="endBloodTime">
                     <DatePicker v-model="formItem.endBloodTime" type="datetime" placeholder="Select date and time" ></DatePicker>
                   </FormItem>
                 </Col>
               </Row>
               <Row>
                 <Col span="12">
                   <FormItem label="输血反应发生时间:" :label-width="140" prop="transfusionreactionTimeIng">
                     <Checkbox>输血过程中</Checkbox>
                     <DatePicker v-model="formItem.transfusionreactionTimeIng" type="datetime" placeholder="Select date and time" ></DatePicker>
                     <Checkbox>输血后</Checkbox>
                     &nbsp;&nbsp;<Input v-model="formItem.transfusionreactionTimeEndday" placeholder="Enter something..." style="width: 50px" />&nbsp;&nbsp;天
                     &nbsp;&nbsp;<Input v-model="formItem.transfusionreactionTimeEndTime" placeholder="Enter something..." style="width: 50px" />&nbsp;&nbsp;小时
                   </FormItem>
                 </Col>
                 <Col span="12">
                   <FormItem label="输血反应的症状与体征:" :label-width="140" prop="transfusionreactionSymptoms">
                     <Select v-model="formItem.transfusionreactionSymptoms" style="width:250px">
                       <Option v-for="item in transfusionreactionSymptomsList" :value="item.value" :key="item.value">{{ item.label }}</Option>
                     </Select>
                   </FormItem>
                 </Col>
               </Row>
               <Row>
                 <Col span="12">
                   <FormItem label="其它输血反应的症状与体征:" :label-width="140">
                     <Input type="textarea" v-model="formItem.transfusionreactionSymptomsOther" placeholder="Enter something..."  />
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
                   <FormItem label="临床处理程序:" prop="clinicalProcedures">
                     <Select v-model="formItem.clinicalProcedures" multiple style="width:450px">
                       <Option v-for="item in clinicalProceduresList" :value="item.value" :key="item.value">{{ item.label }}</Option>
                     </Select>
                   </FormItem>
                 </Col>
               </Row>
               <Row>
                 <Col span="24">
                   <FormItem label="具体处置描述:">
                     <Input v-model="formItem.clinicalProceduresDesc" type="textarea" placeholder="Enter something..." />
                   </FormItem>
                 </Col>
               </Row>
               <Row>
                 <Col span="6">
                   <FormItem label="临床科室汇报时间:" :label-width="120" prop="clinicalDeptReportTime">
                     <DatePicker v-model="formItem.clinicalDeptReportTime" type="datetime" placeholder="Select date and time" style="width: 200px"></DatePicker>
                   </FormItem>
                 </Col>
                 <Col span="6">
                   <FormItem label="报告人:" :label-width="120">
                     <Input  v-model="formItem.clinicalDeptReportUser" placeholder="Enter something..."  />
                   </FormItem>
                 </Col>
                 <Col span="6">
                   <FormItem label="记录时间:" :label-width="120" prop="reportTime">
                     <DatePicker v-model="formItem.reportTime" type="datetime" placeholder="Select date and time" style="width: 200px"></DatePicker>
                   </FormItem>
                 </Col>
                 <Col span="6">
                   <FormItem label="记录人:" :label-width="120">
                     <Input  v-model="formItem.reportUser" placeholder="Enter something..."  />
                   </FormItem>
                 </Col>
               </Row>
               <Row>
                 <Col span="6">
                   <FormItem label="事件发生时间:" prop="happenTime">
                     <DatePicker v-model="formItem.happenTime" type="datetime" placeholder="Select date and time" ></DatePicker>
                   </FormItem>
                 </Col>
                 <Col span="6">
                   <FormItem label="事件发生地点:" prop="happenAddress">
                     <Select v-model="formItem.happenAddress" >
                       <Option v-for="item in cityList" :value="item.value" :key="item.value">{{ item.label }}</Option>
                     </Select>
                   </FormItem>
                 </Col>
               </Row>
             </div>
             <Button @click="submitMethod('formValidate')" type="success" icon="ios-share" style="width: 300px;margin: 20px 0">提交表单</Button>
           </Form>
         </div>
       </Card>
     </div>
</template>

<script>
export default {
  data () {
    return {
      addType: this.$route.query.addType,
      targetId: this.$route.query.targetId,
      bloodTypeList: [
        {
          value: 'A型',
          label: 'A型'
        },
        {
          value: 'B型',
          label: 'B型'
        },
        {
          value: 'O型',
          label: 'O型'
        },
        {
          value: 'AB型',
          label: 'AB型'
        },
        {
          value: 'Rh(D)阳性',
          label: 'Rh(D)阳性'
        },
        {
          value: 'Rh(D)阴性',
          label: 'Rh(D)阴性'
        }
      ],
      infusionComponentList: [
        {
          value: '悬浮红细胞',
          label: '悬浮红细胞'
        },
        {
          value: '血浆',
          label: '血浆'
        },
        {
          value: '机采血小板',
          label: '机采血小板'
        },
        {
          value: '冷沉淀',
          label: '冷沉淀'
        },
        {
          value: '其他',
          label: '其他'
        }
      ],
      transfusionreactionSymptomsList: [
        {
          value: '发热',
          label: '发热'
        },
        {
          value: '发绀',
          label: '发绀'
        },
        {
          value: '呼吸困难',
          label: '呼吸困难'
        },
        {
          value: '两肺布满湿性啰音',
          label: '两肺布满湿性啰音'
        },
        {
          value: '黄疸',
          label: '黄疸'
        },
        {
          value: '腰背痛',
          label: '腰背痛'
        },
        {
          value: '酱油色尿',
          label: '酱油色尿'
        },
        {
          value: '咯大量血性泡沫样痰',
          label: '咯大量血性泡沫样痰'
        },
        {
          value: '寒战',
          label: '寒战'
        },
        {
          value: '荨麻疹',
          label: '荨麻疹'
        },
        {
          value: '颈静脉怒张',
          label: '颈静脉怒张'
        },
        {
          value: '伤口渗血不止',
          label: '伤口渗血不止'
        },
        {
          value: '休克',
          label: '休克'
        },
        {
          value: '皮肤充血',
          label: '皮肤充血'
        },
        {
          value: '其他',
          label: '其他'
        }
      ],
      clinicalProceduresList: [
        {
          value: '立即停止输血，保留静脉通路，同时观察剩余血外观',
          label: '立即停止输血，保留静脉通路，同时观察剩余血外观'
        },
        {
          value: '采患者血及血袋中剩余血连同血袋送输血科检测',
          label: '采患者血及血袋中剩余血连同血袋送输血科检测'
        },
        {
          value: '留取反应后第一次尿送检',
          label: '留取反应后第一次尿送检'
        },
        {
          value: '对症处理',
          label: '对症处理'
        }
      ],
      radioList: [
        {
          value: 1,
          label: '有'
        },
        {
          value: 0,
          label: '无'
        }
      ],
      cityList: [
        {
          value: '1',
          label: '骨科'
        },
        {
          value: '2',
          label: '肝胆科'
        },
        {
          value: '3',
          label: '皮肤科'
        }
      ],
      formItem: {},
      eventBlood: {},
      eventContent: {},
      ruleValidate: {
        patName: [
          { required: true, message: '此处不能为空', trigger: 'blur' }
        ],
        patSex: [
          { required: true, message: '此处不能为空', trigger: 'change' }
        ],
        patDeptName: [
          { required: true, message: '此处不能为空', trigger: 'change' }
        ],
        patNumber: [
          { required: true, message: '此处不能为空', trigger: 'blur' }
        ],
        patAge: [
          { required: true, message: '此处不能为空', trigger: 'blur' }
        ],
        patHisId: [
          { required: true, message: '此处不能为空', trigger: 'blur' }
        ],
        patBlood: [
          { required: true, message: '此处不能为空', trigger: 'change' }
        ],
        supplyBlood: [
          { required: true, message: '此处不能为空', trigger: 'change' }
        ],
        bloodHistory: [
          { required: true, type: 'number', message: '此处不能为空', trigger: 'change' }
        ],
        gestationHistory: [
          { required: true, type: 'number', message: '此处不能为空', trigger: 'change' }
        ],
        allergy: [
          { required: true, type: 'number', message: '此处不能为空', trigger: 'change' }
        ],
        mainDoctor: [
          { required: true, message: '此处不能为空', trigger: 'blur' }
        ],
        infusionComponents: [
          { required: true, message: '此处不能为空', trigger: 'blur' }
        ],
        bloodNumber: [
          { required: true, message: '此处不能为空', trigger: 'blur' }
        ],
        bloodVol: [
          { required: true, message: '此处不能为空', trigger: 'blur' }
        ],
        joinBloodTime: [
          { required: true, type: 'date', message: '此处不能为空', trigger: 'change' }
        ],
        enterBloodTime: [
          { required: true, type: 'date', message: '此处不能为空', trigger: 'change' }
        ],
        endBloodTime: [
          { required: true, type: 'date', message: '此处不能为空', trigger: 'change' }
        ],
        transfusionreactionTimeIng: [
          { required: true, type: 'date', message: '此处不能为空', trigger: 'change' }
        ],
        transfusionreactionSymptoms: [
          { required: true, message: '此处不能为空', trigger: 'change' }
        ],
        clinicalDeptReportTime: [
          { required: true, type: 'date', message: '此处不能为空', trigger: 'change' }
        ],
        reportTime: [
          { required: true, type: 'date', message: '此处不能为空', trigger: 'change' }
        ],
        happenTime: [
          { required: true, type: 'date', message: '此处不能为空', trigger: 'change' }
        ],
        happenAddress: [
          { required: true, message: '此处不能为空', trigger: 'change' }
        ]
      }
    }
  },
  watch: {

  },
  mounted () {
    // 临床科室汇报人赋值
    this.formItem.clinicalDeptReportUser = this.$store.state.user.userName
  },
  methods: {
    // 提交方法
    submitMethod (name) {
      this.$refs[name].validate((valid) => {
        if (valid) {
          this.saveMethod()
        } else {
          this.$Message.error('请填写必填项!')
        }
      })
    },
    // 保存方法
    saveMethod () {
      let eventBCDTO = {}
      eventBCDTO.eventBlood = this.eventBloodValueMethod()
      eventBCDTO.eventContent = this.eventContentValueMethod()
      this.axios.post('/eventBlood/save', eventBCDTO).then((res) => {
        if (res.data.code === 0) {
          this.$Message.success('提交成功!')
          if (this.addType === 'reAdd') {
            this.reAddSave()
          }
          this.reListPage()
        }
      }).catch((e) => {
      })
    },
    // 从formItem中分离eventContent的值传到后端
    eventContentValueMethod () {
      this.eventContent.eventTypeId = 3
      this.eventContent.eventTypeName = '输血不良反应事件'
      this.eventContent.patName = this.formItem.patName
      this.eventContent.patSex = this.formItem.patSex
      this.eventContent.patDeptId = this.formItem.patDeptName
      this.eventContent.patDeptName = this.cityList.filter(e => e.value === this.formItem.patDeptName)[0].label
      this.eventContent.patNumber = this.formItem.patNumber
      this.eventContent.patAge = this.formItem.patAge
      this.eventContent.patHisId = this.formItem.patHisId
      this.eventContent.happenTime = this.formItem.happenTime
      this.eventContent.happenAddress = this.formItem.happenAddress
      this.eventContent.eventDeptId = '1'
      this.eventContent.eventDeptName = '骨科'
      this.eventContent.writeUserId = this.$store.state.user.userId
      this.eventContent.writeUserName = this.$store.state.user.userName
      this.eventContent.isAnonymous = '否'
      this.eventContent.eventContentStatus = 0
      this.eventContent.reStatus = 0
      return this.eventContent
    },
    // 从formItem中分离eventBlood的值传到后端
    eventBloodValueMethod () {
      this.eventBlood.clinicalProcedures = this.formItem.clinicalProcedures.join(',')
      this.eventBlood.clinicalDeptReportUserId = this.$store.state.user.userId
      this.eventBlood.clinicalDeptReportUser = this.$store.state.user.userName
      this.eventBlood.patBlood = this.formItem.patBlood
      this.eventBlood.supplyBlood = this.formItem.supplyBlood
      this.eventBlood.bloodHistory = this.formItem.bloodHistory
      this.eventBlood.bloodHistoryCount = this.formItem.bloodHistoryCount
      this.eventBlood.gestationHistory = this.formItem.gestationHistory
      this.eventBlood.maternity = this.formItem.maternity
      this.eventBlood.diagnosis = this.formItem.diagnosis
      this.eventBlood.drugHistory = this.formItem.drugHistory
      this.eventBlood.allergy = this.formItem.allergy
      this.eventBlood.mainDoctor = this.formItem.mainDoctor
      this.eventBlood.infusionComponents = this.formItem.infusionComponents
      this.eventBlood.infusionComponentsOther = this.formItem.infusionComponentsOther
      this.eventBlood.bloodNumber = this.formItem.bloodNumber
      this.eventBlood.bloodVol = this.formItem.bloodVol
      this.eventBlood.bloodVolSurplus = this.formItem.bloodVolSurplus
      this.eventBlood.joinBloodTime = this.formItem.joinBloodTime
      this.eventBlood.enterBloodTime = this.formItem.enterBloodTime
      this.eventBlood.endBloodTime = this.formItem.endBloodTime
      this.eventBlood.transfusionreactionTimeIng = this.formItem.transfusionreactionTimeIng
      this.eventBlood.transfusionreactionTimeEndday = this.formItem.transfusionreactionTimeEndday
      this.eventBlood.transfusionreactionTimeEndTime = this.formItem.transfusionreactionTimeEndTime
      this.eventBlood.transfusionreactionSymptoms = this.formItem.transfusionreactionSymptoms
      this.eventBlood.transfusionreactionSymptomsOther = this.formItem.transfusionreactionSymptomsOther
      this.eventBlood.clinicalProceduresDesc = this.formItem.clinicalProceduresDesc
      this.eventBlood.clinicalDeptReportTime = this.formItem.clinicalDeptReportTime
      this.eventBlood.clinicalDeptReportUser = this.formItem.clinicalDeptReportUser
      this.eventBlood.reportTime = this.formItem.reportTime
      this.eventBlood.reportUser = this.formItem.reportUser
      return this.eventBlood
    },
    // 返回列表页
    reListPage () {
      this.$router.push({
        path: 'event_write'
      })
    },
    // 重新上报
    reAddSave () {
      let requestParam = {
        eventContentId: this.targetId
      }
      this.axios.get('eventContent/reAddEvent', { params: requestParam }).then((res) => {
        if (res.data.code === 0) {
          this.$Message.info('重新上报成功')
        } else {
          this.$Message.error('重新上报失败')
        }
      }).catch((e) => {
        console.log(e)
      })
    }
  }
}
</script>

<style>
  .blood-subhead{
     border-left: 5px solid #ed4014;
    font-size: 12px;
    color: #000000;
    font-weight: bold;
    line-height: 16px;
    padding-left: 8px;
  }
</style>
