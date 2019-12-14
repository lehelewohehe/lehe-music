<template>
  <div class="l-list">
    <div class="l-list-item" v-for="(item, num) in data" 
    @click="initSelectPlay(item.id, num)">
      <div class="list-view-code" v-if="code">
        <div class="index" v-if="index">{{ num + 1 }}</div>
        <div class="icon" v-if="icon">
          <i :class="{'fa': true, 'fa-volume-up': currentIndex === num }"></i>
        </div>
      </div>
      <div class="list-view-content">
        <div class="content-name">{{ item.name }}</div>
        <div class="content-author" v-if="author">{{ item.author }}</div>
      </div>
      <div class="list-view-btn" v-if="btn">
        <i class="fa fa-times" @click.stop.prevent="deleteOne(num)"></i>
      </div>
    </div>
  </div>
</template>
<script>
 import {mapGetters, mapActions} from 'vuex'
 export default {
   data() {
     return {
     }
   },
   props: {
    data: {
      type: Array,
      default: []
    },
    code: {
      type: Boolean,
      default: false
    },
    author: {
      type: Boolean,
      default: false
    },
    btn: {
      type: Boolean,
      default: false
    },
    icon: {
      type: Boolean,
      default: false
    },
    index: {
      type: Boolean,
      default: false
    },
    str: {
      type: String,
      default: ''
    }
   },
   created() {
   },
   methods: {
     initSelectPlay(id, index) {
       console.log(this.data)
       console.log(id, index)
      let sequenceList = this.data.slice()
      console.log(sequenceList)
      let song = sequenceList[index]
      console.log(song)
      this.selectPlay({index, song, sequenceList})
     },
    ...mapActions([
      'selectPlay',
      'deleteOne'
    ])
   },
   computed: {
     ...mapGetters([
       'currentIndex'
     ])
   }
 }  
</script>
<style lang="stylus" rel="stylesheet/stylus" scoped>
@import "~common/stylus/variable";
@import "~common/stylus/mixin";
.l-list-item
   height: 60px
   width: 100%
   display: flex
   padding: 10px
   box-sizing: border-box
   overflow: hidden
   .list-view-code
     display: flex
     justify-content: center
     flex-direction: column
     font-size: $font-size-medium-x
     width: 12%
   .list-view-content
   .list-view-btn
     display: flex
     justify-content: space-between
     flex-direction: column
     width: 87%
     .content-author
       font-size: $font-size-small
       color: $color-text-l
     .content-name
     .content-author
       no-wrap()
.playlist
  .list-view-btn
    text-align: right
    width: 10%
  .list-view-content
    width: 70%
  .list-view-content
  .list-view-btn
    justify-content: center!important
    .fa-times:before
      height: 30px
      width: 30px
      display: inline-block
      text-align: center
      line-height: 30px
</style>