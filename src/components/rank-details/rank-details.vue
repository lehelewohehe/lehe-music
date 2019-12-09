<template>
    <div class="l-singer-details">
      <song-list :info="rankInfo" :songs="rankSongsList">
        <div class="list-view-item" v-for="(item, index) in rankSongsList">
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
 import { rankSongsListType, rankInfoType } from 'api/objectType.js'
 export default {
   data() {
     return {
       rankSongsList: [],
       rankInfo: {},
       id: this.$route.params.id
     }
   },
   created() {
     this.getrankDetailesList()
   },
   methods: {
     getrankDetailesList() {
       this.axios.get(`top/list?idx=${this.id}`)
       .then(res => {
         console.log(res)
         let temp = []
         if(res.data.code === 200) {
           this.rankInfo = new rankInfoType(res.data.playlist)
             res.data.playlist.tracks.forEach(item => {
             temp.push(new rankSongsListType(item))
           })
            this.rankSongsList = temp
            console.log(this.rankInfo)
            console.log(this.rankSongsList)
         }
       }).catch(error =>{
         console.log(errot)
       })
     }
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