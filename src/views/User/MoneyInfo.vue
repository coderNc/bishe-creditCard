<template>
<div class="wrapper">
  <div>&nbsp;</div>
    <div class="moneyWrapper">
        <el-form ref="form" :model="balance" :rules="rules" label-width="120px" class="formWrapper">
          <el-form-item label="操作：" prop="level">
            <el-radio-group v-model="balance.operate_type">
              <el-radio :label="0">存款</el-radio>
              <el-radio :label="1">取款</el-radio>
            </el-radio-group>
          </el-form-item>
            <el-form-item label="请选择银行：">
              <el-select v-model="balance.bank_id" placeholder="请选择银行">
                <el-option v-for="(item,index) in banksForm" :key="index" :label="item.bank_name" :value="item.bank_id"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="请选择银行卡：">
              <el-select v-model="balance.credit_card_num" placeholder="请选择银行卡">
                <el-option v-for="(item,index) in banksForm" :key="index" :label="item.credit_card_num" :value="item.credit_card_num"></el-option>
              </el-select>
            </el-form-item>

            <el-form-item label="请输入金额：" prop="money">
              <el-input v-model.number="balance.money" placeholder="请输入金额">
                <template slot="append">￥</template>
              </el-input>
            </el-form-item>

          <el-form-item label="备注：">
            <el-input type="textarea" v-model="balance.operate_desc"></el-input>
          </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="operateBalance">确定</el-button>
            </el-form-item>
          </el-form>
          <!-- <span>确定使用卡号为：{{this.balance.credit_card_num}} 进行 {{this.balance.operate_type == 0?'存款':'取款'}}操作吗？ 操作金额为：{{this.balance.money}}</span> -->
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
      balance:{
        bank_id:'',
        credit_card_num:'',
        operate_desc:'',
        operate_type:'',    //0-存款 1-取款 2-转账 3-被转账
        money:''
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
        console.log(res);
        if (res.status == 200 && res.data.code == 10000) {
          this.banksForm = res.data.data.card
        }
      }).catch(err =>{
        console.log(err);
      })
  },
  mounted () {

  },
  methods: {
  operateBalance(){
    this.$prompt('请输入该银行卡密码', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
        }).then(({ value }) => {
          this.$message({
            type: 'success',
            message: '密码正确！'
          });
        this.$confirm('确定进行此操作吗？', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.axios({
            method:'POST',
            url:'/money',
            data:JSON.stringify(this.balance)
          }).then(res => {
            console.log(res);
            if (res.status == 200 && res.data.code == 10000) {
                this.$message({
                  type: 'success',
                  message: '操作成功!'
                });
                this.$notify({
                title:  this.balance.operate_type == 0 ? '存款' : '取款'  +'成功！',
                message: res.data.data.operate_flow,
                type: 'success'
              });
            }
          })

        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消操作'
          });          
        });








        }).catch(() => {
          this.$message({
            type: 'info',
            message: '取消输入'
          });       
        });
  }
  }
}
</script>

<style scoped>
.wrapper{
  height: 500px;
  background-color: #eff0f19a;
}
.moneyWrapper{
   width: 400px;
  margin: 50px auto;
}
</style>
