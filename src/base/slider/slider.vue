<template>
  <div class="l-slider" ref="slider">
    <mt-swipe :auto="4000" >
        <mt-swipe-item v-for="(item, index) in imgs" :key="imgs.pic" ><a :href="item.url"  :ref="'b' + index" class="needsclick"><img :src="item.pic" alt="" @load="imgLoad"></a></mt-swipe-item>
    </mt-swipe>
  </div>
</template>
<script>
 export default {
   data() {
     return {
     }
   },
   props: {
     imgs: {
      type: Array,
      default: null
     }
   },
   created() {
    this.flag = true
   },
   mounted() {
    // setTimeout( () => {
    //   this.setSliderHeight()
    // }, 200)
   },
   methods: {
     setSliderHeight(e) {
       let naturalHeight = this.$refs.b0[0].childNodes[0].naturalHeight
       let naturalWidth = this.$refs.b0[0].childNodes[0].naturalWidth
      //  console.log(naturalHeight, naturalWidth)
       let currentWidth = e.path[9].clientWidth
       let currentHeight = parseInt(currentWidth / naturalWidth * naturalHeight * 0.98)
      //  console.log(currentHeight)
       this.$refs.slider.style.height = currentHeight + 'px'
     },
     imgLoad(e) {
      //  console.log(e)
       if(this.flag) {
         this.setSliderHeight(e)
         this.flag = false
       } 
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