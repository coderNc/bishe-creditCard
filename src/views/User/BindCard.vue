<template>
  <div class="wrapper">
    <div>&nbsp;</div>
    <div class="cardWrapper">
      <el-form ref="form" :model="cardForm" :rules="rules" label-width="80px">
          <el-form-item label="银行卡" prop="credit_card_num">
            <el-input
              v-model="cardForm.credit_card_num"
              placeholder="请输入银行卡号"
            ></el-input>
          </el-form-item>
          <el-form-item label="银行">
            <el-select v-model="cardForm.bank_id" placeholder="请选择银行">
              <el-option v-for="(item,index) in banksForm" :key="index" :label="item.bank_name" :value="item.id"></el-option>
            </el-select>
          </el-form-item>
        <el-button type="primary" @click="bindCard" class="btn">添 加</el-button>
        </el-form>
    </div>
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
      banksForm:[],
      cardForm: {
        credit_card_num: "",
        bank_id:''
      },
      rules: {
        username: [
          { required: true, message: "请输入用户名", trigger: "blur" },
          {
            min: 1,
            max: 15,
            message: "长度在 1 到 15 个字符",
            trigger: "blur",
          },
        ],
        password: [
          { required: true, message: "请输入密码", trigger: "blur" },
          {
            min: 6,
            max: 15,
            message: "长度在 6 到 15 个字符",
            trigger: "blur",
          },
        ],
        telephone: [
          { required: true, message: "请输入手机号", trigger: "blur" },
          {
            min: 11,
            max: 11,
            message: "请输入正确的手机号！",
            trigger: "blur",
          },
        ],
        level: [{ required: true, message: "请选用户角色", trigger: "change" }],
      },
    }
  },
  watch: {

  },
  computed: {

  },
  created () {

    this.axios({
        method:'POST',
        url:'/banks',
        data:JSON.stringify({
          offset:0,
          limit:1000,
          page_num:0
        })
      }).then(res => {
        //console.log(res);
        if (res.status == 200 && res.data.code == 10000) {
          this.banksForm = res.data.data.banks
        }
      }).catch(err =>{
        console.log(err);
      })


  },
  mounted () {

  },
  methods: {
    bindCard(){
      this.axios({
        method:'POST',
        url:'/user_card',
        data:JSON.stringify(this.cardForm)
      }).then(res => {
        console.log(res);
        if (res.status == 200 && res.data.code == 10000) {
            this.$message({
                type: "success",
                message: "绑定成功!",
              });
            this.$router.push('/user/bankInfo')
        }else if(res.data.code == 30001){
          this.$message.error('该银行已经绑定，请勿重复绑定！');
        }
      })
    }
  }
}
</script>

<style scoped>
.wrapper{
  height: 500px;
  background-color: #eff0f19a;
}
.cardWrapper{
  width: 400px;
  /* background-color: #bfa; */
  margin: 100px auto;
  
}
.btn{
  margin-left: 150px;
}
</style>
