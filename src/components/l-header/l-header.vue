<template>
	<div class="l-header">
    <i class="fa fa-align-justify" @click="goPesonal"></i>
		<i class="fa fa-smile-o"></i> Lehe Music
	</div>
</template>
<script>
export default {
  methods: {
    goPesonal() {
      this.$router.push('/personal')
    }
  }
}	
</script>
<style lang="stylus" rel="stylesheet/stylus" scoped>
.l-header
  position: relative
  height: 40px
  text-align: center
  line-height: 40px
  font-size: 30px
  .fa-align-justify:before
    position: absolute
    left: 10px
    top: 8px
    font-size: 20px
</style>