<template>
  <div class="l-songs-details">
    <song-list :info="songInfo" :songs="songSongsList">
      <div class="list-view-item" v-for="(item, index) in songSongsList" 
      @click="initSelectPlay(item.id, index)">
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
import { songInfoType, songSongsListType } from 'api/objectType.js'
import {mapActions} from 'vuex'
export default {
  data() {
    return {
      songSongsList: [],
      songInfo: {},
      id: this.$route.params.id
    }
  },
  created() {
    this.getsongDetailesList()
  },
  methods: {
    getsongDetailesList() {
      this.axios.get(`playlist/detail?id=${this.id}`)
      .then(res => {
        console.log(res)
        let temp = []
        if(res.data.code === 200) {
          this.songInfo = new songInfoType(res.data.playlist)
          res.data.playlist.tracks.forEach(item => {
            temp.push(new songSongsListType(item))
          })
           this.songSongsList = temp
           console.log(this.songInfo)
           console.log(this.songSongsList)
       }
      }).catch(error =>{
        console.log(errot)
      })
    },
    initSelectPlay(id, index) {
      let sequenceList = this.songSongsList.slice()
      let song = sequenceList[index]
      this.selectPlay({index, song, sequenceList})
    },
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