<template>
  <div class="asideWrapper">
    <aside-news></aside-news>
    <aside-img></aside-img>
  </div>
</template>

<script>
import AsideNews from './AsideNews'
import AsideImg from './AsideImg.vue'


export default {
  name: '',
  mixins: [],
  props: {},
  components: {AsideNews, AsideImg},
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

  }
}
</script>

<style scoped>
.asideWrapper{
  width: 400px;
  position: absolute;
  right: 320px;
  top: 610px;
}
</style>
