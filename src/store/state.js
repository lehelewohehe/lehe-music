import { MODE } from 'api/storeConfig'
import {loadPlayHistory, loadFavoriteList, loadSearchHistory } from 'api/localStorage'

export default  {
  playing: true,   //播放状态
  mode: MODE.SEQUENCE,   //播放模式
  sequenceList: [],    //顺序播放列表
  randomList: [],    //随机播放列表
  currentList: [],   //当前播放的列表
  currentSong: {},   //当前播放的歌
  currentIndex: -1,   //当前播放歌曲的索引
  fullScreen: true,   //播放器状态
  playHistory: loadPlayHistory(),   //  播放历史
  favoriteList: loadFavoriteList(), //  喜爱列表
  searchHistory: loadSearchHistory() // 搜索历史
}