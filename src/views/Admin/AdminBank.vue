<template>
    <div>
      <el-table :data="banksData" style="width:100%; " border  stripe >
        
      <el-table-column label="id" align="center">
        <template slot-scope="scope">{{scope.row.id}}</template>
      </el-table-column>
      <el-table-column label="银行名称"  align="center">
        <template slot-scope="scope">{{scope.row.bank_name}}</template>
      </el-table-column>

      <el-table-column label="银行图片"  align="center" width="300px">
        <template slot-scope="scope">
          <img :src="scope.row.bank_pic" class="bank_pic">
        </template>
      </el-table-column>
      <el-table-column label="银行卡图片"  align="center"  width="300px">
        <template slot-scope="scope">
          <img :src="scope.row.bank_card_pic" class="bank_card_pic">
        </template>
      </el-table-column>
      <el-table-column label="省"  align="center">
        <template slot-scope="scope">{{scope.row.province}}</template>
      </el-table-column>
      <el-table-column label="市"  align="center">
        <template slot-scope="scope">{{scope.row.town}}</template>
      </el-table-column>
      <el-table-column label="县/区"  align="center">
        <template slot-scope="scope">{{scope.row.country}}</template>
      </el-table-column>
      <el-table-column label="详细地址"  align="center">
        <template slot-scope="scope">{{scope.row.bank_address}}</template>
      </el-table-column>
      <el-table-column label="创建时间"  align="center" width="200px">
        <template slot-scope="scope">{{timestampToTime(scope.row.create_time)}}</template>
      </el-table-column>
      <el-table-column label="操作"  align="center"> 
        <template slot="header">
          <el-button type="primary" @click="dialogVisible = true">添加银行<i class="el-icon-plus el-icon--right"></i></el-button>
        </template>
        <template slot-scope="scope">
          <!-- <el-button size="mini">编辑</el-button> -->
          <el-button size="mini" type="danger" @click="deleteBank(scope.row.id)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-divider></el-divider>
    <div class="block">
      <el-pagination
        background
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="currentPage"
        :page-size="pageSize"
        :page-sizes="[3, 6, 10, 20]"
        
        layout="total, sizes,prev, pager, next, jumper"
        :total="total">
      </el-pagination>
    </div>




    <el-dialog
        title="添加银行"
        :visible.sync="dialogVisible"
        width="30%">
        <el-form ref="form" :model="bankForm" :rules="rules" label-width="100px">

        <el-form-item label="银行名称" prop="bank_name">
          <el-input v-model="bankForm.bank_name" placeholder="请输入银行名称"></el-input>
        </el-form-item>
        <el-form-item label="银行地址" prop="bank_name">
          <el-cascader
            size="large"
            :options="options"
            v-model="selectedOptions"
            @change="handleChange"
          >
          </el-cascader>
        </el-form-item>
        <el-form-item label="详细地址" prop="bank_address">
          <el-input v-model="bankForm.bank_address" placeholder="请输入详细地址"></el-input>
        </el-form-item>
        <el-form-item label="银行图标" prop="bank_pic">
          <el-input v-model="bankForm.bank_pic" placeholder="请输入银行名称"></el-input>
        </el-form-item>
        <el-form-item label="银行卡图标" prop="bank_card_pic">
          <el-input v-model="bankForm.bank_card_pic" placeholder="请输入银行名称"></el-input>
        </el-form-item>
        <el-form-item label="备注/描述">
          <el-input type="textarea" v-model="bankForm.desc"></el-input>
        </el-form-item>
      </el-form>
        <span slot="footer" class="dialog-footer">
            <el-button @click="dialogVisible = false">取 消</el-button>
            <el-button type="primary" @click="addBank">添 加</el-button>
        </span>
        </el-dialog>
    </div>

</template>

<script>
import {timestampToTime} from '../../assets/js/tools'
import { regionData,CodeToText } from "element-china-area-data";
export default {
    name:  '',
    mixins: [],
    props: {},
    components: {},
    data () {
        return {
            options: regionData,
            selectedOptions: [],
            banksData:[],
            dialogVisible: false,
            bankForm:{
              bank_name:'',
              bank_pic:'',
              bank_card_pic:'',
              bank_address:'',
              desc:'',
              province:'',
              town:'',
              country:''
            },
            rules: {
            username: [
              { required: true, message: '请输入用户名', trigger: 'blur' },
              { min: 1, max: 15, message: '长度在 1 到 15 个字符', trigger: 'blur' }
            ],
            password: [
              { required: true, message: '请输入密码', trigger: 'blur' },
              { min: 6, max: 15, message: '长度在 6 到 15 个字符', trigger: 'blur' }
            ],
            telephone: [
              { required: true, message: '请输入手机号', trigger: 'blur' },
              { min: 11, max: 11, message: '请输入正确的手机号！', trigger: 'blur' }
            ],
            level: [
            { required: true, message: '请选用户角色', trigger: 'change' }
          ],
          },
          currentPage: 1,     //当前页
          total:100,          //总数
          pageSize:6,         //每页展示个数
          limit:6,
          offset:0
        }
    },
    created () {
      //请求银行列表
      this.axios({
        method:'POST',
        url:'/banks',
        data:JSON.stringify({
          offset:0,
          limit:1000,
          cur_page:0
        })
      }).then(res => {
        console.log(res);
        if(res.status == 200 && res.data.code == 10000){
          this.total = res.data.data.banks.length
          this.banksData = res.data.data.banks.slice(0,this.limit);
        }
      }).catch(err => {
        console.log("错误" + err);
      })
    },
    methods: {
      timestampToTime,
        deleteBank(id){
            console.log(id);
            this.$confirm('此操作将删除该银行, 是否继续?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
        }).then(() => {
            //调用删除用户接口
            this.axios({
              method:"POST",
              url:'/bank/delete',
              data:JSON.stringify({
                id:id
              })
            }).then(res => {
                console.log(res);
                if(res.status == 200 && res.data.code == 10000){
                    this.$message({
                            type: 'success',
                            message: '删除成功!'
                    });
                    location.reload();
                }
            })
        }).catch(() => {
            this.$message({
            type: 'info',
            message: '已取消删除'
            });          
        });
        },
        addBank(){
            //console.log(JSON.stringify(this.bankForm));
            //请求添加用户
            this.axios({
                method:'POST',
                url:'/bank/add',
                data:JSON.stringify(this.bankForm),
            }).then(res => {
                console.log(res);
                if(res.status == 200 && res.data.code == 10000){
                    this.$message({
                            type: 'success',
                            message: '添加成功!'
                    });
                    location.reload()
                }else{
                    this.$message.error(res.data.data.errMsg+ '!请重新输入!');
                }
            })
        },
        //省市县处理函数
        handleChange(arr) {
          this.bankForm.province = CodeToText[arr[0]]
          this.bankForm.town = CodeToText[arr[1]]
          this.bankForm.country = CodeToText[arr[2]]
        },
        handleCurrentChange(pages){
      //console.log(pages);
        this.offset = (pages - 1) * this.limit;
        //console.log(this.offset);
        this.axios({
        method:'POST',
        url:'/banks',
        data: JSON.stringify({
          offset: this.offset,
          limit: this.limit,
          cur_page: 0,
        }),
        }).then((res) => {
          //console.log(res);
          if (res.status == 200 && res.data.code == 10000) {
            this.banksData = res.data.data.banks
          }
        });
      },
      handleSizeChange(pagesize){
        //console.log(pagesize);
      this.pageSize = this.limit = pagesize;
      this.axios({
        method:'POST',
        url:'/banks',
      data: JSON.stringify({
        offset: this.offset,
        limit: this.limit,
        cur_page: 0,
      }),
      }).then((res) => {
        //console.log(res);
        if (res.status == 200 && res.data.code == 10000) {
          this.banksData = res.data.data.banks
        }
      });
      }
    }
}
</script>

<style scoped>
/*   tbody img {
    width: 50px;
    height: 50px;
  } */
  .bank_card_pic{
    width: 160px;
    height: 110px;
  }
  .bank_pic{

  }
</style>
