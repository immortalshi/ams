<template>
  <div id="app">
    <el-container v-if="$route.meta.keepAlive">
      <LeftMenu></LeftMenu>
    </el-container>
    <router-view v-if="!$route.meta.keepAlive"></router-view>
  </div>
</template>
<meta http-equiv="Access-Control-Allow-Origin" content="*" />
<script>
  import LeftMenu from '@/components/LeftMenu'
export default {
  name: 'App',
  components:{
    'LeftMenu':LeftMenu
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
  body{
    margin: 0px;
    padding: 0px;
  }
</style>
