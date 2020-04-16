<template>
  <div class="img" :style="img">
    <el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm" style="border-radius: 30px">
      <div style="font-size: 24px; margin: 20px 0px">登  录</div>
      <el-form-item label="用户名:" prop="name">
        <el-input type="test" v-model="ruleForm.name" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="密码:" prop="pass">
        <el-input type="password" v-model="ruleForm.password" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="权限:" prop="role">
        <el-radio-group v-model="ruleForm.role">
          <el-radio label="1" value="社员">社员</el-radio>
          <el-radio label="0" value="管理">管理</el-radio>
        </el-radio-group>
      </el-form-item>
        <el-form-item>
          <el-button class="submit" type="primary" @click="login('ruleForm')">登录</el-button>
          <el-button class="btn" @click="resetForm('ruleForm')">注册</el-button>
        </el-form-item>
    </el-form>
  </div>
</template>

<script>
import userApi from '../api/userApi'

export default {
  name: 'login',
  data () {
    var validatename = (rule, value, callback) => {
      if (value === '') {
        return callback(new Error('请输入用户名'))
      } else {
        callback()
      }
    }
    var validatePass = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入密码'))
      } else {
        callback()
      }
    }
    return {
      img: {
        backgroundImage: 'url(' + require('../../build/timg.gif') + ')',
        backgroundRepeat: 'no-repeat'
      },
      ruleForm: {
        name: '',
        password: '',
        role: '1'
      },
      rules: {
        name: [
          { validator: validatename, trigger: 'blur' }
        ],
        password: [
          { validator: validatePass, trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    login (formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          userApi.login(this.ruleForm).then(res => {
            if (res.code === 200) {
              localStorage.setItem('user', JSON.stringify(res.res))
              this.$router.push('/index')
            } else {
              this.$message.error(res.message)
            }
          })
            .catch(e => {
              console.log(e)
            })
        }
      })
    },
    resetForm (formName) {
      this.$router.push('/register')
    }
  }
}
</script>

<style scoped>
  .img{
    width: 100%;
    position: absolute;
    background-size: 100% 100%;
    margin: 0px;
    padding: 0px;
  }
  .btn{
    margin:0px 20px 20px !important;
  }
  /deep/ .demo-ruleForm{
    width: 400px;
    margin: 250px auto;
    background-color: rgba(255,255,255,0.6);
  }
  /deep/ .el-input{
    width: 250px;
    float: left;
  }
  /deep/ .el-radio-group{
    width:200px;
    float: left;
    margin-top: 15px;
  }
  /deep/ .el-form-item__content{
    margin: 0px !important;
  }
  /deep/ .el-form-item__error{
    margin-left: 100px;
  }
</style>
