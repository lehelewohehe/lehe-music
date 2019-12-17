<template>
  <div class="l-search">
    <mt-search v-model="value">
      <scroll 
      :data="searchSongResult" 
      v-if="value.length" 
      @pullingUp="getSearchResultAgain" 
      :pullUpLoad="{threshold: -90, moreTxt: '加载更多', noMoreTxt: '没有更多数据了'}">
        <div class="search-data-container" >
          <a class="mint-cell" v-for="item in searchSingerResult" @click="goSingerDetails(item.id, value)">
            <div class="mint-cell-wrapper">
              <i class="fa fa-user"></i>
              <span class="mint-cell-text">{{ item.name }}</span>
              <div class="mint-cell-value"><span></span></div> 
            </div>
          </a>
          <a class="mint-cell" v-for="(item, index) in searchSongResult" @click="initSelectPlay(item.id, index, value)">
            <div class="mint-cell-wrapper">
              <i class="fa fa-music"></i>
              <span class="mint-cell-text"> {{ item.name }}</span>
              <div class="mint-cell-value"><span>{{ item.author }}</span></div> 
            </div>
          </a>
          <loading class="search-loading"></loading>
        </div>
      </scroll>
    </mt-search>
    <div class="hot-key" v-if="!value.length">
      <span class="hot-key-item needsclick" v-for="item in hotKey" @click="autoFillKey">{{ item.first }}</span>
    </div>
    <search-history v-if="!value.length"></search-history>
  </div>
</template>
<script>
import { searchSongListType, searchSingerListType } from 'api/objectType.js'
import Scroll from 'base/scroll/scroll'
import Loading from 'base/loading/loading'
import SearchHistory from 'components/search-history/search-history'
import {mapActions, mapGetters} from 'vuex'
export default {
  data() {
    return {
      value: '',
      searchSongResult: [],
      searchSingerResult: [],
      hotKey: [],
      offset: 1
    }
  },
  created() {
    this.getHotKey()
  },
  methods: {
    getSearchResult() {
      if(!this.value.length) return
      this.axios.get(`search?keywords=${this.value}&offset=${this.offset}`).
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
    getSearchResultAgain() {
      console.log('1111')
      this.offset++
      this.axios.get(`search?keywords=${this.value}&offset=${this.offset}`).
      then(res => {
        console.log(res)
        let temp = []
        if(res.data.code === 200) {
          res.data.result.songs.forEach(item => {
            temp.push(new searchSongListType(item))
          })
          this.searchSongResult = this.searchSongResult.concat(temp)
          console.log(this.searchSongResult)
        }
      }).catch(error => {
        console.log(error)
      })
    },
    initSelectPlay(id, index, value) {
      if(value.length) {
        this.saveSearch({value})
      }
      let sequenceList = this.searchSongResult.slice()
      let song = sequenceList[index]
      this.selectPlay({index, song, sequenceList})
    },
    goSingerDetails(id, value) {
      if(value.length) {
        this.saveSearch({value})
      }
      this.$router.push({ name: "singerDetails", params: { id } })
    },
    ...mapActions([
      'selectPlay',
      'saveSearch'
    ])
  },
  watch: {
    value: function() {
      this.getSearchResult()
    },
    transmit: function(newValue) {
      this.value = newValue
    }
  },
  computed: {
    ...mapGetters([
      'transmit'
    ])
  },
  components: {
    Scroll,
    Loading,
    SearchHistory
  }
}
</script>
<style lang="stylus" rel="stylesheet/stylus">
@import '~common/stylus/variable.styl';
@import '~common/stylus/mixin.styl';
.l-search
  position: fixed
  padding: 10px
  top: 82px
  bottom: 0
  z-index: 0
  left: 0
  right: 0
  border-sizing: border-box
  .mint-search
    height: 48px
  .mint-searchbar
    background-color: $color-highlight-background
    border-radius: 5px
    padding: 6px
    .mint-searchbar-inner
      background-color: $color-highlight-background
      i
        font-size: $font-size-medium-x
        display: flex
        justify-content: center
        flex-direction: column
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
      z-index: 1
      .search-data-container
        position: relative
        .search-loading 
          position: absolute
          bottom: -40px
          width: 20px
          height: 20px
          left: 50%
          transform: translateX(-50%)
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