<template>
  <div class="wrapper">
    <div>&nbsp;</div>
    <div class="cardWrapper">
      <el-form ref="form" :model="cardForm" :rules="rules" label-width="80px">
          <el-form-item label="银行卡" prop="credit_card_num">
            <el-input
              v-model="cardForm.credit_card_num"
              placeholder="请输入银行卡号"
              @blur="getName()"
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
      num:6230520210014698370,
      cardForm: {
        credit_card_num: "",
        bank_id:''
      },
      rules: {
        credit_card_num: [
          { required: true, message: "请输入银行卡号！", trigger: "blur" },
          {min: 19,max: 19,message: "请输入数字且长度必须为19位",trigger: "blur"}
        ],
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
    getName(){
      var sixId = this.cardForm.credit_card_num.slice(0,6)
      var yhName = ''
      switch(sixId){
        case '623052':
          yhName = "中国农业银行"
          break;
        case '621785':
          yhName = "中国银行"
          break;
        case '621483':
          yhName = "招商银行"
          break;
        case '621559':
          yhName = "中国工商银行"
          break;
        default:
          yhName = ''
      }
      if(yhName === ''){
        this.$notify.error({
          title: '错误',
          message: '请输入正确格式的银行卡~~'
        });
      }else{
        this.banksForm.forEach((value) => {
        if(value.bank_name === yhName){
          this.cardForm.bank_id = value.id
        }
      })
      }

    },
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
