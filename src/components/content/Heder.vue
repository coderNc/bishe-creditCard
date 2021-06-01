<template>
  <div>
    <el-container class="navbar">
      <el-header style="text-align: right; font-size: 14px">
        <h3 v-show="isShowuser">Welcome ! &nbsp;&nbsp;&nbsp;{{this.userData.user.user_name}}</h3>
        <el-menu
          :default-active="activeIndex2"
          class="el-menu-demo menu"
          mode="horizontal"
          background-color="#545c64"
          text-color="#fff"
          active-text-color="#ffd04b">
          <el-menu-item index="1" @click="goHome">首页</el-menu-item>
          <el-submenu index="2">
            <template slot="title">银行卡</template>
            <el-menu-item index="2-1" @click="goBankInfo">我的银行卡</el-menu-item>
            <el-menu-item index="2-2" @click="goBindCard">绑定银行卡</el-menu-item>
            <el-menu-item index="2-3" @click="goMoneyInfo">存取款</el-menu-item>
            <el-menu-item index="2-4" @click="goMoneyMove">转账</el-menu-item>
            <el-menu-item index="2-3" @click="goUserOperate">查询流水</el-menu-item>
          </el-submenu>
          <el-menu-item index="3" @click="goUserInfo">个人信息</el-menu-item>
          <el-menu-item index="4" v-show="isShowuser" @click="unLogin">退出登录</el-menu-item>
          <el-menu-item index="4" v-show="isShowgoback" @click="goBack">后台管理</el-menu-item>
        </el-menu>
      </el-header>
    </el-container>
  </div>
</template>

<script>
export default {
  name: '',
  mixins: [],
  props: {},
  components: {},
  data () {
    return {
    isShowuser:false,
    isShowgoback:false,
    activeIndex2: '1',
    userData:{}
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
        console.log(res);
        if(res.status == 200 && res.data.code == 10000){
          this.userData = res.data.data
          this.isShowuser = true
          if(res.data.data.user.level == 1){
            this.isShowgoback = true
          }
          //console.log(this.userData);
        }
      }).catch(err =>{
        console.log(err);
      })
  },
  mounted () {

  },
  methods: {
    goHome(){
      this.$router.push('/index')
    },
    goBack(){
      this.$router.push('/admin')
    },
      goUserInfo(){
    this.$router.push('/user/userInfo')
  },
  goBankInfo(){
    this.$router.push('/user/bankInfo')
  },
  goBindCard(){
    this.$router.push('/user/bindCard')
  },
  goMoneyInfo(){
    this.$router.push('/user/moneyInfo')
  },
  goUserOperate(){
    this.$router.push('/user/userOperate')
  },
  goMoneyMove(){
    this.$router.push('/user/moneyMove')
  },
    unLogin(){
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
    }
  }
}
</script>

<style scoped>
.navbar{
  position: relative;
  background-color: #545c64;
}
.menu{
  width: 500px;
  float: right;
}
h3{
  float: left;
  margin-left: 100px;
  color: #ffd04b;
}
</style>
