import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)


// 导入组件
import Search from 'components/search/search'
import Rank from 'components/rank/rank'
import Recommend from 'components/recommend/recommend'
import Singer from 'components/singer/singer'
import SingerDetails from 'components/singer-details/singer-details'
import SongsDetails from 'components/songs-details/songs-details'
import RankDetails from 'components/rank-details/rank-details'
import FillPlayer from 'components/fill-player/fill-player'

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
      name: 'singerDetails',
      component: SingerDetails
    },
    {
      path: '/songs/:id',
      name: 'songsDetails',
      component: SongsDetails
    },
    {
      path: '/rank/:id',
      name: 'rankDetails',
      component: RankDetails
    },
    {
      path: '/player/:id',
      name: 'fillPlayer',
      component: FillPlayer
    }
  ]
})
