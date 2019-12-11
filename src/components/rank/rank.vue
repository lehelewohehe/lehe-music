<template>
  <div class="l-rank">
    <loading v-if="!rankAbstractList.length" class="loading"> 
    </loading>
    <scroll :data="rankAbstractList" v-if="rankAbstractList.length">
      <div class="rank-container">
        <div class="rank-item" v-for="item in rankAbstractList" :key="item.coverImgUrl" @click="jumpRouting(item.id)">
          <div class="rank-item-left">
            <img v-lazy="item.coverImgUrl" alt="">
          </div>
          <div class="rank-item-right">
            <p v-for="(subItem, index) in item.tracks" :key="item.coverImgUrl + index">{{subItem.first}} - {{subItem.second}} </p>
          </div>
        </div>
      </div>
    </scroll>
  </div>
</template>
<script>
  import { rankListType, rankId } from 'api/objectType.js'
  import Scroll from 'base/scroll/scroll'
  import Loading from 'base/loading/loading'
  export default {
    data() {
      return {
        rankAbstractList: []
      }
    },
    created() {
     this.getRankAbstractList()
    },
    methods: {
      getRankAbstractList() {
        this.axios.get('toplist/detail').
        then(res => {
          // 
         let temp = []
         if(res.data.code === 200) {
           res.data.list.forEach(item => {
             if( item.tracks.length !== 3 ) {
              item.tracks = [
                {"first": "无", "second": "无"},
                {"first": "无", "second": "无"},
                {"first": "无", "second": "无"}
              ]
             }
             item.id = rankId[item.name]
             temp.push(new rankListType(item))
           })
         }
         this.rankAbstractList = temp
         console.log(this.rankAbstractList)
        }).catch( error => {
          console.log(error)
        })
      },
      jumpRouting(id) {
        this.$router.push({ name: "rankDetails", params: { id } })
      }
    },
    components: {
      Scroll,
      Loading
    }
  }
</script>
<style lang="stylus" rel="stylesheet/stylus" scoped>
@import "~common/stylus/variable";
@import "~common/stylus/mixin";
.l-rank
  overflow: hidden
  position: fixed
  top: 82px
  bottom: 0px
  width: 100%
  background-color: $color-background
  .wrapper
    width: 100%
    position: fixed
    top: 82px
    bottom: 0px
    overflow: hidden
    .rank-item
      display: flex
      padding: 5px
      border-bottom: 1px solid $color-dialog-background
      img
        width: 100px
        height: 100px
        border-radius: 3px
      .rank-item-right
        display: flex
        justify-content: space-between
        flex-direction: column
        padding: 10px 20px
        p
          font-size: $font-size-small
          no-wrap()
 .loading
   position: fixed
   left: 50%
   top:50%
   transform: translate(-50%, -50%)
   -webkit-transiform: translate(-50%, -50%)
</style>