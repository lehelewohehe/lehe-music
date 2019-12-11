<template>
  <div class="l-player">
    <div class="player-big" v-if="fullScreen">
      <div class="l-player-head">
        <i class="fa fa-chevron-down" @click="setFullScreen(false)"></i>
        <div class="player-head-title">{{ currentSong.name }}</div>
      </div>
      <div class="l-player-content">
        <div class="player-content-name">{{ currentSong.author }}</div>
        <div class="player-content-view">
          <mt-swipe :auto="0">
            <mt-swipe-item>
              <img :src="currentSong.al.picUrl" alt="">
            </mt-swipe-item>
            <mt-swipe-item>2</mt-swipe-item>
          </mt-swipe>
        </div>
        <div class="player-content-progress">
          <mt-range v-model="currentTime" :min="0" :max="maxTime">
            <div slot="start">{{ currentTimeStr }}</div>
            <div slot="end">{{ durationStr }}</div>
          </mt-range>
        </div>
        <div class="player-content-btn">
          <!-- <i class="fa fa-random"></i> -->
          <i :class="{'fa': true, 'fa-refresh': mode === MODE.SEQUENCE, 'fa-random': mode === MODE.RANDOM, 'fa-repeat': mode === MODE.LOOP }" @click="changeMode"></i>
          <!-- <i class="fa fa-repeat"></i> -->
          <i class="fa fa-backward" @click="switchSong({num: -1})"></i>
          <i :class="{'btn-player': true, 'fa': true, 'fa-pause': !playing, 'fa-play': playing}" @click="changePlaying"></i>
          <!-- <i class="fa fa-play"></i> -->
          <i class="fa fa-forward" @click="switchSong({num: 1})"></i>
          <i class="fa fa-heart-o btn-heart"></i>
        </div>
      </div>
    </div>
    <div class="player-small" v-if="!fullScreen">
        <div class="l-player-left" @click="setFullScreen(true)">
          <img :src="currentSong.al.picUrl" alt="">
          <div class="player-left-info">
            <p>{{ currentSong.name }}</p>
            <p>{{ currentSong.author }}</p>
          </div>
        </div>
        <div class="l-player-right">
          <i :class="{'fa': true, 'fa-pause': !playing, 'fa-play': playing}" @click="changePlaying"></i>
          <i class="fa fa-th-list"></i>
        </div>
    </div>
    <audio :src="songInfo.url" @timeupdate="updateCurrentTime" @play="initAudioInfo" autoplay ref="audio" :loop="mode === MODE.LOOP" @ended="switchSong({num: 1})"></audio>
  </div>
</template>
<script>
import {mapGetters, mapMutations, mapActions} from 'vuex'
import {MODE} from 'api/storeConfig'
import {parseTime} from 'api/player'
export default {
  data() {
    return {
      songInfo: {},
      MODE: MODE,
      currentTimeStr: '00:00',
      durationStr: '00:00',
      maxTime: 100,
      currentTime: 0
    }
  },
  computed: {
    ...mapGetters([
      'fullScreen',
      'currentSong',
      'playing',
      'favoriteList',
      'mode'
  ]),

  },
  created() {
    console.log(this.currentSong)
    this.getSongInfo()
  },
  methods: {
    ...mapMutations({
      setFullScreen: 'SET_FULLSCREEN',
      setPlaying: 'SET_PLAYING'
    }),
    ...mapActions([
      'switchMode',
      'switchSong'
    ]),
    getSongInfo() {
      this.axios.get(`song/url?id=${this.currentSong.id}`)
      .then(res => {
        if(res.data.code === 200) {
          this.songInfo = res.data.data[0]
        }
      }).catch(error => {
        console.log(error)
      })
    },
    changeMode() {
      let mode = (this.mode + 1) % 3 ? (this.mode + 1) % 3 : 3
      console.log(mode)
      this.switchMode({mode})
    },
    changePlaying() {
      if(this.playing) {
        this.$refs.audio.pause()
      } else {
        this.$refs.audio.play()
      }
      this.setPlaying(!this.playing)   
    },
    initAudioInfo() {
      let audio = this.$refs.audio
      console.log(audio.duration)
      this.maxTime = parseInt(audio.duration)
      this.durationStr = parseTime(parseInt(audio.duration))
      this.currentTimeStr = parseTime(parseInt(audio.currentTime))
    },
    updateCurrentTime() {
      let audio = this.$refs.audio
      this.currentTimeStr = parseTime(parseInt(audio.currentTime))
      this.currentTime = parseInt(audio.currentTime)
    }
  },
  watch: {
    currentSong : function() {
      console.log(this.currentSong)
      this.getSongInfo()
    }
  }
}
</script>
<style lang="stylus" rel="stylesheet/stylus" scoped>
@import "~common/stylus/variable";
.l-player
  .player-big
    position: fixed
    top: 0
    bottom: 0
    width: 100%
    background-color: $color-background-l
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
        .mint-swipe-item
          display: flex
          flex-direction: column
          justify-content: center
          img
            width: 100%
            height: auto
            border-radius: 50%
          
      .player-content-progress
        padding: 15px 0
        .mt-range-thumb
          width: 5px
          height: 5px
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
  .player-small
    height: 50px
    position: absolute
    left: 0
    bottom: 0
    padding: 5px 
    display: flex
    width: 100%
    background-color: $color-highlight-background
    justify-content: space-between
    box-sizing: border-box
    line-height: 40px
    .l-player-left
      display: flex
      width: 60%
      img
        height: 40px
        width: 40px
        border-radius: 50%
      .player-left-info
        max-width: 60%
        display: flex
        justify-content: space-between
        flex-direction: column
        line-height: 20px
        margin-left: 5px
        p
          width: 100%
          no-wrap()
    .l-player-right
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
          margin-right: 5px
</style>