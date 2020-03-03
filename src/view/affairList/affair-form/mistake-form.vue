<template>
     <div>
       <Card  class="card-title-style bgColor-gray">
         <div slot="title">用药差错/用药接近差错</div>
         <div>
           <Form ref="formValidate" :model="formItem" :rules="ruleValidate" :label-width="90">
             <div>
               <div class="subhead-box">
                 <div class="subhead-text bgTitleColor-blue">
                   <p><Icon type="md-arrow-dropright-circle" />&nbsp;差错信息</p>
                 </div>
                 <div class="subhead-triangle-style borderColor-blue"></div>
                 <p class="subhead-ico"><Icon type="md-apps"  /></p>
               </div>
               <Row style="margin-top: 30px">
                 <Col span="6">
                   <FormItem label="差错发生日期:" prop="mistakesHappenTime">
                     <DatePicker v-model="formItem.mistakesHappenTime" type="datetime" placeholder="Select date and time" style="width: 200px"></DatePicker>
                   </FormItem>
                 </Col>
                 <Col span="6">
                   <FormItem label="发现差错日期:" prop="mistakesDiscoverableTime">
                     <DatePicker v-model="formItem.mistakesDiscoverableTime" type="datetime" placeholder="Select date and time" style="width: 200px"></DatePicker>
                   </FormItem>
                 </Col>
                 <Col span="6">
                   <FormItem label="差错内容:" prop="mistakesContent">
                     <Select v-model="formItem.mistakesContent" style="width:200px">
                       <Option v-for="item in mistakesContentList" :value="item.value" :key="item.value">{{ item.label }}</Option>
                     </Select>
                   </FormItem>
                 </Col>
                 <Col span="6">
                   <FormItem label="其它内容:">
                     <Input v-model="formItem.mistakesContentOther" placeholder="Enter something..." style="width: 200px"></Input>
                   </FormItem>
                 </Col>
               </Row>
               <Row>
                 <Col span="6">
                   <FormItem label="差错药品是否发给患者:" :label-width="90" prop="isDispensing">
                     <Select v-model="formItem.isDispensing" style="width:260px">
                       <Option v-for="item in isList" :value="item.value" :key="item.value">{{ item.label }}</Option>
                     </Select>
                   </FormItem>
                 </Col>
                 <Col span="6">
                   <FormItem label="患者是否使用了差错药品:" prop="isUseDrug">
                     <Select v-model="formItem.isUseDrug"  style="width:260px">
                       <Option v-for="item in isList" :value="item.value" :key="item.value">{{ item.label }}</Option>
                     </Select>
                   </FormItem>
                 </Col>
                 <Col span="6">
                   <FormItem label="引发差错的原因选择:" prop="mistakesCause">
                     <Select v-model="formItem.mistakesCause" multiple style="width:260px">
                       <Option v-for="item in causeList" :value="item.value" :key="item.value">{{ item.label }}</Option>
                     </Select>
                   </FormItem>
                 </Col>
                 <Col span="6">
                   <FormItem label="其它引发差错的因素:">
                     <Input v-model="formItem.mistakesCauseOther" placeholder="Enter something..." style="width: 200px"></Input>
                   </FormItem>
                 </Col>
               </Row>
               <Row>
                 <Col span="6">
                   <FormItem label="发生差错的场所:" :label-width="90" prop="mistakesPlace">
                     <Select v-model="formItem.mistakesPlace" style="width:260px">
                       <Option v-for="item in placeList" :value="item.value" :key="item.value">{{ item.label }}</Option>
                     </Select>
                   </FormItem>
                 </Col>
                 <Col span="6">
                   <FormItem label="其它发生差错的产所:">
                     <Input v-model="formItem.mistakesPlaceOther" placeholder="Enter something..." style="width: 200px"></Input>
                   </FormItem>
                 </Col>
                 <Col span="6">
                   <FormItem label="引起差错的工作人员职位:" prop="mistakesHappenJob">
                     <Select v-model="formItem.mistakesHappenJob" style="width:260px">
                       <Option v-for="item in jobList" :value="item.value" :key="item.value">{{ item.label }}</Option>
                     </Select>
                   </FormItem>
                 </Col>
                 <Col span="6">
                   <FormItem label="其它职位:">
                     <Input v-model="formItem.mistakesHappenJobOther" placeholder="Enter something..." style="width: 200px"></Input>
                   </FormItem>
                 </Col>
               </Row>
               <Row>
                 <Col span="6">
                   <FormItem label="发现差错的人员职务:" :label-width="90" prop="mistakesDiscoverableJob">
                     <Select v-model="formItem.mistakesDiscoverableJob" style="width:260px">
                       <Option v-for="item in jobList1" :value="item.value" :key="item.value">{{ item.label }}</Option>
                     </Select>
                   </FormItem>
                 </Col>
                 <Col span="6">
                   <FormItem label="发现差错人员的其它职务:">
                     <Input v-model="formItem.mistakesDiscoverableJobOther" placeholder="Enter something..." style="width: 200px"></Input>
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
                   <FormItem label="患者姓名:" :label-width="90" prop="patName">
                     <Input v-model="formItem.patName" placeholder="Enter something..." style="width: 300px" />
                   </FormItem>
                 </Col>
                 <Col span="6">
                   <FormItem label="出生年月日:" prop="patBirthday">
                     <DatePicker v-model="formItem.patBirthday" type="datetime" placeholder="Select date and time" style="width: 200px"></DatePicker>
                   </FormItem>
                 </Col>
                 <Col span="6">
                   <FormItem label="住院号:" prop="patHisId">
                     <Input v-model="formItem.patHisId" placeholder="Enter something..." style="width: 300px" />
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
               </Row>
               <Row>
                 <Col span="6">
                   <FormItem label="临床诊断:" :label-width="90" prop="diagnosis">
                     <Input v-model="formItem.diagnosis" placeholder="Enter something..." style="width: 300px" />
                   </FormItem>
                 </Col>
                 <Col span="6">
                   <FormItem label="患者联系方式:" prop="patTel">
                     <Input v-model="formItem.patTel" placeholder="Enter something..." style="width: 300px" />
                   </FormItem>
                 </Col>
               </Row>
               <Row>
                 <Col span="24">
                   <FormItem label="差错发生的经过：请简述时间经过、后果、相关人员职位、工作环境（药师填写）:" :label-width="150" prop="describes">
                     <Input v-model="formItem.describes" type="textarea" :rows="4" placeholder="Enter something..." />
                   </FormItem>
                 </Col>
               </Row>
               <Row>
                 <Col span="24">
                   <FormItem label="对预防类似差错发生的建议（药师填写）：" :label-width="150" prop="advice">
                     <Input v-model="formItem.advice" type="textarea" :rows="4" placeholder="Enter something..." />
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
                   <FormItem label="报告人:" :label-width="90">
                     <Input class="input-color" v-model="formItem.writeUserName" disabled placeholder="Enter something..." style="width: 300px" />
                   </FormItem>
                 </Col>
                 <Col span="6">
                   <FormItem label="科室:" prop="eventDeptId">
                     <Select v-model="formItem.eventDeptId"  style="width:260px">
                       <Option v-for="item in cityList" :value="item.value" :key="item.value">{{ item.label }}</Option>
                     </Select>
                   </FormItem>
                 </Col>
                 <Col span="6">
                   <FormItem label="联系方式:" prop="writeUserTel">
                     <Input v-model="formItem.writeUserTel" placeholder="Enter something..." style="width: 300px" />
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
      jobList1: [
        {
          value: '初级药师',
          label: '初级药师'
        },
        {
          value: '中级药师',
          label: '中级药师'
        },
        {
          value: '高级药师',
          label: '高级药师'
        },
        {
          value: '护士',
          label: '护士'
        },
        {
          value: '医师',
          label: '医师'
        },
        {
          value: '患者或家属',
          label: '患者或家属'
        },
        {
          value: '其他',
          label: '其他'
        }
      ],
      jobList: [
        {
          value: '初级药师',
          label: '初级药师'
        },
        {
          value: '中级药师',
          label: '中级药师'
        },
        {
          value: '高级药师',
          label: '高级药师'
        },
        {
          value: '护士',
          label: '护士'
        },
        {
          value: '医师',
          label: '医师'
        },
        {
          value: '其他',
          label: '其他'
        }
      ],
      placeList: [
        {
          value: '门诊药房',
          label: '门诊药房'
        },
        {
          value: '中心药房',
          label: '中心药房'
        },
        {
          value: '急诊药房',
          label: '急诊药房'
        },
        {
          value: 'PIVAS',
          label: 'PIVAS'
        },
        {
          value: '护士站',
          label: '护士站'
        },
        {
          value: '病区',
          label: '病区'
        },
        {
          value: '门诊诊室',
          label: '门诊诊室'
        },
        {
          value: '其他',
          label: '其他'
        }
      ],
      causeList: [
        {
          value: '选错药',
          label: '选错药'
        },
        {
          value: '缩写',
          label: '缩写'
        },
        {
          value: '药名相似',
          label: '药名相似'
        },
        {
          value: '外观相似',
          label: '外观相似'
        },
        {
          value: '分装',
          label: '分装'
        },
        {
          value: '稀释',
          label: '稀释'
        },
        {
          value: '标签',
          label: '标签'
        },
        {
          value: '其他',
          label: '其他'
        }
      ],
      isList: [
        {
          value: 0,
          label: '无'
        },
        {
          value: 1,
          label: '有'
        },
        {
          value: 2,
          label: '不详'
        }
      ],
      mistakesContentList: [
        {
          value: '品种',
          label: '品种'
        },
        {
          value: '规格',
          label: '规格'
        },
        {
          value: '数量',
          label: '数量'
        },
        {
          value: '剂量',
          label: '剂量'
        },
        {
          value: '剂型',
          label: '剂型'
        },
        {
          value: '给药途径',
          label: '给药途径'
        },
        {
          value: '给药时间',
          label: '给药时间'
        },
        {
          value: '疗程',
          label: '疗程'
        },
        {
          value: '禁忌症',
          label: '禁忌症'
        },
        {
          value: '配伍',
          label: '配伍'
        },
        {
          value: '其它',
          label: '其它'
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
      eventMistake: {},
      eventContent: {},
      ruleValidate: {
        mistakesHappenTime: [
          { required: true, type: 'date', message: '此处不能为空', trigger: 'change' }
        ],
        mistakesDiscoverableTime: [
          { required: true, type: 'date', message: '此处不能为空', trigger: 'change' }
        ],
        mistakesContent: [
          { required: true, message: '此处不能为空', trigger: 'change' }
        ],
        isDispensing: [
          { required: true, type: 'number', message: '此处不能为空', trigger: 'change' }
        ],
        isUseDrug: [
          { required: true, type: 'number', message: '此处不能为空', trigger: 'change' }
        ],
        mistakesCause: [
          { required: true, type: 'array', message: '此处不能为空', trigger: 'change' }
        ],
        mistakesPlace: [
          { required: true, message: '此处不能为空', trigger: 'change' }
        ],
        mistakesHappenJob: [
          { required: true, message: '此处不能为空', trigger: 'change' }
        ],
        mistakesDiscoverableJob: [
          { required: true, message: '此处不能为空', trigger: 'change' }
        ],
        patName: [
          { required: true, message: '此处不能为空', trigger: 'blur' }
        ],
        patBirthday: [
          { required: true, type: 'date', message: '此处不能为空', trigger: 'change' }
        ],
        patHisId: [
          { required: true, message: '此处不能为空', trigger: 'blur' }
        ],
        patSex: [
          { required: true, message: '此处不能为空', trigger: 'change' }
        ],
        diagnosis: [
          { required: true, message: '此处不能为空', trigger: 'blur' }
        ],
        patTel: [
          { required: true, message: '此处不能为空', trigger: 'blur' }
        ],
        describes: [
          { required: true, message: '此处不能为空', trigger: 'blur' }
        ],
        advice: [
          { required: true, message: '此处不能为空', trigger: 'blur' }
        ],
        eventDeptId: [
          { required: true, message: '此处不能为空', trigger: 'change' }
        ],
        writeUserTel: [
          { required: true, message: '此处不能为空', trigger: 'blur' }
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
  mounted () {
    this.formItem.writeUserName = this.$store.state.user.userName
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
      eventBCDTO.eventMistake = this.eventMistakeValueMethod()
      eventBCDTO.eventContent = this.eventContentValueMethod()
      this.axios.post('/eventMistake/save', eventBCDTO).then((res) => {
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
    // 从formItem中分离eventOther的值传到后端
    eventMistakeValueMethod () {
      this.eventMistake.mistakesHappenTime = this.formItem.mistakesHappenTime
      this.eventMistake.mistakesDiscoverableTime = this.formItem.mistakesDiscoverableTime
      this.eventMistake.mistakesContent = this.formItem.mistakesContent
      this.eventMistake.mistakesContentOther = this.formItem.mistakesContentOther
      this.eventMistake.isDispensing = this.formItem.isDispensing
      this.eventMistake.isUseDrug = this.formItem.isUseDrug
      this.eventMistake.mistakesCause = this.formItem.mistakesCause.join(',')
      this.eventMistake.mistakesCauseOther = this.formItem.mistakesCauseOther
      this.eventMistake.mistakesPlace = this.formItem.mistakesPlace
      this.eventMistake.mistakesPlaceOther = this.formItem.mistakesPlaceOther
      this.eventMistake.mistakesHappenJob = this.formItem.mistakesHappenJob
      this.eventMistake.mistakesHappenJobOther = this.formItem.mistakesHappenJobOther
      this.eventMistake.mistakesDiscoverableJob = this.formItem.mistakesDiscoverableJob
      this.eventMistake.mistakesDiscoverableJobOther = this.formItem.mistakesDiscoverableJobOther
      this.eventMistake.diagnosis = this.formItem.diagnosis
      this.eventMistake.patTel = this.formItem.patTel
      this.eventMistake.describes = this.formItem.describes
      this.eventMistake.advice = this.formItem.advice
      this.eventMistake.writeUserTel = this.formItem.writeUserTel
      return this.eventMistake
    },
    // 从formItem中分离eventContent的值传到后端
    eventContentValueMethod () {
      this.eventContent.eventTypeId = 5
      this.eventContent.eventTypeName = '用药差错不良事件'
      this.eventContent.patName = this.formItem.patName
      this.eventContent.patBirthday = this.formItem.patBirthday
      this.eventContent.patHisId = this.formItem.patHisId
      this.eventContent.patSex = this.formItem.patSex
      this.eventContent.happenTime = this.formItem.happenTime
      this.eventContent.happenAddress = this.formItem.happenAddress
      this.eventContent.eventDeptId = this.formItem.eventDeptId
      this.eventContent.eventDeptName = this.cityList.filter(e => e.value === this.formItem.eventDeptId)[0].label
      this.eventContent.writeUserId = this.$store.state.user.userId
      this.eventContent.writeUserName = this.$store.state.user.userName
      this.eventContent.isAnonymous = '否'
      this.eventContent.eventContentStatus = 0
      this.eventContent.reStatus = 0
      return this.eventContent
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

</style>
