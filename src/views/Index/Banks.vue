<template>
  <div class="banksWrapper">
    <banks-item v-for="(item,index) in banksForm" :key="index" :bankForm=item></banks-item>
    <div class="card1Wrapper">
      <el-card :body-style="{ padding: '0px' }">
        <div class="img">
          <img src='../../assets/img/+.png'>
        </div>
        <el-divider></el-divider>
        <div style="padding: 14px;">
          <p>&nbsp;</p>
          <h2>绑定卡片</h2>
          <div class="bottom clearfix">
          <el-button type="text" class="button" @click="goBindCard">绑定卡片</el-button>
        </div>
        </div>
      </el-card>
    </div>
  </div>
</template>

<script>
import BanksItem from './banksItem.vue'
export default {
  name: '',
  mixins: [],
  props: {},
  components: {BanksItem},
  data () {
    return {
      banksForm:[]
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
    goBindCard(){
      this.$router.push('/user/bindCard')
    }
  }
}
</script>

<style scoped>
.banksWrapper{
  width: 820px;
  margin-top: 100px;
  margin-left: 320px;
  /* background-color: #bfa; */
  display: flex;
  flex-wrap: wrap;
}
.card1Wrapper{
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
</style>
