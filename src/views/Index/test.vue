<template>
  <div>
    <h1>接口测试页面</h1>
    <el-button type="primary" @click="log">打印数据</el-button>
    <el-divider></el-divider>
    <el-button type="primary" @click="login">登录按钮</el-button>
    <el-button type="primary" @click="loginUser">获取登录用户按钮</el-button>
    <el-button type="primary" @click="unloginUser">退出登录用户按钮</el-button>

    <el-divider></el-divider>
    <el-button type="primary" @click="submit">添加用户按钮</el-button>
    <el-button type="primary" @click="getUsers">获取用户列表按钮</el-button>
    <el-button type="primary" @click="getUser">获取单个用户按钮</el-button>
    <el-button type="primary" @click="delUser">删除用户按钮</el-button>
    <el-divider></el-divider>
    <el-button type="primary" @click="addBank">添加银行按钮</el-button>
    <el-button type="primary" @click="getBanks">获取所有银行按钮</el-button>
    <el-button type="primary" @click="getBank">获取单个（银行名称）银行按钮</el-button>
    <el-button type="primary" @click="delBank">删除银行按钮</el-button>
    <el-divider></el-divider>
    <el-button type="primary" @click="bindCard">用户绑定信用卡按钮</el-button>
    <el-button type="primary" @click="unbindCard">用户解绑信用卡按钮</el-button>
    <el-button type="primary" @click="operateBalance">存取款按钮</el-button>
    <el-button type="primary" @click="getUserOperate">获取用户信用卡流水按钮</el-button>
    
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
      userForm:{
        user_name:"xvcvxcx",
        password:"12345678",
        phone:"13279124300",
        id_card:"612729199909241250",
        gender:'0',
        level:'0',
        birthday:"1999-9-24",
        desc:"adminadmin"
      },
      bankForm:{
        bank_name:'test',
        bank_pic:'123456',
        bank_card_pic:'1233455677',
        bank_address:'西安邮电大学',
        desc:'这是一段很长很长的描述 这是一段很长很长的描述 这是一段很长很长的描述 这是一段很长很长的描述 这是一段很长很长的描述 ',
        province:'陕西省',
        town:'西安市',
        country:'长安区'
      }
    }
  },
  watch: {

  },
  computed: {

  },
  created () {
    //this.axios.defaults.baseURL = "120.77.175.7:8080";
    this.axios.defaults.withCredentials = true;
  },
  mounted () {

  },
  methods: {
    log(){
      console.log();
    },
    //添加用户方法
    submit(){
      this.axios({
        method:'POST',
        url:'/user/register',
        data:JSON.stringify(this.userForm),
        //data:qs.stringify(this.userForm),
        //headers:{'Content-Type': 'application/json'}
      }).then(res => {
        console.log(res);
      }).catch(err => {
        console.log(err);
      })
    },
    //获取全部用户方法
    getUsers(){
      this.axios({
        method:'POST',
        url:'/users',
        data:JSON.stringify({
          offset:0,
          limit:1000,
          cur_page:0
        })
      }).then(res => {
        console.log(res);
      }).catch(err => {
        console.log("错误" + err);
      })
    },
    //获取单个用户方法
    getUser(){
      this.axios({
        method:"POST",
        url:'/user',
        data:JSON.stringify({
          id:16
        })
      }).then(res => {
        console.log(res);
      }).catch(err => {
        console.log(err);
      })
    },
    //删除单个用户方法   需要管理员权限
    delUser(){
      this.axios({
        method:"POST",
        url:'/user/delete',
        data:JSON.stringify({
          id:16
        })
      }).then(res => {
        console.log(res);
      }).catch(err => {
        console.log(err);
      })
    },
    //登录用户接口  ok
    login(){
      this.axios({
        method:"POST",
        url:'/user/login',
        
        data:JSON.stringify({
          user_name:'admin',
          password:'12345678'
        })
      }).then(res => {
        console.log(res);
      }).catch(err => {
        console.log(err);
      })
    },
    //获取登录用户接口  ok
    loginUser(){
      this.axios({
        method:'POST',
        url:'/user'
      }).then(res => {
        console.log(res);
      }).catch(err =>{
        console.log(err);
      })
    },
    //退出登录   ok 
    unloginUser(){
      this.axios({
        method:'POST',
        url:'/user/un-login',
        data:JSON.stringify({
          id:22
        })
      }).then(res => {
        console.log(res);
      })
    },
    //获取所有银行接口    ok
    getBanks(){
      this.axios({
        method:'POST',
        url:'/banks',
        data:JSON.stringify({
          offset:0,
          limit:1000,
          page_num:0
        })
      }).then(res => {
        console.log(res);
      }).catch(err => {
        console.log(err);
      })
    },
    //添加银行接口   ok
    addBank(){
      this.axios({
        method:'POST',
        url:'/bank/add',
        data:JSON.stringify(this.bankForm)
      }).then(res => {
        console.log(res);
      }).catch(err => {
        console.log(err);
      })
    },
    //根据银行名称获取单个银行接口   ok  
    getBank(){
      this.axios({
        method:'POST',
        url:'/bank',
        data:JSON.stringify({
          bank_name:'test'
        })
      }).then(res => {
        console.log(res);
      }).catch(err => {
        console.log(err);
      })
    },
    //删除单个银行接口     ok 
    delBank(){
      this.axios({
        method:'POST',
        url:'/bank/delete',
        data:JSON.stringify({
          id:7
        })
      }).then(res => {
        console.log(res);
      })
    },
    //用户绑定卡片接口    ok
    bindCard(){
      this.axios({
        method:'POST',
        url:'/user_card',
        data:JSON.stringify({
          bank_id:11,
          credit_card_num:'987655434321111'    //银行卡号
        })
      }).then(res => {
        console.log(res);
      })
    },
    //用户解绑卡片接口    ok/mtg
    unbindCard(){
      this.axios({
        method:'POST',
        url:'/user_card/delete',
        data:JSON.stringify({
          id:4     //卡片id  
        })
      }).then(res => {
        console.log(res);
      })
    },
    //存取款操作接口    ok
    operateBalance(){
      this.axios({
        method:'POST',
        url:'/money',
        data:JSON.stringify({
          bank_id:8,
          credit_card_num:'1111111111111111',
          operate_desc:'操作备注',
          operate_type:1,    //0-存款 1-取款 2-转账 3-被转账
          money:2000
        })
      }).then(res => {
        console.log(res);
      })
    },
    //获取用户信用卡流水接口    ok
    getUserOperate(){
      this.axios({
        method:'POST',
        url:'/operate',
        data:JSON.stringify({
          operate_type:0
        })
      }).then(res =>{
        console.log(res);
      })
    }
  }
}
</script>

<style scoped>

</style>
