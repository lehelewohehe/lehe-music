<template>
  <div class="l-slider" ref="slider">
    <mt-swipe :auto="400000" >
        <mt-swipe-item v-for="item in imgs" :key="imgs.pic"><a :href="item.url" class="needsclick" ref="swipeA"><img :src="item.pic" alt=""></a></mt-swipe-item>
    </mt-swipe>
  </div>
</template>
<script>
 export default {
   data() {
     return {
       sliderHeight: 0
     }
   },
   props: {
     imgs: {
      type: Array,
      default: null
     }
   },
   mounted() {
    setTimeout(() => {
      this.setSliderHeight()
    }, 170)
   },
   methods: {
     setSliderHeight() {
       console.log(this.$refs.swipeA)
       this.sliderHeight = this.$refs.swipeA[0].clientHeight
       this.$refs.slider.style.height = this.sliderHeight + 'px'
     }
   },
   watch: {
    sliderHeight() {
      this.setSliderHeight()
    }
   }
 }

</script>
<style lang="stylus" rel="stylesheet/stylus">
.l-slider
  width: 100%
  padding: 1%
  .mint-swipe-item
    height: auto
    a
      display: block  
    img
      width: 100%
      border-radius: 8px 
</style>