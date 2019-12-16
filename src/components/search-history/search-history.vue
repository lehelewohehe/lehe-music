<template>
  <div class="l-search-history">
    <div class="search-history-play" ref="play">
        <span>搜索历史</span>
        <i class="fa fa-trash-o" @click="deleteOneSearch"></i>
    </div>
    <scroll :data="searchHistory">
        <list :data="searchHistory" :name="false"  :btn="true" class="searchHistory" @click="deleteOneSearch"></list>
    </scroll>
  </div>
</template>
<script>
import List from 'base/list/list'
import Scroll from 'base/scroll/scroll'
import {mapGetters, mapActions} from 'vuex'
export default {
  computed: {
    ...mapGetters([
      'searchHistory'
    ])
  },
  methods: {
    ...mapActions([
      'deleteOneSearch'
    ])
  },
  components: {
    List,
    Scroll
  }
} 
</script>
<style lang="stylus" rel="stylesheet/stylus" scoped>
.l-search-history
  width: 100%
  position: absolute
  bottom: 0
  top: 180px
  left: 0
  right: 0
  padding: 0 10px
  box-sizing: border-box
  .search-history-play
    margin-top: 10px
    /* width: 100% */
    display: flex
    justify-content: space-between
    padding: 0 5px
    height: 30px
    line-height: 30px
    border-bottom: 1px solid $color-theme
    border-radius: 10px
    i
      font-size: 20px
  .wrapper
    position: absolute
    top: 30px
    bottom: 0
    left: 0
    right: 0
    overflow: hidden
    padding-top: 5px
</style>