import { mode } from 'api/storeConfig'

export default  {
  isPlay: false,   //播放状态
  mode: mode.SEQUENCE,   //播放模式
  sequenceList: [],    //顺序播放列表
  randomList: [],    //随机播放列表
  currentSong: {},   //当前播放的歌
  isSmall: false   //播放器状态
}