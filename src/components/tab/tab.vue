<template>
  <div class="l-tab">
      <router-link tag="div" to="/recommend">
        <span class="l-tab-item">推荐</span>
      </router-link>
      <router-link tag="div" to="/singer">
        <span class="l-tab-item">歌手</span>
      </router-link>
      <router-link tag="div" to="/rank">
        <span class="l-tab-item">排行</span>
      </router-link>
      <router-link tag="div" to="/search">
        <span class="l-tab-item">搜索</span>
      </router-link>
  </div>
</template>
<script>
</script>
<style lang="stylus" rel="stylesheet/stylus" scoped>
@import "~common/stylus/variable";

.l-tab
  display: flex
  justify-content: space-between
  
  div
    text-align: center
    line-height: 40px
    width: 25%
    .l-tab-item
      display: inline-block
      height: 40px
      padding: 0px 10px
  .router-link-active
    .l-tab-item
      border-bottom: 2px solid $color-theme
      color: $color-theme

</style>