<template>
  <div>
            <el-form ref="form" :model="operate"  label-width="120px" class="formWrapper">
          <el-form-item label="请选择类型：" prop="level">
            <el-radio-group v-model="operate.operate_type">
              <el-radio :label="0">全部</el-radio>
              <el-radio :label="1">存款</el-radio>
              <el-radio :label="2">取款</el-radio>
            </el-radio-group>
          </el-form-item>

            <el-form-item>
              <el-button type="primary" @click="getUserOperate">确定</el-button>
            </el-form-item>
          </el-form>

          <div class="table" v-if="isShowTable">
            <el-divider></el-divider>
            <el-table :data="userOperate" style="width: 80%" border stripe>
              <el-table-column label="卡号" align="center">
                <template slot-scope="scope">{{ scope.row.credit_card_num }}</template>
              </el-table-column>
              <el-table-column label="操作类型" align="center">
                <template slot-scope="scope">{{ scope.row.operate_type == "0" ? "存款" : "取款" }}</template>
              </el-table-column>
              <el-table-column label="具体信息" align="center" width="800px">
                <template slot-scope="scope">{{ scope.row.operate_flow }}</template>
              </el-table-column>
              <el-table-column label="备注" align="center">
                <template slot-scope="scope">{{ scope.row.operate_desc }}</template>
              </el-table-column>
            </el-table>
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
      isShowTable:false,
      operate:{
        operate_type:''
      },
      userOperate:[]
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
  getUserOperate(){
    this.axios({
        method:'POST',
        url:'/operate',
        data:JSON.stringify({
          operate_type: this.operate.operate_type
          })
      }).then(res =>{
        console.log(res);
        if (res.status == 200 && res.data.code == 10000) {
          this.userOperate = res.data.data
          this.isShowTable = true
            this.$message({
                type: "success",
                message: "查询成功!",
              });
            
        }
      })
  }
  }
}
</script>

<style scoped>

</style>
