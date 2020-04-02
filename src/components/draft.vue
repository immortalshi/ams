<template>
  <div>
    <i class="el-icon-edit-outline" @click="dialogWrite = true" style=" text-align: center; font-size: 24px;"></i>
    <el-dialog
      :visible.sync="dialogWrite"
      width="50%"
      :before-close="writeClose">
      <span style="margin: 10px 0px;font-size: 24px">题目</span>
      <el-input type="text" v-model="articleTitle"></el-input>
      <span style="margin: 10px 0px;font-size: 24px">作者</span>
      <el-input type="text" v-model="writer" disabled></el-input>
      <span style="margin: 10px 0px;font-size: 24px">正文</span>
      <el-input type="textarea" v-model="inner"></el-input>
      <span slot="footer" class="dialog-footer">
    <el-button @click="dialogWrite = false">取 消</el-button>
    <el-button type="primary" @click="dialogWrite = false">提交</el-button>
  </span>
    </el-dialog>
  </div>
</template>

<script>
    export default {
        name: "draft",
      data(){
          return{
            dialogWrite:false,
            articleTitle:'',
            writer:'sss',
            inner:'',
        }
      },
      methods:{
        writeClose(done) {
          this.$confirm('确认关闭？')
            .then(_ => {
              done();
            })
            .catch(_ => {});
        },
      }
    }
</script>

<style scoped>
  /deep/ .el-dialog__body{
    margin: 0px 30px;
    padding: 0px 20px;
  }
  /deep/ .el-dialog__footer{
    text-align: center;
  }
  /deep/ .el-textarea__inner{
    min-height: 200px !important;
  }
</style>
