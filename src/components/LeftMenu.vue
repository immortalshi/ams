<template>
  <el-container>
    <el-header>
      <div style="margin-top: 10px;">
        <el-input placeholder="请输入内容" v-model="input" class="searchArticles" >
          <el-button slot="append" icon="el-icon-search" @click="searchArticles"></el-button>
        </el-input>
      </div>
    </el-header>
    <el-container>
      <el-aside width="260px">
        <el-row class="tac">
          <el-col :span="12">
            <el-menu
              default-active="2"
              class="el-menu-vertical-demo"
              @open="handleOpen"
              @close="handleClose"
              router
              background-color="#545c64"
              text-color="#fff"
              active-text-color="#ffd04b">
              <el-menu-item index="/index">
                <i class="el-icon-menu"></i>
                <span slot="title">首页</span>
              </el-menu-item>
              <el-menu-item index="articles">
                <i class="el-icon-notebook-1"></i>
                <span slot="title">文库</span>
              </el-menu-item>
              <el-menu-item index="write">
                <i class="el-icon-edit-outline"></i>
                <span slot="title">稿件</span>
              </el-menu-item>
              <el-menu-item index="collect">
                <i class="el-icon-star-off"></i>
                <span slot="title">收藏</span>
              </el-menu-item>
              <el-menu-item index="check"
              v-if="access === '管理'">
                <i class="el-icon-edit"></i>
                <span slot="title">审核</span>
              </el-menu-item>
            </el-menu>
          </el-col>
        </el-row>
        <el-row style="width:60px;height: 100%; background: lightgrey; margin: 0px;padding: 0px; float: left">
          <el-col class="hover" style="height: 60px;line-height:60px;">
            <personalMsg></personalMsg>
          </el-col>
          <el-col class="hover" style="height: 60px;line-height:60px;" >
            <message></message>
          </el-col>
          <el-col class="hover" style="height: 60px;line-height:60px;">
            <draft></draft>
          </el-col>
        </el-row>
      </el-aside>
      <el-container>
        <el-main><router-view></router-view></el-main>
      </el-container>
    </el-container>
    <el-footer>Footer</el-footer>
  </el-container>
</template>

<script>
import personalMsg from './personalMsg.vue'
import message from './message.vue'
import draft from './draft.vue'
export default {
  name: 'LeftMenu',
  components: {
    personalMsg,
    message,
    draft
  },
  data () {
    return {
      access: '管理',
      loading: false,
      input: '',
      timer: null
    }
  },
  methods: {
    handleDelete (index, row) {
      console.log(index, row)
    },
    handleOpen (key, keyPath) {
      console.log(key, keyPath)
    },
    handleClose (key, keyPath) {
      console.log(key, keyPath)
    },
    searchArticles () {
      this.$store.dispatch('userInfo/setSearchText', this.input)
    }
  }
}
</script>

<style scoped>
  html{
    margin: 0px;
    padding: 0px;
  }
  /deep/ .el-container{
    min-height:650px;
    max-height: 1200px;
    margin: 0px;
    padding: 0px;
  }
  /deep/ .el-menu-item{
    text-align: left;
  }
  /deep/ .el-row{
    height: 100%;
    float: left;
  }
  /deep/ .el-col-12{
    height: 100%;
    width: 100%
  }
  /deep/ .el-menu{
    height: 100%;
    width: 200px;
    border: none;
  }
  /deep/ .demo-drawer{
    width: 20% !important;
  }
  /deep/ .el-drawer__header{
    height: 40px;
    border: none;
    tabindex:none !important;
  }
  /deep/ .el-dialog{
    width: 35%;
  }
  /deep/ .el-badge__content{
    font-size: 10px;
  }
  /deep/ .is-fixed{
    top: 15px;
    right: 15px;
  }
  /deep/.el-drawer{
    width: 20% !important;
  }
  .el-header, .el-footer {
    background-color: #B3C0D1;
    color: #333;
    text-align: center;
    line-height: 60px;
  }
  .el-aside {
    background-color: #D3DCE6;
    color: #333;
    text-align: center;
  }
  .el-main {
    background-color: #E9EEF3;
    padding: 0px;
    color: #333;
    text-align: center;
  }
  .lis{
    height: 40px;
  }
  .hover:hover{
    background: lightblue;
  }
  .searchArticles {
    width: 330px;
    float: right;
    margin-top: 0px;
    margin-right: 30px;
  }
  .input-with-select{
    background-color: #fff;
  }
</style>
