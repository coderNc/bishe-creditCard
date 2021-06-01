<template>
  <div>
    <el-container style="height: 100%; border: 1px solid #eee">
      <el-container>
        <el-header style="text-align: right; font-size: 14px">
            <el-button type="primary" icon="el-icon-s-fold" class="btn01" @click="toggleAside"></el-button>
          <el-tooltip class="item" effect="dark" content="去主页" placement="bottom">
            <el-link class="goHome" @click="goHome">
              <i class="el-icon-s-home"></i> 主页
            </el-link>
          </el-tooltip>
          <!-- <img class="avatar" :src="userData.picture"> -->
					<div class="welcome">
						<p class="name comename">欢迎</p>
					<!-- 	<p class="name avatarname">{{userData.user.user_name}}</p> -->
					</div>
          <el-dropdown trigger="click">
            <span class="el-dropdown-link">
                <i class="el-icon-arrow-down el-icon--right"></i>
            </span>
            <el-dropdown-menu slot="dropdown">
                <el-dropdown-item icon="el-icon-plus" @click.native="goUserInfo">个人信息</el-dropdown-item>
                <el-dropdown-item icon="el-icon-circle-plus-outline" @click.native="logout">退出登录</el-dropdown-item>
            </el-dropdown-menu>
            </el-dropdown>
        </el-header>
        <div class="flec">
            <el-menu :default-active="activeIndex" :default-openeds="['1','2', '3','4']" class="el-menu-vertical-demo menuWrapper"  :collapse="isCollapse">

            <el-menu-item index="1" @click="goAdmin">
                <i class="el-icon-s-home"></i>
                <span slot="title">首页</span>
            </el-menu-item>
            <el-submenu index="2">
                <template slot="title">
                <i class="el-icon-user"></i>
                <span slot="title">用户管理</span>
                </template>
                <el-menu-item-group>
                <el-menu-item index="2-1" @click="goUserList">用户列表</el-menu-item>
                </el-menu-item-group>
            </el-submenu>
            <el-submenu index="3">
                <template slot="title">
                <i class="el-icon-notebook-2"></i>
                <span slot="title">银行管理</span>
                </template>
                <el-menu-item-group>
                <el-menu-item index="3-1" @click="goBank">银行列表</el-menu-item>
                </el-menu-item-group>
            </el-submenu>
            <el-submenu index="4">
                <template slot="title">
                <i class="el-icon-menu"></i>
                <span slot="title">用户操作管理</span>
                </template>
                <el-menu-item-group>
                <el-menu-item index="4-1" @click="goCard">卡片管理</el-menu-item>
                </el-menu-item-group>
                <el-menu-item-group>
                <el-menu-item index="4-2" @click="gouserOperate">查询流水</el-menu-item>
                </el-menu-item-group>
            </el-submenu>
        </el-menu>
        <el-main class="mainContiner">
          <router-view></router-view>
        </el-main>
        </div>

      </el-container>
    </el-container>


    <el-dialog
        title="修改密码"
        :visible.sync="dialogVisible"
        width="30%">
          <el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
              <el-form-item label="旧密码" prop="oldPass">
              <el-input type="password" v-model="ruleForm.oldPass" autocomplete="off" placeholder="请输入旧密码"></el-input>
            </el-form-item>
            <el-form-item label="新密码" prop="pass">
              <el-input type="password" v-model="ruleForm.pass" autocomplete="off" placeholder="请输入新密码"></el-input>
            </el-form-item>
            <el-form-item label="确认密码" prop="checkPass">
              <el-input type="password" v-model="ruleForm.checkPass" autocomplete="off" placeholder="请再次输入新密码"></el-input>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="submitForm">提交</el-button>
              <el-button @click="resetForm('ruleForm')">重置</el-button>
            </el-form-item>
          </el-form>
        </el-dialog>

  </div>
</template>

<script>
export default {
  name: "",
  mixins: [],
  props: {},
  components: {},
  data() {
      var validatePass = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入新密码'));
        } else {
          if (this.ruleForm.checkPass !== '') {
            this.$refs.ruleForm.validateField('checkPass');
          }
          callback();
        }
      };
      var validatePass2 = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请再次新输入密码'));
        } else if (value !== this.ruleForm.pass) {
          callback(new Error('两次输入密码不一致!'));
        } else {
          callback();
        }
      };
    return {
      activeIndex:'',
      dialogVisible:false,
      ruleForm: {
        oldPass:'',
          pass: '',
          checkPass: '',
        },
        rules: {
          pass: [
            { validator: validatePass, trigger: 'blur' }
          ],
          checkPass: [
            { validator: validatePass2, trigger: 'blur' }
          ],
        },
        userData:{},
        isCollapse:  false
    };
  },
  watch: {},
  computed: {},
  created() {
    //请求登录页用户数据
      this.axios({
        method:'POST',
        url:'/user'
      }).then(res => {
        console.log(res);
        if(res.status == 200 && res.data.code == 10000){
          this.userData = res.data.data
          //console.log(this.userData);
        }
      }).catch(err =>{
        console.log(err);
      })
  },
  mounted(){},
  methods: {
    //跳转
    goUserInfo(){
      this.$router.push('/user')

    },
    goHome(){
        this.$router.push('/index')
      },
    goUserList() {
      this.activeIndex = '2-1'
      this.$router.push("/admin/user");
      
    },
    goCard(){
        this.$router.push('/admin/card')
    },
    goBank(){
        this.$router.push('/admin/bank')
    },
    gouserOperate(){
        this.$router.push('/admin/operate')
    },
    toggleAside(){
        this.isCollapse = !this.isCollapse
    },
    goAdmin(){
      this.$router.push('/admin')
    },
    //退出登录
    logout(){
      this.$confirm('确定退出?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
        }).then(() => {
            //调用删除用户接口
            this.axios({
              method:'POST',
              url:'/user/un-login',
              data:JSON.stringify({
                    id:this.userData.user.id
                  })
            }).then(res => {
                console.log(res);
                if (res.status == 200 && res.data.code == 10000) {
                    this.$message({
                            type: 'success',
                            message: '退出成功!'
                    });
                    this.$router.push('/login')
                }
            })
        }).catch(() => {
            this.$message({
            type: 'info',
            message: '已取消退出登录'
            });
        });
    },
    //修改密码
    openResetPassword(){
      this.dialogVisible = true
    },
    resetForm(formName) {
        this.$refs[formName].resetFields();
    },
    submitForm(){
      //console.log(typeof this.ruleForm.oldPass);
      //console.log(this.ruleForm.pass);
      this.axios({
        method:'post',
        url:'/user/password',
        params:{
          lastPassword:this.ruleForm.oldPass,
          newPassword:this.ruleForm.pass
        },
        headers:
        { 
          'Content-Type': 'application/json'
        }
      }).then(res => {
        console.log(res);
        if(res.status == 200 && res.data.status == 'success'){
          this.$message({
            type: 'success',
            message: '密码修改成功!'
            });
          this.dialogVisible = false
        }else{
          this.$message.error(res.data.data.errMsg+ '!请重新输入!');
        }
      })
    }
  }
}
</script>

<style scoped>
  .el-menu-vertical-demo:not(.el-menu--collapse) {
    width: 200px;
    min-height: 400px;
  }
.el-header {
  background-color: #b3c0d1;
  color: #333;
  line-height: 60px;
}
.el-aside {
  color: #333;
}

.el-header img {
  width: 60px;
  height: 60px;

}
.btn01{
    float: left;
    margin-top: 10px;
}
.goHome{
    text-decoration: none;
    margin-right: 20px;
}
.avatar {
		width: 40px;
		height: 40px;
		border-radius: 50%;
		vertical-align: middle;
		display: inline-block;
	}

	.welcome {
		display: inline-block;
		width: auto;
		vertical-align: middle;
		padding: 0 5px;
	}

	.name {
		line-height: 10px;
		text-align: center;
		font-size: 14px;
	}

	.comename {
		font-size: 12px;
	}

	.avatarname {
		color: #409eff;
		font-weight: bolder;
	}
    .mainContiner{
       /*  max-width: 1800px; */
        width: 1400px;
        /* margin-left: 60px; */
        flex: 1;
    }
    .flec{
        display: flex;
        justify-content: flex-start;
    }
</style>
