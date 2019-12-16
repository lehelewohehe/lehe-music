<template>
  <div class="l-current-playlist" @click="forward">
    <div class="container an" @click.stop.prevent>
      <div class="current-playlist-play" ref="play">
          <i :class="{'fa': true, 'fa-refresh': mode === MODE.SEQUENCE, 'fa-random': mode === MODE.RANDOM, 'fa-repeat': mode === MODE.LOOP }" @click="changeMode"></i>
          <i class="fa fa-trash-o" @click="deleteAllPlaylist"></i>
      </div>
      <scroll :data="currentList">
        <list :data="currentList" :code="true" :icon="true" :btn="true" class="playlist" @click="deleteOnePlaylist"></list>
      </scroll>
      <div class="current-playlist-close" @click="close">
        关闭
      </div>
    </div>
  </div>
</template>
<script>
import Scroll from 'base/scroll/scroll'
import List from 'base/list/list'
import {MODE} from 'api/storeConfig'
import {mapGetters, mapActions, mapMutations} from 'vuex'
export default {
  data() {
    return {
      MODE: MODE
    }
  },
  methods: {
    forward() {
      this.$emit('click')
    },
    close() {
      this.$emit('click')
    },
    changeMode() {
      let mode = (this.mode + 1) % 3 ? (this.mode + 1) % 3 : 3
      console.log(mode)
      this.switchMode({mode})
    },
    ...mapActions([
      'switchMode',
      'deleteAllPlaylist',
      'deleteOnePlaylist'
    ]),
    ...mapMutations({
      setCurrentList: 'SET_CURRENTLIST'
    })
  },
  computed: {
    ...mapGetters([
      'currentList',
      'mode'
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
.l-current-playlist
  position: fixed
  width: 100%
  top: 0
  bottom: 0
  z-index: 3
  background-color: $color-background-d
  .container
    position: absolute
    bottom: 0
    min-height: 70px
    max-height: 350px
    width: 100%
    background-color: $color-background
    .current-playlist-play
      margin-top: 5px
      /* width: 100% */
      text-align: left
      padding: 0 10px
      height: 30px
      line-height: 30px
      border-bottom: 1px solid $color-theme
      display:flex
      justify-content: space-between
      border-radius: 10px
      i
        font-size: 20px
    .wrapper
      padding: 0 10px
      width: 100%
      max-height: 240px
      box-sizing: border-box
      overflow: hidden
    .current-playlist-close
      text-align: center
      height: 40px
      width: 100%
      color: $color-theme
      line-height: 40px
      font-size: 20px
      border-top: 1px solid $color-theme
      border-radius: 10px
@-webkit-keyframes rotation
  from
    transform: translateY(350px)
    -webkit-transform: translateY(350px)
  to 
    transform: translateY(0px)
    -webkit-transform: translateY(0px)
.an
  transform: translateY(0px)
  -webkit-transform: translateY(0px)
  animation: rotation 0.5s linear 
  -moz-animation: rotation 0.5s linear 
  -webkit-animation: rotation 0.5s linear 
  -o-animation: rotation 0.5s linear 
</style>