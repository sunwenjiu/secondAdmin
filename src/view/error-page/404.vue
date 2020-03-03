<template>
  <div class="error-body">
       <!--<error-content code="404" desc="Oh~~您的页面好像飞走了~" :src="src"/>-->
      <div class="error-centre">
          <div class="rocket animated bounceIn" style="animation-delay: 1100ms;">
            <img src="../../../src/assets/images/ico9.png"/>
          </div>
        <div class="error-text-box animated bounceIn" style="animation-delay: 1400ms;">
          <h1 class="text-shadow">{{msg}}</h1>
          <p class="text-shadow">抱歉，您的页面已经飞出地球表面</p>
          <a class="error-btn" @click="backHome">返回首页</a>
        </div>
      </div>
       <div class="astronaut animated" v-bind:class="{pulse:isPulse,bounceIn:isBounceIn}" style="animation-delay: 1500ms;	animation-iteration-count: infinite;">
         <img class="" src="../../../src/assets/images/ico10.png"/>
       </div>
       <div class="planetoid-three animated bounceInRight" style="animation-delay: 900ms;">
         <img class="" src="../../../src/assets/images/ico8.png"/>
       </div>
       <div class="planetoid-two animated bounceInLeft" style="animation-delay: 700ms;">
         <img class="" src="../../../src/assets/images/ico7.png"/>
       </div>
       <div class="planetoid-one animated bounceInDown" style="animation-delay: 500ms;">
         <img class="" src="../../../src/assets/images/ico6.png"/>
       </div>
       <div class="error-planet animated bounceInUp">
         <img class="" src="../../../src/assets/images/ico5.png"/>
       </div>
  </div>
</template>

<script>
import error404 from '@/assets/images/error-page/error-404.svg'
import errorContent from './error-content.vue'
export default {
  name: 'error_404',
  components: {
    errorContent
  },
  data () {
    return {
      msg: 404,
      isBounceIn: true,
      isPulse: false,
      src: error404
    }
  },
  methods: {
    backHome () {
      this.$router.replace({
        name: this.$config.homeName
      })
    },
    backPrev () {
      this.$router.go(-1)
    }
  },
  mounted () {
    setTimeout(() => {
      this.isBounceIn = false
      this.isPulse = true
    }, 1700)
  }
}
</script>
<style>
  .astronaut{
    position: absolute;
    top: 10%;
    right: 30%;
  }
  .text-shadow{
    text-shadow:6px 6px 1px rgba(0,0,0,0.3);
  }
  .error-btn:hover{
    color: #035475;
  }
  .error-btn{
    box-shadow:6px 5px 0px #333333;
    width: 260px;
    height: 60px;
    background-color: #6cd3f0;
    display: block;
    border-radius: 4px;
    color: #035475;
    font-size: 28px;
    text-align: center;
    line-height: 60px;
    margin-top: 30px;
  }
  .error-text-box p{
    color: #ffffff;
    font-size: 42px;
    font-weight: bold;
    font-family: 微软雅黑;
  }
  .error-text-box h1{
    color: #ffffff;
    font-size: 180px;
    font-weight: bold;
    font-family: 微软雅黑;
    line-height: 180px;
  }
  .error-text-box{
    float: left;
    margin-left: 60px;
    margin-top: 60px;
  }
  .error-centre{
     width: 1300px;
     margin: 0 auto;
     padding-top: 6%;
     overflow: hidden;
  }
  .rocket{
  float: left;
  }
  .planetoid-three{
    position: absolute;
    top: 50%;
    right: 60px;
  }
  .planetoid-two{
    position: absolute;
    top: 90px;
    left: 0px;
  }
  .planetoid-one{
    position: absolute;
    top: 0;
    right: 90px;
  }
  .error-planet img{
    width: 100%;
    height: 100%;
  }
  .error-planet{
    position: absolute;
    bottom: 0;
  }
  .error-body{
    position: relative;
    height: 100%;
    width: 100%;
  }
   body{
     background-image: url("../../../src/assets/images/bg3.jpg");
     background-size: 100%100%;
   }
</style>
