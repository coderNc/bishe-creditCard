<template>
  <div class="cardWrapper">
    <el-card :body-style="{ padding: '0px' }" shadow="hover">
      <div class="img">
        <img :src=bankForm.bank_pic class="image">
      </div>
      <el-divider></el-divider>
      <div style="padding: 14px;">
        <p>银行卡号：{{bankForm.credit_card_num}}</p>
        <h2>{{bankForm.bank_name}}</h2>
        <div class="bottom clearfix">
          <el-button type="text" class="button" @click="unbindCard(bankForm.id)" v-if="isShowMoney">解绑</el-button>
          <el-button type="text" class="button" @click="goBank" v-else>解绑</el-button>
          
          <span v-show="isShowMoney">余额/￥：{{bankForm.balance}}</span>
        </div>
      </div>
    </el-card>
  </div>
</template>

<script>
export default {
  name: '',
  mixins: [],
  props: {
    bankForm:{},
    isShowMoney:false
  },
  components: {},
  data () {
    return {

    }
  },
  watch: {

  },
  computed: {

  },
  created () {

  },
  mounted () {

  },
  methods: {
  goBank(){
    this.$router.push('/user/bankInfo')
  },
    unbindCard(id){
      //console.log(id);
      this.$confirm("此操作将解绑该银行卡, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          //调用解绑接口
          this.axios({
            method:'POST',
            url:'/user_card/delete',
            data: JSON.stringify({
              id: id,
            }),
          }).then((res) => {
            //console.log(res);
            if (res.status == 200 && res.data.code == 10000) {
              this.$message({
                type: "success",
                message: "解绑成功!",
              });
              location.reload();
            }
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消解绑",
          });
        });
    },

  }
}
</script>

<style scoped>
.cardWrapper{
  width: 300px;
  margin: 0 55px 55px 55px;
}
.img{
  width: 100%;
  height: 200px;
  position: relative;
}
.img img{
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  margin:  auto;
}
  .bottom {
    margin-top: 13px;
    line-height: 12px;
  }
    .bottom  .button{
      margin-right: 130px;
    }
</style>
