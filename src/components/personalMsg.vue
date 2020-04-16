<template>
  <div>
    <i class="el-icon-s-custom" @click="dialog = true" style=" text-align: center; font-size: 24px;" title="个人资料"></i>
    <el-drawer
      :before-close="handleClose"
      :visible.sync="dialog"
      :with-header="false"
      direction="ltr"
      custom-class="demo-drawer"
      ref="drawer"
    >
      <div style="text-align: center; height: 40px; margin-top: 80px">个人资料</div>
      <div class="demo-drawer__content">

        <el-form :model="form" style="text-align: left">
          <ul style=" list-style: none">
            <li class="lis">
              姓名:<span>{{form.name}}</span>
            </li>
            <li class="lis">
              性别:<span>{{form.sex === 1 ? '男' : '女'}}</span>
            </li>
            <li class="lis">
              年龄:<span>{{form.age}}</span>
            </li>
            <li class="lis">
              权限:<span>{{form.role === 1 ? '社员' : '管理'}}</span>
            </li>
          </ul>
        </el-form>
        <div class="demo-drawer__footer">
          <el-button type="primary" @click="innerVisible = true" style="width: 60%">修  改</el-button>
          <el-button type="primary" @click="passwordVisible = true" style="width: 60%;margin-left: 0px">密码修改</el-button>

          <el-button type="warning" @click="goBack()" style="width: 60%;margin-top: 10px;margin-left: 0px">退  出</el-button>
          <el-dialog
            title="个人信息"
            :visible.sync="passwordVisible"
            append-to-body
            :center="true"
            :close-on-click-modal="false"
            :close-on-press-escape="false">
            <el-form :model="passwordForm">
              <el-form-item label="旧密码" :label-width="formLabelWidth">
                <el-input v-model="passwordForm.oldPassword" type="password" autocomplete="off"></el-input>
              </el-form-item>
              <el-form-item label="新密码" :label-width="formLabelWidth">
                <el-input v-model="passwordForm.newPassword" type="password" autocomplete="off"></el-input>
              </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
              <el-button @click="passwordVisible = false">取 消</el-button>
              <el-button type="primary" @click="updatePassword">确 定</el-button>
            </div>
          </el-dialog>
          <el-dialog
            title="个人信息"
            :visible.sync="innerVisible"
            append-to-body
            :center="true"
            :close-on-click-modal="false"
            :close-on-press-escape="false"
          >
            <el-form :model="form">
              <el-form-item label="姓名" :label-width="formLabelWidth">
                <el-input v-model="form.name" autocomplete="off"></el-input>
              </el-form-item>
              <el-form-item label="年龄" :label-width="formLabelWidth">
                <el-input v-model="form.age" autocomplete="off"></el-input>
              </el-form-item>
              <el-form-item label="性别" :label-width="formLabelWidth">
                <el-radio-group v-model="form.sex">
                  <el-radio :label="1">男</el-radio>
                  <el-radio :label="0">女</el-radio>
                </el-radio-group>
                <!--<input type="radio" v-model="form.sex" value="男"><label>男</label>
                <input type="radio" v-model="form.sex" value="女"><label>女</label>-->
              </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
              <el-button @click="innerVisible = false">取 消</el-button>
              <el-button type="primary" @click="check">确 定</el-button>
            </div>
          </el-dialog>
        </div>
      </div>
    </el-drawer>
  </div>
</template>

<script>
import userApi from '../api/userApi'

export default {
  name: 'personalMsg',
  data () {
    return {
      passwordVisible: false,
      dialog: false,
      innerVisible: false,
      formLabelWidth: '80px',
      form: {...JSON.parse(localStorage.getItem('user'))},
      passwordForm: {
        id: JSON.parse(localStorage.getItem('user')).id,
        oldPassword: '',
        newPassword: ''
      }
    }
  },
  methods: {
    updatePassword () {
      userApi.updateUserPassword(this.passwordForm.id, this.passwordForm.oldPassword, this.passwordForm.newPassword).then(res => {
        if (res.code === 200) {
          this.$message.success('修改成功')
          this.passwordVisible = false
        } else {
          this.$message.error(res.message)
        }
      })
    },
    handleClose () {
      this.dialog = false
    },
    goBack () {
      this.$router.push('/')
    },
    check () {
      if (this.form.name === '') {
        alert('请输入昵称')
      } else if (isNaN(this.form.age)) {
        alert('请输入正确年龄')
      } else if (this.form.age === '') {
        alert('年龄不得为空')
      } else if (this.form.age >= 200 || this.form.age < 1) {
        alert('年龄不得大于200也不得小于1')
      } else {
        userApi.updateUserInfo(this.form).then(res => {
          if (res.code === 200) {
            this.$message.success('修改成功')
            this.innerVisible = false
          } else {
            this.$message.error('修改失败')
          }
        })
      }
    }
  }
}
</script>

<style scoped>
  /deep/ .el-dialog{
    width: 25%;
    padding: 0px;
  }
  /deep/ .el-dialog__body{
    padding: 10px  0px;
  }
  /deep/ .el-input{
    width: 250px;
  }
</style>
