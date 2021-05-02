<template>
  <div>
    <heder></heder>
    <banner></banner>
    <swiper></swiper>
    <aside-index></aside-index>
    <banks></banks>
  </div>
</template>

<script>
import Heder from '../../components/content/Heder.vue'
import AsideIndex from './Aside/AsideIndex.vue'
import Banks from './Banks.vue'
import Banner from './Banner.vue'
import Swiper from './Swiper'
export default {
  name: '',
  mixins: [],
  props: {},
  components: {
    Heder,
    Swiper,
    Banner,
    AsideIndex,
    Banks
  },
    
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
div{
  
}
</style>
