<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style lang="less">
  .input-color .ivu-input{
    color: #000000 !important;
  }
  .drug-line{
    width: 100%;
    height: 2px;
    background-color: #2b85e4;
  }
  .blood-subhead{
    border-left: solid 5px #348EED;
    line-height: 14px;
    padding-left: 8px;
  }
  .drug-title{
    margin-left: 50px;
    font-size: 14px;
    color: #000000;
    margin-top: 5px;
    font-weight: bold;
  }
  .msg-item-p{
    padding: 6px 15px;
    font-size: 13px;
    color: #323232;
    line-height: 18px;
  }
  .msg-item-sm-width{
    width: 250px;
    min-height: 30px;
  }
  .msg-item-lg-width{
    min-height: 60px;
  }
  .fr{
    float: right;
  }
  .fl{
    float: left;
  }
  .ma-right{
    margin-right: 10px;
  }
  .msg-item-box{
    background-color: #eef1fe;
    /*max-width:;*/
    /*text-align: center;*/
    border-radius: 3px;
    font-weight: bold;
  }
  .msg-item-sm-width-ao{
    width: auto;
  }
  .demo-upload-list{
    display: inline-block;
    width: 60px;
    height: 60px;
    text-align: center;
    line-height: 60px;
    border: 1px solid transparent;
    border-radius: 4px;
    overflow: hidden;
    background: #fff;
    position: relative;
    box-shadow: 0 1px 1px rgba(0,0,0,.2);
    margin-right: 4px;
  }
  .demo-upload-list img{
    width: 100%;
    height: 100%;
  }
  .demo-upload-list-cover{
    display: none;
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    background: rgba(0,0,0,.6);
  }
  .demo-upload-list:hover .demo-upload-list-cover{
    display: block;
  }
  .demo-upload-list-cover i{
    color: #fff;
    font-size: 20px;
    cursor: pointer;
    margin: 0 2px;
  }
  .subhead-ico{
    float: right;
    color: #323232;
    font-size: 16px;
    margin-right: 6px;
    line-height: 26px;
  }
  .subhead-triangle-style{
    position: absolute;
    width: 0;
    height: 0;
    border-left: 8px solid transparent;
    border-right:8px solid transparent;
    border-top:4px solid #323232;
    left: 60px;
    top: 26px;
  }
  .subhead-text{
    width: 150px;
    height: 100%;
    line-height: 26px;
    padding: 0 10px;
    float: left;
  }
  .subhead-box{
    background-color: #e8eaec;
    height: 26px;
    width: 100%;
    position: relative;
  }
  .borderColor-green{
    border-top:10px solid #19be6b;
  }
  .borderColor-dark{
    border-top:10px solid #17233d;
  }
  .borderColor-gray{
    border-top:10px solid #515a6e;
  }
  .borderColor-blue{
    border-top:10px solid #2d8cf0;
  }
  .bgTitleColor-green{
    background-color: #19be6b;
    color: #ffffff;
  }
  .bgTitleColor-dark{
    background-color: #17233d;
    color: #ffffff;
  }
  .bgTitleColor-gray{
    background-color: #515a6e;
    color: #ffffff;
  }
  .bgTitleColor-blue{
    background-color: #2d8cf0;
    color: #ffffff;
  }
  .bgColor-green .ivu-card-head{
    background-color: #19be6b;
    color: #ffffff;
  }
  .bgColor-dark .ivu-card-head{
    background-color: #17233d;
    color: #ffffff;
  }
  .bgColor-gray .ivu-card-head{
    background-color: #515a6e;
    color: #ffffff;
  }
  .bgColor-blue .ivu-card-head{
    background-color: #2d8cf0;
    color: #ffffff;
  }
  .card-title-style .ivu-card-head{
     padding: 10px 20px;
  }
.size{
  width: 100%;
  height: 100%;
}
html,body{
  .size;
  overflow: hidden;
  margin: 0;
  padding: 0;
}
#app {
  .size;
}
.ivu-notice{
  z-index: 999999999999 !important;
}
.pageStyle{
  text-align: center;
  margin: 25px 0;
  margin-bottom: 5px;
}
</style>
