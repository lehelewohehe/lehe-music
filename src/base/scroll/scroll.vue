<template>
    <div class="wrapper" ref="wrapper"> 
      <slot></slot>
    </div>
</template>

<script>
// 引入 better-scroll
import BScroll from "better-scroll";

export default {
  props: {
    data: {
      type: Array,
      default: []
    },
    refreshDelay: {
      type: Number,
      default: 20
    },
    click: {
      type: Boolean,
      default: true
    },
    probeType: {
      type: Number,
      default: 1
    },
    preventDefault: {
      type: Boolean,
      default: false
    }
  },
  created() {
  },
  data() {
    return {
      scroll: null
    };
  },
  // 需要在 mounted 这个 生命周期中 实现
  //之所以要使用一个一次性定时器延迟20ms，是因为需要等一个nexttick（17ms）
  //保证让dom元素加载完成
  mounted() { 
    setTimeout(() => {
      this.initScroll()
    }, 20)
  },
  methods: {
    initScroll() {
      if (!this.$refs.wrapper) {
          return
      }
      this.scroll = new BScroll(this.$refs.wrapper, {
        click: this.click,
        probeType: this.probeType
      })
    },
    disable() {
        this.scroll && this.scroll.disable()
    },
    enable() {
      this.scroll && this.scroll.enable()
    },
    refresh() {
      this.scroll && this.scroll.refresh()
    },
    scrollTo() {
      this.scroll && this.scroll.scrollTo.apply(this.scroll, arguments)
    },
    scrollToElement() {
      this.scroll && this.scroll.scrollToElement.apply(this.scroll, arguments)
    }
  },
  watch: {
    //监听data数据，防止父组件数据传进来之前，scroll已经初始化完成
    //导致无法滑动的问题
    data() {
      setTimeout(() => {
        this.refresh()
      }, this.refreshDelay)
    }
  }
}
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
</style>