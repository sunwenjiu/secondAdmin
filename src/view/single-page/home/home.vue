<template>
  <div>
    <Row :gutter="20">
      <i-col :xs="12" :md="8" :lg="4" v-for="(infor, i) in inforCardData" :key="`infor-${i}`" style="height: 120px;padding-bottom: 10px;">
        <infor-card shadow :color="infor.color" :icon="infor.icon" :icon-size="36">
          <count-to :end="infor.count" count-class="count-style"/>
          <p>{{ infor.title }}</p>
        </infor-card>
      </i-col>
    </Row>
    <Row :gutter="20" style="margin-top: 10px;">
      <i-col :md="24" :lg="8" style="margin-bottom: 20px;">
        <Card style="height: 333px;" dis-hover>
          <p slot="title">
            <Icon type="ios-mail" />
            个人信息
          </p>
          <Row style="margin-top: 15px;border-bottom: solid 1px #dcdee2;padding-bottom: 20px">
            <Col span="5">
            <div class="home-user-img-box">
              <img src="../../../assets/images/tx.jpg"/>
            </div>
            </Col>
            <Col span="16">
            <h1 class="home-user-name">欢迎，{{userName}} 开始您一天的工作吧!</h1>
            </Col>
          </Row>
          <Row :gutter="16" style="margin-top: 20px;text-align: center">
            <Col span="6" class="home-user-statistics">
            <div class="home-user-statistics-ico userIcoBlue"><Icon type="ios-create" /></div>
            <p>待结案</p>
            <h1>{{eventCountUser.one}}</h1>
            </Col>
            <Col span="6" class="home-user-statistics">
            <div class="home-user-statistics-ico userIcoYew"><Icon type="ios-clipboard" /></div>
            <p>已结案</p>
            <h1>{{eventCountUser.two}}</h1>
            </Col>
            <Col span="6" class="home-user-statistics">
            <div class="home-user-statistics-ico userIcoRed"><Icon type="ios-clipboard" /></div>
            <p>已驳回</p>
            <h1>{{eventCountUser.three}}</h1>
            </Col>
            <Col span="6" class="home-user-statistics">
            <div class="home-user-statistics-ico userIcoGree"><Icon type="ios-list-box" /></div>
            <p>上报总数</p>
            <h1>{{eventCountUser.four}}</h1>
            </Col>
          </Row>
        </Card>
      </i-col>
      <i-col :md="24" :lg="8" style="margin-bottom: 20px;">
        <Card style="height: 333px;" dis-hover>
          <p slot="title">
            <Icon type="ios-mail" />
            消息通知
          </p>
          <a href="#" slot="extra" @click.stop="changeLimit">
            <Icon type="ios-loop-strong"></Icon>
            进入消息中心
          </a>
          <!--公告消息-->
          <div class="home-information-box">
            <div class="home-information-left">
              <p><Icon type="md-megaphone" /> 公告：</p >
            </div>
            <div class="home-information-right">
              <p v-if="notic != null && notic.length > 0"><a>{{notic}}</a></p >
              <p v-if="notic == null || notic.length === 0"><a>暂时没有相关公告消息</a></p >
            </div>
          </div>
          <!--个人消息-->
          <ul class="home-list">
            <li class="home-list-li" v-for="item in eventMessage" :key="item.msgId" v-if="eventMessage != null && eventMessage.length > 0">
              <a><Icon type="md-arrow-forward" />{{item.messageContent}}</a>
              <span style="float: right">{{item.createTime}}</span>
            </li>
            <li class="home-list-li"  v-if="eventMessage == null || eventMessage.length === 0">
              暂时没有相关事件消息
            </li>
          </ul>
        </Card>
      </i-col>
      <i-col :md="24" :lg="8" style="margin-bottom: 20px;">
        <Card shadow>
          <chart-bar style="height: 300px;" :value="barData" text="事件等级"/>
        </Card>
      </i-col>
    </Row>
    <Row>
      <Row :gutter="16">
        <Col :md="24" :lg="8">
        <Card shadow>
          <chart-pie style="height: 300px;" :value="pieData" text="事件类型统计"></chart-pie>
        </Card>
        </Col>
        <Col :md="24" :lg="16">
        <Card shadow>
          <example style="height: 310px;"   :value="explameValue" />
        </Card>
        </Col>
      </Row>
    </Row>
  </div>
</template>

<script>
import InforCard from '_c/info-card'
import CountTo from '_c/count-to'
import { ChartPie, ChartBar } from '_c/charts'
import Example from './example.vue'
export default {
  name: 'home',
  components: {
    InforCard,
    CountTo,
    ChartPie,
    ChartBar,
    Example
  },
  data () {
    return {
      randomMovieList: [],
      // 标题相关统计
      inforCardData: [
        { title: '事件总数量', icon: 'md-person-add', count: 803, color: '#2d8cf0' },
        { title: '事件上报数量', icon: 'md-locate', count: 232, color: '#19be6b' },
        { title: '事件结案数量', icon: 'md-help-circle', count: 142, color: '#ff9900' },
        { title: '事件年度发生率', icon: 'md-share', count: 657, color: '#ed3f14' },
        { title: '事件季度发生率', icon: 'md-chatbubbles', count: 12, color: '#E46CBB' },
        { title: '事件月结发生率', icon: 'md-map', count: 14, color: '#9A66E4' }
      ],
      // 饼图事件类型统计
      pieData: [
        { value: 335, name: '事件管理类' },
        { value: 310, name: '药品管理类' },
        { value: 234, name: '输血管理类' },
        { value: 135, name: '院内感染管理类' },
        { value: 987, name: '信息管理类' }
      ],
      // 柱状图事件等级统计
      barData: {
        A级: 234,
        B级: 278,
        C级: 190,
        D级: 470,
        E级: 210,
        F级: 57,
        G级: 39
      },
      // 不同月份事件等级统计
      explameValue: [
        {
          name: 'A级事件',
          type: 'line',
          stack: '总量',
          data: [120, 132, 101, 134, 90, 230, 210, 234, 569, 678, 876, 234]
        },
        {
          name: 'B级事件',
          type: 'line',
          stack: '总量',
          data: [257, 358, 278, 234, 290, 330, 310, 234, 279, 678, 876, 234]
        }
      ],
      // 公告消息
      notic: '',
      // 事件消息
      eventMessage: '',
      // 用户名字
      userName: '',
      // 用户个人事件量统计
      eventCountUser: {}
    }
  },
  methods: {
    changeLimit () {
      this.$router.push({
        name: 'message_page'
      })
    },
    // 首页标题统计
    getTitleData () {
      this.axios.get('echart/getEchartByTitle').then((res) => {
        if (res.data.code === 0) {
          this.inforCardData = res.data.data
        }
      }).catch((e) => {
        console.log(e)
      })
    },
    // 事件类型统计
    getPieData () {
      this.axios.get('echart/getEchartByEventType').then((res) => {
        if (res.data.code === 0) {
          this.pieData = res.data.data
        }
      }).catch((e) => {
        console.log(e)
      })
    },
    // 事件等级统计
    getBarData () {
      this.axios.get('echart/getEchartByEventLevel').then((res) => {
        if (res.data.code === 0) {
          this.barData = res.data.data
        }
      }).catch((e) => {
        console.log(e)
      })
    },
    // 月份事件等级统计
    getExplameData () {
      this.axios.get('echart/getEchartByEventTime').then((res) => {
        if (res.data.code === 0) {
          this.explameValue = res.data.data
        }
      }).catch((e) => {
        console.log(e)
      })
    },
    // 获取公告通知
    getNotic () {
      let requestParam = {
        messageType: 0,
        receiveId: '',
        limit: 1
      }
      this.axios.get('message/getListByType', { params: requestParam }).then((res) => {
        if (res.data.code === 0) {
          this.notic = res.data.data[0].messageContent
        }
      }).catch((e) => {
        console.log(e)
      })
    },
    // 获取个人事件通知
    getEventMessage () {
      let userid = this.$store.state.user.userId
      this.userName = this.$store.state.user.userName
      let requestParam = {
        messageType: 1,
        receiveId: userid,
        limit: 5
      }
      this.axios.get('message/getListByType', { params: requestParam }).then((res) => {
        if (res.data.code === 0) {
          this.eventMessage = res.data.data
        }
      }).catch((e) => {
        console.log(e)
      })
    },
    // 获取个人事件相关统计量
    getEventCountUser () {
      let requestParam = {
        userId: this.$store.state.user.userId
      }
      this.axios.get('echart/getByEventCountInUser', { params: requestParam }).then((res) => {
        if (res.data.code === 0) {
          this.eventCountUser = res.data.data
        }
      }).catch((e) => {
        console.log(e)
      })
    },
    // 权限指令测试
    textAccesss () {
      let flag = this.$_has('event:write:select')
      if (flag) {
        alert('有权限访问')
      } else {
        alert('无权限访问')
      }
    }
  },
  mounted () {
    // this.getTitleData()
    // this.getPieData()
    // this.getBarData()
    // this.getExplameData()
    // this.getNotic()
    // this.getEventMessage()
    // this.getEventCountUser()
    // this.textAccesss();
  }
}
</script>

<style lang="less">
  .home-information-right p a:hover{
    text-decoration: underline;
  }
  .home-information-right p a{
    color: #ed4014;
  }
  .home-information-right p{
    color: #323232;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
  .home-information-right{
    float: left;
    width: 85%;
  }
  .home-information-left p{
    color: #323232;
  }
  .home-information-left{
    float: left;
  }
  .home-progress-li-title{
    text-overflow: ellipsis;
    overflow: hidden;
    white-space: nowrap;
  }
  .home-information-box{
    overflow: hidden;
    padding: 10px 0;
    padding-top: 0;
    border-bottom: solid 1px #dcdee2;
  }
  .home-user-statistics h1{
    font-size: 28px;
    margin-top: 5px;
  }
  .home-user-statistics p{
    font-size: 12px;
  }
  .userIcoYew{
    background-color: #f5a72d;
  }
  .userIcoGree{
    background-color: #2df5b5;
  }
  .userIcoRed{
    background-color: #f52d53;
  }
  .userIcoBlue{
    background-color: #2db7f5;
  }
  .home-user-statistics-ico{
    color: #ffffff;
    line-height: 38px;
    font-size: 22px;
    width: 40px;
    height: 40px;
    border-radius: 3px;
    margin: 5px auto;
  }
  .home-user-time-list-li{
    float: left;
    margin-right: 20px;
    font-size: 12px;
  }
  .home-user-time-list{
    margin-top: 6px;
    list-style: none;
    overflow: hidden;
  }
  .home-user-name{
    font-size: 20px;
    margin-top: 6px;
  }
  .home-user-img-box img{
    width: 100%;
  }
  .home-user-img-box{
    width: 70px;
    height: 70px;
    overflow: hidden;
    border-radius: 45px;
    background-color: #348EED;
  }
  .home-list-li{
    border-bottom: dashed 1px #c5c8ce;
    margin-top: 7px;
    padding-bottom:5px;
  }
  .home-list{
    list-style: none;
  }
  .count-style{
    font-size: 50px;
  }
</style>
