<template>
  <Row :gutter="16" class="ppp">
    <Col span="20">
      <Card style="margin-bottom: 25px" class="write-card-box">
            <div slot="title" class="write-title-box"><span class="write-title"><Icon type="ios-paper" />&nbsp;不良事件填报表</span></div>
            <div class="">
              <Form :model="formItem" :label-width="100" >
                 <div class="write-md-box">
                      <div  class="write-md-title-box">
                        <h1 class="write-md-title">患者基本信息</h1>
                      </div>
                         <Row :gutter="16" class="write-form-box">
                           <Col span="6">
                             <FormItem label="患者病案号:" class="write-formitem-box">
                               <Input v-model="formItem.input" placeholder="请输入患者病案号"></Input>
                             </FormItem>
                           </Col>
                           <Col span="6">
                             <FormItem label="患者姓名:" class="write-formitem-box">
                               <Input v-model="formItem.input" placeholder="请输入患者病案号"></Input>
                             </FormItem>
                           </Col>
                           <Col span="6">
                             <FormItem label="患者出生日期:" class="write-formitem-box">
                               <DatePicker type="date" placeholder="Select date" ></DatePicker>
                             </FormItem>
                           </Col>
                           <Col span="6">
                             <FormItem label="患者性别:" class="write-formitem-box">
                               <RadioGroup v-model="formItem.radio">
                                 <Radio label="male">男</Radio>
                                 <Radio label="female">女</Radio>
                               </RadioGroup>
                             </FormItem>
                           </Col>
                         </Row>
                         <Row :gutter="16" class="write-form-box">
                           <Col span="6">
                             <FormItem label="患者病区:" class="write-formitem-box">
                               <Select v-model="formItem.select">
                                 <Option value="beijing">New York</Option>
                                 <Option value="shanghai">London</Option>
                                 <Option value="shenzhen">Sydney</Option>
                               </Select>
                             </FormItem>
                           </Col>
                           <Col span="6">
                             <FormItem label="患者科室:" class="write-formitem-box">
                               <Select v-model="formItem.select">
                                 <Option value="beijing">New York</Option>
                                 <Option value="shanghai">London</Option>
                                 <Option value="shenzhen">Sydney</Option>
                               </Select>
                             </FormItem>
                           </Col>
                         </Row>
                 </div>
                 <div class="write-md-box">
                    <div  class="write-md-title-box">
                      <h1 class="write-md-title">事件发生地点信息</h1>
                    </div>
                      <Row :gutter="16" class="write-form-box">
                        <Col span="6">
                          <FormItem label="事件发生科室:" class="write-formitem-box">
                            <Select v-model="formItem.select">
                              <Option value="beijing">New York</Option>
                              <Option value="shanghai">London</Option>
                              <Option value="shenzhen">Sydney</Option>
                            </Select>
                          </FormItem>
                        </Col>
                        <Col span="6">
                          <FormItem label="事件发生病区:" class="write-formitem-box">
                            <Select v-model="formItem.select">
                              <Option value="beijing">New York</Option>
                              <Option value="shanghai">London</Option>
                              <Option value="shenzhen">Sydney</Option>
                            </Select>
                          </FormItem>
                        </Col>
                        <Col span="6">
                          <FormItem label="事件发生时间:" class="write-formitem-box">
                            <DatePicker type="datetime" placeholder="Select date and time" ></DatePicker>
                          </FormItem>
                        </Col>
                      </Row>
                  </div>
                 <div class="write-md-box">
                  <div  class="write-md-title-box">
                    <h1 class="write-md-title">上报人信息</h1>
                  </div>
                  <Row :gutter="16" class="write-form-box">
                    <Col span="6">
                      <FormItem label="上报人:" class="write-formitem-box">
                        <RadioGroup v-model="formItem.anonymity">
                          <Radio label="yes">实名</Radio>
                          <Radio label="no">匿名</Radio>
                        </RadioGroup>
                      </FormItem>
                    </Col>
                    <Col span="6">
                      <FormItem label="上报人类别:" class="write-formitem-box">
                        <Select v-model="formItem.select">
                          <Option value="beijing">New York</Option>
                          <Option value="shanghai">London</Option>
                          <Option value="shenzhen">Sydney</Option>
                        </Select>
                      </FormItem>
                    </Col>
                    <Col span="6">
                      <FormItem label="上报科室:" class="write-formitem-box">
                        <DatePicker type="datetime" placeholder="Select date and time" ></DatePicker>
                      </FormItem>
                    </Col>
                  </Row>
                </div>
                 <div class="write-md-box">
                  <div  class="write-md-title-box">
                    <h1 class="write-md-title">事件关键信息</h1>
                  </div>
                  <Row :gutter="16" class="write-form-box">
                    <Col span="6">
                      <FormItem label="事件类型:" class="write-formitem-box">
                        <Select v-model="formItem.select">
                          <Option value="beijing">New York</Option>
                          <Option value="shanghai">London</Option>
                          <Option value="shenzhen">Sydney</Option>
                        </Select>
                      </FormItem>
                    </Col>
                  </Row>
                  <Row :gutter="16" class="write-form-box">
                     <Col span="12">
                       <FormItem label="临床诊断:" class="write-formitem-box">
                         <Input v-model="value6" type="textarea" :rows="3" placeholder="Enter something..." />
                       </FormItem>
                     </Col>
                    <Col span="12">
                      <FormItem label="事件描述:" class="write-formitem-box">
                        <Input v-model="value6" type="textarea" :rows="3" placeholder="Enter something..." />
                      </FormItem>
                    </Col>
                  </Row>
                   <Row :gutter="16" class="write-form-box">
                     <Col span="12">
                       <FormItem label="事件应急措施:" class="write-formitem-box">
                         <Input v-model="value6" type="textarea" :rows="3" placeholder="Enter something..." />
                       </FormItem>
                     </Col>
                     <Col span="12">
                       <FormItem label="事件结果:" class="write-formitem-box">
                         <Input v-model="value6" type="textarea" :rows="3" placeholder="Enter something..." />
                       </FormItem>
                     </Col>
                   </Row>
                </div>
                 <div class="write-md-box">
                  <div  class="write-md-title-box">
                    <h1 class="write-md-title">事件原因</h1>
                  </div>
                  <Row :gutter="16" class="write-form-box">
                    <Col span="8">
                      <FormItem label="个人因素:" class="write-formitem-box">
                        <Select v-model="model12" filterable multiple>
                          <Option v-for="item in cityList" :value="item.value" :key="item.value">{{ item.label }}</Option>
                        </Select>
                      </FormItem>
                    </Col>
                    <Col span="8">
                      <FormItem label="设施因素:" class="write-formitem-box">
                        <Select v-model="model12" filterable multiple>
                          <Option v-for="item in cityList" :value="item.value" :key="item.value">{{ item.label }}</Option>
                        </Select>
                      </FormItem>
                    </Col>
                    <Col span="8">
                      <FormItem label="耗材因素:" class="write-formitem-box">
                        <Select v-model="model12" filterable multiple>
                          <Option v-for="item in cityList" :value="item.value" :key="item.value">{{ item.label }}</Option>
                        </Select>
                      </FormItem>
                    </Col>
                  </Row>
                  <Row :gutter="16" class="write-form-box">
                     <Col span="8">
                       <FormItem label="制度因素:" class="write-formitem-box">
                         <Select v-model="model12" filterable multiple>
                           <Option v-for="item in cityList" :value="item.value" :key="item.value">{{ item.label }}</Option>
                         </Select>
                       </FormItem>
                     </Col>
                     <Col span="8">
                       <FormItem label="流程因素:" class="write-formitem-box">
                         <Select v-model="model12" filterable multiple>
                           <Option v-for="item in cityList" :value="item.value" :key="item.value">{{ item.label }}</Option>
                         </Select>
                       </FormItem>
                     </Col>
                     <Col span="8">
                       <FormItem label="环境因素:" class="write-formitem-box">
                         <Select v-model="model12" filterable multiple>
                           <Option v-for="item in cityList" :value="item.value" :key="item.value">{{ item.label }}</Option>
                         </Select>
                       </FormItem>
                     </Col>
                   </Row>
                  <Row :gutter="16" class="write-form-box">
                     <Col span="8">
                       <FormItem label="患者家属因素:" class="write-formitem-box">
                         <Select v-model="model12" filterable multiple>
                           <Option v-for="item in cityList" :value="item.value" :key="item.value">{{ item.label }}</Option>
                         </Select>
                       </FormItem>
                     </Col>
                   </Row>
                </div>
                <Row :gutter="16" class="write-form-box">
                  <Col span="24" style="text-align: center">
                       <Button size="large" style="width: 300px" type="success" >提交报表</Button>
                  </Col>
                </Row>
              </Form>
            </div>
      </Card>
    </Col>
    <Col span="4">
      <Card class="step-po-style" >
        <p slot="title">事件流程步骤</p>
      </Card>
    </Col>
  </Row>
</template>

<script>
export default {
  data () {
    return {
      cityList: [
        {
          value: 'New York',
          label: 'New York'
        },
        {
          value: 'London',
          label: 'London'
        },
        {
          value: 'Sydney',
          label: 'Sydney'
        },
        {
          value: 'Ottawa',
          label: 'Ottawa'
        },
        {
          value: 'Paris',
          label: 'Paris'
        },
        {
          value: 'Canberra',
          label: 'Canberra'
        }
      ],
      formItem: {
        anonymity: 'yes',
        input: '',
        select: '',
        radio: 'male',
        textarea: '',
        value6: '',
        model12: []
      }
    }
  }
}
</script>

<style>
  .write-card-box{
    /*overflow: hidden;*/
  }
  .write-card-box .ivu-card-head{
    background-color: #2d8cf0;
    border-radius: 5px 5px 0 0;
  }
  .write-form-box{
    margin: 15px 0;
  }
  .write-formitem-box{
    margin-bottom: 10px;
  }
  .write-formitem-box .ivu-form-item-label{
    font-size: 14px !important;
    color: #515a6e;
  }
  .write-md-title-box:first-child{
    margin-top: 0;
  }
  .write-md-title-box{
      border-bottom: dashed 1px #c5c8ce;
    margin-top: 15px;
  }
  .write-md-title{
      font-size: 16px;
      color: #17233d;
    font-weight: 300;
      padding-left: 6px;
      border-left: solid 5px #2b85e4;
    line-height: 18px;
    margin-bottom: 8px;
  }
  .write-title{
    font-size: 24px;
    color: #ffffff;
    font-weight: 300;
    font-family: 微软雅黑;
  }
    .write-title-box{
       text-align: center;
    }
</style>
