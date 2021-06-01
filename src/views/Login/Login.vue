<template>
    <div class="bgImg">
      <div>&nbsp;</div>
      <div class="login">
        <el-form ref="form" :model="form" :rules="rules" label-width="80px" class="formWrapper">
          <h3 class="login-title">登陆</h3>

          <el-form-item label="用户名" prop="user_name">
            <el-input v-model="form.user_name" placeholder="请输入用户名"></el-input>
          </el-form-item>

          <el-form-item label="密码" prop="password">
            <el-input type="password" v-model="form.password"  placeholder="请输入密码" @keyup.enter.native="Login('form')"></el-input>
          </el-form-item>
          <el-form-item label="验证码" prop="verificationCode" style="position: relative;">
                <el-input v-model="form.verificationCode" autocomplete="off"  style="width: 160px;"></el-input>
                  <div @click="refreshCode" class="codeWrapper">
                    <a href="javascript:;">
                      <identify-code
                          :identifyCode="identifyCode"
                          :contentWidth="150"
                          :contentHeight="40"
                          :fontSizeMin="40"
                      />
                    </a>
                  </div>
              </el-form-item>
          <el-form-item>
            <el-button @click="goBack">取消</el-button>
            <el-button type="primary" @click="Login('form')" >登录</el-button>
            
          </el-form-item>
          <el-form-item>
            <el-link @click="openEnrol">还没有账号？立即注册<i class="el-icon-view el-icon--right"></i> </el-link>
          </el-form-item>
        </el-form>


      <el-dialog title="用户注册" :visible.sync="dialogVisible" width="40%">
        <el-form ref="form" :model="userForm" :rules="rules" label-width="80px">
          <el-form-item label="用户名" prop="user_name">
            <el-input
              v-model="userForm.user_name"
              placeholder="请输入用户名"
            ></el-input>
          </el-form-item>
          <el-form-item label="密码" prop="password">
            <el-input
              type="password"
              v-model="userForm.password"
              placeholder="请输入密码"
            ></el-input>
          </el-form-item>
          <el-form-item label="身份证" prop="id_card">
            <el-input
              v-model="userForm.id_card"
              placeholder="请输入身份证号"
            ></el-input>
          </el-form-item>
          <el-form-item label="手机号" prop="phone">
            <el-input
              v-model="userForm.phone"
              placeholder="请输入手机号"
            ></el-input>
          </el-form-item>
          <el-form-item label="出生日期" prop="birthday">
            <el-date-picker
              v-model="userForm.birthday"
              type="date"
              placeholder="选择日期"
              format="yyyy 年 MM 月 dd 日"
              value-format="yyyy-MM-dd"
            >
            </el-date-picker>
          </el-form-item>
          <el-form-item label="性别" prop="gender">
            <el-radio-group v-model="userForm.gender">
              <el-radio :label="0">男</el-radio>
              <el-radio :label="1">女</el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="备注/描述">
            <el-input type="textarea" v-model="userForm.desc"></el-input>
          </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
          <el-button @click="dialogVisible = false">取 消</el-button>
          <el-button type="primary" @click="addUser">添 加</el-button>
        </span>
      </el-dialog>
      </div>
      
    </div>
</template>

<script>
import IdentifyCode from "@/components/common/IdentifyCode.vue"
export default {
    name:  '',
    mixins: [],
    props: {},
    components: {
      IdentifyCode
    },
    data () {
      var codeRules = (rule, value, callback) => {
        console.log(value);
                if (value === '') {
                    //return "验证码不能为空";
                    return callback(new Error('验证码不能为空'));
                }else if (value.toLowerCase() !== this.identifyCode.toLowerCase()) {
                    //return "验证码输入不正确";
                    return callback(new Error('验证码输入不正确!'));
                } else {
                    return callback();;
                }
    }
        return {
          //生成验证码的字符范围
          identifyCodes: "ABCDEFGHJKMNPQRSTWXYZabcdefhijkmnprstwxyz0123456789",
          //生成的验证码
          identifyCode: "",
          userData:{},
          dialogVisible: false,

          form: {
            user_name: '',
            password:'',
            verificationCode:'',
          },
          userForm: {
            user_name: "",
            password: "",
            phone: "",
            id_card: "",
            gender: "",
            level: 0,
            birthday: "",
            desc: "",
          },
          rules: {
            user_name: [
              { required: true, message: '请输入用户名', trigger: 'blur' },
              { min: 1, max: 15, message: '长度在 1 到 15 个字符', trigger: 'blur' }
            ],
            password: [
              { required: true, message: '请输入密码', trigger: 'blur' },
              { min: 6, max: 15, message: '长度在 8 到 15 个字符', trigger: 'blur' }
            ],
            phone: [
              { required: true, message: '请输入手机号', trigger: 'blur' },
              { min: 11, max: 11, message: '请输入正确的手机号！', trigger: 'blur' }
            ],
            id_card: [
              { required: true, message: '请输入身份证号', trigger: 'blur' },
              { min: 18, max: 18, message: '请输入正确的身份证号！', trigger: 'blur' }
            ],
            birthday: [
              { required: true, message: '请选择出生日期！', trigger: 'blur' },
            ],
            gender: [
              { required: true, message: '请选择性别！', trigger: 'chenge' },
            ],
            verificationCode:[
          { required: true, message: "请输入验证码！", trigger: "blur" },
            { validator: codeRules, trigger: 'blur'}
        ]
          }
        }
    },
    watch: {

    },
    computed: {

    },
    created () {
      this.axios({
        method:'POST',
        url:'/user'
      }).then(res => {
        //console.log(res);
        if(res.status == 200 && res.data.code == 10000){
          this.userData = res.data.data.user
          this.$notify({
              title: '成功',
              message: '登录成功！',
              type: 'success'
            });   
          if(res.data.data.user.level == 1){
            this.$router.push('/admin')
          }else{
            this.$router.push('/index')
          }
          //console.log(this.userData);
        }
      })
    },
    mounted () {
      this.identifyCode = "";
      this.makeCode(this.identifyCodes, 4);
    },
    methods: {
    //生成随机数
    randomNum(min, max) {
      return Math.floor(Math.random() * (max - min) + min);
    },
    //刷新验证码
    refreshCode() {
      this.identifyCode = "";
      this.makeCode(this.identifyCodes, 4);
    },
    //生成验证码，l为生成验证码的长度
    makeCode(o, l) {
      for (let i = 0; i < l; i++) {
        //随机字符串拼接
        this.identifyCode += this.identifyCodes[
        this.randomNum(0, this.identifyCodes.length)
        ];
      }
    },
    Login(formName){
        this.$refs[formName].validate((valid) => {
          if (valid) {
            //如果校验成功进入此
            //请求登录
            this.axios({
              method:'POST',
              url:'/user/login',
              data:JSON.stringify({
                user_name:this.form.user_name,
                password:this.form.password
              })
            }).then(res => {
              console.log(res);
              if (res.status == 200 && res.data.code == 10000) {
                //console.log('123');
                this.$message({
                  message: '登录成功',
                  type: 'success'
                });
                //跳转到对应的界面
                if(res.data.data.level == 1){
                  this.$router.push('/admin/index')
                }else{
                  this.$router.push('/index')
                }
              }else if(res.data.code == 20003){     //重复登录
                this.$message.error('用户已经登录，请勿重复登录！');
              }else if(res.data.code == 20007){     //账号错误
                this.$message.error('用户名不存在！');
              }else if(res.data.code == 20001){     //密码错误
                this.$message.error('密码错误！');
              }
            })
          } else {
            this.$message.error('请输入正确格式的用户名或密码');
            return false;
          }
        });

        
      },
      test(){
        //console.log(this.name);
      },
      goBack(){
        this.$router.go(-1)
      },
      openEnrol(){
        this.dialogVisible = true
      },
      addUser(){
          this.axios({
          method: "POST",
          url: "/user/register",
          data: JSON.stringify(this.userForm),
        }).then(res => {
                console.log(res);
                if (res.status == 200 && res.data.code == 10000) {
                    this.$message({
                            type: 'success',
                            message: '注册成功! 1秒后跳转页面！'
                    });
                    //location.reload()
                    //this.dialogVisible = false
                    this.axios({
                      method:'POST',
                      url:'/user/login',
                      data:JSON.stringify({
                        user_name:this.userForm.user_name,
                        password:this.userForm.password
                      })
                    }).then(res => {
                      console.log(res);
                      if (res.status == 200 && res.data.code == 10000) {
                        //console.log('123');
                        this.$message({
                          message: '登录成功',
                          type: 'success'
                        });
                        //跳转到对应的界面
                        if(res.data.data.level == 1){
                          this.$router.push('/admin/index')
                        }else{
                          this.$router.push('/index')
                        }
                      }
                    })
                }else if(res.data.code == 10002){
                    this.$message.error('此手机号已被注册，请重新输入!');
                }
            })
      }
    }
}
</script>

<style scoped>
.bgImg{
  width: 100%;
  height: 937px;
  background-image: url('../../assets/img/bgc3.jpg');
  position: relative;
}
  .login{
    width: 400px;
    background-color: rgba(255, 255, 255, 0.733);
    box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
    padding: 20px 20px 10px 5px;
    border-radius: 20px;
    margin: 260px auto;
/*     position: absolute;
    top:50px;
    right: 600px; */
  }
  .login-title{
    text-align: center;
    color: #409EFF;
  }
  .hhh{
    display: inline-block;
    height: 40px;
    padding-top: 2px;
  }
  .codeWrapper{
    width: 150px;
    height: 45px;
    position: absolute;
    right: 0;
    top: 0;
  }
</style>
