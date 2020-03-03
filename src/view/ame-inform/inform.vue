<template>
    <Card>
          <p slot="title">消息通知</p>
          <div class="">
               <Button style="margin-bottom: 15px" type="primary" icon="md-megaphone" @click="sendInform">发送新通知</Button>
                <Table border :columns="columns12" :data="data6">
                  <template slot-scope="{ row }" slot="initiatorName">
                    <strong>{{ row.initiatorName }}</strong>
                  </template>
                  <template slot-scope="{ row, index }" slot="action">
                    <Button type="primary" size="small" style="margin-right: 5px" @click="show(index)">查看</Button>
                    <Button type="error" size="small" @click="remove(index)">删除</Button>
                  </template>
                </Table>
               <div style="text-align: center;margin-top: 15px">
                 <Page v-show="data6.length>0" :total="pageTotal" :current="pageNum" :page-size="pageSize" show-elevator show-sizer @on-change="handlePage" @on-page-size-change='handlePageSize'/>
               </div>
          </div>
          <Modal
            v-model="modal1"
            title="发送新消息"
            :loading="loading"
            @on-ok="ok"
            @on-cancel="cancel">
            <div>
              <Form ref="userAddFormItem" :model="userAddFormItem" :rules="ruleUserAddFormItem">
                <FormItem label="标题：" prop="title">
                    <Input v-model="userAddFormItem.title" placeholder="Enter something..." style="width: 200px;margin-left: 26px" />
                </FormItem>
                  <!--<FormItem label="类型选择：">
                    <Select v-model="model1" style="width:200px">
                      <Option v-for="item in cityList" :value="item.value" :key="item.value">{{ item.label }}</Option>
                    </Select>
                  </FormItem>-->
                  <FormItem label="发送内容：" prop="content">
                    <Input  v-model="userAddFormItem.content" type="textarea" :autosize="{minRows: 3,maxRows: 5}" placeholder="请输入消息内容..."></Input>
                  </FormItem>
              </Form>
            </div>
          </Modal>
    </Card>
</template>

<script>
  import { formatDate } from '../ame-user/data.js'
  export default {
    data () {
      return {
        pageTotal: 0,
        pageNum: 1,
        pageSize: 10,
        loading: true,
        userAddFormItem: {
          title: '',
          content: ''
        },
        ruleUserAddFormItem: {

          title: [
            { required: true, message: '不能为空', trigger: 'blur' },
            { type: 'string', max: 32, message: 'Introduce no less than 20 words', trigger: 'blur' }
          ],
          content: [
            { required: true, message: '不能为空', trigger: 'blur' }
          ]

        },

        /* 之前数据 */
        cityList: [
          {
            value: 'New York',
            label: 'New York'
          },
          {
            value: 'London',
            label: 'London'
          },
          {
            value: 'Sydney',
            label: 'Sydney'
          },
          {
            value: 'Ottawa',
            label: 'Ottawa'
          },
          {
            value: 'Paris',
            label: 'Paris'
          },
          {
            value: 'Canberra',
            label: 'Canberra'
          }
        ],
        value: '',
        model1: '',
        value6: '',
        value11: '',
        modal1: false,
        columns12: [
          {
            title: '发件人',
            slot: 'initiatorName'
          },
          {
            title: '标题',
            key: 'title'
          },
          {
            title: '内容',
            key: 'messageContent'
          },
          {
            title: '时间',
            key: 'createTime',
            render (h, params) {
              return h('div', formatDate(new Date(params.row.createTime), 'yyyy-MM-dd hh:mm'))
            }
          },
          {
            title: '操作',
            slot: 'action',
            width: 150,
            align: 'center'
          }
        ],
        data6: [/*
          {
            name: '欧阳张三',
            title: "这是一个名字很长很长的标题",
            type: '这里是类型',
            time:'2019/8/9 9:31'
          },
          {
            name: '欧阳张三',
            title: "这是一个名字很长很长的标题",
            type: '这里是类型',
            time:'2019/8/9 9:31'
          },
          {
            name: '欧阳张三',
            title: "这是一个名字很长很长的标题",
            type: '这里是类型',
            time:'2019/8/9 9:31'
          },
          {
            name: '欧阳张三',
            title: "这是一个名字很长很长的标题",
            type: '这里是类型',
            time:'2019/8/9 9:31'
          } */
        ]
      }
    },
    mounted () {
      this.getDataFromService()
    },
    methods: {
      sendInform () {
         this.modal1 = true
      },
      handlePage (value) {
        this.pageNum = value
        this.getDataFromService()
      },
      handlePageSize (value) {
        this.pageSize = value
        this.getDataFromService()
      },
      // 向后台获取数据
      getDataFromService () {
        let page = {
          pageNo: this.pageNum - 1,
          pageSize: this.pageSize
        }

        this.axios.get('/message/show', { params: page }).then((response) => {
          const result = response.data
         //   console.log(result)
          this.data6 = result.data.content
          this.pageTotal = result.data.totalElements
         // this.loading = false
        }).catch((error) => {
          alert(error.message)
        })
      },
      ok () {
       // this.$Message.info('Clicked ok');
        this.$refs.userAddFormItem.validate(valid => {
          if (valid) {
            this.axios.post('/message/create', {
              title: this.userAddFormItem.title,
              messageContent: this.userAddFormItem.content

            }).then((response) => {
              if (response.data.code === 0) {
                // 成功了
                this.clearLoading()
                this.clearUserAddFormItem()
                this.modal1 = false
                // 获取新的数据
                this.getDataFromService()
              } else {
                alert(response.data.msg)
                this.clearLoading()
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
      clearUserAddFormItem () {
        this.userAddFormItem = {
          title: '',
          content: ''

        }
      },
      clearLoading () {
        this.loading = false
        this.$nextTick(() => {
          this.loading = true
        })
      },
      cancel () {
        this.$Message.info('Clicked cancel')
      },
      show (index) {
        this.$Modal.info({
          title: '消息详情',
          content: `名字：${this.data6[index].initiatorName}<br>标题：${this.data6[index].title}<br>类型：${this.data6[index].messageContent}<br>时间：${formatDate(new Date(this.data6[index].createTime), 'yyyy-MM-dd hh:mm')}`
        })
      },
      remove (index) {
       // this.data6.splice(index, 1);
        let goDelData = {
          ids: this.data6[index].msgId
        }
        // console.log(goDelData)
        this.axios.get('/message/delAll', {
          params: goDelData
        })
          .then((response) => {
            this.getDataFromService()
          })
          .catch((error) => {
           // alert(error.message)
            console.log(error)
          })
      }
    }
  }
</script>

<style scoped>

</style>
