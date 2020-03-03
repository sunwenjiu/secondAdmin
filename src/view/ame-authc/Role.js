import * as $ from 'jquery'

export default {
  data () {
    return {
      flag: true,
      // 功能列表
      columnName: [
        {
          title: '序号',
          key: 'Number',
          width: 80,
          render: (h, params) => {
            return h('div', [
              h('strong', params.index + 1)
            ])
          }
        },
        {
          title: '角色名',
          key: 'roleName'
        },
        {
          title: 'Code',
          key: 'roleCode'
        },
        {
          title: '描述',
          key: 'roleDescription'
        },
        {
          title: '创建时间',
          key: 'createTime',
          render: (h, params) => {
            return h('p', this.xdate.format(params.row.createTime, 'yyyy-MM-dd HH:mm:ss'))
          },
          sortable: true
        },
        {
          title: '修改时间',
          key: 'updateTime',
          render: (h, params) => {
            return h('p', this.xdate.format(params.row.updateTime, 'yyyy-MM-dd HH:mm:ss'))
          },
          sortable: true
        },
        {
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
                    this.flag = true
                    this.roleObject = $.extend(true, {}, params.row)
                    this.addRoleModal = true
                    this.modalTitle = '编辑角色'
                  }
                }
              }, '编辑'))
            }
            if (this.accessUpdate) {
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
                    this.flag = true
                    this.roleObject = $.extend(true, {}, params.row)
                    this.modalTitle = '编辑角色'
                    this.assignPermission()
                  }
                }
              }, '分配权限'))
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
                    this.roleObject = $.extend(true, {}, params.row)
                    this.delRoleModal = true
                  }
                }
              }, '删除'))
            }
            return h('div', actions)
          }
        }
      ],
      // 权限列表
      permissionColumns: [{
        title: '序号',
        type: 'index',
        width: 60,
        align: 'center',
        key: 'id'
      },
      {
        title: '权限名称',
        key: 'name'
      },
      {
        title: '权限编码',
        key: 'code'
      }, {
        title: '状态',
        width: 50,
        fixed: 'right',
        align: 'center',
        render: (h, params) => {
          return h('div', [h('Checkbox', {
            props: {
              value: params.row.status
            },
            on: {
              'on-change': () => {
                params.row.status = event.target.checked
                this.changePermission(params.row)
              }
            }
          })])
        }
      }
      ],
      roleObject: {
        roleId: '',
        roleName: '',
        roleCode: '',
        roleDescription: ''
      },
      roleData: [], // 角色数据
      permissionData: [], // 权限数据
      treeData: [], // 功能列表树
      pageNum: 1, // 起始页
      pageSize: 10, // 每页显示的条目数
      totalPages: 10, // 手术列表总页数，默认1页
      addRoleModal: false,
      delRoleModal: false,
      permissionModal: false,
      modalTitle: '',
      roleRules: {
        roleName: [{
          required: true,
          message: '请填写角色名称',
          trigger: 'blur'
        }],
        roleCode: [{
          required: true,
          message: '请填写Code',
          trigger: 'blur'
        }]
      }
    }
  },
  computed: {
    access () {
      return this.$store.state.user.access
    },
    accessAdd () {
      return this.hasOneOf(['role:add'], this.access)
    },
    accessDelete () {
      return this.hasOneOf(['role:delete'], this.access)
    },
    accessUpdate () {
      return this.hasOneOf(['role:update'], this.access)
    },
    accessView () {
      return this.hasOneOf(['role:view'], this.access)
    }
  },
  mounted () {
    this.roleList(this.pageNum)
  },
  methods: {
    ok () {
    },
    cancel () {
      this.addRoleModal = false
      this.$refs['roleObject'].resetFields()
    },
    // 角色列表，打开页面自动加载
    roleList (pageNum) {
      this.pageNum = pageNum
      let url = 'role/findAll?pno=' + (pageNum - 1) + '&size=' + this.pageSize
      this.axios.get(url).then((res) => {
        if (res.data.code === 0) {
          this.roleData = res.data.data.content
          this.totalPages = res.data.data.totalPages * 10
        } else {
          this.roleData = []
        }
      })
    },
    // 添加角色按钮
    addRoleButton () {
      this.addRoleModal = true
      this.flag = true
      this.modalTitle = '添加角色'
      this.roleObject = {
        roleId: '',
        roleName: '',
        roleCode: '',
        roleDescription: ''
      }
    },
    // 添加编辑角色
    addRole () {
      this.$refs['roleObject'].validate((valid) => {
        if (valid) {
          if (this.flag === true) {
            this.axios.post('role/save', this.roleObject).then((response) => {
              if (response.data.code === 0) {
                this.$Notice.success({
                  title: '提示信息',
                  desc: '添加或编辑成功!'
                })
                this.flag = false
                this.addRoleModal = false
                this.roleList(this.pageNum)
              } else {
                this.$Notice.error({
                  title: '提示信息',
                  desc: response.data.msg
                })
              }
            })
          }
        }
      })
    },
    // 分配权限
    assignPermission () {
      this.permissionData = []
      this.axios.get('/resource/tree/0').then(res => {
        let root = {
          id: '0',
          title: '功能列表',
          expand: true
        }
        if (res.data.code === 0) {
          root.children = res.data.data
          this.treeData = []
          this.treeData.push(root)
        }
      })
      this.permissionModal = true
    },
    // 删除角色
    delRole () {
      let url = 'role/delete?roleId=' + this.roleObject.roleId
      this.axios.get(url).then((res) => {
        if (res.data.code === 0) {
          this.$Notice.success({
            title: '提示信息',
            desc: '删除成功! '
          })
          if (this.pageNum > 1 &&
                        this.pageNum * 10 === this.totalPages &&
                        this.roleData.length === 1) {
            this.roleList(this.pageNum - 1)
          } else {
            this.roleList(this.pageNum)
          }
        } else {
          this.$Notice.error({
            title: '提示信息',
            desc: res.data.msg
          })
        }
      })
    },
    // 选择菜单后加载权限
    selectNode (selectNodes) {
      if (selectNodes.length < 1) {
        this.permissionData = []
        return false
      }
      this.selectNodes = selectNodes
      this.axios.get('/permission/list/role/resource/' + this.roleObject.roleId + '/' + this.selectNodes[0].id).then(res => {
        if (res.data.code === 0) {
          this.permissionData = res.data.data
        }
      })
    },
    // 选择权限后自动提交
    changePermission (row) {
      let requestObj = {
        status: row.status,
        role: this.roleObject,
        permission: {
          perId: row.id,
          perName: row.name,
          perCode: row.code
        }
      }
      this.axios.post('/permission/change/role', requestObj).then(res => {
        if (res.data.code === 0) {
          this.$Notice.success({
            title: '成功',
            desc: res.data.msg
          })
        } else {
          this.$Notice.error({
            title: '错误',
            desc: res.data.msg
          })
        }
      })
    }

  }
}
