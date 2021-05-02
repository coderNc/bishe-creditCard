<template>
  <div>
    <el-card class="box-card">
      <div slot="header" class="clearfix heder">
        <span>管理中心新闻信息 <!-- <i class="el-icon-news"></i> --></span>
      </div>
      <div  class="text item">
        <el-link :underline="false" class="ellink"
        target="_blank" 
        v-for="(item,index) in news" :key="index"
        :href='item.href'
        >
        <i>{{index +1}}</i>
        {{item.title}} 
        <span class="update">{{item.update}}</span>
        </el-link>
        
      </div>
    </el-card>
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
      news:[
        {title:'XUPT银行卡管理网站上线啦！',content:"123131231313131312312312312312312312312312312",update:"2021/4/6",href:'https://element.eleme.io'},
        {title:'新手必看！',content:"123131231313131312312312312312312312312312312",update:"2021/4/6",href:'https://element.eleme.io'},
        {title:'XUPT测试2！',content:"123131231313131312312312312312312312312312312",update:"2021/4/6",href:'https://element.eleme.io'},
        {title:'XUPT测试3！',content:"123131231313131312312312312312312312312312312",update:"2021/4/6",href:'https://element.eleme.io'},
        {title:'XUPT测试4！',content:"123131231313131312312312312312312312312312312",update:"2021/4/6",href:'https://element.eleme.io'},
        ]
    };
  },
  watch: {},
  computed: {},
  created() {},
  mounted() {},
  methods: {},
};
</script>

<style scoped>
.heder span{
  display: block;
  margin: 0 35%;
  font-size: 20px;
  width: 200px;
  font-family: "Hiragino Sans GB";
}
.heder span i{
  color: #409eff;
}
  .text {
    font-size: 14px;
  }

  .item {
    margin-bottom: 14px;
  }
  .update{
    
    float: right;
  }
    .ellink{
    display: block;
    margin: 10px;
    padding: 12px 0;
    font-size: 16px;
    font-family: "Hiragino Sans GB";
    box-sizing: border-box;
    border-top: 1px #e0e2e2 solid;
  }
  .ellink:nth-child(1){
    border: none;
  }
    .ellink i{
        margin-right: 5px;
    color: #409eff;
    font-weight: 600;
  }
  .clearfix:before,
  .clearfix:after {
    display: table;
    content: "";
  }
  .clearfix:after {
    clear: both
  }

  .box-card {
    width: 480px;
  }
</style>
