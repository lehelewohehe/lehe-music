<template>
    <div class="l-singer-details">
      <song-list :info="singerInfo" :songs="singerSongsList">
        <div class="list-view-item" v-for="(item, index) in singerSongsList" @click="jumpPlayer(item.id)">
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
 import {mapMutations} from 'vuex'
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
         console.log(errot)
       })
     },
     jumpPlayer(id) {
       this.setIsSmall(false)
       this.$router.push({ name: "fillPlayer", params: { id } })
     },
    ...mapMutations({
      setIsSmall: 'SET_ISSMALL'
    })
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