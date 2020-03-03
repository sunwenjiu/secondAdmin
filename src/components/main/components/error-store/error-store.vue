<template>
  <div class="error-store">
    <Badge dot :count="countComputed">
      <Tooltip content="消息中心">
        <Button type="text" @click="openErrorLoggerPage" class="ico-style">
          <Icon :size="20" type="md-notifications"/>
        </Button>
      </Tooltip>
<!--      <Button type="text" @click="openErrorLoggerPage" class="ico-style">-->
<!--        <Icon :size="20" type="ios-bug"/>-->
<!--      </Button>-->
    </Badge>
  </div>
</template>

<script>
export default {
  name: 'ErrorStore',
  props: {
    count: {
      type: Number,
      default: 0
    },
    hasRead: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    countComputed () {
      return this.hasRead ? 0 : this.count
    }
  },
  methods: {
    openErrorLoggerPage () {
      this.$router.push({
        name: 'message_page'
      })
    }
  }
}
</script>

<style lang="less">
  .ico-style:hover{
       background-color: #1e93ff !important;
  }
.error-store{
  margin-right: 12px;
  .ivu-badge-dot{
    top: 20px;
  }
  .ivu-btn.ivu-btn-text{
    padding: 5px 1px 6px;
  }
}
</style>
