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
         <div slot="title">护理不良事件表单列表</div>
         <div>
           <Form ref="formItem" :model="formItem" :rules="ruleValidate" :label-width="80">
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
                 <Col span="6">
                   <FormItem label=" 诊断:">
                     <Input v-model="formItem.diagnosis" placeholder="请输入..." style="width: 200px"></Input>
                   </FormItem>
                 </Col>
               </Row>
              <!-- 增加主表字段开始-->
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

               </Row>
               <!--增加主表字段结束-->
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
                 <Col span="10">
                   <FormItem label=" 事件类型选择:" :label-width="100" prop="typesOfNursingEvents">
                     <Select v-model="formItem.typesOfNursingEvents" multiple style="">
                       <Option v-for="item in eventsTypeOption" :value="item.value" :key="item.value">{{ item.label }}</Option>
                     </Select>
                   </FormItem>
                 </Col>
                 <Col span="10">
                   <FormItem label=" 其它:" :label-width="100">
                     <Input v-model="formItem.typesOfNursingEventsOther"  style="width: 300px" placeholder="请输入..."></Input>
                   </FormItem>
                 </Col>
               </Row>
               <Row>

               </Row>
             </div>
             <div>
               <div class="subhead-box">
                 <div class="subhead-text bgTitleColor-blue">
                   <p><Icon type="md-arrow-dropright-circle" />&nbsp;事件说明</p>
                 </div>
                 <div class="subhead-triangle-style borderColor-blue"></div>
                 <p class="subhead-ico"><Icon type="md-apps"  /></p>
               </div>
               <Row style="margin-top: 30px">
                 <Col span="8">
                   <FormItem label=" 事件发生时间:" :label-width="100" prop="eventHappenTime">
                     <DatePicker v-model="formItem.eventHappenTime" type="datetime" placeholder="请选择时间" style="width: 300px"></DatePicker>
                   </FormItem>
                 </Col>
                 <Col span="8">
                   <FormItem label=" 事件发生地点:" :label-width="100" prop="eventHappenAddress">
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
               </Row>
               <Row>
                 <Col span="10">
                   <FormItem label=" 情况说明:" :label-width="100">
                     <Input v-model="formItem.situationDescription" type="textarea" :autosize="{minRows: 3,maxRows: 5}" placeholder="请输入..."></Input>
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
               <Row style="margin-top: 30px">
                 <Col span="3">
                   <FormItem  :label-width="100">
                     <Checkbox v-model="formItem.selectiveNurse" style="width:100px;float: left;margin-right: 15px">分管护士:</Checkbox>
                   </FormItem>
                 </Col>
                 <p  v-show="formItem.selectiveNurse">
                 <Col span="4">
                   <FormItem  :label-width="0" prop="participateHandleNurseName">

                     <Input v-model="formItem.participateHandleNurseName" placeholder="请输入护士姓名" style="width: 250px"></Input>
                   </FormItem>
                 </Col>
                 <Col span="4">
                   <FormItem  :label-width="0" prop="participateHandleNurseVisitTime">
                   &nbsp;&nbsp;于&nbsp;&nbsp;
                   <DatePicker v-model="formItem.participateHandleNurseVisitTime" type="datetime" placeholder="请选择时间" style="width:200px"></DatePicker>
                   </FormItem>
                 </Col>
                 <Col span="5">
                   <FormItem  :label-width="0" prop="participateHandleNurseHandleTime">
                     &nbsp;&nbsp;看望患者，&nbsp;&nbsp;
                     <DatePicker v-model="formItem.participateHandleNurseHandleTime" type="datetime" placeholder="请选择时间" style="width: 168px"></DatePicker>
                     &nbsp;&nbsp;进行处理。&nbsp;&nbsp;
                   </FormItem>
                 </Col>
                 </p>
               </Row>
               <Row style="margin-top: 1px">
                 <Col span="3">
                   <FormItem  :label-width="100">
                     <Checkbox v-model="formItem.selectiveDoctor" style="width:100px;float: left;margin-right: 15px">分管医生:</Checkbox>
                   </FormItem>
                 </Col>
                 <p  v-show="formItem.selectiveDoctor">
                   <Col span="4">
                     <FormItem  :label-width="0" prop="participateHandleDoctorName">

                       <Input v-model="formItem.participateHandleDoctorName" placeholder="请输入医生姓名" style="width: 250px"></Input>
                     </FormItem>
                   </Col>
                   <Col span="4">
                     <FormItem  :label-width="0" prop="participateHandleDoctorVisitTime">
                       &nbsp;&nbsp;于&nbsp;&nbsp;
                       <DatePicker v-model="formItem.participateHandleDoctorVisitTime" type="datetime" placeholder="请选择时间" style="width:200px"></DatePicker>
                     </FormItem>
                   </Col>
                   <Col span="5">
                     <FormItem  :label-width="0" prop="participateHandleDoctorHandleTime">
                       &nbsp;&nbsp;看望患者，&nbsp;&nbsp;
                       <DatePicker v-model="formItem.participateHandleDoctorHandleTime" type="datetime" placeholder="请选择时间" style="width: 168px"></DatePicker>
                       &nbsp;&nbsp;进行处理。&nbsp;&nbsp;
                     </FormItem>
                   </Col>
                 </p>
               </Row>

               <Row>
                 <Col span="5">
                   <FormItem label=" 立即通知:" :label-width="100">
                     <Select v-model="formItem.immediateNotice" multiple style="width:200px;float: left;margin-right: 15px">
                       <Option v-for="item in immediateNoticeOption" :value="item.value" :key="item.value">{{ item.label }}</Option>
                     </Select>
                   </FormItem>
                 </Col>
                 <Col span="19">
                   <FormItem label=" 通知家属:" :label-width="100">
                     <RadioGroup style="float: left" v-model="formItem.informFamilyMembersBoolean" @on-change="RadioClick">
                       <Radio label="是">
                         <span>是</span>
                       </Radio>
                       <Radio label="否">
                         <span>否</span>
                       </Radio>
                     </RadioGroup>
                     <div style="float: left">
                         <div v-show="formItem.informFamilyMembersBoolean=='是'">
                           &nbsp;&nbsp;于&nbsp;&nbsp;
                           <DatePicker v-model="formItem.informFamilyMembersTime" type="datetime" placeholder="请选择时间" style="width: 168px"></DatePicker>
                          <!-- <TimePicker v-model="formItem.informFamilyMembersTime" type="time" placeholder="Select time" style="width: 168px"></TimePicker>-->&nbsp;&nbsp;通知&nbsp;&nbsp;
                         </div>
                         <div  v-show="formItem.informFamilyMembersBoolean=='否'">
                             <Input v-model="formItem.informFamilyMembersReason" style="width: 300px" type="textarea" placeholder="说明原因" />
                         </div>
                     </div>
                   </FormItem>
                 </Col>
               </Row>
               <Row>
                 <Col span="5">
                   <FormItem label=" 发生严重不良事件时还同时通知:" :label-width="100">
                     <Select v-model="formItem.tooInform" multiple style="width:200px;float: left;margin-right: 15px">
                       <Option v-for="item in tooInformOption" :value="item.value" :key="item.value">{{ item.label }}</Option>
                     </Select>
                   </FormItem>
                 </Col>
                 <Col span="19">
                   <FormItem  label="其他:" :label-width="100"> <!--v-show="causeModel==3"-->
                       <div>
                         <Input v-model="formItem.tooInformOther" style="width: 440px" type="textarea" placeholder="请输入" />
                       </div>
                   </FormItem>
                 </Col>
               </Row>
               <Row>
                 <Col span="5">
                   <FormItem label=" 处理情况:" :label-width="100">
                     <Select v-model="formItem.handlingSituation" multiple style="width:200px;float: left;margin-right: 15px">
                       <Option v-for="item in handlingSituationOption" :value="item.value" :key="item.value">{{ item.label }}</Option>
                     </Select>
                   </FormItem>
                 </Col>
                 <Col span="19">
                   <FormItem  label="其它处理方式:" :label-width="100"> <!--v-show="causeModel==3"-->
                     <div>
                       <Input v-model="formItem.handlingSituationOther" style="width: 440px" type="textarea" placeholder="请输入..." />
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
               <Row style="margin-top: 30px">
                 <Col span="5">
                   <FormItem label=" 当事人:" :label-width="100">
                     <Input v-model="formItem.personConcerned" style="width: 200px"  placeholder="请输入..." />
                     <!--<Select v-model="staffModel" style="width:200px;">
                       <Option v-for="item in cityList" :value="item.value" :key="item.value">{{ item.label }}</Option>
                     </Select>-->
                   </FormItem>
                 </Col>
                 <Col span="6">
                   <FormItem label=" 是否主动上报:" :label-width="100">
                     <RadioGroup  v-model="formItem.personConcernedActiveReport" @on-change="RadioClick">
                       <Radio label="是">
                         <span>是</span>
                       </Radio>
                       <Radio label="否">
                         <span>否</span>
                       </Radio>
                     </RadioGroup>
                   </FormItem>
                 </Col>
                 <!--增加主表字段开始-->
                 <Col span="6">
                   <FormItem label=" 是否匿名:" :label-width="100">
                     <RadioGroup  v-model="formItem.anonymous" @on-change="RadioClick">
                       <Radio label="是">
                         <span>是</span>
                       </Radio>
                       <Radio label="否">
                         <span>否</span>
                       </Radio>
                     </RadioGroup>
                   </FormItem>
                 </Col>
                <!-- 增加主表字段结束-->
               </Row>
               <Row >
                 <Col span="5">
                   <FormItem label=" 护士分级:" :label-width="100">
                     <Select v-model="formItem.nurseGrading" style="width:200px;">
                       <Option v-for="item in nurseGradingOption" :value="item.value" :key="item.value">{{ item.label }}</Option>
                     </Select>
                   </FormItem>
                 </Col>
                 <Col span="6">
                   <FormItem label=" 职称:" :label-width="100">
                     <Input v-model="formItem.nurseTitle" style="width: 200px"  placeholder="请输入..." />
                    <!-- <Select v-model="staffModel" style="width:200px;">
                       <Option v-for="item in cityList" :value="item.value" :key="item.value">{{ item.label }}</Option>
                     </Select>-->
                   </FormItem>
                 </Col>
                 <Col span="6">
                   <FormItem label=" 任职年限:" :label-width="100" prop="nurseTenureOfService">
                     <Input v-model="formItem.nurseTenureOfService" placeholder="请输入..." style="width: 300px" />
                   </FormItem>
                 </Col>
               </Row>
             </div>
             <Button type="success" icon="ios-share" style="width: 300px;margin: 20px 0" @click="upReportForm('formItem')">提交表单</Button>
           </Form>
         </div>
       </Card>
     </div>
</template>

<script>
  import { mapActions, mapState } from 'vuex'
export default {
  data () {
    // 年龄验证
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
    // 选择护士验证名字
    const validateParticipateHandleNurseName = (rule, value, callback) => {
      if (this.formItem.selectiveNurse) {
        if (!value) {
          return callback(new Error('请输入'))
        }
        if (value.length > 32) {
          callback(new Error('32字以内'))
        } else {
          callback()
        }
      } else {
        callback()
      }
    }
    // 选择护士验证名时间 看望
    const validateParticipateHandleNurseVisitTime = (rule, value, callback) => {
      if (this.formItem.selectiveNurse) {
        if (!value) {
          return callback(new Error('请选择'))
        } else {
          callback()
        }
      } else {
        callback()
      }
    }
    // 选择护士验证名时间 处理
    const validateParticipateHandleNurseHandleTime = (rule, value, callback) => {
      if (this.formItem.selectiveNurse) {
        if (!value) {
          return callback(new Error('请选择'))
        } else {
          callback()
        }
      } else {
        callback()
      }
    }
    // 选择医生验证名字
    const validateParticipateHandleDoctorName = (rule, value, callback) => {
      if (this.formItem.selectiveDoctor) {
        if (!value) {
          return callback(new Error('请输入'))
        }
        if (value.length > 32) {
          callback(new Error('32字以内'))
        } else {
          callback()
        }
      } else {
        callback()
      }
    }
    // 选择医生验证时间 看望
    const validateParticipateHandleDoctorVisitTime = (rule, value, callback) => {
      if (this.formItem.selectiveDoctor) {
        if (!value) {
          return callback(new Error('请选择'))
        } else {
          callback()
        }
      } else {
        callback()
      }
    }
    // 选择医生验证时间  处理
    const validateParticipateHandleDoctorHandleTime = (rule, value, callback) => {
      if (this.formItem.selectiveDoctor) {
        if (!value) {
          return callback(new Error('请选择'))
        } else {
          callback()
        }
      } else {
        callback()
      }
    }
    return {
      addType: this.$route.query.addType,
      targetId: this.$route.query.targetId,
      warningModel: false, // 模态框
      eventsTypeOption: [ // 事件类型
        {
          value: '其他',
          label: '其他'
        },
        {
          value: '管道脱落/拔出',
          label: '管道脱落/拔出'
        },
        {
          value: '坠床',
          label: '坠床'
        },
        {
          value: '跌倒',
          label: '跌倒'
        },
        {
          value: '给药错误',
          label: '给药错误'
        },
        {
          value: '标本错误',
          label: '标本错误'
        },
        {
          value: '输液反应',
          label: '输液反应'
        },
        {
          value: '治疗延误',
          label: '治疗延误'
        },
        {
          value: '医疗文书记录/信息错误',
          label: '医疗文书记录/信息错误'
        },
        {
          value: '输血相关事件',
          label: '输血相关事件'
        },
        {
          value: '烧伤',
          label: '烧伤'
        },
        {
          value: '烫伤',
          label: '烫伤'
        },
        {
          value: '约束不当',
          label: '约束不当'
        },
        {
          value: '针刺伤',
          label: '针刺伤'
        },
        {
          value: '误吸或窒息',
          label: '误吸或窒息'
        },
        {
          value: '走失',
          label: '走失'
        },
        {
          value: '自杀',
          label: '自杀'
        },
        {
          value: '猝死',
          label: '猝死'
        },
        {
          value: '身份识别错误',
          label: '身份识别错误'
        },
        {
          value: '运送中病情变化',
          label: '运送中病情变化'
        },
        {
          value: '压疮(护理不当)',
          label: '压疮(护理不当)'
        },
        {
          value: '护理技术操作并发症',
          label: '护理技术操作并发症'
        }
      ], // 事件类型
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
      tooInformOption: [ // 处理严重不良事件黑同事通知
        {
          value: '总值班',
          label: '总值班'
        },
        {
          value: '质控部',
          label: '质控部'
        },
        {
          value: '护理部',
          label: '护理部'
        },
        {
          value: '医务部',
          label: '医务部'
        },
        {
          value: '保卫科',
          label: '保卫科'
        }
      ], // 处理严重不良事件黑同事通知
      handlingSituationOption: [ // 处理情况选项
        {
          value: 'CT',
          label: 'CT'
        },
        {
          value: 'X光射片',
          label: 'X光射片'
        },
        {
          value: '核磁共振',
          label: '核磁共振'
        },
        {
          value: '清创',
          label: '清创'
        },
        {
          value: '缝合',
          label: '缝合'
        },
        {
          value: '包扎',
          label: '包扎'
        }
      ], // 处理情况选项
      immediateNoticeOption: [ // 立即通知选项
        {
          value: '护士长',
          label: '护士长'
        },
        {
          value: '大科护士长',
          label: '大科护士长'
        },
        {
          value: '科主任',
          label: '科主任'
        }
      ], // 立即通知选项
      nurseGradingOption: [ // 护士分级选项
        {
          value: 'N0',
          label: 'N0'
        },
        {
          value: 'N1',
          label: 'N1'
        },
        {
          value: 'N2',
          label: 'N2'
        },
        {
          value: 'N3',
          label: 'N3'
        },
        {
          value: 'N4',
          label: 'N4'
        }
      ], // 护士分级选项
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
        diagnosis: '', // 诊断
        medicalRecordNumber: '', // 病人病历号
        patientDepartment: '', // 病人科室
        typesOfNursingEvents: '', // 事件类型（护理事件填报子表用）
        typesOfNursingEventsOther: '', // 其他事件类型
        eventHappenTime: '', // 事件发生时间
        eventHappenAddress: '', // 事件发生地点
        eventHappenAddressOther: '', // 事件发生地点的其他地点
        situationDescription: '', // 情况说明
        selectiveNurse: true, // 事件发生时处理--是否选择护士
        participateHandleNurseName: '', // 事件发生时，参加处理的护士姓名
        participateHandleNurseVisitTime: '', // 参加处理的护士看望患者的时间
        participateHandleNurseHandleTime: '', // 参加处理的护士的处理的时间
        selectiveDoctor: true, // 事件发生时处理--是否选择医生
        participateHandleDoctorName: '', // 参加处理的医生的姓名
        participateHandleDoctorVisitTime: '', // 参加处理的医生看望患者的时间
        participateHandleDoctorHandleTime: '', // 参加处理的医生的处理的时间
        immediateNotice: '', // 立刻通知，事件发生时
        informFamilyMembersBoolean: '是', // 通知家属
        informFamilyMembersTime: '', // 通知家属时间
        informFamilyMembersReason: '', // 没有通知家属的原因
        tooInform: '', // 发生严重不良事件时还同时通知
        tooInformOther: '', // 发生严重不良事件时还同时通知的其他
        handlingSituation: '', // 处理情况
        handlingSituationOther: '', // 处理情况的其他
        personConcerned: '', // 当事人
        personConcernedActiveReport: '是', // 当事人是否主动上报
        nurseGrading: '', // 护士分级
        nurseTitle: '', // 护士职称
        nurseTenureOfService: '', // 护士任职年限
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
      nurseTenureOfService: [
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
        selectiveNurse: [
          { required: true, type: 'array', message: '请选择', trigger: 'change' }
        ],
        participateHandleNurseName: [
          { validator: validateParticipateHandleNurseName, trigger: 'blur' }
        ],
        participateHandleNurseVisitTime: [
          { validator: validateParticipateHandleNurseVisitTime, trigger: 'change' }
        ],
        participateHandleNurseHandleTime: [
          { validator: validateParticipateHandleNurseHandleTime, trigger: 'change' }
        ],
        participateHandleDoctorName: [
          { validator: validateParticipateHandleDoctorName, trigger: 'blur' }
        ],
        participateHandleDoctorVisitTime: [
          { validator: validateParticipateHandleDoctorVisitTime, trigger: 'change' }
        ],
        participateHandleDoctorHandleTime: [
          { validator: validateParticipateHandleDoctorHandleTime, trigger: 'change' }
        ]

      },
      iscauseModelShow: false,
      causeModel: '',
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
      ]
    }
  },
  computed: {
    ...mapState({
      userId: state => state.user.userId,
      userName: state => state.user.userName

    })
  },
  methods: {
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
        diagnosis: '', // 诊断
        medicalRecordNumber: '', // 病人病历号
        patientDepartment: '', // 病人科室
        typesOfNursingEvents: '', // 事件类型（护理事件填报子表用）
        typesOfNursingEventsOther: '', // 其他事件类型
        eventHappenTime: '', // 事件发生时间
        eventHappenAddress: '', // 事件发生地点
        eventHappenAddressOther: '', // 事件发生地点的其他地点
        situationDescription: '', // 情况说明
        selectiveNurse: true, // 事件发生时处理--是否选择护士
        participateHandleNurseName: '', // 事件发生时，参加处理的护士姓名
        participateHandleNurseVisitTime: '', // 参加处理的护士看望患者的时间
        participateHandleNurseHandleTime: '', // 参加处理的护士的处理的时间
        selectiveDoctor: true, // 事件发生时处理--是否选择医生
        participateHandleDoctorName: '', // 参加处理的医生的姓名
        participateHandleDoctorVisitTime: '', // 参加处理的医生看望患者的时间
        participateHandleDoctorHandleTime: '', // 参加处理的医生的处理的时间
        immediateNotice: '', // 立刻通知，事件发生时
        informFamilyMembersBoolean: '是', // 通知家属
        informFamilyMembersTime: '', // 通知家属时间
        informFamilyMembersReason: '', // 没有通知家属的原因
        tooInform: '', // 发生严重不良事件时还同时通知
        tooInformOther: '', // 发生严重不良事件时还同时通知的其他
        handlingSituation: '', // 处理情况
        handlingSituationOther: '', // 处理情况的其他
        personConcerned: '', // 当事人
        personConcernedActiveReport: '是', // 当事人是否主动上报
        nurseGrading: '', // 护士分级
        nurseTitle: '', // 护士职称
        nurseTenureOfService: '', // 护士任职年限
        anonymous: '否', // 是否匿名
        input: '',
        select: '',
        radio: 'male',
        checkbox: [],
        date: ''
      }
    },
    // 封装数据
    encapsulationDate () {
      let createData = {
        // 事件类型Id
        eventTypeId: '1',
        // 事件类型名称
        eventTypeName: '护理不良事件',
        // 事件等级Id
        // eventLevelId: '',
        // 事件等级名称
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
         * 事件状态  默认0等待处理
         */
        eventContentStatus: 0,

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
         * 创建时间 后端处理
         */

        // createTime: '',

        /**
         * 事件发生时间
         */

        happenTime: this.formItem.eventHappenTime,

        /**
         * 事件发生地点 =============================需要转换
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
         * 存储子表的主键后端
         */

        // sonId: '',

        /**
         * 父ID后端
         */

        // fatherId: '',

        /**
         * 患者床号
         */

        bedNumber: this.formItem.bedNumber,

        /**
         * 入院时间
         */

        admissionTime: this.formItem.admissionTime,

        /**
         * 诊断
         */

        diagnosis: this.formItem.diagnosis,

        /**
         * 事件类型（护理事件填报子表用）  ================需要转换
         */

        typesOfNursingEvents: this.updateEncapsulation(this.formItem.typesOfNursingEvents),

        /**
         * 其他事件类型
         */

        typesOfNursingEventsOther: this.formItem.typesOfNursingEventsOther,

        /**
         * 事件发生地点的其他地点
         */

        eventHappenAddressOther: this.formItem.eventHappenAddressOther,

        /**
         * 情况说明
         */

        situationDescription: this.formItem.situationDescription,

        /**
         * 事件发生时处理--是否选择护士 true 是  false 否
         */

        selectiveNurse: this.formItem.selectiveNurse,

        /**
         * 事件发生时，参加处理的护士姓名
         */

        participateHandleNurseName: this.formItem.participateHandleNurseName,

        /**
         * 参加处理的护士看望患者的时间 时分秒
         */

        participateHandleNurseVisitTime: this.formItem.participateHandleNurseVisitTime,

        /**
         * 参加处理的护士的处理的时间 时分秒
         */

        participateHandleNurseHandleTime: this.formItem.participateHandleNurseHandleTime,

        /**
         * 事件发生时处理--是否选择医生 true 是  false 否
         */

        selectiveDoctor: this.formItem.selectiveDoctor,

        /**
         * 参加处理的医生的姓名
         */

        participateHandleDoctorName: this.formItem.participateHandleDoctorName,

        /**
         * 参加处理的医生看望患者的时间
         */

        participateHandleDoctorVisitTime: this.formItem.participateHandleDoctorVisitTime,

        /**
         * 参加处理的医生的处理的时间
         */

        participateHandleDoctorHandleTime: this.formItem.participateHandleDoctorHandleTime,

        /**
         * 立刻通知的人，事件发生时  ================需要转换
         */

        immediateNotice: this.updateEncapsulation(this.formItem.immediateNotice),

        /**
         * 通知家属 （是 否）
         */

        informFamilyMembersBoolean: this.formItem.informFamilyMembersBoolean,

        /**
         * 通知家属时间
         */

        informFamilyMembersTime: this.formItem.informFamilyMembersTime,

        /**
         * 没有通知家属的原因
         */

        informFamilyMembersReason: this.formItem.informFamilyMembersReason,

        /**
         * 发生严重不良事件时还同时通知那些人 ===需要转换
         */

        tooInform: this.updateEncapsulation(this.formItem.tooInform),

        /**
         * 发生严重不良事件时还同时通知的其他哪些人
         */

        tooInformOther: this.formItem.tooInformOther,

        /**
         * 处理情况
         */

        handlingSituation: this.updateEncapsulation(this.formItem.handlingSituation),

        /**
         * 处理情况的其他
         */

        handlingSituationOther: this.formItem.handlingSituationOther,

        /**
         * 当事人
         */

        personConcerned: this.formItem.personConcerned,

        /**
         * 当事人是否主动上报 （是 否）
         */

        personConcernedActiveReport: this.formItem.personConcernedActiveReport,

        /**
         * 护士分级
         */

        nurseGrading: this.formItem.nurseGrading,

        /**
         * 护士职称
         */

        nurseTitle: this.formItem.nurseTitle,

        /**
         * 护士任职年限
         */

        nurseTenureOfService: this.formItem.nurseTenureOfService

      }
      return createData
    },
    // 对话框点击确认
    ok (name) {
      // 获取封装数据
      let createData = this.encapsulationDate()
      console.log(createData)
      this.axios.post('/eventContentNurse/create', createData).then((response) => {
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
        // this.clearLoading()
      })
    },

    clearLoading () {
      /* 清除对话框-模态框loading状态 */
      this.warningModel = false
      this.$nextTick(() => {
        this.warningModel = true
      })
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
    RadioClick (val) {
      // alert(val)
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
    staffModel (val) {
      // alert(val)
    }
  }
}
</script>

<style>

</style>
