<template>
  <div class="l-song-list" >
    <div class="song-list-head">
      <i class="fa fa-chevron-left" @click="goBack"></i>
      <div class="list-head-title">{{ info.name }}</div>
    </div>
    <div class="song-list-bgm" ref="bgm" >
      <div class="list-bgm-img" :style="`background-image: url(${info.img1v1Url})`"></div>
      <div class="list-bgm-shelter"></div>
      <div class="list-bgm-play" ref="play"><i class="fa fa-play-circle-o"></i>随机播放全部</div>
    </div>
    <scroll :data="songs" ref="wrapper" :probeType="probeType" @scroll="setBgmRelevant">
      <div class="song-list-view">
        <slot></slot>
      </div>
    </scroll>
  </div>
</template>
<script>
import Scroll from 'base/scroll/scroll'
import Loading from 'base/loading/loading'
export default {
  data() {
    return {
      probeType: 3,
    }
  },
  props: {
    info: {
      type: Object,
      default: {}
    },
    songs: {
      type: Array,
      default: []
    }

  },
  created() {
    this.flag = true
  },
  methods: {
    goBack() {
      this.$router.go(-1)
    },
    setBgmRelevant() {
      if(this.flag) {
        // bgm最大高度
        this.maxHeight = this.$refs.bgm.clientHeight
        this.flag = false
      }
      //当歌单列表滚动到song-list-head的底部的时候
      //将图片的层级提高，没有到song-list-head的底部的时候动态改变song-list-bgm的高度
      //并且到某个位置隐藏播放按钮
      //计算歌单列表滚出去的高度
      //获取滚动组件实例和song-list-bgm元素标签实例,获取播放按钮元素对象
      let scroll = this.$refs.wrapper.scroll
      let bgm = this.$refs.bgm
      let play = this.$refs.play
      let scrollHeight = scroll.y
      // bgm实际高度
      let bgmHeight = scrollHeight + this.maxHeight
      if( bgmHeight > 40 ) {
        bgm.style.height = scrollHeight + this.maxHeight + 'px'
        play.style.opacity = (bgmHeight - 100) / (this.maxHeight - 100)
      }
    }
  },
  components: {
    Scroll
  }
}
</script>
<style lang="stylus" rel="stylesheet/stylus" scoped>
@import "~common/stylus/variable";
.l-song-list
  position: fixed
  top: 0
  bottom: 0
  width: 100%
  background-color: $color-background
  .song-list-head
    height: 40px
    font-size: 20px
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
    .list-head-title
      color: $color-text

  .song-list-bgm
    position: relative
    width: 100%
    height: 40%
    z-index: 1
    .list-bgm-img
    .list-bgm-shelter   
      width: 100%
      height: 100%
    .list-bgm-img
      background-size: cover
      background-repeat:no-repeat
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
  .wrapper
    position: fixed
    bottom: 0
    top: 40%
    width: 100%
    .song-list-view
      padding: 10px
      background-color: $color-background
</style>