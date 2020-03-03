<template>
  <Card>
    <Modal
      v-model="modal1"
      title="选择导出日期"
      width="800"
      @on-ok="ok"
      @on-cancel="cancel">
      <div>
        <Row :gutter="16">
          <Col span="12">
          <Form :model="formItem" :label-width="80">
            <FormItem label="上报日期：">
              <DatePicker type="daterange" confirm placement="bottom-end" placeholder="选择日期区间" style="width: 290px" @on-change="timeSearch"></DatePicker>
            </FormItem>
          </Form>
          </Col>
        </Row>
      </div>
      <div slot="footer">
        <Button @click="modal1 = false">取消</Button>
        <Button type="primary" size="large"  @click="downloadExcel">确认导出Excel</Button>
      </div>
    </Modal>
    <p slot="title">全院事件</p>
    <div >
      <div v-show="allSearch" style="margin-top: 15px">
        <Input search enter-button="搜索" style="width: 400px" placeholder="输入关键字搜索" v-model="sKey" @on-search="searchKey(0)" />
      </div>
      <div class="allLine"></div>
      <Table border :columns="columns12" :data="data6" class="report-audit-table">
        <template slot-scope="{ row }" slot="name">
          <strong>{{ row.patientName }}</strong>
        </template>
        <template slot-scope="{ row, index }" slot="action">
          <Button type="primary" size="small" style="margin-right: 5px" @click="show(row.eventInfoId)">详情</Button>
        </template>
      </Table>
      <Button type="primary" icon="md-share-alt" style="margin-top: 15px" @click="openModal">日期导出Excel</Button>
    </div>
    <div class="pageStyle" v-if="totalSize > 0">
      <Page :total="totalSize" show-elevator @on-change="pageChange" />
    </div>
  </Card>
</template>

<script>
import axios from 'axios'
export default {
  data () {
    return {
      allTabActive2: false,
      allTabActive: true,
      allSearch: true,
      time: '',
      pageNumber: 0,
      pageSize: 10,
      totalSize: 0,
      // 模糊查询的值
      sKey: '',
      label: (h) => {
        return h('div', [
          h('span', '待处理'),
          h('Badge', {
            props: {
              count: 3
            }
          })
        ])
      },
      modal1: false,
      // 列表项
      columns12: [
        {
          title: '姓名',
          key: 'patName'
        },
        {
          title: '病历号',
          key: 'patNumber'
        },
        {
          title: '患者科室',
          key: 'deptName'
        },
        {
          title: '事件类型',
          key: 'eventType'
        },
        {
          title: '事件等级',
          key: 'eventLevel'
        },
        {
          title: '事件状态',
          key: 'eventStatus',
          render: (h, params) => {
            return h('p', params.row.eventStatus === 1 ? '已结案' : '待结案')
          }
        },
        {
          title: '上报时间',
          key: 'createTime'
        },
        {
          title: '操作',
          slot: 'action',
          width: 180,
          align: 'center'
        }
      ],
      // 渲染数据
      data6: [
        {
          patName: '欧阳张三',
          patNumber: 'kmyg12138',
          deptName: '科室',
          eventType: '事件类型',
          eventLevel: '事件等级',
          eventStatus: '事件状态',
          createTime: '2019-7-26 10:44'
        }
      ]
    }
  },
  mounted () {
    // 初始化基础数据
    this.searchKey(0)
  },
  methods: {
    downloadExcel () {
      this.modal1 = false
      let time = this.time
      let startTime = ''
      let endTime = ''
      if (time.indexOf(',') > -1) {
        let arr = time.split(',')
        startTime = arr[0]
        endTime = arr[1]
      }
        let baseUrl = process.env.NODE_ENV === 'development' ? this.$config.baseUrl.dev : this.$config.baseUrl.pro
      axios.get(baseUrl + `eventInfo/exportExcel`, {
        params: {
          startTime: startTime,
          endTime: endTime
        },
        responseType: `arraybuffer`
      }).then(res => {
        if (res.status === 200) {
          let blob = new Blob([res.data], {
            type: `application/vnd.ms-excel`
          })
          let objectUrl = URL.createObjectURL(blob)
          let link = document.createElement('a')
          let fname = '不良事件列表' + `.xls`
          link.href = objectUrl
          // link.setAttribute("download", fname);
          link.download = fname
          document.body.appendChild(link)
          link.click()
        } else {
          alert('导出excel失败')
        }
      })
    },
    openModal () {
      this.modal1 = true
    },
    allTabClick (index) {
      if (index === 1) {
        this.allSearch = true
        this.allscreen = false
        this.allTabActive = true
        this.allTabActive2 = false
      } else {
        this.allSearch = false
        this.allscreen = true
        this.allTabActive = false
        this.allTabActive2 = true
      }
    },
    goDispose () {
      this.$router.push('addDispose')
    },
    addNewReport () {
      this.$router.push('addReport')
    },
    // 事件详情点击
    show (eventId) {
      if (eventId != null && eventId.length > 0) {
        // this.$router.push({name:'reportAll',params:{eventId:eventId}});
        this.$router.push({ path: '/reportAll', query: { eventId: eventId } })
      }
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
    // 日期选择
    timeSearch (e) {
      this.time = e.toString()
    },
    // 页码切换
    pageChange (page) {
      let pageNumber = page - 1
      this.searchKey(pageNumber)
    },
    // 模糊搜索
    searchKey (pageNumber) {
      let reequest = {
        key: this.sKey,
        pageNumber: pageNumber,
        pageSize: this.pageSize
      }
      this.axios.get('eventInfo/searchByKey', { params: reequest }).then((res) => {
        if (res.data.code === 0) {
          this.data6 = res.data.data.content
          this.totalSize = res.data.data.totalElements
        } else {
          this.data6 = []
        }
      }).catch((e) => {
        console.log(e)
      })
    }

  }
}
</script>

<style scoped>
  .allTabActive{
    background-color: #2d8cf0;
    border-color: #2d8cf0;
    color: #ffffff;
  }
  .allLine{
    height: 1px;
    background-color: #dcdee2;
    width: 100%;
    margin-top: 15px;
    margin-bottom: 15px;
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
