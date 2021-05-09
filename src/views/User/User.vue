<template>
  <div>
    <heder></heder>
    <el-container>
      <!-- <el-divider></el-divider> -->
      <el-aside width="210px" >
        <el-menu :default-openeds="['1', '2']">
          <el-submenu index="1">
            <template slot="title"><i class="el-icon-message"></i>导航一</template>
              <el-menu-item index="1-1" @click="goUserInfo">我的信息</el-menu-item>
              <el-menu-item index="1-2" @click="goBankInfo">我的银行卡</el-menu-item>
          </el-submenu>
          <el-submenu index="2">
            <template slot="title"><i class="el-icon-menu"></i>导航二</template>
              <el-menu-item index="2-1" @click="goBindCard">绑定银行卡</el-menu-item>
              <el-menu-item index="2-2" @click="goMoneyInfo">存取款</el-menu-item>
              <el-menu-item index="2-3" @click="goMoneyMove">转账</el-menu-item>
              <el-menu-item index="2-4" @click="goUserOperate">查询流水</el-menu-item>
          </el-submenu>
        </el-menu>
      </el-aside>

      <el-container>
        <el-main>
          <router-view></router-view>
        </el-main>
      </el-container>

    </el-container>
  </div>
</template>

<script>
import Heder from '../../components/content/Heder.vue'
export default {
  name: '',
  mixins: [],
  props: {},
  components: {Heder},
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
  goUserInfo(){
    this.$router.push('/user/userInfo')
  },
  goBankInfo(){
    this.$router.push('/user/bankInfo')
  },
  goBindCard(){
    this.$router.push('/user/bindCard')
  },
  goMoneyInfo(){
    this.$router.push('/user/moneyInfo')
  },
  goUserOperate(){
    this.$router.push('/user/userOperate')
  },
  goMoneyMove(){
    this.$router.push('/user/moneyMove')
  }
  }
}
</script>

<style scoped>
  
  .el-aside {
    color: #333;
    margin: 50px 0 50px 100px;
    border: 1px solid #5151522c;
  }
</style>
