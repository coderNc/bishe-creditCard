<template>
  <div class="wrapper">
    <div>&nbsp;</div>
    <div class="moneyWrapper">
      <el-form
        ref="form"
        :model="balance"
        label-width="180px"
        class="formWrapper"
      >
        <el-form-item label="请选择银行卡：">
          <el-select
            v-model="balance.operate_card_id"
            placeholder="请选择银行卡"
            @change="getName"
          >
            <el-option
              v-for="(item, index) in banksForm"
              :key="index"
              :label="item.credit_card_num"
              :value="item.credit_card_num"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="请选择银行：">
          <el-select v-model="balance.operate_bank_id" placeholder="请选择银行">
            <el-option
              v-for="(item, index) in banksForm"
              :key="index"
              :label="item.bank_name"
              :value="item.bank_id"
            ></el-option>
          </el-select>
        </el-form-item>


        <el-form-item label="请输入转账金额：" prop="money">
          <el-input v-model.number="balance.money" placeholder="请输入金额">
            <template slot="append">￥</template>
          </el-input>
        </el-form-item>
        <el-form-item label="请输入被转账人姓名：">
          <el-input
            v-model="balance.other_user_name"
            placeholder="请输入被转账人姓名"
          >
          </el-input>
        </el-form-item>
        <el-form-item label="请输入被转账人银行卡：">
          <el-input
            v-model="balance.other_card_id"
            placeholder="请输入被转账人银行卡"
            @blur="getYhName"
          >
          </el-input>
        </el-form-item>

        <el-form-item label="被转账人银行卡所属银行：">
          <span>{{bank.bank_name}}</span>
        </el-form-item>
        <el-form-item label="备注：">
          <el-input type="textarea" v-model="balance.operate_desc"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="moveBalance">确定</el-button>
        </el-form-item>
      </el-form>
      <!-- <span>确定使用卡号为：{{this.balance.credit_card_num}} 进行 {{this.balance.operate_type == 0?'存款':'取款'}}操作吗？ 操作金额为：{{this.balance.money}}</span> -->
    </div>
  </div>
</template>

<script>
export default {
  name: "",
  mixins: [],
  props: {},
  components: {},
  data() {
    return {
      user:{},
      banksForm: [],
      cardForm:[],
      balance: {
        operate_user_name: "",
        operate_card_id: "",
        operate_bank_id: "",
        operate_desc: "",
        money: "",
        other_user_name: "",
        other_card_id: "",
        other_bank_id: "",
      },
      bank_name:"",
      bank:{}
    };
  },
  created() {
    this.axios({
      method: "POST",
      url: "/user",
    }).then((res) => {
        //console.log(res);
        if (res.status == 200 && res.data.code == 10000) {
          this.user = res.data.data.user
          this.banksForm = res.data.data.card;
          this.balance.operate_user_name = res.data.data.user.user_name
        }
      })

      this.axios({
        method:'POST',
        url:'/cards',
        data:JSON.stringify({
          cur_page:0,
          limit:10
        })
      }).then(res => {
        //console.log(res);
        if (res.status == 200 && res.data.code == 10000) {
          this.cardForm = res.data.data.cards;
        }
      })
  },
  mounted() {},
  methods: {
    getName(){
      this.banksForm.forEach(value => {
        if(value.credit_card_num === this.balance.operate_card_id){
          this.balance.operate_bank_id = value.bank_id
        }
      })
    },
    getYhName(){
      this.cardForm.forEach(value => {
        if(this.balance.other_card_id === value.credit_card_num){
          this.bank_name = value.bank_name
        }
      })
      if(this.bank_name !== ''){
        this.axios({
        method:'POST',
        url:'/bank',
        data:JSON.stringify({
          bank_name:this.bank_name
        })
      }).then(res => {
        //console.log(res);
        if (res.status == 200 && res.data.code == 10000) {
          this.bank = res.data.data
          this.balance.other_bank_id = res.data.data.id
        }
      })
      }

    },
    moveBalance(){
      this.$confirm('确定进行转账操作吗?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.axios({
            method:'POST',
            url:'/money/move',
            data:JSON.stringify(this.balance)
          }).then(res => {
            console.log(res);
            if (res.status == 200 && res.data.code == 10000) {
              this.$notify({
              title: '成功',
              message: '转账成功！！',
              type: 'success'
            });
            location.reload()
            }else{
              this.$notify.error({
                title: '错误',
                message: "您输入的信息有误！！"
              });              
            }
          })
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消转账'
          });          
        });







    }
  },
};
</script>

<style scoped>
.wrapper {
  height: 570px;
  background-color: #eff0f19a;
}
.moneyWrapper {
  width: 400px;
  margin: 30px auto;
}
</style>
