<template>
  <div id="app">
    <router-view :key="key"/>
    <el-backtop ></el-backtop>
    <footer></footer>
  </div>
</template>

<script>
import Footer from './components/content/Footer'
export default {
  components: { Footer },
  name: 'App',
  computed:{
    key(){
      return this.$route.name?this.$route.name + + new Date():this.$route+ +new Date()
    }
  }
}
</script>

<style>
#app {
  /* height: 2000px; */
}
</style>
