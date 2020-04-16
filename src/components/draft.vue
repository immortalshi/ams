<template>
  <div>
    <i class="el-icon-edit-outline" @click="dialogWrite = true" style=" text-align: center; font-size: 24px;"></i>
    <el-dialog
      :visible.sync="dialogWrite"
      width="90%"
      :before-close="writeClose">
      <span style="margin: 10px 0px;font-size: 24px">题目</span>
      <el-input type="text" v-model="articleObj.name"></el-input>
      <span style="margin: 10px 0px;font-size: 24px">作者</span>
      <el-input type="text" v-model="articleObj.authorName" disabled></el-input>
      <span style="margin: 10px 0px;font-size: 24px">正文</span>
      <quill-editor  ref="myQuillEditor" v-model="articleObj.content"></quill-editor>
<!--
      <el-input type="textarea" v-model="inner"></el-input>
-->
      <span slot="footer" class="dialog-footer">
    <el-button @click="dialogWrite = false">取 消</el-button>
    <el-button type="primary" @click="addNewArticle">提交</el-button>
  </span>
    </el-dialog>
  </div>
</template>

<script>
import articleApi from '../api/articleApi'

export default {
  name: 'draft',
  data () {
    return {
      dialogWrite: false,
      articleTitle: '',
      articleObj: {
        content: '',
        name: '',
        authorName: JSON.parse(localStorage.getItem('user')).name,
        userId: JSON.parse(localStorage.getItem('user')).id
      },
      inner: ''
    }
  },
  watch: {
    dialogWrite () { // 关闭弹窗后重置内容
      this.articleObj.content = ''
      this.articleObj.name = ''
    }
  },
  methods: {
    addNewArticle () {
      this.$confirm('确认提交？', '提示', {
        confirmButton: '确定',
        cancelButtonText: '取消'
      }).then(() => {
        if (this.articleObj.content === '' || this.articleObj.name === '') {
          this.articleObj.content === '' ? this.$message.error('文章内容不能为空') : this.$message.error('文章标题不能为空')
        } else {
          articleApi.addNewArticle(this.articleObj).then(res => {
            if (res.code === 200) {
              this.$message.success('新增成功')
              this.dialogWrite = false
            } else {
              this.$message.error('新增失败，请重新提交')
            }
          })
        }
      })
    },
    writeClose (done) {
      this.$confirm('确认关闭？')
        .then(_ => {
          done()
        })
        .catch(_ => {})
    }
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
  /deep/ .ql-editor{
    min-height: 300px;
  }
</style>
