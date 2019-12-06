<template>
  <scroll :data="songsList" class="recomment-container">
    <div class="l-recommend">
      <slider :imgs="imgs"></slider>
      <loading v-if="!songsList.length" class="loading-one">
      </loading>
      <div v-if="songsList.length">
        <div class="recommend-list-head">歌单推荐</div>
        <div class="recommend-list-body">
          <div class="recommend-list-item" v-for="item in songsList" :key="item.picUrl">
            <span>{{ item.playCount | parseNumber }}</span>
            <img v-lazy="item.picUrl" alt="">
            <h3>{{ item.name }}</h3>
          </div>
        </div>
      </div>
      <loading v-if="!mvList.length" class="loading-two"> 
      </loading>
      <div v-if="mvList.length">
        <div class="recommend-mv-head">热门MV</div>
        <div class="recommend-mv-body">
          <div class="recommend-mv-item" v-for="item in mvList" :key="item.picUrl">
            <span>{{ item.playCount | parseNumber }}</span>
            <img v-lazy="item.cover" alt="">
            <h3>{{ item.name }}</h3>
            <div class="play fa fa-play-circle-o"></div>
          </div>
        </div>
      </div>
    </div>
  </scroll>
</template>
<script>
  import Slider from 'base/slider/slider'
  import Scroll from 'base/scroll/scroll'
  import Loading from 'base/loading/loading'
  import { imgsType, songsListType, mvListType } from 'api/objectType.js'
  export default {
    data (){
      return {
        imgs: [],
        songsList: [],
        mvList: []
      }
    },
    created () {
      this.type = 2
      this.songsLimit = 12
      this.mvLimit = 10
      this.getImgs()
      this.getSongList()
      this.getMVList()
    },
    components: {
      Slider,
      Scroll,
      Loading
    },
    methods: {
      getImgs() {
        // 为给定 ID 的 user 创建请求
        this.axios.get(`banner?type=${this.type}`)
          .then(res => {
            if (res.data.code === 200) {
              res.data.banners.forEach( item => {
                this.imgs.push(new imgsType(item))
              })
              // console.log(this.imgs)
            }
          })
          .catch( error => {
            console.log(error)
          })
      },
      getSongList() {
        this.axios.get(`personalized?limit=${this.songsLimit}`)
          .then(res => {
            console.log(res)
            if (res.data.code === 200) {
              res.data.result.forEach( item => {
                this.songsList.push(new songsListType(item))
              })
              // console.log(this.songsList)
            }
          })
          .catch( error => {
            console.log(error)
          })
      },
      getMVList() {
        this.axios.get(`top/mv?limit=${this.mvLimit}`)
        .then(res => {
          console.log(res)
          if (res.data.code === 200) {
            res.data.data.forEach( item => {
              this.mvList.push(new mvListType(item))
            })
            console.log(this.mvList)
          }
        })
        .catch( error => {
          console.log(error)
        })
      }
    },
    filters: {
      parseNumber(data) {
        return data % 10000 + '万'
      }
    }
  }
</script>
<style lang="stylus" rel="stylesheet/stylus" scoped>
@import "~common/stylus/variable";
@import "~common/stylus/mixin";
.recomment-container
  overflow: hidden
  position: fixed
  top: 82px
  bottom: 0px
  background-color: $color-background
.l-recommend
  margin-top: 5px
  .recommend-list-head
  .recommend-mv-head
    text-align: center
    height: 40px
    line-height: 40px
    color: $color-theme
  .recommend-list-body
    display: flex
    justify-content: flex-start
    flex-wrap: wrap
    .recommend-list-item
      width: 32%
      margin: 2px 0
      margin-left: 1%  
      padding: 1px
      box-sizing: border-box
      position: relative
      font-size: $font-size-small
      img
        width: 100%
        border-radius: 5px
      h3
        height: 32px
        overflow : hidden
        text-overflow: ellipsis
        display: -webkit-box
        -webkit-line-clamp: 2
        -webkit-box-orient: vertical
        line-height: 16px
      span
        position: absolute
        right: 5px
        top: 5px
  .recommend-mv-body
    display: flex
    justify-content: center 
    flex-wrap: wrap
    .recommend-mv-item
      padding: 1%
      position: relative
      font-size: $font-size-small
      img
        width: 100%
        border-radius: 10px
      h3
        height: 20px
        width: 100%
        border-radius: 10px
        overflow : hidden
        padding: 2px 5px
        text-overflow: ellipsis
        display: -webkit-box
        -webkit-line-clamp: 2
        -webkit-box-orient: vertical
        line-height: 20px
        position: absolute
        left: 1%
        bottom: 2%
        background-color: $color-background-d
      span
        position: absolute
        right: 8px
        top: 8px
      .play
        position: absolute
        transform: translate(-50%,-50%)
        -webkit-transform: translate(-50%,-50%)
        left: 50%
        top: 50%
        font-size: 40px
.loading-one
.loading-two
  position: fixed
  left: 50%
  top:50%
  transform: translate(-50%, -50%)
  -webkit-transiform: translate(-50%, -50%)
.loading-two
  top: 200%
</style>