<template>
  <div class="l-search">
    <mt-search v-model="value">
      <scroll :data="searchSingerResult" v-if="value.length">
        <div class="search-data-container" >
          <a class="mint-cell" v-for="item in searchSingerResult" @click="goSingerDetails(item.id)">
            <div class="mint-cell-wrapper">
              <i class="fa fa-user"></i>
              <span class="mint-cell-text">{{ item.name }}</span>
              <div class="mint-cell-value"><span></span></div> 
            </div>
          </a>
          <a class="mint-cell" v-for="(item, index) in searchSongResult" @click="initSelectPlay(item.id, index)">
            <div class="mint-cell-wrapper">
              <i class="fa fa-music"></i>
              <span class="mint-cell-text"> {{ item.name }}</span>
              <div class="mint-cell-value"><span>{{ item.author }}</span></div> 
            </div>
          </a>
        </div>
      </scroll>
    </mt-search>
    <div class="hot-key" v-if="!value.length">
      <span class="hot-key-item needsclick" v-for="item in hotKey" @click="autoFillKey">{{ item.first }}</span>
    </div>  
  </div>
</template>
<script>
import { searchSongListType, searchSingerListType } from 'api/objectType.js'
import Scroll from 'base/scroll/scroll'
import Loading from 'base/loading/loading'
import {mapActions} from 'vuex'
export default {
  data() {
    return {
      value: '',
      searchSongResult: [],
      searchSingerResult: [],
      hotKey: [],
    }
  },
  created() {
    this.getHotKey()
  },
  methods: {
    getSearchResult() {
      this.axios.get(`search?keywords=${this.value}`).
      then(res => {
        console.log(res)
        let temp = []
        if(res.data.code === 200) {
          res.data.result.songs.forEach(item => {
            temp.push(new searchSongListType(item))
          })
          this.searchSongResult = temp
          console.log(this.searchSongResult)
        }
      }).catch(error => {
        console.log(error)
      })

      this.axios.get(`search?keywords=${this.value}&type=100`).
      then(res => {
        let temp = []
        if(res.data.code === 200) {
          res.data.result.artists.forEach(item => {
            temp.push(new searchSingerListType(item))
          })
          this.searchSingerResult = temp
          console.log(this.searchSingerResult)
          console.log(res)
        }
      }).catch(error => {
        console.log(error)
      })
    },
    getHotKey () {
      this.axios.get('search/hot').
      then(res => {
        console.log(res)
        if(res.data.code === 200) {
          this.hotKey = res.data.result.hots
          console.log(this.hotKey)
        }
      }).catch(error => {
        console.log(error)
      })
    },
    autoFillKey(e) {
      console.log(e.target.innerHTML)
      this.value = e.target.innerHTML
    },
    initSelectPlay(id, index) {
      let sequenceList = this.searchSongResult.slice()
      let song = sequenceList[index]
      this.selectPlay({index, song, sequenceList})
    },
    goSingerDetails(id) {
      this.$router.push({ name: "singerDetails", params: { id } })
    },
    ...mapActions([
      'selectPlay'
    ])
  },
  watch: {
    value: function() {
      this.getSearchResult()
    }
  },
  components: {
    Scroll,
    Loading
  }
}
</script>
<style lang="stylus" rel="stylesheet/stylus" >
@import "~common/stylus/variable";
@import "~common/stylus/mixin";
.l-search
  padding: 10px
  .mint-search
    height: 100%
  .mint-searchbar
    background-color: $color-highlight-background
    border-radius: 5px
    padding: 6px
    .mint-searchbar-inner
      background-color: $color-highlight-background
      i
        font-size: $font-size-medium-x
        height: 100%
      .mint-searchbar-core
        border: 2px solid $color-theme
        background-color: $color-background
        border-radius: 5px
        color: $color-text
        padding-left: 5px
        margin-left: 3px
    .mint-searchbar-cancel
      color: $color-theme
  .mint-search-list
    padding: 5px 10px 0px
    box-sizing: border-box
    margin-top: 140px
    .wrapper
      overflow: hidden
      position: fixed
      top: 140px
      bottom: 0px
      width: 100%
      padding: 0 10px
      left: 0
      box-sizing: border-box
  .hot-key
    display: flex
    margin-top: 20px
    flex-wrap: wrap
    .hot-key-item 
      padding: 2px 5px
      margin: 5px
      background-color: $color-dialog-background
      border-radius: 5px
      font-size: $font-size-small

.mint-cell
  background-color: $color-background
  .mint-cell-wrapper
    color: $color-text  
    background-image: none!important
    border-bottom: 1px solid $color-dialog-background
    .mint-cell-text
      font-size: $font-size-medium
      color: $color-text
      padding-left: 5px
      max-width: 60%
      no-wrap()
    .mint-cell-value
      font-size: $font-size-small-s
      padding-left: 10px
      max-width: 30%
      span
        no-wrap()
.mint-cell
  background-image: none!important
</style>