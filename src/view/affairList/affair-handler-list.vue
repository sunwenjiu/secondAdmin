<template>
  <div>
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
    <Row style="margin-bottom: 20px">
      <Col span="24">
        <Card class="card-title-style bgColor-blue">
          <div slot="title">
            <Icon type="ios-search"/>
            筛选
          </div>
          <Input v-if="!switch1" type="text" v-model="searchKeyVal"  @on-click="searchBtn" search icon="ios-search" enter-button placeholder="患者关键字" style="width: 355px" />
          <p style="margin-top: 15px">
            条件筛选开关：<i-switch v-model="switch1" size="large">
            <span slot="open">显示</span>
            <span slot="close">关闭</span>
          </i-switch>
          </p>
          <div class="filtration-box" v-if="switch1">
            <Row>
              <Col span="6">
                上报时间段：<DatePicker class="DatePicker-down-style" type="datetimerange" placeholder="上报时间段" v-model="timeDate" style="width: 300px" @on-change="changeTime"></DatePicker>
              </Col>
              <Col span="6">
                填报科室：
                <Select v-model="writeDeptModel" style="width:200px">
                  <Option v-for="item in writeDeptList" :value="item.value" :key="item.value">{{ item.label }}</Option>
                </Select>
              </Col>
              <Col span="6">
                患者科室：
                <Select v-model="patDeptModel" style="width:200px">
                  <Option v-for="item in patDeptList" :value="item.value" :key="item.value">{{ item.label }}</Option>
                </Select>
              </Col>
            </Row>
            <Row style="margin-top: 15px">
              <Col span="24">
                <div style="overflow: hidden">
                  <span style="float: left">事件类型：</span>
                  <Checkbox
                    style="float: left;margin-top: 2px"
                    :indeterminate="indeterminate"
                    :value="checkAll"
                    @click.prevent.native="handleCheckAll">全选
                  </Checkbox>
                  <div class="" style="float: left">
                    <CheckboxGroup v-model="checkAllGroup" @on-change="checkAllGroupChange">
                      <Checkbox label="护理不良事件"></Checkbox>
                      <Checkbox label="可疑医疗器械不良事件"></Checkbox>
                      <Checkbox label="输血不良反应事件"></Checkbox>
                      <Checkbox label="药品不良反应事件"></Checkbox>
                      <Checkbox label="用药差错不良事件"></Checkbox>
                      <Checkbox label="其它不良事件"></Checkbox>
                    </CheckboxGroup>
                  </div>
                </div>
              </Col>
            </Row>
            <Button type="success" @click="conditionSearch">条件筛选</Button>
            <Button type="error" @click="conditionEmpty">条件清空</Button>
          </div>
        </Card>
      </Col>
    </Row>
    <Row :gutter="16">
      <Col span="5">
        <Card class="card-title-style bgColor-gray">
          <div slot="title">
            <Icon type="md-list"/>
            不良事件类型列表
          </div>
          <div>
            <Menu :theme="theme3" class="affair-list" active-name="1" @on-select="switcher">
              <MenuGroup>
                <MenuItem name="1">
                  <Icon type="md-document"/>
                  护理不良事件
                </MenuItem>
                <MenuItem name="2">
                  <Icon type="md-chatbubbles"/>
                  可疑医疗器械不良事件
                </MenuItem>
                <MenuItem name="3">
                  <Icon type="md-heart"/>
                  输血不良反应
                </MenuItem>
                <MenuItem name="4">
                  <Icon type="md-leaf"/>
                  药品不良反应
                </MenuItem>
                <MenuItem name="5">
                  <Icon type="md-leaf"/>
                  用药差错用药接近差错
                </MenuItem>
                <MenuItem name="6">
                  <Icon type="md-leaf"/>
                  其它不良事件
                </MenuItem>
              </MenuGroup>
            </Menu>
          </div>
        </Card>
      </Col>
      <Col span="19">
        <Card class="card-title-style bgColor-gray">
          <div slot="title">
            <Icon type="ios-list"/>
            列表
          </div>
          <div>
            <Tabs v-model="tabVal" @on-click="tabChange">
              <TabPane label="待办理" name="1">
                <div>
                  <Table border :columns="columns1" :data="data1">
                    <template slot-scope="{ row, index }" slot="action">
                      <Button type="primary" size="small" style="margin-right: 5px" @click="handlerInfo(row)">处理</Button>
                      <Button type="success" size="small" @click="showFlow(row.processInstance)">流程</Button>
                    </template>
                  </Table>
                  <div style="text-align: center;margin-top: 20px" v-if="totalSize > 0">
                    <Page :total="totalSize" show-elevator/>
                  </div>
                </div>
              </TabPane>
              <TabPane label="已办理" name="2">
                <div>
                  <Table border :columns="columns1" :data="data1">
                    <template slot-scope="{ row, index }" slot="action">
                      <Button type="primary" size="small" style="margin-right: 5px" @click="showInfo(row)">查看</Button>
                      <Button type="success" size="small" @click="showFlow(row.processInstance)">流程</Button>
                    </template>
                  </Table>
                  <div style="text-align: center;margin-top: 20px" v-if="totalSize > 0">
                    <Page :total="totalSize" show-elevator/>
                  </div>
                </div>
              </TabPane>
              <TabPane label="被委托" name="3">
                <div>
                  <Table border :columns="columns1" :data="data1">
                    <template slot-scope="{ row, index }" slot="action">
                      <Button type="primary" size="small" style="margin-right: 5px" @click="handlerInfo(row)">处理</Button>
                      <Button type="success" size="small" @click="showFlow(row.processInstance)">流程</Button>
                    </template>
                  </Table>
                  <div style="text-align: center;margin-top: 20px" v-if="totalSize > 0">
                    <Page :total="totalSize" show-elevator/>
                  </div>
                </div>
              </TabPane>
            </Tabs>

          </div>
        </Card>
      </Col>
    </Row>
  </div>
</template>

<script>
export default {
  data () {
    return {
      switch1: false,
      modalImg: false,
      // 点击后的流程图id
      targetProcessImageUrl: '',
      indeterminate: false,
      checkAll: false,
      checkAllGroup: [],
      // 患者科室
      patDeptList: [
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
      ],
      // 上报科室
      writeDeptList: [
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
      ],
      // 患者科室model
      patDeptModel: '',
      // 上报科室
      writeDeptModel: '',
      model1: '',
      theme3: 'light',
      boxNum: 1,
      // 搜索key值
      searchKeyVal: '',
      // 总数
      totalSize: 0,
      // 每页显示数量
      pageSize: 10,
      // 开始上报时间
      startTime: '',
      // 结束上报时间
      endTime: '',
      // 日期选择器model
      timeDate: '',
      // 事件列
      columns1: [
        {
          title: '患者姓名',
          key: 'patName'
        },
        {
          title: '患者科室',
          key: 'patDeptName'
        },
        {
          title: '填报科室',
          key: 'eventDeptName'
        },
        {
          title: '事件类型',
          key: 'eventTypeName'
        },
        {
          title: '状态',
          key: 'eventContentStatus'
        },
        {
          title: '上报时间',
          key: 'createTime'
        },
        {
          title: '操作',
          slot: 'action',
          width: 150,
          align: 'center'
        }
      ],
      // 事件数据
      data1: [
        {
          name: '欧阳张三',
          age: 18,
          dept: '骨科',
          address: 'New York No. 1 Lake Park',
          status: '已上报',
          date: '2016-10-03'
        },
        {
          name: '欧阳张三',
          age: 18,
          dept: '骨科',
          address: 'New York No. 1 Lake Park',
          status: '已上报',
          date: '2016-10-03'
        }
      ],
      // tab默认值
      tabVal: '1'
    }
  },
  mounted () {
    this.loadEventData(0)
  },
  methods: {
    handleCheckAll () {
      if (this.indeterminate) {
        this.checkAll = false
      } else {
        this.checkAll = !this.checkAll
      }
      this.indeterminate = false
      if (this.checkAll) {
        this.checkAllGroup = ['护理不良事件', '可疑医疗器械不良事件', '输血不良反应事件', '药品不良反应事件', '用药差错不良事件', '其它不良事件']
      } else {
        this.checkAllGroup = []
      }
    },
    checkAllGroupChange (data) {
      if (data.length === 6) {
        this.indeterminate = true
        this.checkAll = true
      } else {
        this.indeterminate = false
        this.checkAll = false
      }
    },
    switcher (name) {
      this.boxNum = name
      this.checkAll = false
      this.checkAllGroup = []
      this.loadEventDataRadio(0)
    },
    // 时间改变
    changeTime (val) {
      let timeStr = val.toString()
      if (timeStr.length > 0) {
        let timeArr = timeStr.split(',')
        this.startTime = timeArr[0]
        this.endTime = timeArr[1]
      }
      // alert('开始：' + this.startTime + '结束：' + this.endTime)
    },
    // 加载初始化数据
    loadEventData (pageNumber) {
      let eventTypeIds = this.getEventIds()
      let requestBody = {
        searchKey: this.searchKeyVal,
        writeDeptId: this.writeDeptModel,
        patDeptId: this.patDeptModel,
        eventStatus: this.eventStatusModel,
        eventLevelId: '',
        eventTypeId: eventTypeIds.toString(),
        handlerType: Number(this.tabVal),
        startTime: this.startTime,
        endTime: this.endTime,
        pageNumber: pageNumber,
        pageSize: this.pageSize
      }
      this.axios.post('eventContent/getAllPageByConditionInHandler', requestBody).then((res) => {
        if (res.data.code === 0) {
          let data = res.data.data.content
          data.forEach(e => {
            e.createTime = this.xdate.format(e.createTime, 'yyyy-MM-dd')
            if (e.eventContentStatus === 0) {
              e.eventContentStatus = '等待处理'
            } else if (e.eventContentStatus === 1) {
              e.eventContentStatus = '正在处理'
            } else if (e.eventContentStatus === 2) {
              e.eventContentStatus = '完成'
            } else if (e.eventContentStatus === 3) {
              e.eventContentStatus = '驳回'
            }
          })
          this.data1 = data
          this.totalSize = res.data.data.totalElements
        } else {
          this.data1 = []
          this.totalSize = 0
        }
      }).catch((e) => {
        console.log(e)
      })
    },
    // 加载初始化数据（切换事件类型）
    loadEventDataRadio (pageNumber) {
      let requestBody = {
        searchKey: this.searchKeyVal,
        writeDeptId: this.writeDeptModel,
        patDeptId: this.patDeptModel,
        eventStatus: this.eventStatusModel,
        eventLevelId: '',
        eventTypeId: this.boxNum.toString(),
        handlerType: Number(this.tabVal),
        startTime: this.startTime,
        endTime: this.endTime,
        pageNumber: pageNumber,
        pageSize: this.pageSize
      }
      this.axios.post('eventContent/getAllPageByConditionInHandler', requestBody).then((res) => {
        if (res.data.code === 0) {
          let data = res.data.data.content
          data.forEach(e => {
            e.createTime = this.xdate.format(e.createTime, 'yyyy-MM-dd')
            if (e.eventContentStatus === 0) {
              e.eventContentStatus = '等待处理'
            } else if (e.eventContentStatus === 1) {
              e.eventContentStatus = '正在处理'
            } else if (e.eventContentStatus === 2) {
              e.eventContentStatus = '完成'
            } else if (e.eventContentStatus === 3) {
              e.eventContentStatus = '驳回'
            }
          })
          this.data1 = data
          this.totalSize = res.data.data.totalElements
        } else {
          this.data1 = []
          this.totalSize = 0
        }
      }).catch((e) => {
        console.log(e)
      })
    },
    // 模糊搜索
    searchBtn () {
      if (this.searchKeyVal.length > 0) {
        // 清空条件筛选信息
        this.checkAll = true
        this.checkAllGroup = ['护理不良事件', '可疑医疗器械不良事件', '输血不良反应事件', '药品不良反应事件', '用药差错不良事件', '其它不良事件']
        this.timeDate = ''
        this.patDeptModel = ''
        this.writeDeptModel = ''
      } else {
        this.checkAll = false
        this.checkAllGroup = []
        this.timeDate = ''
        this.$Message.error('请输入患者关键字')
      }
    },
    // 事件类型转换成id
    getEventIds () {
      let eventIds = []
      if (this.checkAllGroup.length > 0) {
        this.checkAllGroup.forEach(e => {
          if (e === '护理不良事件') {
            eventIds.push('1')
          } else if (e === '可疑医疗器械不良事件') {
            eventIds.push('2')
          } else if (e === '输血不良反应事件') {
            eventIds.push('3')
          } else if (e === '药品不良反应事件') {
            eventIds.push('4')
          } else if (e === '用药差错不良事件') {
            eventIds.push('5')
          } else if (e === '其它不良事件') {
            eventIds.push('6')
          }
        })
      }
      return eventIds
    },
    // 条件筛选
    conditionSearch () {
      this.loadEventData(0)
    },
    // 条件清空
    conditionEmpty () {
      this.checkAll = false
      this.checkAllGroup = []
      this.searchKeyVal = ''
      this.patDeptModel = ''
      this.writeDeptModel = ''
      this.timeDate = ''
    },
    // tab栏切换
    tabChange () {
      this.loadEventData(0)
    },
    // 查看详情
    showInfo (row) {
      let url = ''
      if (row.eventTypeId === '1') { // 护理
        url = 'affair_nurse_detail'
      } else if (row.eventTypeId === '2') { // 医疗
        url = 'affair_appliance_detail'
      } else if (row.eventTypeId === '3') { // 输血
        url = 'affair_blood_detail'
      } else if (row.eventTypeId === '4') { // 药品
        url = 'affair_drug_detail'
      } else if (row.eventTypeId === '5') { // 用药差错
        url = 'affair_mistake_detail'
      } else if (row.eventTypeId === '6') { // 其他
        url = 'affair_other_detail'
      }
      this.$router.push({
        path: url,
        query: {
          eventTypeId: row.eventTypeId,
          eventContentId: row.eventContentId,
          showType: 'handlerView'
        }
      })
    },
    // 处理
    handlerInfo (row) {
      let url = ''
      if (row.eventTypeId === '1') { // 护理
        url = 'affair_nurse_detail'
      } else if (row.eventTypeId === '2') { // 医疗
        url = 'affair_appliance_detail'
      } else if (row.eventTypeId === '3') { // 输血
        url = 'affair_blood_detail'
      } else if (row.eventTypeId === '4') { // 药品
        url = 'affair_drug_detail'
      } else if (row.eventTypeId === '5') { // 用药差错
        url = 'affair_mistake_detail'
      } else if (row.eventTypeId === '6') { // 其他
        url = 'affair_other_detail'
      }
      this.$router.push({
        path: url,
        query: {
          eventTypeId: row.eventTypeId,
          eventContentId: row.eventContentId,
          showType: 'handler'
        }
      })
    },
    cancel () {},
    // 查看流程
    showFlow (processInstanceId) {
      let baseUrl = process.env.NODE_ENV === 'development' ? this.$config.baseUrl.dev : this.$config.baseUrl.pro
      this.modalImg = true
      this.targetProcessImageUrl = baseUrl + 'eventTypeActiviti/imagesByProcessInstance?processInstanceId=' + processInstanceId
    }
  }
}
</script>

<style>
  .affair-list-span {
    width: 20px;
    height: 20px;
    border-radius: 10px;
    background-color: #ed4014;
    overflow: hidden;
    color: #ffffff;
    font-size: 12px;
    display: block;
    float: right;
    line-height: 20px;
    text-align: center;
  }

  .DatePicker-down-style .ivu-select-dropdown {
    z-index: 999999 !important;
  }

  .filtration-box {
    margin-top: 20px;
  }

  .affair-list {
    width: 100% !important;
  }

  .affair-list .ivu-menu-item-group-title {
    display: none;
  }
</style>
