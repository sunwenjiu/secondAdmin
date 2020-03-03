<template>
  <Card shadow>
    <div>
      <div class="message-page-con message-category-con">
        <Menu width="auto" active-name="unread" @on-select="handleSelect" >
          <MenuItem name="unread">
            <span class="category-title">私人未读消息</span><Badge style="margin-left: 10px" :count="messageUnreadCount"></Badge>
          </MenuItem>
          <MenuItem name="readed">
            <span class="category-title">私人已读消息</span><Badge style="margin-left: 10px" class-name="gray-dadge" :count="messageReadedCount"></Badge>
          </MenuItem>
          <MenuItem name="nodefault">
            <span class="category-title">公告通知</span><Badge style="margin-left: 10px" class-name="gray-dadge" :count="messageNodefaultCount"></Badge>
          </MenuItem>
          <!--<MenuItem name="trash">
            <span class="category-title">回收站</span><Badge style="margin-left: 10px" class-name="gray-dadge" :count="messageTrashCount"></Badge>
          </MenuItem>-->
        </Menu>
      </div>
      <div class="message-page-con message-list-con">
        <Spin fix v-if="listLoading" size="large"></Spin>
        <Menu
          width="auto"
          active-name=""
          :class="titleClass"
          @on-select="handleView"
        >
          <MenuItem v-for="item in messageList.slice((pageNum-1)*pageSize,pageNum*pageSize)" :name="item.msgId" :key="`msg_${item.msgId}`">
            <div>

              <p class="msg-title">{{ item.title }}</p>
              <Badge status="default" :text="item.createTime" />
              <Button
                style="float: right;margin-right: 20px;"
                :style="{ display: item.loading ? 'inline-block !important' : '' }"
                :loading="item.loading"
                size="small"

                type="text"
                v-show="currentMessageType !== 'unread'"
                @click.native.stop="removeMsg(item)"></Button>
              <!-- :icon="currentMessageType === 'readed' ? 'md-trash' : 'md-redo'"
               :title="currentMessageType === 'readed' ? '删除' : '还原'"-->
            </div>
          </MenuItem>
          <Page v-show="messageList.length>0" :total="messageList.length"  size="small" :current="pageNum" :page-size="pageSize"  @on-change="handlePage" @on-page-size-change='handlePageSize'  simple/>
        </Menu>
      </div>
      <div class="message-page-con message-view-con">
        <Spin fix v-if="contentLoading" size="large"></Spin>
        <div class="message-view-header">
          <h2 class="message-view-title">{{ showingMsgItem.title }}</h2>
          <time class="message-view-time">{{ showingMsgItem.createTime }}</time>
        </div>
        <div v-html="messageContent"></div>
      </div>

    </div>
  </Card>

</template>

<script>
  import { mapState, mapGetters, mapMutations, mapActions } from 'vuex'
  const listDic = {
    unread: 'messageUnreadList',
    readed: 'messageReadedList',
    trash: 'messageTrashList',
    nodefault: 'messageNodefaultList'
  }
  export default {
    name: 'message_page',
    data () {
      return {
        pageNum: 1,
        pageSize: 9,
        listLoading: true,
        contentLoading: false,
        currentMessageType: 'unread',
        messageContent: '',
        showingMsgItem: {}
      }
    },
    computed: {
      ...mapState({
        messageUnreadList: state => state.user.messageUnreadList,
        messageReadedList: state => state.user.messageReadedList,
        messageNodefaultList: state => state.user.messageNodefaultList,
        messageTrashList: state => state.user.messageTrashList,
        messageList () {
          return this[listDic[this.currentMessageType]]
        },

        titleClass () {
          return {
            'not-unread-list': this.currentMessageType !== 'unread'
          }
        }
      }),
      ...mapGetters([
        'messageUnreadCount',
        'messageReadedCount',
        'messageTrashCount',
        'messageNodefaultCount'
      ])
    },
    methods: {
      handlePage (value) {
        this.pageNum = value
      },
      handlePageSize (value) {
        this.pageSize = value
      },

      ...mapMutations([
        //
      ]),
      ...mapActions([
        'getContentByMsgId',
        'getMessageList',
        'hasRead',
        'removeReaded',
        'restoreTrash'
      ]),
      stopLoading (name) {
        this[name] = false
      },
      handleSelect (name) {
        this.currentMessageType = name
        this.pageNum = 1
      },
      handleView (msg_id) {
        this.contentLoading = true
        this.getContentByMsgId({ msg_id }).then(content => {
          this.messageContent = content.data

          const item = this.messageList.find(item => item.msgId === msg_id)
          if (item) this.showingMsgItem = item

          if (this.currentMessageType === 'unread') this.hasRead({ msg_id })
          this.stopLoading('contentLoading')
        }).catch(() => {
          this.stopLoading('contentLoading')
        })
      },
      removeMsg (item) {
        item.loading = true
        const msg_id = item.msgId
        if (this.currentMessageType === 'readed') this.removeReaded({ msg_id })
        else this.restoreTrash({ msg_id })
      }
    },
    mounted () {
      this.listLoading = true
      // 请求获取消息列表
      this.getMessageList().then(() => this.stopLoading('listLoading')).catch(() => this.stopLoading('listLoading'))

      // console.log("初始化时messageList")
       // console.log( this.messageList)
       // console.log( this.messageNodefaultList)
    }
  }
</script>

<style lang="less">
  .message-page{
    &-con{
      height: ~"calc(100vh - 176px)";
      display: inline-block;
      vertical-align: top;
      position: relative;
      &.message-category-con{
        border-right: 1px solid #e6e6e6;
        width: 200px;
      }
      &.message-list-con{
        border-right: 1px solid #e6e6e6;
        width: 230px;
      }
      &.message-view-con{
        position: absolute;
        left: 446px;
        top: 16px;
        right: 16px;
        bottom: 16px;
        overflow: auto;
        padding: 12px 20px 0;
        .message-view-header{
          margin-bottom: 20px;
          .message-view-title{
            display: inline-block;
          }
          .message-view-time{
            margin-left: 20px;
          }
        }
      }
      .category-title{
        display: inline-block;
        width: 85px;
      }
      .gray-dadge{
        background: gainsboro;
      }
      .not-unread-list{
        .msg-title{
          color: rgb(170, 169, 169);
        }
        .ivu-menu-item{
          .ivu-btn.ivu-btn-text.ivu-btn-small.ivu-btn-icon-only{
            display: none;
          }
          &:hover{
            .ivu-btn.ivu-btn-text.ivu-btn-small.ivu-btn-icon-only{
              display: inline-block;
            }
          }
        }
      }
    }
  }
</style>
