<template>
  <div id="app">
    <l-header></l-header>
    <tab></tab>
    <transition name="lehe">
      <router-view></router-view>
    </transition>
    <player v-if="currentIndex >= 0"></player>
  </div>
</template>

<script>
import LHeader from 'components/l-header/l-header'
import Tab from 'components/tab/tab'
import Player from 'components/player/player'
import {mapGetters} from 'vuex'
import 'common/stylus/index.styl'
import 'common/css/font-awesome.css'
export default {
  name: 'App',
  components: {
    LHeader,
    Tab,
    Player
  },
  computed: {
    ...mapGetters([
      'currentIndex'
    ])
  }
}
</script>

<style lang="stylus" rel="stylesheet/stylus">
/* 可以设置不同的进入和离开动画 */
/* 设置持续时间和动画函数 */
.lehe-enter-active 
  transition: all .3s ease
.lehe-leave-active 
  transition: all .3s cubic-bezier(1.0, 0.5, 0.8, 1.0)
.lehe-enter, .lehe-leave-to
  transform: translateX(-100%)
  opacity: 0
.mt-range-thumb
  width: 10px
  height: 10px
  top: 11px
</style>
