import * as $ from 'jquery'

export default {
  data () {
    return {
      flag: true,
      // 用户列表
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
          title: '登录名',
          key: 'userName'
        },
        {
          title: '姓名',
          key: 'userRealName'
        },
        {
          title: '角色',
          key: 'role'
        },
        {
          title: '性别',
          key: 'userSex',
          render: (h, params) => {
            return h('p', params.row.userSex === 'MAN' ? '男' : params.row.userSex === 'WOMAN' ? '女' : '未知')
          }
        },
        {
          title: ' 电话',
          key: 'userTel'
        },
        {
          title: '状态',
          key: 'userStatus',
          render: (h, params) => {
            return h('p', params.row.userStatus === 'NO_LOCK' ? '启用' : params.row.userStatus === 'IS_LOCK' ? '禁用' : '未知')
          }
        },
        {
          title: '操作',
          key: 'action',
          width: 280,
          align: 'center',
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
                    this.roleList()
                    this.flag = true
                    this.UserObject = $.extend(true, {}, params.row)
                    if (params.row.role !== undefined && params.row.role != null && params.row.role !== '') {
                      let role = params.row.role.split('，')
                      this.UserObject.role = role
                    }
                    this.addUserModal = true
                    this.status = 'edit'
                    this.modalTitle = '编辑用户'
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
                    this.UserObject = $.extend(true, {}, params.row)
                    this.assignRoles()
                  }
                }
              }, '分配角色'))
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
                    this.UserObject = $.extend(true, {}, params.row)
                    this.delUserModal = true
                  }
                }
              }, '删除'))
            }
            return h('div', actions)
          }
        }
      ],
      // 用户数据
      UserData: [],
      UserObject: {
        userId: '',
        userName: '',
        userPassword: '',
        userRealName: '',
        role: [],
        userSex: 'MAN',
        userTel: '',
        userStatus: 'NO_LOCK'
      },
      roleData: [], // 所有角色列表
      userRole: [], // 用户角色列表
      selections: [], // 选择的角色
      listStyle: {
        width: '300px',
        height: '300px'
      },
      pageNum: 1, // 起始页
      pageSize: 10, // 每页显示的条目数
      totalPages: 10, // 总页数，默认1页
      addUserModal: false,
      delUserModal: false,
      rePasswordModal: false,
      assignRoleModal: false,
      status: '',
      modalTitle: '',
      UserRules: {
        userName: [{
          required: true,
          message: '请填写登录名',
          trigger: 'blur'
        }],
        userPassword: [{
          required: true,
          message: '请输入密码',
          trigger: 'blur'
        }],
        userRealName: [{
          required: true,
          message: '请填写真实姓名',
          trigger: 'blur'
        }],
        userTel: [{
          required: false,
          message: '请输入正确的手机号码',
          pattern: /^1[3|4|5|7|8][0-9]{9}$/
        }]
      }

    }
  },
  computed: {
    access () {
      return this.$store.state.user.access
    },
    accessAdd () {
      return this.hasOneOf(['user:add'], this.access)
    },
    accessDelete () {
      return this.hasOneOf(['user:delete'], this.access)
    },
    accessUpdate () {
      return this.hasOneOf(['user:update'], this.access)
    },
    accessView () {
      return this.hasOneOf(['user:view'], this.access)
    }
  },
  mounted () {
    this.UserList(this.pageNum)
  },
  methods: {
    ok () {
    },
    cancel () {
      this.addUserModal = false
      this.$refs['UserObject'].resetFields()
    },
    // 用户列表，打开页面自动加载
    UserList (pageNum) {
      this.pageNum = pageNum
      let url = 'user/findAll?&pno=' + (pageNum - 1) + '&size=' + this.pageSize
      this.axios.get(url).then((res) => {
        if (res.data.code === 0) {
          this.UserData = res.data.data.content
          this.totalPages = res.data.data.totalPages * 10
          for (var i = 0; i < res.data.data.content.length; i++) {
            let role = ''
            if (res.data.data.content[i].roleList !== undefined && res.data.data.content[i].roleList != null) {
              for (var j = 0; j < res.data.data.content[i].roleList.length; j++) {
                role = role + res.data.data.content[i].roleList[j] + '，'
              }
              this.UserData[i].role = role.substring(0, role.length - 1)
            }
          }
        } else {
          this.UserData = []
        }
      })
    },
    // 角色列表，给用户分配角色时加载
    roleList () {
      let url = 'role/list'
      this.axios.get(url).then((res) => {
        if (res.data.code === 0) {
          this.roleData = res.data.data
        } else {
          this.roleData = []
        }
      })
    },
    // 添加用户按钮
    addUserButton () {
      this.addUserModal = true
      this.flag = true
      this.modalTitle = '添加用户'
      this.status = 'save'
      this.UserObject = {
        userId: '',
        userName: '',
        userPassword: '',
        userRealName: '',
        role: [],
        userSex: 'MAN',
        userTel: '',
        userStatus: 'NO_LOCK'
      }
    },
    // 添加编辑用户
    addUser () {
      this.$refs['UserObject'].validate((valid) => {
        if (valid) {
          if (this.flag === true) {
            this.axios.post('user/save', this.UserObject).then((response) => {
              if (response.data.code === 0) {
                this.$Notice.success({
                  title: '提示信息',
                  desc: response.data.msg
                })
                this.flag = false
                this.addUserModal = false
                this.UserList(this.pageNum)
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
    // 分配角色按钮，先查用户的role
    assignRoles () {
      this.axios.get('/role/user/' + this.UserObject.userId).then(response => {
        if (response.data.code === 0) {
          this.userRole = response.data.data
        }
      })
      this.roleList()
      this.assignRoleModal = true
    },
    renderFormat (item) {
      return item.label
    },
    // 选择角色后自动提交
    handleChange (targets, direction, moveKeys) {
      this.userRole = targets
      let roleIds = ''
      for (let i = 0; i < moveKeys.length; i++) {
        roleIds += moveKeys[i] + ','
      }
      this.axios.post('/user/authorized/user/' +
                this.UserObject.userId + '/role/' + roleIds + '/' + direction).then(response => {
        if (response.data.code === 0) {
          this.UserList(this.pageNum)
          this.$Notice.success({
            title: '成功',
            desc: response.data.msg
          })
        } else {
          this.$Notice.error({
            title: '提示信息',
            desc: response.data.msg
          })
        }
      })
    },
    // 删除用户
    delUser () {
      let url = 'user/delete?userId=' + this.UserObject.userId
      this.axios.get(url).then((res) => {
        if (res.data.code === 0) {
          this.$Notice.success({
            title: '提示信息',
            desc: '删除【' + this.UserObject.userName + '】成功! '
          })
          if (this.pageNum > 1 &&
                        this.pageNum * 10 === this.totalPages &&
                        this.UserData.length === 1) {
            this.UserList(this.pageNum - 1)
          } else {
            this.UserList(this.pageNum)
          }
        } else {
          this.$Notice.error({
            title: '提示信息',
            desc: '删除【' + this.UserObject.userName + '】失败! '
          })
        }
      })
    }
  }
}
