<template>
  <Card>
    <Modal
      v-model="modal1"
      title="不良事件上报信息"
      @on-ok="ok"
      width="900"
      @on-cancel="cancel">
      <div>
        <!--小字段-->
        <ul class="report-list">
          <li class="report-list-md reportListWidthS" v-for="item in eventInfoModelStr" :key="item.fieldId">
            <p><span>{{item.fieldName}}:</span>{{item.formValue}}</p>
          </li>
        </ul>
        <div class="report-list-line"></div>
        <!--大字段-->
        <ul class="report-list">
          <li class="report-list-md float-style" v-for="item in eventInfoModelText" :key="item.fieldId">
            <p class="reportListLine"><span>{{item.fieldName}}:</span>{{item.formValue}}。</p>
          </li>
        </ul>
        <div class="report-list-line"></div>
        <!--原因相关-->
        <ul class="report-list">
          <li class="report-list-md float-style" v-for="item in eventInfoModelReason" :key="item.fieldId">
            <p class="reportListLine"><span>{{item.fieldName}}:</span>{{item.formValue}}。</p>
          </li>
        </ul>
        <div class="report-list-line"></div>
        <!--驳回理由-->
        <ul class="report-list">
          <li class="report-list-md float-style" v-for="item in eventInfoModelReturn" :key="item.fieldId">
            <p class="reportListReturn"><span>{{item.fieldName}}:</span>{{item.formValue}}。</p>
          </li>
        </ul>

      </div>
    </Modal>
    <p slot="title">不良事件处理</p>
    <div >
      <Tabs type="card" value="name1" class="report-tab-style" @on-click="tabChange">
        <TabPane :label="label" name="name1">
          <Table border :columns="columns12" :data="data6" class="report-audit-table">
            <template slot-scope="{ row }" slot="patNumber">
              <strong>{{ row.patNumber }}</strong>
            </template>
            <template slot-scope="{ row, index }" slot="action">
              <Button type="primary" size="small" style="margin-right: 5px" @click="show(row)">详情</Button>
              <Button type="success" size="small" style="margin-right: 5px" @click="goDispose(row.eventInfoId)">处理</Button>
            </template>
          </Table>
        </TabPane>
        <TabPane label="已办理" name="name2">
          <Table border :columns="columns12" :data="data8" class="report-audit-table">
            <template slot-scope="{ row }" slot="patNumber">
              <strong>{{ row.patNumber }}</strong>
            </template>
            <template slot-scope="{ row, index }" slot="action">
              <Button type="primary" size="small" style="margin-right: 5px" @click="show(row)">详情</Button>
            </template>
          </Table>
        </TabPane>
        <!--<TabPane label="已驳回" name="name3">-->
          <!--<Table border :columns="columns12" :data="data7" class="report-audit-table">-->
            <!--<template slot-scope="{ row }" slot="patNumber">-->
              <!--<strong>{{ row.patNumber }}</strong>-->
            <!--</template>-->
            <!--<template slot-scope="{ row, index }" slot="action">-->
              <!--<Button type="primary" size="small" style="margin-right: 5px" @click="show(row)">详情</Button>-->
            <!--</template>-->
          <!--</Table>-->
        <!--</TabPane>-->
      </Tabs>
    </div>
    <div class="pageStyle" v-if="totalNumber > 0">
      <Page :total="totalNumber" @on-change="pageChange" show-elevator />
    </div>
  </Card>
</template>

<script>
export default {
  data () {
    return {
      label: (h) => {
        return h('div', [
          h('span', '待办理'),
          h('Badge', {
            props: {
              count: this.data6Count
            }
          })
        ])
      },
      modal1: false,
      columns12: [
        {
          title: '病历号',
          slot: 'patNumber'
        },
        {
          title: '姓名',
          key: 'patName'
        },
        {
          title: '事件类型',
          key: 'eventType'
        },
        {
          title: '事件状态',
          key: 'eventStatus',
          render: (h, params) => {
            return h('p', params.row.eventStatus === 0 ? '待审核' : params.row.eventStatus === 1 ? '已结案' : '已驳回')
          }
        },
        {
          title: '是否重报',
          key: 'eventReturn',
          render: (h, params) => {
            return h('p', params.row.eventReturn === 0 ? '否' : '是')
          }
        },
        {
          title: '上报时间',
          key: 'createTime'
        },
        {
          title: '操作',
          slot: 'action',
          width: 200,
          align: 'center'
        }
      ],
      // 待办理
      data6: [
        {
          patName: '欧阳张三',
          patNumber: '0654768',
          eventType: '事件类型',
          eventStatus: '事件状态',
          createTime: '2019-7-26 10:44'
        }
      ],
      // 待办理数
      data6Count: 0,
      // 已驳回
      // data7:[],
      // 已办理
      data8: [],
      // 总数
      totalNumber: 0,
      // 当前页
      pageNumber: 0,
      // 事件详情input数据
      eventInfoModelStr: [],
      // 事件详情text数据
      eventInfoModelText: [],
      // 事件详情reason数据
      eventInfoModelReason: [],
      // 事件详情text驳回理由
      eventInfoModelReturn: [],
      // 事件流程图
      targetProcessImageUrl: '',
      // 标签页type项
      type: 0
    }
  },
  mounted () {
    this.pageShow(0, this.type)
  },
  methods: {
    goDispose (eventId) {
      this.$router.push({
        path: '/addDispose',
        query: {
          eventId: eventId
        }
      })
    },
    addNewReport () {
      this.$router.push('addReport')
    },
    // 详情弹窗
    show (row) {
      this.modal1 = true
      let jsonData = JSON.parse(row.eventInfoJson)
      // 小字段
      this.eventInfoModelStr = jsonData.filter(item => item.fieldType !== '多行文本框' && item.pullName !== '事件因素')
      // text字段
      this.eventInfoModelText = jsonData.filter(item => item.fieldType === '多行文本框' && item.pullName !== '事件因素' && item.fieldName !== '驳回理由')
      // 原因
      this.eventInfoModelReason = jsonData.filter(item => item.pullName === '事件因素')
      // 驳回理由
      this.eventInfoModelReturn = jsonData.filter(item => item.fieldType === '多行文本框' && item.pullName !== '事件因素' && item.fieldName === '驳回理由')
    },
    // 初始化显示(默认显示待办理)
    pageShow (pageNumber, type) {
      let requestParam = {
        pageNumber: pageNumber,
        pageSize: 10,
        type: type
      }
      this.axios.get('eventInfo/getPageByHandlerInfo', { params: requestParam }).then((res) => {
        if (res.data.code === 0) {
          if (type === 0) {
            // 待办理
            this.data6 = res.data.data.content
            this.data6Count = res.data.data.totalElements
          } else if (type === 1) {
            // 已办理
            this.data8 = res.data.data.content
          }
          this.totalNumber = res.data.data.totalElements
        } else {
          this.data6 = []
          this.data8 = []
        }
      }).catch((e) => {
        console.log(e)
      })
    },
    // 页码切换
    pageChange (page) {
      let pageNumber = page - 1
      this.pageNumber = pageNumber
      this.pageShow(pageNumber, this.type)
    },
    ok () {
      this.$Message.info('Clicked ok')
    },
    cancel () {
      this.$Message.info('Clicked cancel')
    },
    remove (index) {
      this.data6.splice(index, 1)
    },
    // 标签页切换
    tabChange (event) {
      if (event === 'name1') {
        this.type = 0
      } else if (event === 'name2') {
        this.type = 1
      }
      this.pageShow(0, this.type)
    }
  }
}
</script>

<style scoped>
  .float-style{
    float:none !important;
  }
  .report-tab-style .ivu-tabs-bar .ivu-tabs-nav .ivu-tabs-tab{
    border: solid 1px #5d6c7b !important;
  }
  .report-tab-style .ivu-tabs-tab-active{
     background-color: #2d8cf0 !important;
     color: #ffffff !important;
  }
  .pageStyle{
    text-align: center;
    margin: 25px 0;
    margin-bottom: 5px;
  }
  .reportListLine{
    line-height: 20px;
    font-size: 12px !important;
  }
  .reportListReturn{
    line-height: 20px;
    font-size: 20px !important;
    color: red;
  }
  .report-list-line{
    margin: 8px 0;
    height: 1px ;
    background-color: #808695;
    width: 100%;
  }
  .reportListWidthS{
    width: 33%;
  }
  .reportListWidth{
    width: 25%;
  }
  .report-list-md{
    float: left;
    margin-bottom:8px;
  }
  .report-list-md p span{
    font-weight: bold;
    color: #323232;
    margin-right: 5px;
  }
  .report-list-md p{
    font-size: 14px;
  }
  .report-list{
    font-family: 微软雅黑;
    overflow: hidden;
    list-style: none;
  }
  .report-audit-table{
    margin-top: 15px;
  }
</style>
