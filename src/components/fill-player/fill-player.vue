<template>
  <div class="l-player">
    <div class="player-big">
      <div class="l-player-head">
        <i class="fa fa-chevron-down" @click="goBack"></i>
        <div class="player-head-title">夜曲</div>
      </div>
      <div class="l-player-content">
        <div class="player-content-name">周杰伦</div>
        <div class="player-content-view"></div>
        <div class="player-content-progress">
          <mt-progress :value="30">
            <div slot="start">0%</div>
            <div slot="end">100%</div>
          </mt-progress>
        </div>
        <div class="player-content-btn">
          <!-- <i class="fa fa-random"></i> -->
          <i class="fa fa-repeat"></i>
          <i class="fa fa-backward"></i>
          <i class="fa fa-pause btn-player"></i>
          <!-- <i class="fa fa-play"></i> -->
          <i class="fa fa-forward"></i>
          <i class="fa fa-heart-o btn-heart"></i>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import {mapMutations} from 'vuex'
export default {
  data() {
    return {
    }
  },
  methods: {
    goBack() {
      this.$router.go(-1)
      this.setIsSmall(true)
    },
    ...mapMutations({
      setIsSmall: 'SET_ISSMALL'
    })
  }
}
</script>
<style lang="stylus" rel="stylesheet/stylus" scoped>
@import "~common/stylus/variable";
.l-player
  position: fixed
  top: 0
  bottom: 0
  width: 100%
  background-color: $color-background-l
  .player-big
    height: 100%
    width: 100%
    .l-player-head
      height: 40px
      font-size: 20px
      position: fixed
      line-height: 40px
      text-align: center
      width: 100%
      z-index: 2
      i
      .fa-chevron-down:before
        color: $color-theme
        position: absolute
        left: 10px
        top: 0px
        font-size: 25px
        height: 100%
        line-height: 40px
      .player-head-title
        color: $color-text
    .l-player-content
      padding: 40px 30px 60px
      box-sizing: border-box
      height: 100%
      .player-content-name
        font-size: $font-size-small
        text-align: center
        padding: 5px 0
      .player-content-view
        height: 75%
        background-color: red
      .player-content-progress
        padding: 15px 0
      .player-content-btn
        display: flex
        justify-content: space-between
        height: 42px
        margin-top: 10px
        i:before
          display:inline-block
          font-size: $font-size-large
          width: 30px
          height: 30px
          border-radius: 50%
          border: 1px solid $color-theme
          color: $color-theme
          text-align: center
          display: flex
          justify-content: center
          flex-direction: column
          margin-top: 6px
        .btn-player:before
          width: 40px
          height: 40px
          margin: 0
        .btn-heart:before
          border: none
          font-size: 30px
</style>