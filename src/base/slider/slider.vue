<template>
  <div class="l-slider" ref="slider">
    <mt-swipe :auto="4000" >
        <mt-swipe-item v-for="(item, index) in imgs" :key="imgs.pic" ><a :href="item.url"  :ref="'b' + index" class="needsclick"><img :src="item.pic" alt=""></a></mt-swipe-item>
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
    setTimeout( () => {
      this.setSliderHeight()
    }, 200)
   },
   methods: {
     setSliderHeight() {
       this.sliderHeight = this.$refs.b0[0].childNodes[0].clientHeight
      //  console.log(this.$refs.b0)
       console.log(this.$refs.b0[0].childNodes[0].clientHeight)
       this.$refs.slider.style.height = this.sliderHeight + 'px'
     }
   },
   watch: {
   }
 }

</script>
<style lang="stylus" rel="stylesheet/stylus">
.l-slider
  width: 100%
  padding: 1%
  box-sizing: border-box
  .mint-swipe-item
    height: auto
    a
      display: block
      width: 100%
      height: auto
    img
      width: 100%
      border-radius: 8px 
</style>