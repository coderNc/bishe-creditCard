<template>
  <div class="wrapper">
    <div>&nbsp;</div>
    <div class="moneyWrapper">
      <el-form
        ref="form"
        :model="balance"
        label-width="170px"
        class="formWrapper"
      >
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
        <el-form-item label="请选择银行卡：">
          <el-select
            v-model="balance.operate_card_id"
            placeholder="请选择银行卡"
          >
            <el-option
              v-for="(item, index) in banksForm"
              :key="index"
              :label="item.credit_card_num"
              :value="item.id"
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
          >
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
  name: "",
  mixins: [],
  props: {},
  components: {},
  data() {
    return {
      banksForm: [],
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
    };
  },
  watch: {},
  computed: {},
  created() {
    this.axios({
      method: "POST",
      url: "/user",
    })
      .then((res) => {
        //console.log(res);
        if (res.status == 200 && res.data.code == 10000) {
          this.banksForm = res.data.data.card;
        }
      })
      .catch((err) => {
        console.log(err);
      });
  },
  mounted() {},
  methods: {},
};
</script>

<style scoped>
.wrapper {
  height: 500px;
  background-color: #eff0f19a;
}
.moneyWrapper {
  width: 400px;
  margin: 50px auto;
}
</style>
