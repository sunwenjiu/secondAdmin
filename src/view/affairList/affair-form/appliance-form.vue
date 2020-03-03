<template>
     <div>
       <Modal
         v-model="warningModel"
         @on-ok="ok('formItem')"
         width="400"
         @on-cancel="cancel">
         <p slot="header" class="warning-title"><span class="warning-title-ico"><Icon type="ios-alert" /></span>确认要提交报表么？</p>
         <p class="warning-text">注意:不良事件上报表一经提交，以后都不能修改，请确认所填写信息无误再提交！</p>
       </Modal>
       <Card  class="card-title-style bgColor-gray">
         <div slot="title">器械不良事件表单列表</div>
         <div>
           <Form  ref="formItem" :model="formItem" :label-width="80"  :rules="ruleValidate" >
             <div>
               <div class="subhead-box">
                 <div class="subhead-text bgTitleColor-blue">
                   <p><Icon type="md-arrow-dropright-circle" />&nbsp;患者资料</p>
                 </div>
                 <div class="subhead-triangle-style borderColor-blue"></div>
                 <p class="subhead-ico"><Icon type="md-apps"  /></p>
               </div><Row style="margin-top: 30px">
               <Col span="6">
                 <FormItem label="姓名:" prop="patientName">
                   <Input v-model="formItem.patientName" placeholder="请输入..." style="width: 200px"></Input>
                 </FormItem>
               </Col>
               <Col span="6">
                 <!--<FormItem label="性别:"  prop="gender">
                   <Input v-model="formItem.gender" placeholder="请输入..." style="width: 200px"></Input>
                 </FormItem>-->
                 <FormItem label=" 性别:" prop="gender" >
                   <RadioGroup  v-model="formItem.gender" @on-change="RadioClick">
                     <Radio label="男">
                       <span>男</span>
                     </Radio>
                     <Radio label="女">
                       <span>女</span>
                     </Radio>
                   </RadioGroup>
                 </FormItem>
               </Col>
               <Col span="6">
                 <FormItem label="出生年月日:" prop="patientBirthday">
                   <DatePicker v-model="formItem.patientBirthday" format="yyyy年MM月dd日" type="date" placeholder="请选择时间" style="width: 200px"></DatePicker>
                 </FormItem>
               </Col>
               <Col span="6">
                 <FormItem label="年龄:" prop="age">
                   <Input v-model="formItem.age" placeholder="请输入..." style="width: 200px"></Input>
                 </FormItem>
               </Col>
             </Row>
               <Row>
                 <Col span="6">
                   <FormItem label="床号:" prop="bedNumber">
                     <Input v-model="formItem.bedNumber" placeholder="请输入..." style="width: 200px"></Input>
                   </FormItem>
                 </Col>
                 <Col span="6">
                   <FormItem label="住院号:" prop="hospitalizationNumber">
                     <Input v-model="formItem.hospitalizationNumber" placeholder="请输入..." style="width: 200px"></Input>
                   </FormItem>
                 </Col>
                 <Col span="6">
                   <FormItem label="入院时间:" prop="admissionTime">
                     <DatePicker v-model="formItem.admissionTime" format="yyyy年MM月dd日" type="date" placeholder="请选择时间" style="width: 200px"></DatePicker>
                   </FormItem>
                 </Col>
                 <!--<Col span="6">
                   <FormItem label=" 诊断:">
                     <Input v-model="formItem.diagnosis" placeholder="请输入..." style="width: 200px"></Input>
                   </FormItem>
                 </Col>-->
               </Row>
               <!--<Row style="margin-top: 30px">
                 <Col span="6">
                   <FormItem label="姓名:">
                     <Input v-model="formItem.input" placeholder="请输入..." style="width: 200px"></Input>
                   </FormItem>
                 </Col>
                 <Col span="6">
                   <FormItem label="年龄:">
                     <Input v-model="formItem.input" placeholder="请输入..." style="width: 200px"></Input>
                   </FormItem>
                 </Col>
                 <Col span="6">
                   <FormItem label="性别:">
                     <RadioGroup v-model="formItem.sex">
                       <Radio label="男"></Radio>
                       <Radio label="女"></Radio>
                       &lt;!&ndash;<Radio label="其它"></Radio>&ndash;&gt;
                     </RadioGroup>
                   </FormItem>
                 </Col>
               </Row>-->
               <Row>
                 <Col span="6">
                   <FormItem label="病人病例号" prop="medicalRecordNumber">
                     <Input v-model="formItem.medicalRecordNumber" placeholder="请输入..." style="width: 200px"></Input>

                   </FormItem>
                 </Col>
                 <Col span="6">
                   <FormItem label="病人科室:" prop="patientDepartment">
                     <Select v-model="formItem.patientDepartment"  style="">
                       <Option v-for="item in patientDepartmentOption " :value="item.value" :key="item.value">{{ item.label }}</Option>
                     </Select>
                   </FormItem>
                 </Col>
                 <Col span="12">
                   <FormItem label="预期治疗疾病或作用:">
                     <Input v-model="formItem.intendedTreatmentOfDiseaseOrEffect" type="textarea" style="width: 400px" placeholder="请输入..." />
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
                   <FormItem label="事件主要表现:" :label-width="120">
                     <Input v-model="formItem.mainPerformanceOfTheEvent" type="textarea" style="width: 600px" placeholder="请输入..." />
                   </FormItem>
                 </Col>
               </Row>
               <Row>
                 <Col span="6">
                   <FormItem label="事件发生日期:" :label-width="120" prop="eventHappenTime">
                     <DatePicker v-model="formItem.eventHappenTime" type="datetime" placeholder="请选择时间" style="width: 250px"></DatePicker>
                   </FormItem>
                 </Col>
                 <Col span="8">
                   <FormItem label=" 事件发生地点:" :label-width="120" prop="eventHappenAddress">
                     <Select v-model="formItem.eventHappenAddress" multiple style="width: 300px">
                       <Option v-for="item in eventHappenAddressOption" :value="item.value" :key="item.value">{{ item.label }}</Option>
                     </Select>
                   </FormItem>
                 </Col>
                 <Col span="8">
                   <FormItem label=" 其它地点:" :label-width="100">
                     <Input v-model="formItem.eventHappenAddressOther"  style="width: 300px" placeholder="请输入..."></Input>
                   </FormItem>
                 </Col>

                 <!--<Col span="6" >
                   <FormItem v-show="causeModel==3" label="场所名称:" :label-width="90">
                     <Input v-model="value222" placeholder="请输入..." style="width: 250px" />
                   </FormItem>
                 </Col>-->
               </Row>
               <Row>
                 <Col span="6">
                   <FormItem label="发现或者知悉时间:" :label-width="120">
                     <DatePicker v-model="formItem.timeOfDiscoveryOrKnowledge" type="datetime" placeholder="请选择时间" style="width: 250px"></DatePicker>
                   </FormItem>
                 </Col>
                 <Col span="8">
                   <FormItem label="医疗器械实际使用场所:" :label-width="120">
                     <Select v-model="formItem.actualUsePlaceOfMedicalDevices" style="width:300px">
                       <Option v-for="item in actualUsePlaceOfMedicalDevicesOption" :value="item.value" :key="item.value">{{ item.label }}</Option>
                     </Select>
                   </FormItem>
                 </Col>
                 <Col span="8">
                   <FormItem label=" 其它场所:" :label-width="100">
                     <Input v-model="formItem.actualUsePlaceOfMedicalDevicesOther"  style="width: 300px" placeholder="请输入..."></Input>
                   </FormItem>
                 </Col>
               </Row>
               <Row>
                 <Col span="6">
                   <FormItem label="事件后果:" :label-width="120">
                     <Select v-model="formItem.eventConsequence" style="width:250px">
                       <Option v-for="item in eventConsequenceOption" :value="item.value" :key="item.value">{{ item.label }}</Option>
                     </Select>
                   </FormItem>
                 </Col>
                 <Col span="6">
                   <FormItem label="死亡时间:" v-show="formItem.eventConsequence === '死亡'" prop="deathTime">
                     <DatePicker v-model="formItem.deathTime" format="yyyy年MM月dd日" type="date" placeholder="请选择时间" style="width: 200px"></DatePicker>
                   </FormItem>
                 </Col>
                 <!--<Col span="6" >
                   <FormItem v-show="causeModel==3" label="场所名称:" :label-width="120">
                     <Input v-model="value222" placeholder="请输入..." style="width: 250px" />
                   </FormItem>
                 </Col>-->
                <!-- <Col span="6" >
                   <FormItem label="不良事件等级:" :label-width="120">
                     <Select v-model="causeModel" style="width:250px">
                       <Option v-for="item in cityList" :value="item.value" :key="item.value">{{ item.label }}</Option>
                     </Select>
                   </FormItem>
                 </Col>-->
               </Row>
               <Row>
                 <Col span="18">
                   <FormItem label="事件陈述:" :label-width="120">
                     <Input v-model="formItem.eventStatement" type="textarea" placeholder="请输入..." />
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
                   <FormItem label="产品名称:" :label-width="90">
                     <Input v-model="formItem.productName" placeholder="请输入..." style="width: 250px" />
                   </FormItem>
                 </Col>
                 <Col span="6">
                   <FormItem label="商品名称:" :label-width="90">
                     <Input v-model="formItem.tradeName" placeholder="请输入..." style="width: 250px" />
                   </FormItem>
                 </Col>
                 <Col span="6">
                   <FormItem label="注册证号:" :label-width="90">
                     <Input v-model="formItem.registrationCertificateNo" placeholder="请输入..." style="width: 250px" />
                   </FormItem>
                 </Col>
                 <Col span="6" >
                   <FormItem label="生产企业名称:" :label-width="90">
                     <Input v-model="formItem.nameOfManufacturer" placeholder="请输入..." style="width: 250px" />
                   </FormItem>
                 </Col>
               </Row>
               <Row>
                 <Col span="6">
                   <FormItem label="生产企业地址:" :label-width="90">
                     <Input v-model="formItem.addressOfManufacturer" placeholder="请输入..." style="width: 250px" />
                   </FormItem>
                 </Col>
                 <Col span="6">
                   <FormItem label="企业联系电话:" :label-width="90">
                     <Input v-model="formItem.businessContactNumber" placeholder="请输入..." style="width: 250px" />
                   </FormItem>
                 </Col>
                 <Col span="6">
                   <FormItem label="型号规格:" :label-width="90">
                     <Input v-model="formItem.modelSpecification" placeholder="请输入..." style="width: 250px" />
                   </FormItem>
                 </Col>
                 <Col span="6" >
                   <FormItem label="产品编号:" :label-width="90">
                     <Input v-model="formItem.productNumber" placeholder="请输入..." style="width: 250px" />
                   </FormItem>
                 </Col>
               </Row>
               <Row>
                 <Col span="6">
                   <FormItem label="产品批号:" :label-width="90">
                     <Input v-model="formItem.productBatchNumber" placeholder="请输入..." style="width: 250px" />
                   </FormItem>
                 </Col>
                 <Col span="6">
                   <FormItem label="操作人:" :label-width="90">
                     <Select v-model="formItem.operator" style="width:250px">
                       <Option v-for="item in operatorOption" :value="item.value" :key="item.value">{{ item.label }}</Option>
                     </Select>
                   </FormItem>
                 </Col>
                 <Col span="6" >
                   <FormItem  label="其他操作人:" :label-width="90">
                     <Input v-model="formItem.operatorOther" placeholder="请输入..." style="width: 250px" />
                   </FormItem>
                 </Col>
               </Row>
               <Row>
                 <Col span="6">
                   <FormItem label="有效期至:" :label-width="90">
                     <DatePicker v-model="formItem.termOfValidity" type="date" placeholder="请选择时间" style="width: 250px"></DatePicker>
                   </FormItem>
                 </Col>
                 <Col span="6">
                   <FormItem label="生产日期:" :label-width="90">
                     <DatePicker v-model="formItem.dateOfManufacture" type="date" placeholder="请选择时间" style="width: 250px"></DatePicker>
                   </FormItem>
                 </Col>
                 <Col span="6">
                   <FormItem label="停用日期:" :label-width="90">
                     <DatePicker v-model="formItem.deactivationDate" type="date" placeholder="请选择时间" style="width: 250px"></DatePicker>
                   </FormItem>
                 </Col>
                 <Col span="6" >
                   <FormItem label="植入日期(若植入):" :label-width="120">
                     <DatePicker v-model="formItem.dateOfImplantation" type="date" placeholder="请选择时间" style="width: 250px"></DatePicker>
                   </FormItem>
                 </Col>
               </Row>
               <Row :gutter="16">
                 <Col span="12">
                   <FormItem label="事件发生初步原因分析：" :label-width="90">
                     <Input v-model="formItem.preliminaryCauseAnalysisOfTheIncident" type="textarea" placeholder="请输入..." />
                   </FormItem>
                 </Col>
                 <Col span="12">
                   <FormItem label="事件初步处理情况：" :label-width="90">
                     <Input v-model="formItem.preliminaryHandlingOfTheIncident" type="textarea" placeholder="请输入..." />
                   </FormItem>
                 </Col>
               </Row>
               <Row>
                 <Col span="6">
                   <FormItem label="事件报告状态：" :label-width="90">
                     <Select v-model="formItem.eventReportStatus" style="width:250px">
                       <Option v-for="item in eventReportStatusOption" :value="item.value" :key="item.value">{{ item.label }}</Option>
                     </Select>
                   </FormItem>
                 </Col>
               </Row>
             </div>
             <Button type="success" icon="ios-share"  @click="upReportForm('formItem')" style="width: 300px;margin: 20px 0">提交表单</Button>
           </Form>
         </div>
       </Card>
     </div>
</template>

<script>
export default {
  data () {
    // 选择死亡后时间的验证
    const validateDeathTime = (rule, value, callback) => {
      if (this.formItem.eventConsequence === '死亡') {
        if (!value) {
          return callback(new Error('请选择'))
        } else {
          callback()
        }
      } else {
        callback()
      }
    }
    const validateAge = (rule, value, callback) => {
      if (!value) {
        return callback(new Error('请输入'))
      }
      if (value >= 0 && value <= 150) {
        callback()
      } else {
        callback(new Error('请输入数字,或正确年龄'))
      }
    }
    return {
      addType: this.$route.query.addType,
      targetId: this.$route.query.targetId,
      warningModel: false, // 模态框
      eventReportStatusOption: [ // 事件报告状态
        {
          value: '已通知使用单位',
          label: '已通知使用单位'
        },
        {
          value: '已通知生产企业',
          label: '已通知生产企业'
        },
        {
          value: '已通知经营企业',
          label: '已通知经营企业'
        },
        {
          value: '已通知药监部门',
          label: '已通知药监部门'
        }
        ], // 事件报告状态
      operatorOption: [ // 操作人选项
        {
          value: '专业人员',
          label: '专业人员'
        },
        {
          value: '非专业人员',
          label: '非专业人员'
        },
        {
          value: '患者',
          label: '患者'
        },
        {
          value: '其他',
          label: '其他'
        }
      ], // 操作人选项
      eventConsequenceOption: [ // 事件后果选项
        {
        value: '死亡',
        label: '死亡'
      },
        {
          value: '危及生命',
          label: '危及生命'
        },
        {
          value: '机体功能结构永久性损伤',
          label: '机体功能结构永久性损伤'
        },
        {
          value: '可能导致机体功能结构永久性损伤',
          label: '可能导致机体功能结构永久性损伤'
        },
        {
          value: '需要内、外科治疗避免上诉永久损伤',
          label: '需要内、外科治疗避免上诉永久损伤'
        },
        {
          value: '其他(在事件陈述中说明)',
          label: '其他(在事件陈述中说明)'
        }
        ], // 事件后果选项
      actualUsePlaceOfMedicalDevicesOption: [ // 医疗器械实际使用场所
        {
          value: '医疗机构',
          label: '医疗机构'
        },
        {
          value: '家庭',
          label: '家庭'
        },
        {
          value: '其他',
          label: '其他'
        }
      ], // 医疗器械实际使用场所
      eventHappenAddressOption: [ // 事件发生地址
        {
          value: '病房',
          label: '病房'
        },
        {
          value: '治疗室',
          label: '治疗室'
        },
        {
          value: '处置室',
          label: '处置室'
        },
        {
          value: '走廊',
          label: '走廊'
        },
        {
          value: '卫生间',
          label: '卫生间'
        },
        {
          value: '院外',
          label: '院外'
        },
        {
          value: '其他',
          label: '其他'
        }
      ], // 事件发生地址
      patientDepartmentOption: [ // 病人科室名字选择
        {
          value: '骨科',
          label: '骨科'
        },
        {
          value: '肝胆科',
          label: '肝胆科'
        },
        {
          value: '皮肤科',
          label: '皮肤科'
        }
      ], // 病人科室名字选择
      formItem: {
        patientName: '', // 患者姓名
        gender: '', // 患者性别
        patientBirthday: '', // 患者生日
        age: '', // 患者年龄
        bedNumber: '', // 患者床号
        hospitalizationNumber: '', // 住院号
        admissionTime: '', // 入院时间
        medicalRecordNumber: '', // 病人病历号
        intendedTreatmentOfDiseaseOrEffect: '', // 预期治疗疾病或作用
        mainPerformanceOfTheEvent: '', // 事件主要表现
        patientDepartment: '', // 病人科室
        eventHappenTime: '', // 事件发生时间
        eventHappenAddress: '', // 事件发生地点
        eventHappenAddressOther: '', // 事件发生地点的其他地点
        timeOfDiscoveryOrKnowledge: '', // 发现或者知悉时间
        actualUsePlaceOfMedicalDevices: '', // 医疗器械实际使用场所
        actualUsePlaceOfMedicalDevicesOther: '', // 医疗器械实际使用场所的其他厕所
        eventConsequence: '', // 事件后果
        deathTime: '', // 死亡时间
        eventStatement: '', // 事件陈述
        productName: '', // 产品名称
        tradeName: '', // 商品名称
        registrationCertificateNo: '', // 注册证号
        nameOfManufacturer: '', // 生产企业名称
        addressOfManufacturer: '', // 生产企业地址
        businessContactNumber: '', // 企业联系电话
        modelSpecification: '', // 型号规格
        productNumber: '', // 产品编号
        productBatchNumber: '', // 产品批号
        operator: '', // 操作人
        operatorOther: '', // 其他操作人
        termOfValidity: '', // 有效期
        dateOfManufacture: '', // 生产日期
        deactivationDate: '', // 停用日期
        dateOfImplantation: '', // 植入日期
        preliminaryCauseAnalysisOfTheIncident: '', // 事件发生初步原因分析
        preliminaryHandlingOfTheIncident: '', // 事件初步处理情况
        eventReportStatus: '', // 事件报告状态
        anonymous: '否', // 是否匿名
        input: '',
        select: '',
        radio: 'male',
        checkbox: [],
        date: ''
      },
      ruleValidate: {
        patientName: [
          { required: true, message: '请输入', trigger: 'blur' },
          { type: 'string', max: 32, message: '不能超过32位', trigger: 'blur' }
        ],
        gender: [
          { required: true, message: '请选择', trigger: 'change' }
        ],
        patientBirthday: [
          { required: true, type: 'date', message: '请选择', trigger: 'change' }
        ],
        age: [
          { required: true, message: '请输入', trigger: 'blur' },
          { validator: validateAge, trigger: 'blur' }
        ],
        bedNumber: [
          { required: true, message: '请输入', trigger: 'blur' },
          { type: 'string', max: 32, message: '不能超过32位', trigger: 'blur' }
        ],
        hospitalizationNumber: [
          { required: true, message: '请输入', trigger: 'blur' },
          { type: 'string', max: 32, message: '不能超过32位', trigger: 'blur' }
        ],
        admissionTime: [
          { required: true, type: 'date', message: '请选择', trigger: 'change' }
        ],
        medicalRecordNumber: [
          { required: true, message: '请输入', trigger: 'blur' },
          { type: 'string', max: 32, message: '不能超过32位', trigger: 'blur' }
        ],
        patientDepartment: [
          { required: true, message: '请选择', trigger: 'change' }
        ],
        typesOfNursingEvents: [
          { required: true, type: 'array', min: 1, message: '请选择', trigger: 'change' }
        ],
        eventHappenTime: [
          { required: true, type: 'date', message: '请选择', trigger: 'change' }
        ],
        eventHappenAddress: [
          { required: true, type: 'array', message: '请选择', trigger: 'change' }
        ],
        deathTime: [
          { validator: validateDeathTime, trigger: 'change' }
        ]
      },
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
      staffModel: ''
    }
  },
  methods: {
    // 清空数据
    clearFormItemDate () {
      this.formItem = {
        patientName: '', // 患者姓名
        gender: '', // 患者性别
        patientBirthday: '', // 患者生日
        age: '', // 患者年龄
        bedNumber: '', // 患者床号
        hospitalizationNumber: '', // 住院号
        admissionTime: '', // 入院时间
        medicalRecordNumber: '', // 病人病历号
        intendedTreatmentOfDiseaseOrEffect: '', // 预期治疗疾病或作用
        mainPerformanceOfTheEvent: '', // 事件主要表现
        patientDepartment: '', // 病人科室
        eventHappenTime: '', // 事件发生时间
        eventHappenAddress: '', // 事件发生地点
        eventHappenAddressOther: '', // 事件发生地点的其他地点
        timeOfDiscoveryOrKnowledge: '', // 发现或者知悉时间
        actualUsePlaceOfMedicalDevices: '', // 医疗器械实际使用场所
        actualUsePlaceOfMedicalDevicesOther: '', // 医疗器械实际使用场所的其他厕所
        eventConsequence: '', // 事件后果
        deathTime: '', // 死亡时间
        eventStatement: '', // 事件陈述
        productName: '', // 产品名称
        tradeName: '', // 商品名称
        registrationCertificateNo: '', // 注册证号
        nameOfManufacturer: '', // 生产企业名称
        addressOfManufacturer: '', // 生产企业地址
        businessContactNumber: '', // 企业联系电话
        modelSpecification: '', // 型号规格
        productNumber: '', // 产品编号
        productBatchNumber: '', // 产品批号
        operator: '', // 操作人
        operatorOther: '', // 其他操作人
        termOfValidity: '', // 有效期
        dateOfManufacture: '', // 生产日期
        deactivationDate: '', // 停用日期
        dateOfImplantation: '', // 植入日期
        preliminaryCauseAnalysisOfTheIncident: '', // 事件发生初步原因分析
        preliminaryHandlingOfTheIncident: '', // 事件初步处理情况
        eventReportStatus: '', // 事件报告状态
        anonymous: '否', // 是否匿名
        input: '',
        select: '',
        radio: 'male',
        checkbox: [],
        date: ''
      }
    },
    // 转换数据 封装 事件发生地点 update是要传入的分装的值
    updateEncapsulation (update) {
      // 事件发生地点 =============================需要转换
      let updateValue = ''
      if (update.length === 0) {
        // 如果只选择一个地址或者没有选择，直接给
        return updateValue
      } else if (update.length === 1) {
        // 如果只选择一个地址或者没有选择，直接给
        updateValue = update[0]
        return updateValue
      } else {
        // 选择了多个地址，用, 号分割封装
        for (let i = 0; i < update.length; i++) {
          if (i === update.length - 1) {
            // 只有一个或 是最后一个了，不需要加 , 号
            updateValue += update[i]
          } else {
            // 不是最后一个 都要加 ,
            updateValue += update[i]
            updateValue += ','
          }
        }
      }
      return updateValue
    },
    // 封装数据
    encapsulationDate () {
      let createData = {
        /**
         * 事件类型Id
         */
        eventTypeId: '2',

        /**
         * 事件类型名称
         */
        eventTypeName: '可疑医疗器械不良事件',

        /**
         * 事件等级Id
         */
        // eventLevelId: '',

        /**
         * 事件等级名称
         */
        // eventLevelName: '',

        /**
         * 事件填报科室id
         */
        eventDeptId: '1',

        /**
         * 事件填报科室名称
         */
        eventDeptName: '骨科',

        /**
         * 病人病例号
         */
        patNumber: this.formItem.medicalRecordNumber,

        /**
         * 病人住院号
         */
        patHisId: this.formItem.hospitalizationNumber,

        /**
         * 病人名称
         */
        patName: this.formItem.patientName,

        /**
         * 病人科室id
         */
        patDeptId: this.formItem.patientDepartment === '骨科' ? '1' : this.formItem.patientDepartment === '肝胆科' ? '2' : '3',

        /**
         * 病人科室名称
         */
        patDeptName: this.formItem.patientDepartment,

        /**
         * 病人性别
         */
        patSex: this.formItem.gender,

        /**
         * 患者出生年月
         */
        patBirthday: this.formItem.patientBirthday,

        /**
         * 患者年龄
         */
        patAge: this.formItem.age,

        /**
         * 上报id
         */
        writeUserId: this.$store.state.user.userId,

        /**
         * 上报名字
         */
        writeUserName: this.$store.state.user.userName,

        /**
         * 是否匿名
         */
        isAnonymous: this.formItem.anonymous,

        /**
         * 事件状态
         */
        eventContentStatus: '0',

        /**
         * 是否重报（0 未重报   1 已重报）
         */
        reStatus: '0',

        /**
         * 流程实例
         */
        processDefinition: '',

        /**
         * 流程实例对象
         */
        processInstance: '',

        /**
         * 创建时间
         */
        // createTime: '',

        /**
         * 事件发生时间
         */
        happenTime: this.formItem.eventHappenTime,

        /**
         * 事件发生地点
         */
        happenAddress: this.updateEncapsulation(this.formItem.eventHappenAddress),

        /**
         * 事件流程相关人员
         */
        eventFlowUserJson: '',

        /**
         * 事件流程处理内容Json
         */
        eventFlowHandlerJson: '',

        /**
         * 存储子表的主键
         */
        // sonId: '',
        /**
         * 患者床号
         */
        bedNumber: this.formItem.bedNumber,

        /**
         * 入院时间
         */
        admissionTime: this.formItem.admissionTime,

        /**
         * 预期治疗疾病或作用
         */
        intendedTreatmentOfDiseaseOrEffect: this.formItem.intendedTreatmentOfDiseaseOrEffect,

        /**
         * 事件主要表现
         */
        mainPerformanceOfTheEvent: this.formItem.mainPerformanceOfTheEvent,

        /**
         * 事件发生地点的其他地点
         */
        eventHappenAddressOther: this.formItem.eventHappenAddressOther,

        /**
         * 发现或者知悉时间
         */
        timeOfDiscoveryOrKnowledge: this.formItem.timeOfDiscoveryOrKnowledge,

        /**
         * 医疗器械实际使用场所
         */
        actualUsePlaceOfMedicalDevices: this.formItem.actualUsePlaceOfMedicalDevices,

        /**
         * 医疗器械实际使用场所的其他厕所
         */
        actualUsePlaceOfMedicalDevicesOther: this.formItem.actualUsePlaceOfMedicalDevicesOther,

        /**
         * 事件后果
         */
        eventConsequence: this.formItem.eventConsequence,

        /**
         * 死亡时间
         */
        deathTime: this.formItem.deathTime,

        /**
         * 事件陈述
         */
        eventStatement: this.formItem.eventStatement,

        /**
         * 产品名称
         */
        productName: this.formItem.productName,

        /**
         * 商品名称
         */
        tradeName: this.formItem.tradeName,

        /**
         * 注册证号
         */
        registrationCertificateNo: this.formItem.registrationCertificateNo,

        /**
         * 生产企业名称
         */
        nameOfManufacturer: this.formItem.nameOfManufacturer,

        /**
         * 生产企业地址
         */
        addressOfManufacturer: this.formItem.addressOfManufacturer,

        /**
         * 企业联系电话
         */
        businessContactNumber: this.formItem.businessContactNumber,

        /**
         * 型号规格
         */
        modelSpecification: this.formItem.modelSpecification,

        /**
         * 产品编号
         */
        productNumber: this.formItem.productNumber,

        /**
         * 产品批号
         */
        productBatchNumber: this.formItem.productBatchNumber,

        /**
         * 操作人
         */
        operator: this.formItem.operator,

        /**
         * 其他操作人
         */
        operatorOther: this.formItem.operatorOther,

        /**
         * 有效期
         */
        termOfValidity: this.formItem.termOfValidity,

        /**
         * 生产日期
         */
        dateOfManufacture: this.formItem.dateOfManufacture,

        /**
         * 停用日期
         */
        deactivationDate: this.formItem.deactivationDate,

        /**
         * 植入日期
         */
        dateOfImplantation: this.formItem.dateOfImplantation,

        /**
         * 事件发生初步原因分析
         */
        preliminaryCauseAnalysisOfTheIncident: this.formItem.preliminaryCauseAnalysisOfTheIncident,

        /**
         * 事件初步处理情况
         */
        preliminaryHandlingOfTheIncident: this.formItem.preliminaryHandlingOfTheIncident,

        /**
         * 事件报告状态
         */
        eventReportStatus: this.formItem.eventReportStatus

        /**
         * 修改时间
         */
        // updateTime: '',
      }
      return createData
    },
    // 对话框点击确认
    ok (name) {
      // 获取封装数据
     let createData = this.encapsulationDate()
      console.log(createData)
      this.axios.post('/eventContentAppliance/create', createData).then((response) => {
        const result = response.data
        const state = result.code
        if (state === 0) {
          this.clearFormItemDate()
          this.$refs[name].resetFields()
          this.$Message.info('成功了')
          if (this.addType === 'reAdd') {
            this.reAddSave()
          }
          this.reListPage()
        } else {
          this.$Message.error('保存数据失败了')
        }
      }).catch((error) => {
        alert('请求失败' + error.message)
        this.warningModel = false
      })
    },
    RadioClick (val) {
      // alert(val)
    },
    // 对话框点击取消
    cancel () {
      this.$Message.info('取消了操作')
    },
    // 点击提交报表时
    upReportForm (name) {
      this.$refs[name].validate((valid) => {
        if (valid) {
          this.warningModel = true
        } else {
          this.$Message.error('请正确填写内容！')
        }
      })
    },
    clearLoading () {
      /* 清除对话框-模态框loading状态 */
      this.warningModel = false
      this.$nextTick(() => {
        this.warningModel = true
      })
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
