<template>
  <div class="l-player">
    <div class="player-big" v-if="fullScreen" :style="`background-image: url(${currentSong.al.picUrl})`">
      <div class="l-player-head">
        <i class="fa fa-chevron-down" @click="changeFullScreen"></i>
        <div class="player-head-title">{{ currentSong.name }}</div>
      </div>
      <div class="l-player-content">
        <div class="player-content-name">{{ currentSong.author }}</div>
        <div class="player-content-view">
          <mt-swipe :auto="0">
            <mt-swipe-item>
              <img :src="currentSong.al.picUrl" alt="" ref="bigImg" :class="{an: playing}">
            </mt-swipe-item>
            <mt-swipe-item>
              <scroll :data="lyric" ref="scroll">
                <div class="lyric">
                  <div class="lyric-item" v-for="(item, index) in lyric" :key="index">{{ item.oneLyric }}</div>
                </div>
              </scroll>
            </mt-swipe-item>
          </mt-swipe>
        </div>
        <div class="player-content-progress">
          <mt-range v-model="audio.currentTime" :min="0" :max="maxTime">
            <div slot="start">{{ currentTimeStr }}</div>
            <div slot="end">{{ durationStr }}</div>
          </mt-range>
        </div>
        <div class="player-content-btn">
          <!-- <i class="fa fa-random"></i> -->
          <i :class="{'fa': true, 'fa-refresh': mode === MODE.SEQUENCE, 'fa-random': mode === MODE.RANDOM, 'fa-repeat': mode === MODE.LOOP }" @click="changeMode"></i>
          <!-- <i class="fa fa-repeat"></i> -->
          <i class="fa fa-backward" @click="switchSong({num: -1})"></i>
          <i :class="{'btn-player': true, 'fa': true, 'fa-pause': playing, 'fa-play': !playing}" @click="changePlaying"></i>
          <!-- <i class="fa fa-play"></i> -->
          <i class="fa fa-forward" @click="switchSong({num: 1})"></i>
          <i :class="{'btn-heart': true, 'fa': true, 'fa-heart-o': !isFavorite, 'fa-heart': isFavorite, 'red': isFavorite }" @click="saveFavorite({song:currentSong})"></i>
        </div>
      </div>
    </div>
    <div class="player-small" v-if="!fullScreen">
        <div class="l-player-left" @click="changeFullScreen">
          <img :src="currentSong.al.picUrl" alt="" ref="smallImg" :class="{an: playing}">
          <div class="player-left-info">
            <p>{{ currentSong.name }}</p>
            <p>{{ currentSong.author }}</p>
          </div>
        </div>
        <div class="l-player-right">
          <i :class="{'fa': true, 'fa-pause': playing, 'fa-play': !playing}" @click="changePlaying"></i>
          <i class="fa fa-th-list" @click="changeHide"></i>
        </div>
    </div>
    <current-playlist v-if="!fullScreen && hide"  @click="Hide"></current-playlist>
    <audio :src="songInfo.url" @timeupdate="updateCurrentTime" @playing="initAudioInfo" autoplay ref="audio" :loop="mode === MODE.LOOP" @ended="switchSong({num: 1})"></audio>
  </div>
</template>
<script>
import {mapGetters, mapMutations, mapActions} from 'vuex'
import {MODE} from 'api/storeConfig'
import {parseTime, parseLyric} from 'api/player'
import Scroll from 'base/scroll/scroll'
import CurrentPlaylist from 'components/current-playlist/current-playlist'
export default {
  data() {
    return {
      lyric: [],
      songInfo: {},
      MODE: MODE,
      currentTimeStr: '00:00',
      durationStr: '00:00',
      maxTime: 100,
      audio: {
        currentTime: 0
      },
      hide: false
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
  isFavorite: function() {
      let index = this.favoriteList.findIndex((item) => {
        return item.id === this.currentSong.id
      })
      return (index !== -1)
    }
  },
  created() {
    console.log(this.currentSong)
    this.getSongInfo()
    this.getLyric()
  },
  mounted() {
    this.audio = this.$refs.audio
    // console.log(this.audio)
    // console.log(this.$refs)
  },
  methods: {
    ...mapMutations({
      setFullScreen: 'SET_FULLSCREEN',
      setPlaying: 'SET_PLAYING'
    }),
    ...mapActions([
      'switchMode',
      'switchSong',
      'saveFavorite'
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
    getLyric() {
      this.axios.get(`lyric?id=${this.currentSong.id}`)
      .then(res => {
        console.log(res)
        if(res.data.code === 200) {
          // this.lyric = res.data.lrc.lyric
          // console.log(this.lyric)
          this.lyric = parseLyric(res.data.lrc.lyric)
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
    changeFullScreen() {
      this.setFullScreen(!this.fullScreen)
    },
    initAudioInfo() {
      this.maxTime = parseInt(this.audio.duration)
      this.durationStr = parseTime(parseInt(this.audio.duration))
      this.currentTimeStr = parseTime(parseInt(this.audio.currentTime))
      if(this.fullScreen) {
        this.lyric.forEach((item, index) => {
        if(parseInt(item.time) === parseInt(this.audio.currentTime)) {
          return this.$refs.scroll.scrollTo(0, (- index * 30), 500)
        }
      })
      }
    },
    updateCurrentTime() {
      this.initAudioInfo()
    },
    Hide() {
      this.hide = false
      console.log(1111111111)
    },
    changeHide() {
      this.hide = !this.hide
    }
    // lyricPosition(pos) {
    //   if(pos.y > 0) return
    //   let index = parseInt((-pos.y) / 20)
    //   this.audio.currentTime = this.lyric[index].time
    // }
  },
  watch: {
    currentSong: function() {
      console.log(this.currentSong)
      this.getSongInfo()
      this.getLyric()
    }
  },
  components: {
    Scroll,
    CurrentPlaylist
  }
}
</script>
<style lang="stylus" rel="stylesheet/stylus" scoped>
@import "~common/stylus/variable";
@import "~common/stylus/mixin";
.l-player
  .player-big
    position: fixed
    top: 0
    bottom: 0
    width: 100%
    height: 100%
    width: 100%
    background-size: cover
    background-color: $color-background
    z-index: 1
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
      background-color: $color-background-l
      .player-content-name
        font-size: $font-size-medium
        text-align: center
        no-wrap()
        padding: 5px 0
      .player-content-view
        height: 75%
        padding: 0 10px
        /* background-color: red */
        .mint-swipe-item
          text-align: center
          padding: 25% 0 0
          ver
          img
            width: 80%
            height: auto
            border-radius: 50%
            box-shadow: 0px 0px 5px 5px #fff
          .wrapper
            width: 100%
            height: 75%
            .lyric
              padding-bottom: 100%
              .lyric-item
                padding: 5px
                height: 30px
                box-sizing: border-box
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

@-webkit-keyframes rotation
  from
    transform: rotate(0deg)
    -webkit-transform: rotate(0deg)
  to 
    transform: rotate(360deg)
    -webkit-transform: rotate(360deg)
.an
  transform: rotate(360deg)
  -webkit-transform: rotate(360deg)
  animation: rotation 3s linear infinite forwards
  -moz-animation: rotation 3s linear infinite forwards
  -webkit-animation: rotation 3s linear infinite forwards
  -o-animation: rotation 3s linear infinite forwards
.red
  color: red
</style>