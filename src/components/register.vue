
<template>
  <div class="img" :style="img">
<!--
    <el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm" style="border-radius: 30px">
      <div style="font-size: 24px; margin: 20px 0px">注  册</div>
      <el-form-item label="用户名:" prop="admin">
        <el-input type="password" v-model="ruleForm.admin" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="密码:" prop="pass">
        <el-input type="password" v-model="ruleForm.pass" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="权限:" prop="age">
        <el-radio-group v-model="ruleForm.access">
          <el-radio label="社员"></el-radio>
          <el-radio label="管理"></el-radio>
        </el-radio-group>
        &lt;!&ndash;<el-input v-model.number="ruleForm.age"></el-input>&ndash;&gt;
      </el-form-item>
      <el-form-item>
        <el-button class="btn" type="primary" @click="submitForm('ruleForm')">确认</el-button>
        <el-button class="btn" @click="resetForm('ruleForm')">取消</el-button>
      </el-form-item>
    </el-form>
-->
      <el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
      <div style="font-size: 24px; margin: 20px 0px"><span style="font-size: 15px;float: left;color: cornflowerblue;cursor: pointer" @click="toLogin">&lt;  登录 </span>注  册</div>
      <el-form-item label="用户名:" prop="name">
        <el-input v-model="ruleForm.name" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="密码:" prop="password">
        <el-input type="password" v-model="ruleForm.password" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="确认密码:" prop="checkPass">
        <el-input type="password" v-model="ruleForm.checkPass" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="年龄:" prop="age">
        <el-input v-model.number="ruleForm.age"></el-input>
      </el-form-item>
      <el-form-item label="性别:" prop="sex">
        <el-radio-group v-model="ruleForm.sex">
          <el-radio :label="0" value="男生">男生</el-radio>
          <el-radio :label="1" value="女生">女生</el-radio>
        </el-radio-group>
      </el-form-item>
      <!--<el-form-item label="权限:" prop="access">-->
        <!--<el-radio-group v-model="ruleForm.role">-->
          <!--<el-radio label="1" value="社员">社员</el-radio>-->
          <!--<el-radio label="0" value="管理">管理</el-radio>-->
        <!--</el-radio-group>-->
      <!--</el-form-item>-->
      <el-form-item>
        <el-button class="btn" type="primary" @click="submitForm('ruleForm')">提交</el-button>
        <el-button class="btn" @click="resetForm('ruleForm')">重置</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import userApi from '../api/userApi'

export default {
  name: 'register',
  data () {
    var checkAge = (rule, value, callback) => {
      if (!value) {
        return callback(new Error('年龄不能为空'))
      }
      setTimeout(() => {
        if (!Number.isInteger(value)) {
          callback(new Error('请输入数字值'))
        } else {
          if (value < 18) {
            callback(new Error('必须年满18岁'))
          } else {
            callback()
          }
        }
      }, 1000)
    }
    var validateAdmin = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入用户名'))
      } else {
        callback()
      }
    }
    var validatePass = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入密码'))
      } else {
        if (this.ruleForm.password.split('').length < 6) {
          callback(new Error('密码不能少于6位数'))
        }
        if (this.ruleForm.checkPass !== '') {
          this.$refs.ruleForm.validateField('checkPass')
        }
        callback()
      }
    }
    var validatePass2 = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请再次输入密码'))
      } else if (value !== this.ruleForm.password) {
        callback(new Error('两次输入密码不一致!'))
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
        checkPass: '',
        password: '',
        age: '',
        sex: 0,
        email: ''
      },
      rules: {
        name: [
          { validator: validateAdmin, trigger: 'blur' }
        ],
        password: [
          { validator: validatePass, trigger: 'blur' }
        ],
        checkPass: [
          { validator: validatePass2, trigger: 'blur' }
        ],
        age: [
          { validator: checkAge, trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    submitForm (formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          let userObj = {
            name: this.ruleForm.name,
            password: this.ruleForm.password,
            age: this.ruleForm.age,
            sex: this.ruleForm.sex,
            email: this.ruleForm.email
          }
          userApi.register(userObj).then(res => {
            if (res.code === 200) {
              this.$message.success('注册成功')
            } else {
              this.$message.error(res.message)
            }
          })
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    toLogin () {
      this.$router.push('/')
    },
    resetForm (formName) {
      this.$refs[formName].resetFields()
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
