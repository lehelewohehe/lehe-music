<template>
    <div class="l-singer-details">
      <song-list :info="singerInfo" :songs="singerSongsList">
        <div class="list-view-item" v-for="(item, index) in singerSongsList" @click="initSelectPlay(item.id, index)">
          <div class="view-item-code">{{ index + 1 }}</div>
          <div class="view-item-song">
            <div class="song-name">{{ item.name }}</div>
            <div class="song-author">{{ item.author }}</div>
          </div>
        </div>
      </song-list>
    </div>
 </template>
 <script>
 import SongList from 'base/song-list/song-list'
 import { singerSongsListType, singerInfoType } from 'api/objectType.js'
 import {mapActions} from 'vuex'
 export default {
   data() {
     return {
       singerSongsList: [],
       singerInfo: {},
       id: this.$route.params.id
     }
   },
   created() {
     this.getsingerDetailesList()
   },
   methods: {
     getsingerDetailesList() {
       this.axios.get(`artists?id=${this.id}`)
       .then(res => {
         console.log(res)
         let temp = []
         if(res.data.code === 200) {
           this.singerInfo = new singerInfoType(res.data.artist)
           res.data.hotSongs.forEach(item => {
             temp.push(new singerSongsListType(item))
           })
            this.singerSongsList = temp
            console.log(this.singerInfo)
            console.log(this.singerSongsList)
         }
       }).catch(error =>{
         console.log(error)
       })
     },
     initSelectPlay(id, index) {
      let sequenceList = this.singerSongsList.slice()
      let song = sequenceList[index]
      this.selectPlay({index, song, sequenceList})
     },
    // ...mapMutations({
    //   setFullScreen: 'SET_FULLSCREEN',
    //   setSequenceList: 'SET_SEQUENCELIST',
    //   setPlaying: 'SET_PLAYING',
    //   setCurrentIndex: 'SET_CURRENTINDEX',
    //   setCurrentSong: 'SET_CURRENTSONG'
    // })
    ...mapActions([
      'selectPlay'
    ])
   },
   components: {
     SongList
   }
 }
 </script>
 <style lang="stylus" rel="stylesheet/stylus" scoped>
 @import "~common/stylus/variable";
 @import "~common/stylus/mixin";
 .list-view-item
    height: 60px
    width: 100%
    display: flex
    padding: 10px
    box-sizing: border-box
    overflow: hidden
    .view-item-code
      display: flex
      justify-content: center
      flex-direction: column
      font-size: $font-size-medium-x
      width: 12%
    .view-item-song
      display: flex
      justify-content: space-between
      flex-direction: column
      width: 87%
      .song-author
        font-size: $font-size-small
        color: $color-text-l
      .song-name
      .song-author
        no-wrap()
 </style>