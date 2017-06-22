
<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>
<style lang="css">
  *{
    padding:0;
    margin:0;
    box-sizing: border-box;
  }
  body,html,#app{
    width:100%;
    height:100%;
    overflow:hidden;
  }
  body,input,textarea,button{
      font-family: "Helvetica Neue",Helvetica,"PingFang SC","Hiragino Sans GB","Microsoft YaHei","微软雅黑",Arial,sans-serif;
  }
</style>