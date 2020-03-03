<template>
  <div>
    <Modal
      v-model="modal1"
      title="添加层级"
      @on-ok="ok"
      :loading="create_loading"
      @on-cancel="cancel">
      <div>
        <Form ref="userAddFormItem" :model="userAddFormItem" :rules="ruleUserAddFormItem" :label-width="80">
          <FormItem label="事件原因" prop="name">
            <Input v-model="userAddFormItem.name" style="width: 250px" placeholder="请输入事件原因名称"></Input>
          </FormItem>
          <FormItem label="描述" prop="textarea">
            <Input v-model="userAddFormItem.textarea" type="textarea" :autosize="{minRows: 2,maxRows: 5}" placeholder="请输入事件原因描述"></Input>
          </FormItem>

        </Form>
      </div>
    </Modal>
    <Modal
      v-model="modify_modal1"
      title="修改信息"
      @on-ok="asyncOK"
      :loading="modify_loading"
      @on-cancel="cancel">
      <div>
        <Form ref="modify_userAddFormItem" :model="userAddFormItem" :rules="ruleUserAddFormItem" :label-width="80">
          <FormItem label="事件原因" prop="name">
            <Input v-model="userAddFormItem.name" disabled style="width: 250px" placeholder="请输入事件原因名称"></Input>
          </FormItem>
          <FormItem label="描述" prop="textarea">
            <Input v-model="userAddFormItem.textarea" type="textarea" :autosize="{minRows: 2,maxRows: 5}" placeholder="请输入事件原因描述"></Input>
          </FormItem>

        </Form>
      </div>
    </Modal>
    <Card >
      <p slot="title">事件原因设置</p>
      <Row :gutter="16">
        <Col span="12">
        <Button style="margin-bottom: 8px"  size="small" type="primary" icon="md-add-circle" @click="append(0)">添加最高父级</Button>
        <Tree :data="data5" :render="renderContent"></Tree>
        </Col>
        <Col span="6">
        <Card style="width:350px" dis-hover>
          <p slot="title">
            <Icon type="ios-list-box" />
            操作说明
          </p>
          <ul  class="dispose-explain-list">
            <li>选中当中一个节点，点击添加按钮，添加的是它的子节点。</li>
            <li>选中当中一个节点，点击添加按钮，添加的是它的子节点。</li>
          </ul>
        </Card>
        </Col>
      </Row>
    </Card>
  </div>
</template>

<script>
export default {
  data () {
    const validateName = (rule, value, callback) => {
      if (!value) {
        return callback(new Error('事件原因名称不能为空'))
      }
      if (!isNaN(value)) {
        callback(new Error('请输入正确事件原因名字!'))
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
      backGround: [],
      create_loading: true,
      modify_loading: true,
      value5: '',
      modal1: false,
      modify_modal1: false,
      data5: [],
      buttonProps: {
        type: 'default',
        size: 'small'
      },
      userAddFormItem: {
        eventReasonTreeId: '',
        name: '',
        textarea: '',
        nameAgin: '',
        parentId: ''

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

      }
    }
  },
  mounted () {
    this.geteventReasonTreeDataFromService()
  },
  methods: {
    // 清除用户数据
    clearUserAddFormItem () {
      this.userAddFormItem = {
        eventReasonTreeId: '',
        name: '',
        textarea: '',
        nameAgin: '',
        parentId: ''

      }
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
    // 获取后台数据
    geteventReasonTreeDataFromService () {
      this.axios.get('/eventReasonTree/show').then((response) => {
        const result = response.data
        this.data5 = result.data
      }).catch((error) => {
        alert(error.message)
      })
    },
    /* addTree () {
          this.modal1 = true
        }, */
    handleEnter (data, rootLength, nodeKey) {
      // 循环给到 背景颜色
      for (let i = 0; i < rootLength; i++) {
        this.backGround.push('#FFFFFF')
      }

      if (data) {
        // alert(this.backGround.length)
        this.backGround[nodeKey] = '#F5F5F5'
      } else {
        this.backGround[nodeKey] = '#FFFFFF'
      }
    },
    renderContent (h, { root, node, data }) {
      // let backGround=""
      /*    if (node.nodeKey%2 ===0){
            backGround="#F5F5F5"
          }else {
                    backGround="#DCDCDC"
          } */
      return h('span', {
        style: {
          display: 'inline-block',
          width: '100%',
          backgroundColor: this.backGround[node.nodeKey]
        },
        on: {
          mouseenter: () => { this.handleEnter(true, root.length, node.nodeKey) },
          mouseleave: () => { this.handleEnter(false, root.length, node.nodeKey) }
        }
      }, [
        /* h('span', [
              h('Icon', {
                props: {
                  type: 'ios-paper-outline'
                },
                style: {
                  marginRight: '8px'
                }
              }),
              h('span', data.title)
            ]), */

        h('span', [
          h('Icon', {
            props: {
              type: 'ios-paper-outline'
            },
            style: {
              marginRight: '8px'
            }
          }),

          h('Poptip', {
            props: {
              trigger: 'hover',
              placement: 'right',
              [`word-wrap`]: true,
              width: '200',
              content: data.desc
            }
          },
          data.title
          )
        ]),
        h('span', {
          style: {
            display: 'inline-block',
            float: 'right',
            marginRight: '32px'
          }
        }, [
          h('Button', {
            props: Object.assign({}, this.buttonProps, {
              icon: 'ios-add'
            }),
            style: {
              marginRight: '8px',
              display: (data.parentId === '0') ? 'inline-block' : 'none'
            },
            on: {
              click: () => { this.append(data) }
            }
          }),
          h('Button', {
            props: Object.assign({}, this.buttonProps, {
              icon: 'md-create'
            }),
            style: {
              marginRight: '8px'
            },
            on: {
              click: () => { this.modify(data) }
            }
          }),
          h('Button', {
            props: Object.assign({}, this.buttonProps, {
              icon: 'ios-remove'
            }),
            on: {
              click: () => { this.remove(root, node, data) }
            }
          })
        ])
      ])
    },
    modify (data) {
      // alert("进入修改")
      this.modify_modal1 = true
      this.userAddFormItem.name = data.title
      this.userAddFormItem.textarea = data.desc
      this.userAddFormItem.eventReasonTreeId = data.id
    },
    append (data) {
      if (data === 0) {
        // 添加最高父级
        this.userAddFormItem.parentId = 0
      } else {
        // 添加子级的数据
        // alert(data.id)
        // console.log(data)
        this.userAddFormItem.parentId = data.id
      }
      this.modal1 = true

      /* const children = data.children || []
          children.push({
            title: 'appended node',
            expand: true
          })
          this.$set(data, 'children', children) */
    },
    remove (root, node, data) {
      if (window.confirm(`确认删除-${data.title}-吗？请注意:该操作会将该层级中的所有子级全部删数。`)) {
        let id = {
          id: data.id
        }

        this.axios.get('/eventReasonTree/delAll/', { params: id })
          .then((response) => {
            this.geteventReasonTreeDataFromService()
            if (response.data.code !== 0) {
              this.$Message.info({
                content: response.data.msg,
                duration: 10,
                closable: true
              })
            }
          })
          .catch((error) => {
            alert(error.message)
            console.log(error)
          })
      }
      /* const parentKey = root.find(el => el === node).parent
          const parent = root.find(el => el.nodeKey === parentKey).node
          const index = parent.children.indexOf(data)
          parent.children.splice(index, 1) */
    },
    asyncOK () {
      this.$refs.modify_userAddFormItem.validate(valid => {
        if (valid) {
          this.axios.post('/eventReasonTree/update', {
            eventReasonTreeId: this.userAddFormItem.eventReasonTreeId,
            name: this.userAddFormItem.name,
            eventReasonTreeDescribe: this.userAddFormItem.textarea

          }).then((response) => {
            const result = response.data
            const state = result.code

            if (state !== 0) {
              this.userAddFormItem.nameAgin = result.msg

              this.$refs.modify_userAddFormItem.validateField('name')
              /* 如果名字重复，会执行下面代码 */
              if (this.userAddFormItem.nameAgin) {
                this.clearLoading()
              }
              this.userAddFormItem.nameAgin = ''
            } else {
              this.clearUserAddFormItem()
              this.modify_modal1 = false
              // location.reload()
              this.geteventReasonTreeDataFromService()
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
          // alert("进入请求")
          this.axios.post('/eventReasonTree/create', {
            name: this.userAddFormItem.name,
            eventReasonTreeDescribe: this.userAddFormItem.textarea,
            parentId: this.userAddFormItem.parentId

          }).then((response) => {
            const result = response.data
            const state = result.code
            if (state !== 0) {
              this.userAddFormItem.nameAgin = result.msg

              this.$refs.userAddFormItem.validateField('name')
              /* 如果事件原因、事件原因名字重复，会执行下面代码 */
              if (this.userAddFormItem.nameAgin) {
                this.clearLoading()
              }
              this.userAddFormItem.nameAgin = ''
            } else {
              this.clearUserAddFormItem()
              this.modal1 = false
              // location.reload()
              this.geteventReasonTreeDataFromService()
            }
          }).catch((error) => {
            alert('请求失败' + error.message)
            this.clearLoading()
          })
        } else {
          // this.$Message.error('创建外失败A外')
          this.clearLoading()
          // alert("没发送请求")
        }
      })
    },
    cancel () {
      this.$Message.info('取消了操作')
      this.$refs.userAddFormItem.resetFields()
    }
  }
}
</script>

<style scoped>
  .type-modal-title{
    margin-top: 12px;
    margin-bottom: 6px;
  }
  .dispose-explain-list li{
    font-size: 12px;
  }
  .dispose-explain-list{
    margin-left: 12px
  }
</style>
