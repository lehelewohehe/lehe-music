<template>
  <div class="l-singer">
    <loading v-if="!singerList.length" class="loading"> 
    </loading>
    <scroll :data="singerList" v-if="singerList.length" @goclick>
      <div class="singer-container">
        <div class="singer-item" v-for="item in singerList" :key="item.title">
          <div class="singer-title">{{ item.title }}</div>
          <div class="singer-body" v-for="subItem in item.data" :key="subItem.id">
            <div class="singer-body-item">
              <img v-lazy="subItem.img1v1Url" alt="">
              <span class="item-name">{{ subItem.name }}</span>
            </div>
          </div>
        </div>
      </div>
    </scroll>
    <div class="singer-rightsiderbar" @click="clickPosition">
      <ul>
        <li v-for="item in singerList" :key="item.data.img1v1Url">{{ item.title }}</li>
      </ul>
    </div>
  </div>
</template>
<script>
import { singersListType } from 'api/objectType.js'
import { parseSingers, serialize } from 'api/singer.js'
import Scroll from 'base/scroll/scroll'
import Loading from 'base/loading/loading'
export default {
  data() {
    return {
      singerList: []
    }
  },
  created() {
    this.currentIndex = 0
    this.singerScope = []
    this.getSingerList()
  },
  methods: {
    getSingerList() {
      let temp = []
      this.axios.get('toplist/artist').
      then(res => {
        if(res.data.code === 200) {
          res.data.list.artists.forEach(item => {
            temp.push(new singersListType(item))
          })
          this.singerList = serialize(parseSingers(temp))
          this.clacSingerBlockScope()
          // this.singerList.forEach( (item, index) => {
          //   console.log(item.title)
          // })
        }
      }).catch(error => {
        console.log(error)
      })
    },
    clacSingerBlockScope() {
      let temp = 0
      //根据所有的歌手数据计算
      this.singerScope.push(0)
      this.singerList.forEach((item, index) => {
        let rollOutY = -(item.data.length * 16 )
        let cumulative = rollOutY + temp
        this.singerScope.push(cumulative)
        temp = cumulative
      })
      console.log(this.singerScope)
    },
    clickPosition(ev) {
      // 获取到点击的点相对于侧边栏上y轴的坐标
      let posY = ev.y - 120
      // 计算当前点击的索引相对于所有索引的编号，从0开始
      this.currentIndex = parseInt(posY / 16)

      this.$emit('goclick', this,singerScope[currentIndex])
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
.l-singer
  overflow: hidden
  position: fixed
  top: 82px
  bottom: 0px
  width: 100%
  background-color: $color-background
  .wrapper
    width: 100%
    height: 100%
    .singer-container
      width: 100%
      padding: 10px
      box-sizing: border-box
      .singer-item
        width: 100%
        .singer-title
          margin: 0px -10px
          background-color: $color-dialog-background
          padding: 0px 10px
        .singer-body-item
          display: flex
          padding: 5px 0px
          border-bottom: 1px solid $color-dialog-background
          .item-name
            font-size: $font-size-medium
            padding-left: 20px
            line-height: 45px
  .singer-rightsiderbar
    position: fixed
    top: 120px
    right: 5px
    height: 70%
    border-radius: 2px
    background-color: $color-background-d 
    li
      padding: 2px
      text-align: center
      font-size: $font-size-small
img
  width: 45px
  height: 45px
  border-radius: 3px
.loading
  position: fixed
  left: 50%
  top:50%
  transform: translate(-50%, -50%)
  -webkit-transiform: translate(-50%, -50%)
</style>