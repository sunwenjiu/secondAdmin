<template>
     <div>
       <Card  class="card-title-style bgColor-gray">
         <div slot="title">其他不良事件</div>
         <div>
           <Form ref="formValidate" :model="formItem" :rules="ruleValidate" :label-width="100">
             <div>
               <div class="subhead-box">
                 <div class="subhead-text bgTitleColor-blue">
                   <p><Icon type="md-arrow-dropright-circle" />&nbsp;填报信息</p>
                 </div>
                 <div class="subhead-triangle-style borderColor-blue"></div>
                 <p class="subhead-ico"><Icon type="md-apps"  /></p>
               </div>
               <Row style="margin-top: 30px">
                 <Col span="6">
                   <FormItem label="报告人:">
                     <Input class="input-color" v-model="formItem.writeUserName" disabled placeholder="Enter something..." style="width: 250px"></Input>
                   </FormItem>
                 </Col>
                 <Col span="6">
                   <FormItem label="报告科室:" prop="eventDeptId">
                     <Select v-model="formItem.eventDeptId" style="width:200px">
                       <Option v-for="item in cityList" :value="item.value" :key="item.value">{{ item.label }}</Option>
                     </Select>
                   </FormItem>
                 </Col>
                 <Col span="6">
                   <FormItem label="报告时间:" prop="eventOtherTime">
                     <DatePicker v-model="formItem.eventOtherTime" type="datetime" placeholder="Select date" style="width: 200px"></DatePicker>
                   </FormItem>
                 </Col>
               </Row>
               <Row>
                 <Col span="6">
                   <FormItem label="患者姓名:" prop="patName">
                     <Input v-model="formItem.patName" placeholder="Enter something..." style="width: 250px"></Input>
                   </FormItem>
                 </Col>
                 <Col span="6">
                   <FormItem label="患者科别:" prop="patDeptId">
                     <Select v-model="formItem.patDeptId" style="width:250px">
                       <Option v-for="item in cityList" :value="item.value" :key="item.value">{{ item.label }}</Option>
                     </Select>
                   </FormItem>
                 </Col>
               </Row>
               <Row>
                 <Col span="24">
                   <FormItem label="不良事件描述:" prop="eventOtherDesc">
                     <Input v-model="formItem.eventOtherDesc" type="textarea" :rows="4" placeholder="Enter something..." />
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
      eventContent: {},
      eventOther: {},
      ruleValidate: {
        eventDeptId: [
          { required: true, message: '此处不能为空', trigger: 'change' }
        ],
        eventOtherTime: [
          { required: true, type: 'date', message: '此处不能为空', trigger: 'change' }
        ],
        patName: [
          { required: true, message: '此处不能为空', trigger: 'blur' }
        ],
        patDeptId: [
          { required: true, message: '此处不能为空', trigger: 'change' }
        ],
        eventOtherDesc: [
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
      eventBCDTO.eventOther = this.eventOtherValueMethod()
      eventBCDTO.eventContent = this.eventContentValueMethod()
      this.axios.post('/eventOther/save', eventBCDTO).then((res) => {
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
    eventOtherValueMethod () {
      this.eventOther.eventOtherTime = this.formItem.eventOtherTime
      this.eventOther.eventOtherDesc = this.formItem.eventOtherDesc
      return this.eventOther
    },
    // 从formItem中分离eventContent的值传到后端
    eventContentValueMethod () {
      this.eventContent.eventTypeId = 6
      this.eventContent.eventTypeName = '其它不良事件'
      this.eventContent.patName = this.formItem.patName
      this.eventContent.patDeptId = this.formItem.patDeptId
      this.eventContent.patDeptName = this.cityList.filter(e => e.value === this.formItem.patDeptId)[0].label
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
  },
  watch: {

  }
}
</script>

<style>

</style>
