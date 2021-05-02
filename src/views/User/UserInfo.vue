<template>
  <div>
    <h2 class="title">账号信息</h2>
    <p>用户名：{{userData.user.user_name}}</p>
    <p>手机号：{{userData.user.phone}}</p>
    <h2 class="title">身份信息</h2>
    <p>身份证：{{userData.user.id_card}}</p>
    <p>性&nbsp;&nbsp;&nbsp;别：{{userData.user.gender == 0 ? '男'  : '女'}}</p>
    <h2 class="title">其他信息</h2>
    <p>生日：{{userData.user.birthday}}</p>
    <p>备注：{{userData.user.desc}}</p>
    <p>创建时间：{{timestampToTime(userData.user.create_time)}}</p>
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
      userData:{}
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
        if(res.status == 200 && res.data.code == 10000){
          this.userData = res.data.data
          //console.log(this.userData);
        }
      }).catch(err =>{
        console.log(err);
      })
  },
  mounted () {

  },
  methods: {
    timestampToTime
  }
}
</script>

<style scoped>
.title{
    font-size: 20px;
    width: 450px;
    color: #333;
    font-weight: bold;
    line-height: 60px;
    border-bottom: 1px solid #F0F0F0;
    position: relative;
    padding-left: 16px;
    margin: 0;
}
.title::before{
    content: "";
    display: inline-block;
    width: 4px;
    height: 20px;
    background: #e60012;
    position: absolute;
    left: 0px;
    top: 50%;
    margin-top: -10px;
}
</style>
