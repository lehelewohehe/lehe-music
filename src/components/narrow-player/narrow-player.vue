<template>
  <div class="l-player" v-if="isSmall">
    <div class="player-small">
      <div class="l-player-left" @click="changeBig">
        <img src="../../../static/images/lehe.jpg" alt="">
        <div class="player-left-info">
          <p>枫</p>
          <p>周杰伦</p>
        </div>
      </div>
      <div class="l-player-right">
        <i class="fa fa-play"></i>
        <i class="fa fa-th-list"></i>
      </div>
    </div>
  </div>
</template>
<script>
import {mapGetters} from 'vuex'
import {mapMutations} from 'vuex'
export default {
  data() {
    return {
      flag: true
    }
  },
  created() {
  },
  methods: {
    changeBig() {
      let id = 5
      this.setIsSmall(false)
      this.$router.push({name: 'fillPlayer', params: { id }})
    },
    ...mapMutations({
      setIsSmall: 'SET_ISSMALL'
    })
  },
  mounted() {

  },
  computed: {
    ...mapGetters([
      'isSmall'
  ])
  }
}
</script>
<style lang="stylus" rel="stylesheet/stylus" scoped>
@import "~common/stylus/variable";
.l-player
.player-small
    height: 50px
    position: absolute
    left: 0
    bottom: 0
    padding: 5px 
    display: flex
    width: 100%
    background-color: $color-highlight-background
    justify-content: space-between
    box-sizing: border-box
    line-height: 40px
    .l-player-left
      display: flex
      width: 60%
      img
        height: 40px
        width: 40px
        border-radius: 50%
      .player-left-info
        max-width: 60%
        display: flex
        justify-content: space-between
        flex-direction: column
        line-height: 20px
        margin-left: 5px
        p
          width: 100%
          no-wrap()
    .l-player-right
      i:before
          display:inline-block
          font-size: $font-size-large
          width: 30px
          height: 30px
          border-radius: 50%
          border: 1px solid $color-theme
          color: $color-theme
          text-align: center
          display: flex
          justify-content: center
          flex-direction: column
          margin-right: 5px
  </style>