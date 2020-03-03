<template>
  <div>
    <h1>字段设置测试页</h1>
    <form-create v-model="$f" :rule="rule" :option="option"></form-create>
    <!--    <form-create v-model="$f1" :rule="rule1" :option="option"></form-create>-->
    <Button @click="test">测试</Button>
  </div>
</template>

<script>
  export default {
    name: 'item-set',
    data () {
      return {
        $f: {},
        // $f1:{},
        rule: [
          {
            type: 'input',
            field: '输入框',
            title: '输入框'
          },
          {
            type: 'input',
            field: '文本框',
            title: '文本框',
            props: {
              type: 'textarea',
              rows: 5
            }
          },
          {
            type: 'radio',
            field: '单选框',
            title: '单选框',
            options: [{
              value: '不包邮',
              label: '不包邮',
              disabled: false
            },
              {
                value: '包邮',
                label: '包邮',
                disabled: false
              }
            ]
          },
          {
            type: 'checkbox',
            field: '多选框',
            title: '多选框',
            options: [{
              value: '不包邮',
              label: '不包邮',
              disabled: false
            },
              {
                value: '包邮',
                label: '包邮',
                disabled: false
              }
            ]
          },
          {
            type: 'select',
            field: '单选下拉框',
            title: '单选下拉框',
            options: [{
              value: '不包邮',
              label: '不包邮',
              disabled: false
            },
              {
                value: '包邮',
                label: '包邮',
                disabled: false
              }
            ]
          },
          {
            type: 'select',
            field: '多选选下拉框',
            title: '多选选下拉框',
            options: [{
              value: '不包邮',
              label: '不包邮',
              disabled: false
            },
              {
                value: '包邮',
                label: '包邮',
                disabled: false
              }
            ],
            props: {
              multiple: true
            }
          }
        ],
        // rule1:[
        //   {
        //     type: 'radio',
        //     field: '单选框',
        //     title: '单选框',
        //     options: [{
        //       value: "不包邮",
        //       label: "不包邮",
        //       disabled: false
        //     },
        //       {
        //         value: "包邮",
        //         label: "包邮",
        //         disabled: false
        //       },
        //     ],
        //   }
        // ],
        option: {
          submitBtn: {
            show: false
          }
        }
      }
    },
    mounted () {

    },
    methods: {
      test () {
        alert(JSON.stringify(this.$f.formData()))
      }
    }
  }
</script>

<style scoped>

</style>
