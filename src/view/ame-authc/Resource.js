import * as $ from 'jquery'

export default {
  data () {
    return {
      resourceModal: false,
      viewResourceModal: false,
      childrenModal: false,
      permissionModal: false,
      delResourceModal: false,
      delChildrenModal: false,
      delPermissionModal: false,
      iconChangeModal: false,
      pageNum: 1, // 起始页
      pageSize: 72, // 每页显示的条目数
      totalPages: 10, // 手术列表总页数，默认1页
      iconData: [], // 图标数据
      modalTitle: '',
      // 新增或编辑菜单对象
      resourceObject: {
        resCode: '',
        resName: '',
        resUrl: '',
        resIcon: '',
        resSort: '',
        parent: {}
      },
      // 新增或编辑子菜单对象
      childrenObject: {
        resCode: '',
        resName: '',
        resUrl: '',
        resIcon: '',
        resSort: '',
        parent: {}
      },
      // 新增或编辑权限对象
      permissionObject: {
        perCode: '',
        perName: '',
        perDescription: '',
        resource: {}
      },
      selections: [],
      selectNodes: [],
      ids: '',
      names: '',
      currentViewNode: {},
      // 菜单验证
      resourceValidate: {
        resCode: [{
          required: true,
          message: '请填写功能编码',
          trigger: 'blur'
        }],
        resName: [{
          required: true,
          message: '请填写功能名称',
          trigger: 'blur'
        }],
        resUrl: [{
          required: true,
          message: '请填写URL地址',
          trigger: 'blur'
        }],
        resSort: [{
          required: true,
          type: 'number',
          min: 1,
          max: 99,
          message: '请输1-99的数值！',
          trigger: 'blur'
        }]
      },
      // 子菜单验证
      childrenValidate: {
        resCode: [{
          required: true,
          message: '请填写功能编码',
          trigger: 'blur'
        }],
        resName: [{
          required: true,
          message: '请填写功能名称',
          trigger: 'blur'
        }],
        resUrl: [{
          required: true,
          message: '请填写URL地址',
          trigger: 'blur'
        }],
        resSort: [{
          required: true,
          type: 'number',
          min: 1,
          max: 99,
          message: '请输1-99的数值！',
          trigger: 'blur'
        }]
      },
      // 权限验证
      permissionValidate: {
        perCode: [{
          required: true,
          message: '请填写权限编码',
          trigger: 'blur'
        }],
        perName: [{
          required: true,
          message: '请填写权限名称',
          trigger: 'blur'
        }]
      },
      // 主菜单数据
      resourceData: [],
      // 子菜单树数据
      treeData: [],
      // 权限数据
      permissionData: [],
      // 主菜单列表
      resourceColumns: [
        {
          title: '序号',
          type: 'selection',
          width: 60,
          align: 'center',
          key: 'resId'
        },
        {
          title: '功能名称',
          key: 'resName'
        },
        {
          title: '功能编码',
          key: 'resCode'
        }, {
          title: 'URL地址',
          key: 'resUrl'
        }, {
          title: '排序',
          key: 'resSort'
        }, {
          title: '创建时间',
          key: 'createTime',
          render: (h, params) => {
            return h('p', this.xdate.format(params.row.createTime, 'yyyy-MM-dd HH:mm:ss'))
          },
          sortable: true
        }, {
          title: '修改时间',
          key: 'updateTime',
          render: (h, params) => {
            return h('p', this.xdate.format(params.row.updateTime, 'yyyy-MM-dd HH:mm:ss'))
          },
          sortable: true
        }, {
          title: '操作',
          key: 'action',
          align: 'center',
          width: 280,
          render: (h, params) => {
            let actions = []
            if (this.accessUpdate) {
              actions.push(h('Button', {
                props: {
                  type: 'primary',
                  size: 'small',
                  icon: 'edit'
                },
                style: {
                  marginRight: '10px'
                },
                on: {
                  click: () => {
                    this.resourceObject = $.extend(true, {}, params.row)
                    this.resourceObject.parent = {}
                    this.editResource()
                  }
                }
              }, '编辑'))
            }
            if (this.accessView) {
              actions.push(h('Button', {
                props: {
                  type: 'primary',
                  size: 'small',
                  icon: 'wrench'
                },
                style: {
                  marginRight: '10px'
                },
                on: {
                  click: () => {
                    this.viewResource(params.row)
                  }
                }
              }, '子级管理'))
            }
            if (this.accessDelete) {
              actions.push(h('Button', {
                props: {
                  type: 'error',
                  size: 'small',
                  icon: 'trash-b'
                },
                on: {
                  click: () => {
                    this.selections = []
                    this.selections.push(params.row)
                    this.deleteResource()
                  }
                }
              }, '删除'))
            }
            return h('div', actions)
          }
        }
      ],
      // 权限列表
      permissionColumns: [
        {
          title: '序号',
          type: 'index',
          width: 60,
          align: 'center',
          key: 'perId'
        },
        {
          title: '权限名称',
          key: 'perName'
        },
        {
          title: '权限编码',
          key: 'perCode'
        },
        {
          title: '权限描述',
          key: 'perDescription'
        },
        {
          title: '操作',
          key: 'action',
          align: 'center',
          width: 200,
          render: (h, params) => {
            let actions = []
            if (this.accessAdd) {
              actions.push(h('Button', {
                props: {
                  type: 'primary',
                  size: 'small',
                  icon: 'edit'
                },
                style: {
                  marginRight: '20px'
                },
                on: {
                  click: () => {
                    this.permissionObject = $.extend(true, {}, params.row)
                    this.editPermission()
                  }
                }
              }, '编辑'))
            }
            if (this.accessDelete) {
              actions.push(h('Button', {
                props: {
                  type: 'error',
                  size: 'small',
                  icon: 'trash-b'
                },
                on: {
                  click: () => {
                    this.deletePermission(params.row)
                  }
                }
              }, '删除'))
            }

            return h('div', actions)
          }
        }
      ]
    }
  },
  computed: {
    access () {
      return this.$store.state.user.access
    },
    accessAdd () {
      return this.hasOneOf(['resource:add'], this.access)
    },
    accessDelete () {
      return this.hasOneOf(['resource:delete'], this.access)
    },
    accessUpdate () {
      return this.hasOneOf(['resource:update'], this.access)
    },
    accessView () {
      return this.hasOneOf(['resource:view'], this.access)
    }
  },
  mounted () {
    this.list()
  },
  methods: {
    cancel () {
      this.childrenModal = false
      this.resourceModal = false
      this.permissionModal = false
      this.$refs['resourceObject'].resetFields()
      this.$refs['childrenObject'].resetFields()
      this.$refs['permissionObject'].resetFields()
    },
    // 初始化数据
    list () {
      this.axios.get('/resource/findAll').then(res => {
        if (res.data.code === 0) {
          this.resourceData = res.data.data
        }
      })
    },
    // 删除子菜单按钮
    delChildren () {
      if (this.selectNodes.length < 1) {
        this.$Notice.info({
          title: '提示',
          desc: '请至少选择一个节点！'
        })
        return false
      }
      if (this.selectNodes[0].children.length > 0) {
        this.$Notice.error({
          title: '错误',
          desc: '此权限中包含了子节点，请先删除子节点!'
        })
        return false
      }
      this.delChildrenModal = true
      this.names = this.selectNodes[0].title
    },
    // 删除子菜单提交
    delChildrenSubmit () {
      this.axios.post('/resource/delete/' + this.selectNodes[0].id).then(data => {
        if (data.data.code === 0) {
          this.axios.get('/resource/tree/' + this.currentViewNode.resId).then(data => {
            if (data.data.code === 0) {
              this.treeData = data.data.data
            }
          })
          this.$Notice.success({
            title: '成功',
            desc: data.data.msg
          })
          this.selectNodes = []
          this.permissionData = []
        }
      })
    },
    // 添加主菜单按钮
    addResource () {
      this.modalTitle = '添加功能'
      this.resourceObject = {
        resCode: '',
        resName: '',
        resUrl: '',
        resSort: '',
        resIcon: '',
        parent: {}
      }
      this.resourceModal = true
    },
    // 主菜单编辑按钮
    editResource () {
      this.modalTitle = '编辑功能'
      this.resourceModal = true
    },
    // 主菜单子级管理按钮
    viewResource (row) {
      this.modalTitle = '【 ' + row.resName + ' 】子功能管理'
      this.childrenObject = {
        resCode: '',
        resName: '',
        resUrl: '',
        resSort: '',
        resIcon: '',
        parent: {
          resId: row.resId
        }
      }
      this.permissionData = []
      this.selectNodes = []
      this.currentViewNode = row
      this.axios.get('/resource/tree/' + row.resId).then(data => {
        if (data.data.code === 0) {
          this.treeData = data.data.data
        }
      })
      this.viewResourceModal = true
    },
    // 选择的子菜单节点
    selectNode (selectNodes) {
      if (selectNodes.length < 1) {
        this.selectNodes = []
        this.permissionData = []
        return false
      }
      this.selectNodes = selectNodes
      this.axios.get('/permission/resource/' + this.selectNodes[0].id).then(data => {
        if (data.data.code === 0) {
          this.permissionData = data.data.data
        }
      })
    },
    // 添加子菜单按钮
    addChildren () {
      if (this.selectNodes.length < 1) {
        this.childrenObject = {
          resCode: '',
          resName: '',
          resUrl: '',
          resSort: '',
          resIcon: '',
          parent: {
            resId: this.currentViewNode.resId,
            resName: this.currentViewNode.resName
          }
        }
        this.childrenModal = true
      } else {
        this.childrenObject = {
          resCode: '',
          resName: '',
          resUrl: '',
          resSort: '',
          resIcon: '',
          parent: {
            resId: this.selectNodes[0].id,
            resName: this.selectNodes[0].title
          }
        }
        this.childrenModal = true
      }
    },
    // 编辑子菜单按钮
    editChildren () {
      if (this.selectNodes.length < 1) {
        this.$Notice.info({
          title: '提示',
          desc: '请选择一个节点才能编辑！'
        })
        return false
      }
      this.childrenObject = {
        resId: this.selectNodes[0].id,
        resCode: this.selectNodes[0].code,
        resName: this.selectNodes[0].title,
        resUrl: this.selectNodes[0].url,
        resSort: this.selectNodes[0].sort,
        resIcon: this.selectNodes[0].icon,
        parent: {
          resId: this.currentViewNode.resId,
          resName: this.currentViewNode.resName
        }
      }
      this.childrenModal = true
    },
    // 添加或编辑子菜单
    addEditChildren (name) {
      this.$refs[name].validate((valid) => {
        if (valid) {
          this.axios.post('/resource/save', this.childrenObject).then(data => {
            if (data.data.code === 0) {
              this.$Notice.success({
                title: '成功',
                desc: data.data.msg
              })
              this.childrenModal = false
              this.axios.get('/resource/tree/' + this.currentViewNode.resId).then(data => {
                if (data.data.code === 0) {
                  this.treeData = data.data.data
                }
              })
            } else {
              this.$Notice.error({
                title: '错误',
                desc: data.data.msg
              })
            }
          })
        }
      })
    },
    // 批量及单个删除主菜单的按钮
    deleteResource () {
      this.ids = ''
      this.names = ''
      if (this.selections.length < 1) {
        this.$Notice.info({
          title: '提示',
          desc: '请至少选择一条数据删除！'
        })
        return false
      }
      for (let i = 0; i < this.selections.length; i++) {
        if (i === this.selections.length - 1) {
          this.ids += this.selections[i].resId
          this.names += this.selections[i].resName
        } else {
          this.ids += this.selections[i].resId + ','
          this.names += this.selections[i].resName + ','
        }
      }
      this.delResourceModal = true
    },
    // 批量及单个删除主菜单提交
    deleteResourceSubmit () {
      this.axios.post('/resource/delete/' + this.ids).then(data => {
        if (data.data.code === 0) {
          this.list()
          this.$Notice.success({
            title: '成功',
            desc: data.data.msg
          })
        } else {
          this.$Notice.error({
            title: '失败',
            desc: data.data.msg
          })
        }
      })
    },
    // 删除权限按钮
    deletePermission (row) {
      this.delPermissionModal = true
      this.ids = row.perId
      this.names = row.perName
    },
    // 删除权限提交
    delPermissionSubmit () {
      this.axios.post('/permission/delete/' + this.ids).then(data => {
        if (data.data.code === 0) {
          this.axios.get('/permission/resource/' + this.selectNodes[0].id).then(data => {
            if (data.data.code === 0) {
              this.permissionData = data.data.data
            }
          })
          this.$Notice.success({
            title: '成功',
            desc: data.data.msg
          })
        } else {
          this.$Notice.error({
            title: '失败',
            desc: data.data.msg
          })
        }
      })
    },
    // 主菜单选中项发生变化时触发
    selectionChange (selections) {
      this.selections = selections
    },
    // 编辑权限
    editPermission () {
      this.modalTitle = '编辑权限'
      this.permissionModal = true
    },
    // 主菜单点击排序时触发
    sortChange (column) {
      this.queryParams.orders = [{
        order: column.key,
        sort: column.order
      }]
      this.list()
    },
    // 添加或编辑主菜单提交
    addEditResource (name) {
      this.$refs[name].validate((valid) => {
        if (valid) {
          this.axios.post('/resource/save', this.resourceObject).then(data => {
            if (data.data.code === 0) {
              this.$Notice.success({
                title: '成功',
                desc: data.data.msg
              })
              this.resourceModal = false
              this.list()
            } else {
              this.$Notice.error({
                title: '错误',
                desc: data.data.msg
              })
            }
          })
        }
      })
    },
    // 添加权限按钮
    addPermission () {
      if (this.selectNodes.length < 1) {
        this.$Notice.info({
          title: '提示',
          desc: '请至少选择一个节点！'
        })
        return false
      }
      this.permissionObject = {
        perCode: this.selectNodes[0].code + ':',
        perName: '',
        perDescription: '',
        resource: {
          resId: this.selectNodes[0].id
        }
      }
      this.modalTitle = '添加权限'
      this.permissionModal = true
    },
    // 添加或编辑权限提交
    addEditPermission (name) {
      this.$refs[name].validate((valid) => {
        if (valid) {
          this.axios.post('/permission/save', this.permissionObject).then(data => {
            if (data.data.code === 0) {
              this.$Notice.success({
                title: '成功',
                desc: data.data.msg
              })
              this.permissionModal = false
              this.axios.get('/permission/resource/' + this.selectNodes[0].id).then(data => {
                if (data.data.code === 0) {
                  this.permissionData = data.data.data
                }
              })
            } else {
              this.$Notice.error({
                title: '错误',
                desc: data.data.msg
              })
            }
          })
        }
      })
    },
    // 选择图标按钮
    iconChange () {
      this.iconList(this.pageNum)
      this.iconChangeModal = true
    },
    // 加载图标列表
    iconList (pageNum) {
      this.pageNum = pageNum
      let url = 'icon/findAll?&pno=' + (pageNum - 1) + '&size=' + this.pageSize
      this.axios.get(url).then((res) => {
        if (res.data.code === 0) {
          this.iconData = res.data.data.content
          this.totalPages = res.data.data.totalPages * 10
        } else {
          this.iconData = []
        }
      })
    },
    // 图标选中后方法
    iconChangeOk (code) {
      this.resourceObject.resIcon = code
      this.childrenObject.resIcon = code
      this.iconChangeModal = false
    }
  }
}
