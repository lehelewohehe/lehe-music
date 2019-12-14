<template>
  <div class="l-favorite">
    <div class="favorite-play" ref="play" @click="initRandomPlay">
      <i class="fa fa-play-circle-o"></i>随机播放全部
    </div>
    <scroll :data="favoriteList">
      <list :data="favoriteList" :code="true" :index="true" :author="true"></list>
    </scroll>
  </div>
</template>
<script>
import Scroll from 'base/scroll/scroll'
import List from 'base/list/list'
import {mapGetters, mapActions} from 'vuex'
export default {
  data() {
    return {
    }
  },
  methods: {
    initRandomPlay() {
      let sequenceList = this.favoriteList.slice()
      this.randomPlay({sequenceList})
    },
    ...mapActions([
    'randomPlay'
    ]),
  },
  computed: {
    ...mapGetters([
      'favoriteList'
    ])
  },
  components: {
    Scroll,
    List
  }
}
</script>
<style  lang="stylus" rel="stylesheet/stylus" scoped>
@import "~common/stylus/variable";
@import "~common/stylus/mixin";
.l-favorite
  position: absolute
  width: 100%
  top: 40px
  bottom: 0
  backround-color: red
  .favorite-play
    margin-top: 5px
    /* width: 100% */
    text-align: left
    padding: 0 10px
    height: 30px
    line-height: 30px
    border-bottom: 1px solid $color-theme
  .wrapper
    position: fixed
    padding: 0 10px
    top: 73px
    bottom: 0
    width: 100%
    box-sizing: border-box
    background-color: $color-background
    overflow: hidden
</style>