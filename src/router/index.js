import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)


// 导入组件
import Search from 'components/search/search'
import Rank from 'components/rank/rank'
import Recommend from 'components/recommend/recommend'
import Singer from 'components/singer/singer'
import SongList from 'base/song-list/song-list'

export default new Router({
  routes: [
    {
      path: '/',
      redirect: '/recommend'
    },
    {
      path: '/recommend',
      name: 'recommend',
      component: Recommend
    },
    {
      path: '/rank',
      name: 'rank',
      component: Rank
    },
    {
      path: '/singer',
      name: 'singer',
      component: Singer
    },
    {
      path: '/search',
      name: 'search',
      component: Search
    },
    {
      path: '/singer/:id',
      name: 'songList',
      component: SongList
    }
  ]
})
