<template>
  <div>
    <!--科室添加-->
    <Modal
      v-model="gradeTableModal"
      title="科室添加"
      @on-ok="ok"
      width="400"
      :loading="create_loading"
      @on-cancel="cancel_create">
      <div>
        <Form ref="userAddFormItem" :model="userAddFormItem" :rules="ruleUserAddFormItem" :label-width="80">
          <FormItem label="科室" prop="name">
            <Input v-model="userAddFormItem.name" style="width: 250px" placeholder="请输入科室名称"></Input>
          </FormItem>
          <FormItem label="描述" prop="textarea">
            <Input v-model="userAddFormItem.textarea" type="textarea" :autosize="{minRows: 2,maxRows: 5}" placeholder="请输入科室描述"></Input>
          </FormItem>

        </Form>
      </div>
    </Modal>
    <Modal
      v-model="modify_modal6"
      title="信息修改"
      ok-text="确认修改"
      :loading="modify_loading"
      @on-ok="asyncOK"
      @on-cancel="cancel">
      <div>
        <Form ref="modify_userAddFormItem" :model="userAddFormItem" :rules="ruleUserAddFormItem" :label-width="80">
          <FormItem label="科室" prop="name">
            <Input v-model="userAddFormItem.name" style="width: 250px" placeholder="请输入科室名称"></Input>
          </FormItem>
          <FormItem label="描述" prop="textarea">
            <Input v-model="userAddFormItem.textarea" type="textarea" :autosize="{minRows: 2,maxRows: 5}" placeholder="请输入科室描述"></Input>
          </FormItem>

        </Form>
      </div>

    </Modal>
    <Card shadow title="科室管理">
      <div class="userTable-title-btn">
        <Button type="primary" icon="md-person-add" @click="addClick">添加</Button>
        <Button type="error" style="margin-left: 5px" v-show="showDelAll" @click="delAllByIds">多选删除</Button>
      </div>
      <div>
        <Table ref="selection"  :loading="loading" border :columns="userTable" :data="userData" @on-selection-change="changeShowDelAll()"></Table>
      </div>
      <div class="pageStyle">
           <Page :total="pageTotal" :current="pageNum" :page-size="pageSize" show-elevator show-sizer @on-change="handlePage" @on-page-size-change='handlePageSize'/>
      </div>
    </Card>

  </div>
</template>

<script>
// import qs from 'qs'
// var deptName = /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/
export default {
  name: 'adverse-desk',
  data () {
    const validateName = (rule, value, callback) => {
      if (!value) {
        return callback(new Error('部门名称不能为空'))
      }
      if (!isNaN(value)) {
        callback(new Error('请输入正确部门名字!'))
      } else if (value.length < 1 || value.length > 32) {
        callback(new Error('请输入1到32个字符!'))
      } else if (this.userAddFormItem.nameAgin) {
        callback(new Error(this.userAddFormItem.nameAgin))
      } else {
        callback()
      }
    }
    const validateTextarea = (rule, value, callback) => {
      if (!value) {
        return callback(new Error('描述不能为空'))
      }
      if (value.length < 1 || value.length > 100) {
        callback(new Error('请输入1到100个字符!'))
      } else {
        callback()
      }
    }

    return {
      loading: true,
      showDelAll: false,
      allIdData: [],
      pageTotal: 0,
      pageNum: 1,
      pageSize: 10,
      gradeTableModal: false,
      modify_modal6: false,
      modify_loading: true,
      create_loading: true,
      userAddFormItem: {
        deptId: '',
        name: '',
        textarea: '',
        nameAgin: ''

      },
      ruleUserAddFormItem: {
        name: [
          {
            validator: validateName,
            trigger: 'blur'
          }
        ],
        textarea: [
          { validator: validateTextarea,
            trigger: 'blur' }
        ]

      },
      userTable: [
        {
          type: 'selection',
          width: 60,
          align: 'center'
        },
        {
          title: '序号',
          type: 'index',
          width: 65,
          align: 'center'
        },
        {
          title: '部门',
          key: 'name'
        },
        {
          title: '描述',
          key: 'deptDescribe'
        },
        {
          title: '操作',
          key: 'action',
          width: 150,
          align: 'center',
          render: (h, params) => {
            return h('div', [
              h('Button', {
                props: {
                  type: 'info',
                  size: 'small'
                },
                style: {
                  marginRight: '5px'
                },
                on: {
                  click: () => {
                    this.modify_show(params.index)
                  }
                }
              }, '修改'),
              h('Button', {
                props: {
                  type: 'error',
                  size: 'small'
                },
                on: {
                  click: () => {
                    this.modify_remove(params.index)
                  }
                }
              }, '删除')
            ])
          }
        }
      ],
      userData: [ ]
    }
  },
  mounted () {
    this.getDeptDataFromService()
  },
  methods: {
    /* 多选、全选时删除 */
    delAllByIds () {
      // 封装id
      // 获取多选数据
      const allData = this.$refs.selection.getSelection()
      for (let i = 0; i < allData.length; i++) {
        this.allIdData.push(allData[i].deptId)
      }
      // 发送请求
      if (window.confirm(`确认删除多选吗？`)) {
        const { allIdData } = this
        let str = ''
        for (let i = 0; i < allIdData.length; i++) {
          if (i === allIdData.length - 1) {
            str += allIdData[i]
          } else {
            str += allIdData[i] + ','
          }
        }
        let goDelData = {
          ids: str
        }
        this.axios.get('/dept/delAll', {
          params: goDelData
        })
          .then((response) => {
            this.getDeptDataFromService()
            this.allIdData = []
            this.showDelAll = false
          })
          .catch((error) => {
            alert(error.message)
            console.log(error)
          })
      }
    },
    /* 改变是否显示多选删除 */
    changeShowDelAll () {
      // console.log(this.$refs.selection.getSelection());
      this.showDelAll = this.$refs.selection.getSelection().length !== 0
    },

    clearLoading () {
      /* 清除loading状态 */
      this.modify_loading = false
      this.$nextTick(() => {
        this.modify_loading = true
      })

      this.create_loading = false
      this.$nextTick(() => {
        this.create_loading = true
      })
    },
    clearUserAddFormItem () {
      this.userAddFormItem.nameAgin = ''
      this.userAddFormItem.name = ''
      this.userAddFormItem.textarea = ''
    },
    handlePage (value) {
      this.pageNum = value
      this.getDeptDataFromService()
    },
    handlePageSize (value) {
      this.pageSize = value
      this.getDeptDataFromService()
    },
    /* 向后台请求加载数据 */
    getDeptDataFromService () {
      this.showDelAll = false
      let page = {
        pageNo: this.pageNum - 1,
        pageSize: this.pageSize
      }

      this.axios.get('/dept/show', { params: page }).then((response) => {
        const result = response.data
        this.userData = result.data.content
        this.pageTotal = result.data.totalElements
        this.loading = false
      }).catch((error) => {
        alert(error.message)
      })
    },
    asyncOK () {
      this.$refs.modify_userAddFormItem.validate(valid => {
        if (valid) {
          this.axios.post('/dept/update', {
            deptId: this.userAddFormItem.deptId,
            name: this.userAddFormItem.name,
            deptDescribe: this.userAddFormItem.textarea

          }).then((response) => {
            const result = response.data
            const state = result.code

            if (state !== 200) {
              this.userAddFormItem.nameAgin = result.msg

              this.$refs.modify_userAddFormItem.validateField('name')
              /* 如果部门、科室名字重复，会执行下面代码 */
              if (this.userAddFormItem.nameAgin) {
                this.modify_loading = false
                this.$nextTick(() => {
                  this.modify_loading = true
                })
              }
              this.userAddFormItem.nameAgin = ''
            } else {
              this.clearUserAddFormItem()
              this.modify_modal6 = false
              // location.reload()
              this.getDeptDataFromService()
            }
          }).catch((error) => {
            alert('请求失败' + error.message)
            this.clearLoading()
          })
        } else {
          // this.$Message.error('创建外失败A外')
          this.clearLoading()
        }
      })
    },
    ok () {
      this.$refs.userAddFormItem.validate(valid => {
        if (valid) {
          this.axios.post('/dept/create', {
            name: this.userAddFormItem.name,
            deptDescribe: this.userAddFormItem.textarea

          }).then((response) => {
            const result = response.data
            const state = result.code
            if (state !== 200) {
              this.userAddFormItem.nameAgin = result.msg

              this.$refs.userAddFormItem.validateField('name')
              /* 如果部门、科室名字重复，会执行下面代码 */
              if (this.userAddFormItem.nameAgin) {
                this.clearLoading()
              }
              this.userAddFormItem.nameAgin = ''
            } else {
              this.clearUserAddFormItem()
              this.gradeTableModal = false
              // location.reload()
              this.getDeptDataFromService()
            }
          }).catch((error) => {
            alert('请求失败' + error.message)
            this.clearLoading()
          })
        } else {
          // this.$Message.error('创建外失败A外')
          this.clearLoading()
        }
      })
    },
    cancel () {
      this.$Message.info('取消了操作')
      this.$refs.modify_userAddFormItem.resetFields()
    },
    cancel_create () {
      this.$Message.info('取消了操作')
      this.$refs.userAddFormItem.resetFields()
    },
    addClick () {
      this.gradeTableModal = true
    },
    modify_show (index) {
      this.modify_modal6 = true
      this.userAddFormItem.name = this.userData[index].name
      this.userAddFormItem.textarea = this.userData[index].deptDescribe
      this.userAddFormItem.deptId = this.userData[index].deptId
    },
    modify_remove (index) {
      if (window.confirm(`确认删除${this.userData[index].name}吗？`)) {
        // axios.defaults.baseURL = '/api'
        this.axios.get('/dept/del/' + this.userData[index].deptId)
          .then((response) => {
            this.getDeptDataFromService()
          })
          .catch((error) => {
            alert(error.message)
            console.log(error)
          })
          // this.userData.splice(index, 1)
      }
    }
  }
}
</script>

<style scoped>
  .userTable-title-btn{
    margin-bottom: 20px;
  }
</style>
