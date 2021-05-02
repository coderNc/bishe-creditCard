<template>
  <div>
            <el-table :data="banks" style="width: 100%" border stripe>
              <el-table-column label="银行id" align="center">
                <template slot-scope="scope">{{ scope.row.bank_id }}</template>
              </el-table-column>
              <el-table-column label="银行名称" align="center">
                <template slot-scope="scope">{{ scope.row.bank_name }}</template>
              </el-table-column>
              <el-table-column label="银行卡id" align="center">
                <template slot-scope="scope">{{ scope.row.id }}</template>
              </el-table-column>
              <el-table-column label="卡号" align="center">
                <template slot-scope="scope">{{ scope.row.credit_card_num }}</template>
              </el-table-column>
              <el-table-column label="余额/￥" align="center">
                <template slot-scope="scope">{{ scope.row.balance }}</template>
              </el-table-column>
      <el-table-column label="操作" align="center">
        <template slot="header">
          <el-button type="primary" @click="dialogVisible = true"
            >添加卡片<i class="el-icon-plus el-icon--right"></i
          ></el-button>
        </template>
        <template slot-scope="scope">
          <el-button size="mini" type="danger" @click="unbindCard(scope.row.id)"
            >解绑</el-button
          >
        </template>
      </el-table-column>
            </el-table>


      <el-dialog
        title="添加银行卡"
        :visible.sync="dialogVisible"
        width="30%">
      <el-form ref="form" :model="cardForm" label-width="80px">
          <el-form-item label="银行卡" prop="credit_card_num">
            <el-input
              v-model="cardForm.credit_card_num"
              placeholder="请输入银行卡号"
            ></el-input>
          </el-form-item>
          <el-form-item label="银行">
            <el-select v-model="cardForm.bank_id" placeholder="请选择银行">
              <el-option v-for="(item,index) in banksData" :key="index" :label="item.bank_name" :value="item.id"></el-option>
            </el-select>
          </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
            <el-button @click="dialogVisible = false">取 消</el-button>
            <el-button type="primary" @click="bindCard">添 加</el-button>
        </span>
        </el-dialog>
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
      dialogVisible: false,
      banks:[],
      banksData:[],
      cardForm:{
        bank_id:'',
        credit_card_num:''
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
          this.banks = res.data.data.card
          //console.log(this.userData);
        }
      }).catch(err =>{
        //console.log(err);
      })

      this.axios({
        method:'POST',
        url:'/banks',
        data:JSON.stringify({
          offset:0,
          limit:1000,
          cur_page:0
        })
      }).then(res => {
        //console.log(res);
        if(res.status == 200 && res.data.code == 10000){
          this.banksData = res.data.data.banks
        }
      }).catch(err => {
        //console.log("错误" + err);
      })
  },
  mounted () {

  },
  methods: {
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
            //this.$router.push('/user/bankInfo')
            location.reload()
        }else if(res.data.code == 30001){
          this.$message.error('该银行已经绑定，请勿重复绑定！');
        }
      })
    }
  }
}
</script>

<style scoped>

</style>
