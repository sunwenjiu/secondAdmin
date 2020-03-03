<template>
  <div>
    <Card class="irms-title-ctr-style">
      <div slot="title" class="irms-title-style">
        <Icon type="ios-list"></Icon>
        流程列表
      </div>
      <Button type="primary" icon="plus" @click="addModel" style="width: 200px;margin: 15px 0;">新建流程模型</Button>
      <div>
        <Table border stripe :columns="columns3" :data="flowDataList"></Table>
      </div>
      <div style="text-align: center;margin-top: 20px" v-if="totalSize !== 0">
        <Page :total="totalSize" show-elevator @on-change="pageChange"></Page>
      </div>
    </Card>
  </div>
</template>

<script>
export default {
  name: 'adverse-desginList',
  data () {
    return {
      // 列表项
      columns3: [
        {
          title: '序号',
          type: 'index',
          width: 100,
          align: 'center'
        },
        {
          title: '模型名称',
          key: 'name'
        },
        {
          title: 'key名称',
          key: 'key'
        },
        {
          title: '部署ID',
          key: 'deploymentId'
        },
        {
          title: '创建时间',
          key: 'createTime'
        },
        {
          title: '部署状态',
          key: 'deploymentstatus'
        },
        {
          title: '操作',
          key: 'action',
          width: 250,
          align: 'center',
          render: (h, params) => {
            let arr = []
            arr.push(h('Button', {
              props: {
                type: 'primary',
                size: 'small'
              },
              style: {
                marginRight: '8px'
              },
              on: {
                click: () => {
                  let modelId = params.row.id
                  this.updateModel(modelId)
                }
              }
            }, '编辑'))
            arr.push(h('Button', {
              props: {
                type: 'error',
                size: 'small'
              },
              style: {
                marginRight: '8px'
              },
              on: {
                click: () => {
                  let modelId = params.row.id
                  this.showDeleteModel(modelId)
                }
              }
            }, '删除'))
            if (params.row.deploymentstatus === '未部署') {
              arr.push(h('Button', {
                props: {
                  type: 'success',
                  size: 'small'
                },
                on: {
                  click: () => {
                    let modelId = params.row.id
                    this.pushModel(modelId)
                  }
                }
              }, '部署'))
            }
            return h('div', arr)
          }
        }
      ],
      // 渲染数据
      flowDataList: [
        {
          name: 'John Brown',
          key: 18,
          deploymentId: '2016-10-03',
          createTime: '2016-10-03',
          deploymentstatus: '未部署'
        }
      ],
      // 总页数
      totalSize: 0,
      formItem: {
        input: '',
        select: '',
        radio: 'male',
        checkbox: [],
        switch: true,
        date: '',
        time: '',
        slider: [20, 50],
        textarea: ''
      },
      // 流程图弹窗
      showActivitiModel: false,
      // 流程图地址
      activitiImageUrl: ''
    }
  },
  mounted () {
    this.loadData(0)
  },
  methods: {
    // 初始化数据
    loadData (pageNumber) {
      let requestBody = {
        pageNumber: pageNumber,
        pageSize: 10
      }
      this.axios.post('/activiti/activitiModelList', requestBody).then((res) => {
        if (res.data.code === 0) {
          this.flowDataList = res.data.data
          this.totalSize = res.data.totalElements
        } else {
          this.flowDataList = []
          this.totalSize = 0
        }
      }).catch((e) => {
        console.log(e)
      })
    },
    // 页码切换
    pageChange (page) {
      let pageNumber = page - 1
      this.loadData(pageNumber)
    },
    // 创建流程模型
    addModel () {
      this.$router.push({ path: '/ame_desgin_add' })
    },
    // 编辑流程模型
    updateModel (modelId) {
      this.$router.push({ path: '/ame_desgin_update', query: { modelId: modelId } })
    },
    // 删除流程模型弹窗
    showDeleteModel(modelId){
      this.$Modal.confirm({
        title: '流程流程模型警告提示',
        content: '删除流程模型会将部署的流程一并删除，请慎重操作！',
        onOk: () => {
          this.deleteModel(modelId);
        },
        onCancel: () => {
          this.$Message.info('取消删除流程模型');
        }
      });
    },
    // 删除流程模型
    deleteModel (modelId) {
      this.axios.get('/activiti/deleteModel/' + modelId).then((res) => {
        if (res.data.code === 0) {
          this.loadData(0)
        }
      }).catch((e) => {
        console.log(e)
      })
    },
    // 部署流程模型
    pushModel (modelId) {
      this.axios.get('/activiti/deploymentModel/' + modelId).then((res) => {
        if (res.data.code === 0) {
          this.loadData(0)
        }
      }).catch((e) => {
        console.log(e)
      })
    }
  }
}
</script>

<style scoped>
  .filter-box .ivu-form-item {
    margin-bottom: 10px;
  }

  .filter-box {
    background-color: #ecf1f5;
    margin: 15px 0;
    padding: 10px;
  }

  .irms-title-style {
    background-color: #495060;
    height: 30px;
    line-height: 30px;
    border-radius: 4px 4px 0 0;
    color: #ffffff;
    padding-left: 15px;
  }

  .irms-title-ctr-style .ivu-card-head {
    padding: 0 !important;
  }
  .masking-img-box img {
    width: 100%;
  }
</style>
