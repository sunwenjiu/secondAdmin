<template>
     <div>
       <Card  class="card-title-style bgColor-gray">
         <div slot="title">药品不良反应</div>
         <div>
           <Form ref="formValidate" :model="formItem" :rules="ruleValidate" :label-width="80">
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
                     <Input v-model="formItem.patName" placeholder="Enter something..." style="width: 200px"></Input>
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
                   <FormItem label="出生年月日:" prop="patBirthday">
                     <DatePicker v-model="formItem.patBirthday" format="yyyy年MM月dd日" type="date" placeholder="Select date" style="width: 200px"></DatePicker>
                   </FormItem>
                 </Col>
                 <Col span="6">
                   <FormItem label="年龄:" prop="patAge">
                     <Input v-model="formItem.patAge" placeholder="Enter something..." style="width: 200px"></Input>
                   </FormItem>
                 </Col>
               </Row>
               <Row>
<!--                 <Col span="6">-->
<!--                   <FormItem label="民族:">-->
<!--                     <Input v-model="formItem.input" placeholder="Enter something..." style="width: 200px"></Input>-->
<!--                   </FormItem>-->
<!--                 </Col>-->
                 <Col span="6">
                   <FormItem label="体重（kg）:" prop="weight">
                     <Input v-model="formItem.weight" placeholder="Enter something..." style="width: 200px"></Input>
                   </FormItem>
                 </Col>
                 <Col span="6">
                   <FormItem label="联系方式:" prop="phone">
                     <Input v-model="formItem.phone" placeholder="Enter something..." style="width: 200px"></Input>
                   </FormItem>
                 </Col>
                 <Col span="6">
                   <FormItem label="原患疾病:">
                     <Input v-model="formItem.primaryDisease" placeholder="Enter something..." style="width: 200px"></Input>
                   </FormItem>
                 </Col>
               </Row>
               <Row>
                 <Col span="12">
                   <FormItem label="科别:" prop="patDeptId">
                     <Select v-model="formItem.patDeptId" style="width:350px">
                       <Option v-for="item in departList" :value="item.value" :key="item.value">{{ item.label }}</Option>
                     </Select>
                   </FormItem>
                 </Col>
                 <Col span="12">
                   <FormItem label="病历号/门诊号:" prop="patNumber">
                     <Input v-model="formItem.patNumber" placeholder="Enter something..." style="width: 350px"></Input>
                   </FormItem>
                 </Col>
               </Row>
               <Row>
                 <Col span="6">
                   <FormItem label="既往药品不良反应/事件:">
                     <Select v-model="formItem.pastdrugs" style="width:200px">
                       <Option v-for="item in pastdrugsList" :value="item.value" :key="item.value">{{ item.label }}</Option>
                     </Select>
                   </FormItem>
                 </Col>
                 <Col span="6">
                   <FormItem label="既往药品名:" >
                     <Input v-model="formItem.pastdrugsDesc" placeholder="Enter something..." style="width: 200px"></Input>
                   </FormItem>
                 </Col>
                 <Col span="6">
                   <FormItem label="家族药品不良反应/事件：" :label-width="90">
                     <Select v-model="formItem.familydrugs" style="width:200px">
                       <Option v-for="item in familydrugsList" :value="item.value" :key="item.value">{{ item.label }}</Option>
                     </Select>
                   </FormItem>
                 </Col>
                 <Col span="6">
                   <FormItem label="药品名:" >
                     <Input v-model="formItem.familydrugsDesc" placeholder="Enter something..." style="width: 200px"></Input>
                   </FormItem>
                 </Col>
               </Row>
               <Row>
                 <Col span="8">
                   <FormItem label="相关重要信息:">
                     <Select v-model="formItem.importantMsg" multiple style="width:400px">
                       <Option v-for="item in importantMsgList" :value="item.value" :key="item.value">{{ item.label }}</Option>
                     </Select>
                   </FormItem>
                 </Col>
                 <Col span="6">
                   <FormItem label="过敏史:" >
                     <Input v-model="formItem.importantAllergy" placeholder="Enter something..." style="width: 200px" />
                   </FormItem>
                 </Col>
                 <Col span="6">
                   <FormItem label="其它:" >
                     <Input v-model="formItem.importantOtherMsg" placeholder="Enter something..." style="width: 200px" />
                   </FormItem>
                 </Col>
               </Row>
             </div>
             <div>
               <div class="subhead-box">
                 <div class="subhead-text bgTitleColor-blue">
                   <p><Icon type="md-arrow-dropright-circle" />&nbsp;药品信息</p>
                 </div>
                 <div class="subhead-triangle-style borderColor-blue"></div>
                 <p class="subhead-ico"><Icon type="md-apps"  /></p>
               </div>
               <Row style="margin-top: 30px">
                 <Col span="24">
                   <FormItem
                     v-for="(suspectedDrugs, index) in formItem.suspectedDrugsList"
                     v-show="suspectedDrugs.status"
                     :key="index"
                     :label="'怀疑药品 ' + suspectedDrugs.index"
                     :prop="'suspectedDrugsList.' + index + '.value'">
                     <Row>
                       <Col span="22">
                         <Row>
                           <Col span="6" class="drug-add-box">
                               <p class="drug-add-p">批准文号:</p><Input class="drug-add-input" v-model="suspectedDrugs.approvalNumber" style="width: 200px;margin-left: 6px" placeholder="Enter something..."></Input>
                           </Col>
                           <Col span="6" class="drug-add-box">
                             <p class="drug-add-p">商品名称:</p><Input class="drug-add-input" v-model="suspectedDrugs.productName" style="width: 200px;margin-left: 6px" placeholder="Enter something..."></Input>
                           </Col>
                           <Col span="6" class="drug-add-box">
                             <p class="drug-add-p" style="margin-top: 0">通用名称(含剂型):</p><Input class="drug-add-input" v-model="suspectedDrugs.commonName" style="width: 200px;margin-left: 6px" placeholder="Enter something..."></Input>
                           </Col>
                           <Col span="6" class="drug-add-box">
                             <p class="drug-add-p">生产厂家:</p><Input class="drug-add-input" v-model="suspectedDrugs.manufacturer" style="width: 200px;margin-left: 6px" placeholder="Enter something..."></Input>
                           </Col>
                         </Row>
                         <Row style="margin-top: 15px">
                           <Col span="6" class="drug-add-box">
                             <p class="drug-add-p">生产批号:</p><Input class="drug-add-input" v-model="suspectedDrugs.batchNumber" style="width: 200px;margin-left: 6px" placeholder="Enter something..."></Input>
                           </Col>
                           <Col span="6" class="drug-add-box">
                             <p class="drug-add-p" style="margin-top: 0">用法用量（次剂量、途径、日次数）:</p><Input class="drug-add-input" v-model="suspectedDrugs.usageAndDosage" style="width: 200px;margin-left: 6px" placeholder="Enter something..."></Input>
                           </Col>
                           <Col span="6" class="drug-add-box">
                             <p class="drug-add-p">用药起止时间:</p><Input class="drug-add-input" v-model="suspectedDrugs.startAndEnd" style="width: 200px;margin-left: 6px" placeholder="Enter something..."></Input>
                           </Col>
                           <Col span="6" class="drug-add-box">
                             <p class="drug-add-p">用药原因:</p><Input class="drug-add-input" v-model="suspectedDrugs.MedicalReasons" style="width: 200px;margin-left: 6px" placeholder="Enter something..."></Input>
                           </Col>
                         </Row>
                       </Col>
                       <Col span="1" offset="1">
                         <Button @click="handleRemove1(index)" type="error" size="small">删除</Button>
                       </Col>
                     </Row>
                   </FormItem>
                   <FormItem>
                     <Row>
                       <Col span="12">
                         <Button type="dashed" long @click="handleAdd1" icon="md-add">新增 怀疑药品</Button>
                       </Col>
                     </Row>
                   </FormItem>
                 </Col>
               </Row>
               <div class="drug-line"></div>
               <Row style="margin-top: 30px">
                 <Col span="24">
                   <FormItem
                     v-for="(combinedDrugs, index) in formItem.combinedDrugsList"
                     v-show="combinedDrugs.status"
                     :key="index"
                     :label="'并用药品 ' + combinedDrugs.index"
                     :prop="'combinedDrugsList.' + index + '.value'">
                     <Row>
                       <Col span="22">
                         <Row>
                           <Col span="6" class="drug-add-box">
                             <p class="drug-add-p">批准文号:</p><Input class="drug-add-input" v-model="combinedDrugs.approvalNumber" style="width: 200px;margin-left: 6px" placeholder="Enter something..."></Input>
                           </Col>
                           <Col span="6" class="drug-add-box">
                             <p class="drug-add-p">商品名称:</p><Input class="drug-add-input" v-model="combinedDrugs.productName" style="width: 200px;margin-left: 6px" placeholder="Enter something..."></Input>
                           </Col>
                           <Col span="6" class="drug-add-box">
                             <p class="drug-add-p" style="margin-top: 0">通用名称(含剂型):</p><Input class="drug-add-input" v-model="combinedDrugs.commonName" style="width: 200px;margin-left: 6px" placeholder="Enter something..."></Input>
                           </Col>
                           <Col span="6" class="drug-add-box">
                             <p class="drug-add-p">生产厂家:</p><Input class="drug-add-input" v-model="combinedDrugs.manufacturer" style="width: 200px;margin-left: 6px" placeholder="Enter something..."></Input>
                           </Col>
                         </Row>
                         <Row style="margin-top: 15px">
                           <Col span="6" class="drug-add-box">
                             <p class="drug-add-p">生产批号:</p><Input class="drug-add-input" v-model="combinedDrugs.batchNumber" style="width: 200px;margin-left: 6px" placeholder="Enter something..."></Input>
                           </Col>
                           <Col span="6" class="drug-add-box">
                             <p class="drug-add-p" style="margin-top: 0">用法用量（次剂量、途径、日次数）:</p><Input class="drug-add-input" v-model="combinedDrugs.usageAndDosage" style="width: 200px;margin-left: 6px" placeholder="Enter something..."></Input>
                           </Col>
                           <Col span="6" class="drug-add-box">
                             <p class="drug-add-p">用药起止时间:</p><Input class="drug-add-input" v-model="combinedDrugs.startAndEnd" style="width: 200px;margin-left: 6px" placeholder="Enter something..."></Input>
                           </Col>
                           <Col span="6" class="drug-add-box">
                             <p class="drug-add-p">用药原因:</p><Input class="drug-add-input" v-model="combinedDrugs.MedicalReasons" style="width: 200px;margin-left: 6px" placeholder="Enter something..."></Input>
                           </Col>
                         </Row>
                       </Col>
                       <Col span="1" offset="1">
                         <Button @click="handleRemove(index)" type="error" size="small">删除</Button>
                       </Col>
                     </Row>
                   </FormItem>
                   <FormItem>
                     <Row>
                       <Col span="12">
                         <Button type="dashed" long @click="handleAdd" icon="md-add">新增 并用药品</Button>
                       </Col>
                     </Row>
                   </FormItem>
                 </Col>
               </Row>
             </div>
             <div>
               <div class="subhead-box">
                 <div class="subhead-text bgTitleColor-blue">
                   <p><Icon type="md-arrow-dropright-circle" />&nbsp;不良事件信息</p>
                 </div>
                 <div class="subhead-triangle-style borderColor-blue"></div>
                 <p class="subhead-ico"><Icon type="md-apps"  /></p>
               </div>
               <Row style="margin-top: 30px">
                 <Col span="6">
                   <FormItem label="不良反应/事件名称：" :label-width="150" prop="eventTitle">
                     <Input v-model="formItem.eventTitle" placeholder="Enter something..." style="width: 200px"></Input>
                   </FormItem>
                 </Col>
                 <Col span="6">
                   <FormItem label="不良反应/事件发生时间：" :label-width="150" prop="happenTime">
                     <DatePicker v-model="formItem.happenTime" type="date" placeholder="Select date" style="width: 200px"></DatePicker>
                   </FormItem>
                 </Col>
                 <Col span="6">
                   <FormItem label="事件发生地点:" prop="happenAddress">
                     <Select v-model="formItem.happenAddress" >
                       <Option v-for="item in departList" :value="item.value" :key="item.value">{{ item.label }}</Option>
                     </Select>
                   </FormItem>
                 </Col>
               </Row>
               <Row>
                 <Col span="24">
                   <FormItem label="不良反应/事件过程描述（包括症状、体征、临床检验等）及处理情况" :label-width="150" prop="eventDesc">
                     <Input v-model="formItem.eventDesc" type="textarea" :rows="4" placeholder="Enter something..." />
                   </FormItem>
                 </Col>
               </Row>
               <Row>
                 <Col span="6">
                   <FormItem label="不良反应/事件的结果:" :label-width="150">
                     <Select v-model="formItem.eventResult" style="width:200px">
                       <Option v-for="item in eventResultList" :value="item.value" :key="item.value">{{ item.label }}</Option>
                     </Select>
                   </FormItem>
                 </Col>
                 <Col span="6">
                   <FormItem label="后遗症表现:">
                     <Input v-model="formItem.eventPerformance" type="textarea"  placeholder="Enter something..." />
                   </FormItem>
                 </Col>
                 <Col span="6">
                   <FormItem label="直接死因:" >
                     <Input v-model="formItem.dealReason" type="textarea"  placeholder="Enter something..." />
                   </FormItem>
                 </Col>
                 <Col span="6">
                   <FormItem label="死亡时间:" >
                     <DatePicker v-model="formItem.dealTime" type="datetime" placeholder="Select date and time" style="width: 200px"></DatePicker>
                   </FormItem>
                 </Col>
               </Row>
               <Row>
                 <Col span="6">
                   <FormItem label="停药或减量后，反应/事件是否消失或减轻？:" :label-width="150" prop="stopDrug">
                     <Select v-model="formItem.stopDrug" style="width:200px">
                       <Option v-for="item in stopDrugList" :value="item.value" :key="item.value">{{ item.label }}</Option>
                     </Select>
                   </FormItem>
                 </Col>
                 <Col span="6">
                   <FormItem label="再次使用可疑药品后是否再次出现同样反应/事件？:" :label-width="180" prop="againDrug">
                     <Select v-model="formItem.againDrug" style="width:200px">
                       <Option v-for="item in againDrugList" :value="item.value" :key="item.value">{{ item.label }}</Option>
                     </Select>
                   </FormItem>
                 </Col>
                 <Col span="6">
                   <FormItem label="对原患疾病的影响:" :label-width="150" prop="originaldisease">
                     <Select v-model="formItem.originaldisease" style="width:200px">
                       <Option v-for="item in originaldiseaseList" :value="item.value" :key="item.value">{{ item.label }}</Option>
                     </Select>
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
                   <FormItem label="报告人评价：" :label-width="100" prop="writeEvaluate">
                     <Select v-model="formItem.writeEvaluate" style="width:200px">
                       <Option v-for="item in evaluateList" :value="item.value" :key="item.value">{{ item.label }}</Option>
                     </Select>
                   </FormItem>
                 </Col>
                 <Col span="6">
                   <FormItem label="报告人：" :label-width="100" prop="writeUserName">
                     <Input v-model="formItem.writeUserName" placeholder="Enter something..." style="width: 200px"></Input>
                   </FormItem>
                 </Col>
<!--                 <Col span="6">-->
<!--                   <FormItem label="报告单位评价：" :label-width="100">-->
<!--                     <Select v-model="formItem.reportingEvaluate" style="width:200px">-->
<!--                       <Option v-for="item in evaluateList" :value="item.value" :key="item.value">{{ item.label }}</Option>-->
<!--                     </Select>-->
<!--                   </FormItem>-->
<!--                 </Col>-->
<!--                 <Col span="6">-->
<!--                   <FormItem label="报告单位：" :label-width="100">-->
<!--                     <Input v-model="formItem.reportingUnitName" placeholder="Enter something..." style="width: 200px"></Input>-->
<!--                   </FormItem>-->
<!--                 </Col>-->
               </Row>
               <p class="blood-subhead">报告人信息</p>
               <Row style="margin-top: 20px">
<!--                 <Col span="6">-->
<!--                   <FormItem label="联系电话：" :label-width="100">-->
<!--                     <Input v-model="formItem.writePhone" placeholder="Enter something..." style="width: 200px"></Input>-->
<!--                   </FormItem>-->
<!--                 </Col>-->
<!--                 <Col span="6">-->
<!--                   <FormItem label="电子邮箱：" :label-width="100">-->
<!--                     <Input v-model="formItem.writeEmail" placeholder="Enter something..." style="width: 200px"></Input>-->
<!--                   </FormItem>-->
<!--                 </Col>-->
                 <Col span="6">
                   <FormItem label="职业：" :label-width="100" prop="writeOccupation">
                     <Select v-model="formItem.writeOccupation" style="width:200px">
                       <Option v-for="item in occupationList" :value="item.value" :key="item.value">{{ item.label }}</Option>
                     </Select>
                   </FormItem>
                 </Col>
                 <Col span="6">
                   <FormItem label="其它职业名称：" :label-width="100">
                     <Input v-model="formItem.writeOccupationOther" placeholder="Enter something..." style="width: 200px"></Input>
                   </FormItem>
                 </Col>
               </Row>
               <p class="blood-subhead">报告单位信息</p>
               <Row style="margin-top: 20px">
                 <Col span="6">
                   <FormItem label="单位名称：" :label-width="100">
                     <Input v-model="formItem.reportingUnitName" placeholder="Enter something..." style="width: 200px"></Input>
                   </FormItem>
                 </Col>
                 <Col span="6">
                   <FormItem label="联系人：" :label-width="100">
                     <Input v-model="formItem.reportingUnitUser" placeholder="Enter something..." style="width: 200px"></Input>
                   </FormItem>
                 </Col>
                 <Col span="6">
                   <FormItem label="电话：" :label-width="100">
                     <Input v-model="formItem.reportingUnitTel" placeholder="Enter something..." style="width: 200px"></Input>
                   </FormItem>
                 </Col>
                 <Col span="6">
                   <FormItem label="报告日期：" :label-width="100" prop="reportTime">
                     <DatePicker v-model="formItem.reportTime" type="datetime" placeholder="Select date and time" style="width: 200px"></DatePicker>
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
      index: 1,
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
      departList: [
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
      pastdrugsList: [
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
      familydrugsList: [
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
      eventResultList: [
        {
          value: '痊愈',
          label: '痊愈'
        },
        {
          value: '好转',
          label: '好转'
        },
        {
          value: '未好转',
          label: '未好转'
        },
        {
          value: '不详',
          label: '不详'
        },
        {
          value: '有后遗症',
          label: '有后遗症'
        },
        {
          value: '死亡',
          label: '死亡'
        }
      ],
      stopDrugList: [
        {
          value: '是',
          label: '是'
        },
        {
          value: '否',
          label: '否'
        },
        {
          value: '不明',
          label: '不明'
        },
        {
          value: '未停药或未减量',
          label: '未停药或未减量'
        }
      ],
      againDrugList: [
        {
          value: '是',
          label: '是'
        },
        {
          value: '否',
          label: '否'
        },
        {
          value: '不明',
          label: '不明'
        },
        {
          value: '未再使用',
          label: '未再使用'
        }
      ],
      originaldiseaseList: [
        {
          value: '不明显',
          label: '不明显'
        },
        {
          value: '病程延长',
          label: '病程延长'
        },
        {
          value: '病情加重',
          label: '病情加重'
        },
        {
          value: '导致后遗症',
          label: '导致后遗症'
        },
        {
          value: '导致死亡',
          label: '导致死亡'
        }
      ],
      importantMsgList: [
        {
          value: '吸烟史',
          label: '吸烟史'
        },
        {
          value: '饮酒史',
          label: '饮酒史'
        },
        {
          value: '妊娠期',
          label: '妊娠期'
        },
        {
          value: '肝病史',
          label: '肝病史'
        },
        {
          value: '肾病史',
          label: '肾病史'
        },
        {
          value: '过敏史',
          label: '过敏史'
        },
        {
          value: '其他',
          label: '其他'
        }
      ],
      evaluateList: [
        {
          value: '肯定',
          label: '肯定'
        },
        {
          value: '很可能',
          label: '很可能'
        },
        {
          value: '可能',
          label: '可能'
        },
        {
          value: '可能无关',
          label: '可能无关'
        },
        {
          value: '待评价',
          label: '待评价'
        },
        {
          value: '无法评价',
          label: '无法评价'
        }
      ],
      occupationList: [
        {
          value: '医生',
          label: '医生'
        },
        {
          value: '药师',
          label: '药师'
        },
        {
          value: '护士',
          label: '护士'
        },
        {
          value: '其他',
          label: '其他'
        }
      ],
      eventContent: {},
      eventDrug: {},
      formItem: {
        suspectedDrugsList: [
          {
            approvalNumber: '', // 批准文号
            productName: '', // 商品名称
            commonName: '', // 通用名称
            manufacturer: '', // 生产厂家
            batchNumber: '', // 生产批号
            usageAndDosage: '', // 用法用量
            startAndEnd: '', // 用药起止时间
            MedicalReasons: '', // 用药原因
            index: 1,
            status: 1
          }
        ],
        combinedDrugsList: [
          {
            approvalNumber: '', // 批准文号
            productName: '', // 商品名称
            commonName: '', // 通用名称
            manufacturer: '', // 生产厂家
            batchNumber: '', // 生产批号
            usageAndDosage: '', // 用法用量
            startAndEnd: '', // 用药起止时间
            MedicalReasons: '', // 用药原因
            index: 1,
            status: 1
          }
        ]
      },
      ruleValidate: {
        patName: [
          { required: true, message: '此处不能为空', trigger: 'blur' }
        ],
        patSex: [
          { required: true, message: '此处不能为空', trigger: 'change' }
        ],
        patBirthday: [
          { required: true, type: 'date', message: '此处不能为空', trigger: 'change' }
        ],
        patAge: [
          { required: true, message: '此处不能为空', trigger: 'blur' }
        ],
        weight: [
          { required: true, message: '此处不能为空', trigger: 'blur' }
        ],
        phone: [
          { required: true, message: '此处不能为空', trigger: 'blur' }
        ],
        patDeptId: [
          { required: true, message: '此处不能为空', trigger: 'change' }
        ],
        patNumber: [
          { required: true, message: '此处不能为空', trigger: 'blur' }
        ],
        eventTitle: [
          { required: true, message: '此处不能为空', trigger: 'blur' }
        ],
        happenTime: [
          { required: true, type: 'date', message: '此处不能为空', trigger: 'change' }
        ],
        happenAddress: [
          { required: true, message: '此处不能为空', trigger: 'change' }
        ],
        eventDesc: [
          { required: true, message: '此处不能为空', trigger: 'blur' }
        ],
        stopDrug: [
          { required: true, message: '此处不能为空', trigger: 'change' }
        ],
        againDrug: [
          { required: true, message: '此处不能为空', trigger: 'change' }
        ],
        originaldisease: [
          { required: true, message: '此处不能为空', trigger: 'change' }
        ],
        writeEvaluate: [
          { required: true, message: '此处不能为空', trigger: 'change' }
        ],
        writeUserName: [
          { required: true, message: '此处不能为空', trigger: 'blur' }
        ],
        writeOccupation: [
          { required: true, message: '此处不能为空', trigger: 'change' }
        ],
        reportTime: [
          { required: true, type: 'date', message: '此处不能为空', trigger: 'change' }
        ]
      }
    }
  },
  mounted () {
    this.formItem.writeUserName = this.$store.state.user.userName
  },
  methods: {
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
      eventBCDTO.eventDrug = this.eventDrugValueMethod()
      eventBCDTO.eventContent = this.eventContentValueMethod()
      console.log(eventBCDTO)
      this.axios.post('/eventDrug/save', eventBCDTO).then((res) => {
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
    // 从formItem中分离eventContent(主表)的值传到后端
    eventContentValueMethod () {
      this.eventContent.eventTypeId = 4
      this.eventContent.eventTypeName = '药品不良反应事件'
      this.eventContent.patName = this.formItem.patName
      this.eventContent.patSex = this.formItem.patSex
      this.eventContent.patBirthday = this.formItem.patBirthday
      this.eventContent.patAge = this.formItem.patAge
      this.eventContent.patDeptId = this.formItem.patDeptId
      this.eventContent.patDeptName = this.departList.filter(e => e.value === this.formItem.patDeptId)[0].label
      this.eventContent.patNumber = this.formItem.patNumber
      this.eventContent.writeUserId = this.$store.state.user.userId
      this.eventContent.writeUserName = this.$store.state.user.userName
      this.eventContent.happenTime = this.formItem.happenTime
      this.eventContent.happenAddress = this.formItem.happenAddress
      this.eventContent.eventDeptId = '1'
      this.eventContent.eventDeptName = '骨科'
      this.eventContent.isAnonymous = '否'
      this.eventContent.eventContentStatus = 0
      this.eventContent.reStatus = 0
      return this.eventContent
    },
    // 从formItem中分离eventBlood（子表）的值传到后端
    eventDrugValueMethod () {
      this.eventDrug.suspectedDrugs = this.formItem.suspectedDrugsList ? JSON.stringify(this.formItem.suspectedDrugsList) : this.formItem.suspectedDrugsList
      this.eventDrug.combinedDrugs = this.formItem.combinedDrugsList ? JSON.stringify(this.formItem.combinedDrugsList) : this.formItem.combinedDrugsList
      this.eventDrug.weight = this.formItem.weight
      this.eventDrug.phone = this.formItem.phone
      this.eventDrug.primaryDisease = this.formItem.primaryDisease
      this.eventDrug.pastdrugs = this.formItem.pastdrugs
      this.eventDrug.pastdrugsDesc = this.formItem.pastdrugsDesc
      this.eventDrug.familydrugs = this.formItem.familydrugs
      this.eventDrug.familydrugsDesc = this.formItem.familydrugsDesc
      this.eventDrug.importantMsg = this.formItem.importantMsg ? this.formItem.importantMsg.join(',') : this.formItem.importantMsg
      this.eventDrug.importantAllergy = this.formItem.importantAllergy
      this.eventDrug.importantOtherMsg = this.formItem.importantOtherMsg
      this.eventDrug.eventTitle = this.formItem.eventTitle
      this.eventDrug.happenTime = this.formItem.happenTime
      this.eventDrug.eventDesc = this.formItem.eventDesc
      this.eventDrug.eventResult = this.formItem.eventResult
      this.eventDrug.eventPerformance = this.formItem.eventPerformance
      this.eventDrug.dealReason = this.formItem.dealReason
      this.eventDrug.dealTime = this.formItem.dealTime
      this.eventDrug.stopDrug = this.formItem.stopDrug
      this.eventDrug.againDrug = this.formItem.againDrug
      this.eventDrug.originaldisease = this.formItem.originaldisease
      this.eventDrug.writeEvaluate = this.formItem.writeEvaluate
      this.eventDrug.reportingUnitName = this.formItem.reportingUnitName
      this.eventDrug.reportingEvaluate = this.formItem.reportingEvaluate
      this.eventDrug.writePhone = this.formItem.writePhone
      this.eventDrug.writeEmail = this.formItem.writeEmail
      this.eventDrug.writeOccupation = this.formItem.writeOccupation
      this.eventDrug.writeOccupationOther = this.formItem.writeOccupationOther
      this.eventDrug.reportingUnitName = this.formItem.reportingUnitName
      this.eventDrug.reportingUnitUser = this.formItem.reportingUnitUser
      this.eventDrug.reportingUnitTel = this.formItem.reportingUnitTel
      this.eventDrug.reportTime = this.formItem.reportTime
      return this.eventDrug
    },
    // 怀疑用药添加方法
    handleAdd1 () {
      this.index++
      this.formItem.suspectedDrugsList.push({
        approvalNumber: '', // 批准文号
        productName: '', // 商品名称
        commonName: '', // 通用名称
        manufacturer: '', // 生产厂家
        batchNumber: '', // 生产批号
        usageAndDosage: '', // 用法用量
        startAndEnd: '', // 用药起止时间
        MedicalReasons: '', // 用药原因
        index: this.index,
        status: 1
      })
    },
    // 怀疑用药删除方法
    handleRemove1 (index) {
      this.formItem.suspectedDrugsList[index].status = 0
      this.formItem.suspectedDrugsList.splice(index, 1)
    },
    // 并用药品添加方法
    handleAdd () {
      this.index++
      this.formItem.combinedDrugsList.push({
        approvalNumber: '', // 批准文号
        productName: '', // 商品名称
        commonName: '', // 通用名称
        manufacturer: '', // 生产厂家
        batchNumber: '', // 生产批号
        usageAndDosage: '', // 用法用量
        startAndEnd: '', // 用药起止时间
        MedicalReasons: '', // 用药原因
        index: this.index,
        status: 1
      })
    },
    // 并用药品删除方法
    handleRemove (index) {
      this.formItem.combinedDrugsList[index].status = 0
      this.formItem.combinedDrugsList.splice(index, 1)
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
  .drug-line{
    width: 100%;
    height: 2px;
    background-color: #2b85e4;
  }
   .drug-add-input{
     float: left;
   }
   .drug-add-box{
     overflow: hidden;
   }
  .drug-add-p{
    width: 80px;
    line-height: 14px;
    text-align: right;
    margin-top: 8px;
    float: left;
  }
</style>
