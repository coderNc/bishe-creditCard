<template>
  <div>
          <div class="table" v-if="isShowTable">
            <el-divider></el-divider>
            <el-table :data="userOperate" style="width: 100%" border stripe>
              <el-table-column label="用户id" align="center">
                <template slot-scope="scope">{{ scope.row.user_id }}</template>
              </el-table-column>
              <el-table-column label="银行id" align="center">
                <template slot-scope="scope">{{ scope.row.bank_id }}</template>
              </el-table-column>
              <el-table-column label="卡号" align="center" width="180px">
                <template slot-scope="scope">{{ scope.row.credit_card_num }}</template>
              </el-table-column>
              <el-table-column label="操作类型" align="center">
                <template slot-scope="scope">{{ scope.row.operate_type == "0" ? "存款" : "取款" }}</template>
              </el-table-column>
              <el-table-column label="操作金额" align="center">
                <template slot-scope="scope">{{ scope.row.money }}</template>
              </el-table-column>
              <el-table-column label="具体信息" align="center" width="800px">
                <template slot-scope="scope">{{ scope.row.operate_flow }}</template>
              </el-table-column>
              <el-table-column label="备注" align="center">
                <template slot-scope="scope">{{ scope.row.operate_desc }}</template>
              </el-table-column>
              <el-table-column label="操作日期" align="center" width="200px">
                <template slot-scope="scope">{{ timestampToTime(scope.row.create_time) }}</template>
              </el-table-column>
            </el-table>
          </div>
          <el-divider></el-divider>
          <div class="block">
            <el-pagination
              background
              @size-change="handleSizeChange"
              @current-change="handleCurrentChange"
              :current-page="currentPage"
              :page-size="pageSize"
              :page-sizes="[5, 10, 20, 50]"
              layout="total, sizes,prev, pager, next, jumper"
              :total="total"
            >
            </el-pagination>
        </div>
  </div>
</template>

<script>
  import {timestampToTime} from '../../assets/js/tools'
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
      userOperate:[],
      currentPage: 1, //当前页
      total: 100, //总数
      pageSize: 20, //每页展示个数
      limit: 20,
      offset: 0,
    }
  },
  watch: {

  },
  computed: {

  },
  created () {
    this.axios({
        method:'POST',
        url:'/operates',
        data:JSON.stringify({
          limit:1000,
          offset:0,
          total_page:0,
          money_type:0
          })
      }).then(res =>{
        //console.log(res);
        if (res.status == 200 && res.data.code == 10000) {
          
          this.isShowTable = true
          this.total = res.data.data.operates.length
          this.userOperate = res.data.data.operates.slice(0,this.limit);
            this.$message({
                type: "success",
                message: "查询成功!",
              });
            
        }
      })
  },
  mounted () {
    
  },
  methods: {
    timestampToTime,
    handleCurrentChange(pages) {
      //console.log(pages);
      this.offset = (pages - 1) * this.limit;
      //console.log(this.offset);
      this.axios({
      method: "POST",
      url: "/operates",
      data: JSON.stringify({
        offset: this.offset,
        limit: this.limit,
        total_page:0,
        money_type:0
      }),
      }).then((res) => {
        //console.log(res);
        if (res.status == 200 && res.data.code == 10000) {
          this.userOperate = res.data.data.operates
        }
      });
    },
    handleSizeChange(pagesize) {
      //console.log(pagesize);
      this.pageSize = this.limit = pagesize;
      this.axios({
      method: "POST",
      url: "/operates",
      data: JSON.stringify({
        offset: this.offset,
        limit: this.limit,
        total_page:0,
        money_type:0
      }),
      }).then((res) => {
        //console.log(res);
        if (res.status == 200 && res.data.code == 10000) {
          this.userOperate = res.data.data.operates
        }
      });
    },
  }
}
</script>

<style scoped>

</style>
