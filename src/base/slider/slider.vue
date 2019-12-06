<template>
  <div class="l-slider">
    <mt-swipe :auto="400000" >
        <mt-swipe-item v-for="item in imgs" :key="imgs.pic"><a :href="item.url" class="needsclick"><img :src="item.pic" alt=""></a></mt-swipe-item>
    </mt-swipe>
  </div>
</template>
<script>
 export default {
   props: {
     imgs: {
      type: Array,
      default: null
     }
   }
 }

</script>
<style lang="stylus" rel="stylesheet/stylus" scoped>
.l-slider
  height: 140px
  padding: 1%
  .mint-swipe-item
    a
      display: block
    img
      width: 100%
      border-radius: 8px 
</style>