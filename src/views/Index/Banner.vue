<template>
  <div id="bannerImg">
    <img src="../../assets/img/banner.gif" alt="banner">
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
    }
  }
}
</script>

<style scoped>
#bannerImg{
  width: 1920px;
  height: 500px;
  position: relative;
  /* top: -60px; */
  z-index: 1;
}
img{
  width: 100%;
  height: 100%;
  opacity: .8;
}
</style>
