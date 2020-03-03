<template>
    <Card>
          <Modal
            v-model="modal1"
            title="新加字段"
            width="460"
            @on-ok="ok"
            @on-cancel="cancel">
            <div>
              <Form ref="formValidate" :label-width="80" :model="formValidate" :rules="ruleValidate">
                <FormItem label="字段名称" prop="fieldName">
                  <Input v-model="formValidate.fieldName" placeholder="设置字段名称..." style="width: 300px" />
                </FormItem>
                <FormItem label="字段类型" prop="fieldType">
                  <RadioGroup v-model="formValidate.fieldType" @on-change="radioClick">
                    <Radio label="输入框"></Radio>
                    <Radio label="下拉框"></Radio>
                    <Radio label="单选框"></Radio>
                    <Radio label="多行文本框"></Radio>
                  </RadioGroup>
                </FormItem>
                <div label="aaa" v-if="pullDown">
                  <FormItem label="下拉引入">
                    <Select v-model="pullModel" style="width:200px">
                      <Option v-for="item in pullDataList" :value="item.value" :key="item.value">{{ item.label }}</Option>
                    </Select>
                  </FormItem>
                </div>
                <div label="aaa" v-if="radioShow">
                  <FormItem
                    v-for="(item, index) in formDynamic.items"
                    :key="index"
                    :label="'值 '">
                    <Row>
                      <Col span="18">
                      <Input type="text" v-model="item.value" placeholder="设置单选值..."></Input>
                      </Col>
                      <Col span="4" offset="1">
                      <Button @click="removeRadioValue(index)" size="small" type="error">删除</Button>
                      </Col>
                    </Row>
                  </FormItem>
                  <FormItem>
                    <Row>
                      <Col span="12">
                      <Button type="dashed" long @click="addRadioValue" icon="md-add">新增单选值</Button>
                      </Col>
                    </Row>
                  </FormItem>
                </div>
                <FormItem label="字段归属" prop="fieldAscion">
                  <Select v-model="formValidate.fieldAscion" style="width:200px">
                    <Option v-for="item in fieldAscList" :value="item.value" :key="item.value">{{ item.label }}</Option>
                  </Select>
                </FormItem>
                <FormItem label="最大值" prop="fieldMax">
                  <Input v-model="formValidate.fieldMax" placeholder="设置字段最大值..." style="width: 200px" />
                </FormItem>
              </Form>
            </div>
            <div slot="footer">
              <Button type="primary" @click="fieldSave('formValidate')">确定</Button>
            </div>
          </Modal>
          <p slot="title">填报页面字段管理</p>
          <Button type="primary" icon="md-add" style="margin-bottom: 15px" @click="addField">新增字段</Button>
          <div>
            <Table :columns="columns1" :data="data1" border>
              <template slot-scope="{ row, index }" slot="action">
                <Button type="error" size="small" @click="handleRemove(row)">删除</Button>
              </template>
            </Table>
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
      index: 1,
      // 单选按钮设置值
      formDynamic: {
        items: [
          {
            value: ''
          }
        ]
      },
      pullDown: false,
      radioShow: false,
      // 字段归属下拉选择
      fieldAscList: [],
      modal1: false,
      affiliation: {},
      // 表单提交字段
      formValidate: {
        fieldName: '',
        fieldType: '输入框',
        fieldAscion: '',
        fieldMax: ''
      },
      // 表单验证
      ruleValidate: {
        fieldName: [
          { required: true, message: '请输入字段名称', trigger: 'blur' }
        ],
        fieldType: [
          { required: true, message: '请输入字段类型', trigger: 'change' }
        ],
        fieldAscion: [
          { required: true, message: '请选择字段归属', trigger: 'change' }
        ],
        fieldMax: [
          { required: true, message: '请设置字段最大值', trigger: 'blur' }
        ]
      },
      // 列表字段
      columns1: [
        {
          title: '字段名',
          key: 'fieldName'
        },
        {
          title: '字段类型',
          key: 'fieldType'
        },
        {
          title: '字段归属',
          key: 'fieldAscion'
        },
        {
          title: '字段最大值',
          key: 'fieldMax'
        },
        {
          title: '操作',
          slot: 'action',
          width: 150,
          align: 'center'
        }
      ],
      // 数据
      data1: [
        {
          fieldName: '患者病案号:',
          fieldType: '输入框',
          fieldAscion: '事件填报流程',
          fieldMax: '20'
        }
      ],
      // 总数
      totalNumber: 0,
      // 当前页
      pageNumber: 0,
      // 下拉项值
      pullModel: '',
      // 下拉引入值
      pullDataList: [
        {
          value: '科室列表',
          label: '科室列表'
        },
        {
          value: '病区列表',
          label: '病区列表'
        },
        {
          value: '事件等级',
          label: '事件等级'
        },
        {
          value: '事件类型',
          label: '事件类型'
        },
        {
          value: '事件因素',
          label: '事件因素'
        },
        {
          value: '字典库',
          label: '字典库'
        }
      ]
    }
  },
  mounted () {
    this.getFieldSetPage(this.pageNumber)
    this.getFieldAscList()
  },
  methods: {
    handleSubmit (name) {
      this.$refs[name].validate((valid) => {
        if (valid) {
          this.$Message.success('Success!')
        } else {
          this.$Message.error('Fail!')
        }
      })
    },
    handleReset (name) {
      this.$refs[name].resetFields()
    },
    // 新增单选按钮值
    addRadioValue () {
      // this.index++
      this.formDynamic.items.push({
        value: ''
      })
    },
    // 删除单选按钮值
    removeRadioValue (index) {
      // this.formDynamic.items[index].status = 0
      this.formDynamic.items.splice(index, 1)
    },
    // 删除字段设置
    handleRemove (row) {
      let fieldId = row.fieldId
      let request = {
        id: fieldId
      }
      this.axios.get('formset/delete', { params: request }).then((res) => {
        if (res.data.code === 0) {
          this.getFieldSetPage(this.pageNumber)
        } else {
          this.$Message.error('删除字段设置失败')
        }
      }).catch((e) => {
        console.log(e)
      })
    },
    radioClick (obj) {
      console.log(obj)
      if (obj === '下拉框') {
        this.pullDown = true
      } else {
        this.pullDown = false
      }
      if (obj === '单选框') {
        this.radioShow = true
      } else {
        this.radioShow = false
      }
    },
    ok () {
      this.$Message.info('Clicked ok')
    },
    cancel () {
      this.$Message.info('Clicked cancel')
    },
    // 新增
    addField () {
      this.modal1 = true
      this.formValidate = {
        fieldName: '',
        fieldType: '输入框',
        fieldAscion: '',
        fieldMax: ''
      }
      this.formDynamic.items = []
      this.pullDown = false
      this.radioShow = false
    },
    // 初始化列表
    getFieldSetPage (pageNumber) {
      let requestParam = {
        pageNumber: pageNumber,
        pageSize: 10
      }
      this.axios.get('formset/getFormSetPage', { params: requestParam }).then((res) => {
        if (res.data.code === 0) {
          this.data1 = res.data.data.content
          this.totalNumber = res.data.data.totalElements
        } else {
          this.data1 = []
          this.totalNumber = 0
        }
      }).catch((e) => {
        console.log(e)
      })
    },
    // 保存
    fieldSave (name) {
      this.$refs[name].validate((valid) => {
        if (valid) {
          this.modal1 = false
          let radioValues = this.formDynamic.items.map(item => {
            return item.value.trim()
          })
          let requestBody = {
            fieldId: '',
            fieldName: this.formValidate.fieldName,
            fieldType: this.formValidate.fieldType,
            fieldAscion: this.formValidate.fieldAscion,
            fieldMax: this.formValidate.fieldMax,
            pullId: this.pullModel,
            pullName: this.pullModel,
            radioValues: radioValues.toString(),
            formValue: ''
          }
          // alert(JSON.stringify(requestBody))
          this.axios.post('formset/save', requestBody).then((res) => {
            if (res.data.code === 0) {
              this.getFieldSetPage(this.pageNumber)
            } else {
              this.$Message.error('保存字段设置失败')
            }
          }).catch((e) => {
            console.log(e)
          })
        }
      })
    },
    // 页码切换
    pageChange (page) {
      let pageNumber = page - 1
      this.pageNumber = pageNumber
      this.getFieldSetPage(pageNumber)
    },
    // 字段归属
    getFieldAscList () {
      this.axios.get('eventTypeActiviti/getTaskPullVo').then((res) => {
        if (res.data.code === 0) {
          this.fieldAscList = res.data.data
        } else {
          this.fieldAscList = []
        }
      }).catch((e) => {
        console.log(e)
      })
    }

  }
}
</script>

<style scoped>

</style>
