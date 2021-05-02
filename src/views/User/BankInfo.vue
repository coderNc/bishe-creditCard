<template>
  <div class="banksWrapper">
    <banks-item v-for="(item,index) in banksForm" :key="index" :bankForm=item :isShowMoney=true></banks-item>
  </div>
</template>

<script>
import BanksItem from '../Index/banksItem'
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

  }
}
</script>

<style scoped>
.banksWrapper{
  width: 1240px;
  margin-top: 30px;
  margin-left: 50px;
  /* background-color: #bfa; */
  display: flex;
  flex-wrap: wrap;
}
</style>
