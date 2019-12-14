<template>
  <div class="l-personal">
    <div class="l-personal-head">
      <i class="fa fa-chevron-left" @click="goBack"></i>
      <div class="personal-head-title">
        <div :class="{'title-active': index === 0 }" @click="changeActive(0)">
          <span class="l-tab-item">我的收藏</span>
        </div>
        <div :class="{'title-active': index === 1 }" @click="changeActive(1)">
          <span class="l-tab-item">最近播放</span>
        </div>
      </div>  
    </div>
    <favorite v-if="index === 0"></favorite>
    <play-history v-if="index === 1"></play-history>
  </div>
</template>
<script>
import playHistory from 'components/play-history/play-history'
import Favorite from 'components/favorite/favorite'
export default {
  data() {
    return {
      index: 0
    }
  },
  methods: {
    goBack() {
      this.$router.go(-1)
    },
    changeActive(index) {
      this.index = index
    }
  },
  components: {
    playHistory,
    Favorite
  }
}
</script>
<style lang="stylus" rel="stylesheet/stylus" scoped>
@import "~common/stylus/variable";
@import "~common/stylus/mixin";
.l-personal
  position: fixed
  top: 0
  bottom: 0
  width: 100%
  background-color: $color-background
  .l-personal-head
    height: 40px
    font-size: 16px
    position: fixed
    line-height: 40px
    text-align: center
    width: 100%
    z-index: 2
    i
    .fa-chevron-left:before
      color: $color-theme
      position: absolute
      left: 10px
      top: 0px
      font-size: 25px
      height: 100%
      line-height: 40px
    .personal-head-title
      color: $color-text
      display: flex
      justify-content: center
      div
        text-align: center
        line-height: 40px
        width: 25%
        .l-tab-item
          display: inline-block
          height: 40px
          padding: 0px 10px
      .title-active
        .l-tab-item
          border-bottom: 2px solid $color-theme
          color: $color-theme
</style>