<template>
    <Card>
      <Modal
        v-model="modalImg"
        title="查看流程图"
        @on-ok="ok"
        width="880"
        @on-cancel="cancel">
        <div class="modal-img-box">
          <img :src="targetProcessImageUrl"/>
        </div>
      </Modal>
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
        <p slot="title">不良事件填报</p>

      <Row>
        <Col span="12"><Button type="primary" icon="md-add-circle" @click="addNewReport">新增填报事件</Button></Col>
        <Col span="12" style="text-align: right">
          <Select v-model="eventStatus" style="width:200px" @on-change="statusPull">
          <Option v-for="item in eventStatusList" :value="item.value" :key="item.value">{{ item.label }}</Option>
          </Select>
         <Button style="margin-left: 15px" type="success" icon="ios-search" @click="searchEvent">筛选</Button>
        </Col>
      </Row>

        <Table border :columns="columns12" :data="data6" class="report-audit-table">
          <template slot-scope="{ row }" slot="patNumber">
            <strong>{{ row.patNumber }}</strong>
          </template>
          <template slot-scope="{ row, index }" slot="action">
            <Button type="primary" size="small" style="margin-right: 5px" @click="show(row)">详情</Button>
            <Button type="success" size="small" style="margin-right: 5px" @click="showImage(row.processInstanceId)">查看流程</Button>
            <Button type="primary" size="small" style="margin-right: 5px" @click="addNewReportReturn(row.eventInfoId)" v-if="row.eventStatus === 2">重新上报</Button>
          </template>
        </Table>
        <div class="pageStyle" v-if="totalNumber > 0">
          <Page :total="totalNumber" @on-change="pageChange" show-elevator />
        </div>
    </Card>
</template>

<script>
export default {
  data () {
    return {
      modalImg: false,
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
          title: '上报时间',
          key: 'createTime'
        },
        {
          title: '操作',
          slot: 'action',
          width: 280

        }
      ],
      data6: [
        {
          patName: '欧阳张三',
          patNumber: '0654768',
          eventType: '事件类型',
          eventStatus: '事件状态',
          createTime: '2019-7-26 10:44'
        }

      ],
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
      // 事件状态
      eventStatusList: [
        {
          label: '全部事件',
          value: 'all'
        },
        {
          label: '待结案',
          value: 'unclose'
        },
        {
          label: '已结案',
          value: 'close'
        },
        {
          label: '驳回',
          value: 'return'
        }
      ],
      // 事件默认状态
      eventStatus: 'all'

    }
  },
  mounted () {
    this.pageShow(0)
  },
  methods: {
    // 新增事件填报
    addNewReport () {
      this.$router.push('new_ame_report')
    },
    // 驳回重新上报
    addNewReportReturn (eventId) {
      this.$router.push({
        path: '/addReportReturn',
        query: {
          eventId: eventId
        }
      })
    },
    // 查看事件
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
      // alert(JSON.stringify(this.eventInfoModelReason));
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
    // 初始化显示
    pageShow (pageNumber) {
      let requestParam = {
        pageNumber: pageNumber,
        pageSize: 10,
        eventStatus: this.eventStatus
      }
      this.axios.get('eventInfo/getPage', { params: requestParam }).then((res) => {
        if (res.data.code === 0) {
          this.data6 = res.data.data.content
          this.totalNumber = res.data.data.totalElements
        } else {
          this.data6 = []
        }
      }).catch((e) => {
        console.log(e)
      })
    },
    // 页码切换
    pageChange (page) {
      let pageNumber = page - 1
      this.pageNumber = pageNumber
      this.pageShow(pageNumber)
    },
    // 查看流程图
    showImage (processInstanceId) {
      this.modalImg = true
      let baseUrl = process.env.NODE_ENV === 'development' ? this.$config.baseUrl.dev : this.$config.baseUrl.pro
      this.targetProcessImageUrl = baseUrl + 'eventTypeActiviti/imagesByProcessInstance?processInstanceId=' + processInstanceId + ''
    },
    // 状态下拉
    statusPull (event) {
      this.eventStatus = event
    },
    // 上报事件筛选
    searchEvent () {
      this.pageShow(0)
    }

  }
}
</script>

<style scoped>
  .float-style{
    float:none !important;
  }
  .modal-img-box img{
    width: 110%;
    margin-left: -12%;
    margin-top: -5%;
    padding-bottom: 5%;
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
