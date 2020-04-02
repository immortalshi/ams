<!--
<template>

</template>

<script>
    export default {
        name: "register"
    }
</script>

<style scoped>

</style>
-->
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
      <div style="font-size: 24px; margin: 20px 0px">注  册</div>
      <el-form-item label="用户名:" prop="admin">
        <el-input type="password" v-model="ruleForm.admin" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="密码:" prop="pass">
        <el-input type="password" v-model="ruleForm.pass" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="确认密码:" prop="checkPass">
        <el-input type="password" v-model="ruleForm.checkPass" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="年龄:" prop="age">
        <el-input v-model.number="ruleForm.age"></el-input>
      </el-form-item>
      <el-form-item label="性别:" prop="sex">
        <el-radio-group v-model="ruleForm.sex">
          <el-radio label="男生"></el-radio>
          <el-radio label="女生"></el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="权限:" prop="access">
        <el-radio-group v-model="ruleForm.access">
          <el-radio label="社员"></el-radio>
          <el-radio label="管理"></el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item>
        <el-button class="btn" type="primary" @click="submitForm('ruleForm')">提交</el-button>
        <el-button class="btn" @click="resetForm('ruleForm')">重置</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
  export default {
    name: "register",
    data(){
      var checkAge = (rule, value, callback) => {
        if (!value) {
          return callback(new Error('年龄不能为空'));
        }
        setTimeout(() => {
          if (!Number.isInteger(value)) {
            callback(new Error('请输入数字值'));
          } else {
            if (value < 18) {
              callback(new Error('必须年满18岁'));
            } else {
              callback();
            }
          }
        }, 1000);
      };
      var validateAdmin = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入用户名'));
        } else {
          callback();
        }
      };
      var validatePass = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入密码'));
        } else {
          if (this.ruleForm.checkPass !== '') {
            this.$refs.ruleForm.validateField('checkPass');
          }
          callback();
        }
      };
      var validatePass2 = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请再次输入密码'));
        } else if (value !== this.ruleForm.pass) {
          callback(new Error('两次输入密码不一致!'));
        } else {
          callback();
        }
      };
      return{
        img:{
           backgroundImage:"url(" + require("../../build/timg.gif") + ")",
           backgroundRepeat:"no-repeat",
          /*backgroundColor:'black '*/
        },
        ruleForm: {
          admin:'',
          checkPass:'',
          pass: '',
          age:'',
          sex:'男生',
          access: '社员'
        },
        rules: {
          admin: [
            { validator: validateAdmin, trigger: 'blur' }
          ],
          pass: [
            { validator: validatePass, trigger: 'blur' }
          ],
          checkPass: [
            { validator: validatePass2, trigger: 'blur' }
          ],
          age: [
            { validator: checkAge, trigger: 'blur' }
          ],
        }
      };
    },
    methods: {
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            this.$router.push("/")
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },
      resetForm(formName) {
        this.$refs[formName].resetFields();
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
