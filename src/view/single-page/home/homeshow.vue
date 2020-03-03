<template>
  <div class="home-main">
    <!--<div class="home-title-h-box">-->
      <!--<Row>-->
        <!--<Col>-->
          <!--<div class="home-img-box"></div>-->
          <!--<h1 class="home-title-h">欢迎登陆不良事件上报系统!</h1>-->
          <!--<p class="home-title-p">Welcome to the Information Resources Management System</p>-->
        <!--</Col>-->
      <!--</Row>-->
    <!--</div>-->
    <div class="home-msg-box">
        <p class="home-msg-wa">欢迎登陆</p>
        <p class="home-msg-sy">不良事件管理系统!</p>
        <div class="home-msg-line"></div>
        <p class="home-msg-text">本系统用于填写上报不良事件，包含不良事件填报，处理和事件统计，填报可针对护理不良事件、可疑医疗器械不良事件、输血不良反应事件、药品不良反应事件、用药差错不良事件、其它不良事件进行不同的内容填报。并可以根据预定流程来进行处理，还可以展示相关事件通过图表来展示统计内容，方便分析合查看事件内容。</p>
        <div class="home-msg-btn">
             <p>欢迎使用!</p>
        </div>
    </div>
    <img class="home-img-style"  src="../../../assets/images/homeBanner.png"/>
  </div>
</template>

<script>
    export default {
        name: 'homeshow'
    }
</script>

<style scoped>
  .home-msg-btn{
    width: 200px;
    height: 40px;
    line-height: 40px;
    border-radius: 30px;
    background-color: #2db7f5;
    margin: 40px 0;
    text-align: center;
    font-size: 20px;
    color: #ffffff;
  }
  .home-msg-text{
    width: 600px;
    font-size: 16px;
    color: #808695;
  }
  .home-msg-line{
    height: 2px;
    width: 300px;
    background-color: #17233d;
    margin: 20px 0;
  }
  .home-msg-box{
    margin-left:5%;
    margin-top: 5%;
  }
  .home-msg-sy{
    font-size: 60px;
    font-weight: bold;
    line-height: 60px;
    color: #2d8cf0;
  }
  .home-msg-wa{
    font-size: 50px;
    line-height: 50px;
    color: #323232;
    margin-bottom: 15px;
  }
  .home-img-style{
   position: absolute;
    right: 0;
    top: 0;
    width: 100%;
    /*height: 110%;*/
  }
  .home-main{
    height: 100%;
    width: 100%;
    overflow: hidden;
    position: relative;
  }
  .home-title-h{
    text-align: center;
    font-size: 40px;
    color: #bbbec4;
    font-weight: 500;

  }
  .home-title-p{
    text-align: center;
    font-size: 25px;
    color: #bbbec4;
    font-weight: 500;
    margin-top:-10px;
  }
  .home-img-h{
    width: 70px;
    text-align: center;

  }
  .home-img-box{
    width: 70px;
    margin-top: 8%;
    margin-left: auto;
    margin-right: auto;
  }
</style>
