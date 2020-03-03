<template>
  <Card>
    <Modal
      v-model="modal1"
      title="不良事件上报信息"
      @on-ok="ok"
      width="900"
      @on-cancel="cancel">
      <div>
        <ul class="report-list">
          <li class="report-list-md reportListWidth">
            <p><span>患者姓名:</span>欧阳张三</p>
          </li>
          <li class="report-list-md reportListWidth">
            <p><span>患者病案号:</span>kmyg12138</p>
          </li>
          <li class="report-list-md reportListWidth">
            <p><span>患者生日:</span>2019-07-28</p>
          </li>
          <li class="report-list-md reportListWidth">
            <p><span>患者性别:</span>男</p>
          </li>
          <li class="report-list-md reportListWidth">
            <p><span>患者科室:</span>这里是一个科室的名字</p>
          </li>
          <li class="report-list-md reportListWidth">
            <p><span>事件发生场所:</span>事件发生的场所</p>
          </li>
          <li class="report-list-md reportListWidth">
            <p><span>事件类型:</span>这里是事件类型的名字</p>
          </li>
          <li class="report-list-md reportListWidth">
            <p><span>填报人类型:</span>医生</p>
          </li>
          <li class="report-list-md reportListWidthS">
            <p><span>填报人部门:</span>这里是一个名字很长的部门</p>
          </li>
          <li class="report-list-md reportListWidthS">
            <p><span>填报人病区:</span>这里是一个名字很长的病区</p>
          </li>
        </ul>
        <div class="report-list-line"></div>
        <ul class="report-list">
          <li class="report-list-md">
            <p class="reportListLine"><span>临床诊断:</span>中国空军新闻发言人申进科上校14日早间表示，中国空军13日组织多批战机起飞，对向中国边境抵近飞行的缅甸军机进行跟踪、监视、警告、外逼。申进科上校说，中国空军常年保持高度戒备，严密监视空中动态，近一时期重点加强了中缅边境地区空情监控。申进科上校指出，中国空军将采取措施加强中缅边境空中应对行动，严密关注空情动态，维护国家领空主权。</p>
          </li>
          <li class="report-list-md">
            <p class="reportListLine"><span>事件描述:</span>中国空军新闻发言人申进科上校14日早间表示，中国空军13日组织多批战机起飞，对向中国边境抵近飞行的缅甸军机进行跟踪、监视、警告、外逼。申进科上校说，中国空军常年保持高度戒备，严密监视空中动态，近一时期重点加强了中缅边境地区空情监控。申进科上校指出，中国空军将采取措施加强中缅边境空中应对行动，严密关注空情动态，维护国家领空主权。</p>
          </li>
          <li class="report-list-md">
            <p class="reportListLine"><span>采取措施:</span>中国空军新闻发言人申进科上校14日早间表示，中国空军13日组织多批战机起飞，对向中国边境抵近飞行的缅甸军机进行跟踪、监视、警告、外逼。申进科上校说，中国空军常年保持高度戒备，严密监视空中动态，近一时期重点加强了中缅边境地区空情监控。申进科上校指出，中国空军将采取措施加强中缅边境空中应对行动，严密关注空情动态，维护国家领空主权。</p>
          </li>
          <li class="report-list-md">
            <p class="reportListLine"><span>事件处理情况:</span>中国空军新闻发言人申进科上校14日早间表示，中国空军13日组织多批战机起飞，对向中国边境抵近飞行的缅甸军机进行跟踪、监视、警告、外逼。申进科上校说，中国空军常年保持高度戒备，严密监视空中动态，近一时期重点加强了中缅边境地区空情监控。申进科上校指出，中国空军将采取措施加强中缅边境空中应对行动，严密关注空情动态，维护国家领空主权。</p>
          </li>
        </ul>
        <div class="report-list-line"></div>
        <ul class="report-list">
          <li class="report-list-md" style="width: 100%">
            <Collapse v-model="value1">
              <Panel name="1">
                主要原因：这里是原因名字
                <div slot="content">
                  <ul>
                    <li>这里是子原因这里是子原因这里是子原因</li>
                    <li>这里是子原因这里是子原因这里是子原因</li>
                    <li>这里是子原因这里是子原因这里是子原因</li>
                    <li>这里是子原因这里是子原因这里是子原因</li>
                  </ul>
                </div>
              </Panel>
              <Panel name="2">
                主要原因：这里是原因名字2
                <div slot="content">
                  <ul>
                    <li>这里是子原因这里是子原因这里是子原因</li>
                    <li>这里是子原因这里是子原因这里是子原因</li>
                    <li>这里是子原因这里是子原因这里是子原因</li>
                    <li>这里是子原因这里是子原因这里是子原因</li>
                  </ul>
                </div>
              </Panel>
              <Panel name="3">
                主要原因：这里是原因名字3
                <div slot="content">
                  <ul>
                    <li>这里是子原因这里是子原因这里是子原因</li>
                    <li>这里是子原因这里是子原因这里是子原因</li>
                    <li>这里是子原因这里是子原因这里是子原因</li>
                    <li>这里是子原因这里是子原因这里是子原因</li>
                  </ul>
                </div>

              </Panel>
            </Collapse>

          </li>
        </ul>
        <div class="report-list-line"></div>
        <ul class="report-list">
          <li class="report-list-md">
            <p><span>填报人姓名:</span>慕容李四</p>
          </li>
        </ul>
      </div>
    </Modal>
    <p slot="title">不良事件审核</p>
    <div >
      <Tabs type="card" value="name1" class="report-tab-style">
        <TabPane :label="label" name="name1">
          <Table border :columns="columns12" :data="data6" class="report-audit-table">
            <template slot-scope="{ row }" slot="name">
              <strong>{{ row.name }}</strong>
            </template>
            <template slot-scope="{ row, index }" slot="action">
              <Button type="primary" size="small" style="margin-right: 5px" @click="show(index)">详情</Button>
              <Button type="success" size="small" style="margin-right: 5px" @click="goDispose(index)">审核</Button>
            </template>
          </Table>
        </TabPane>
        <TabPane label="已审核" name="name2">
          <Table border :columns="columns12" :data="data6" class="report-audit-table">
            <template slot-scope="{ row }" slot="name">
              <strong>{{ row.name }}</strong>
            </template>
            <template slot-scope="{ row, index }" slot="action">
              <Button type="primary" size="small" style="margin-right: 5px" @click="show(index)">详情</Button>
            </template>
          </Table>
        </TabPane>
        <TabPane label="已驳回" name="name3">
          <Table border :columns="columns12" :data="data6" class="report-audit-table">
            <template slot-scope="{ row }" slot="name">
              <strong>{{ row.name }}</strong>
            </template>
            <template slot-scope="{ row, index }" slot="action">
              <Button type="primary" size="small" style="margin-right: 5px" @click="show(index)">详情</Button>
            </template>
          </Table>
        </TabPane>
      </Tabs>

    </div>
    <div class="pageStyle">
      <Page :total="100" show-elevator />
    </div>
  </Card>
</template>

<script>
export default {
  data () {
    return {
      label: (h) => {
        return h('div', [
          h('span', '待审核'),
          h('Badge', {
            props: {
              count: 3
            }
          })
        ])
      },
      modal1: false,
      columns12: [
        {
          title: '姓名',
          slot: 'name'
        },
        {
          title: '病历号',
          key: 'number'
        },
        {
          title: '事件类型',
          key: 'type'
        },
        {
          title: '事件状态',
          key: 'state'
        },
        {
          title: '上报时间',
          key: 'time'
        },
        {
          title: '操作',
          slot: 'action',
          width: 180,
          align: 'center'
        }
      ],
      data6: [
        {
          name: '欧阳张三',
          number: '0654768',
          type: '事件类型',
          state: '事件状态',
          time: '2019-7-26 10:44'
        }

      ]
    }
  },
  methods: {
    goDispose () {
      this.$router.push('addInform')
    },
    addNewReport () {
      this.$router.push('addReport')
    },
    show (index) {
      this.modal1 = true
      // this.$Modal.info({
      //   title: 'User Info',
      //   content: `Name：${this.data6[index].name}<br>Age：${this.data6[index].age}<br>Address：${this.data6[index].address}`
      // })
    },
    ok () {
      this.$Message.info('Clicked ok')
    },
    cancel () {
      this.$Message.info('Clicked cancel')
    },
    remove (index) {
      this.data6.splice(index, 1)
    }
  }
}
</script>

<style scoped>
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
