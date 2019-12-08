<template>
  <div class="l-song-list">
    <div class="song-list-head">
      <i class="fa fa-chevron-left"></i>
      <div class="list-head-title">周杰伦</div>
    </div>
    <div class="song-list-bgm">
      <img src="../../common/images/lehe.jpg" alt="">
      <div class="list-bgm-shelter"></div>
      <div class="list-bgm-play"><i class="fa fa-play-circle-o"></i>随机播放全部</div>
    </div>
    <div class="song-list-view">
      <div class="list-view-item">
        <div class="view-item-code"></div>
        <div class="view-item-song"></div>
      </div>
    </div>
  </div>
</template>
<script>
import Scroll from 'base/scroll/scroll'
import Loading from 'base/loading/loading'
export default {

}
</script>
<style lang="stylus" rel="stylesheet/stylus" scoped>
@import "~common/stylus/variable";
.l-song-list
  position: fixed
  top: 0
  bottom: 0
  width: 100%
  .song-list-head
    height: 40px
    font-size: 20px
    position: fixed
    line-height: 40px
    text-align: center
    width: 100%
    z-index: 1
    i
      color: $color-theme
      position: absolute
      left: 10px
      font-size: 30px
      top: 5px
    .list-head-title
      color: $color-text

  .song-list-bgm
    position: relative
    img
    .list-bgm-shelter   
      width: 100%
      height: 100%
    .list-bgm-shelter
      background-color: $color-background-d
      position: absolute
      left: 0
      top: 0
    .list-bgm-play
      width: 100px
      height: 30px
      line-height: 30px
      text-align: center
      border-radius: 5px
      font-size: $font-size-medium
      color: $color-theme
      border: 2px solid $color-theme
      position: absolute
      bottom: 20px
      left: 50%
      transform: translateX(-50%)
      -webkit-transform: translateX(-50%)
  .song-list-view
    padding: 10px
    .list-view-item
      height: 40px
      width: 100%
</style>