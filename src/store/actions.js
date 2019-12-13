import {MODE} from 'api/storeConfig'
import { Toast } from 'mint-ui'
// 点击选择列表歌曲开始播放的多状态改变
export const selectPlay = function({commit}, {index, song, sequenceList}) {
  commit('SET_PLAYING', true)
  commit('SET_CURRENTSONG', song)
  commit('SET_CURRENTINDEX', index)
  commit('SET_SEQUENCELIST', sequenceList)
  commit('SET_FULLSCREEN', true)
  commit('SET_CURRENTLIST', sequenceList)
}

// 以点击随机播放的方式开始播放歌曲
export const randomPlay = function ({commit}, {sequenceList}) {
  commit('SET_SEQUENCELIST', sequenceList)
  commit('SET_FULLSCREEN', true)
  commit('SET_PLAYING', true)
  // sequenceList随机排序赋值给随机列表
  let randomList = sequenceList.slice().sort(function(){return Math.random() - 0.5})
  let index = Math.floor(Math.random() * randomList.length)
  let song = randomList[index]
  commit('SET_RANDOMLIST', randomList)
  commit('SET_CURRENTLIST', randomList)
  commit('SET_CURRENTINDEX', index)
  commit('SET_CURRENTSONG', song)
}

// 切换播放模式
export const switchMode = function({commit, state}, {mode}) {
  let index
  commit('SET_MODE', mode)
  switch (mode) {
    case MODE.SEQUENCE:
      commit('SET_CURRENTLIST', state.sequenceList)
      index = state.sequenceList.indexOf(state.currentSong)
      commit('SET_CURRENTINDEX', index)
      Toast({
        message: '顺序播放',
        position: 'middle',
        duration: 1000
      })
      break;
    case MODE.RANDOM:
      let randomList = state.sequenceList.slice().sort(function(){return Math.random() - 0.5})
      index = randomList.indexOf(state.currentSong)
      console.log(index)
      commit('SET_RANDOMLIST', randomList)
      commit('SET_CURRENTLIST', randomList)
      commit('SET_CURRENTINDEX', index)
      Toast({
        message: '随机播放',
        position: 'middle',
        duration: 1000
      })
      break;
    case MODE.LOOP:
      Toast({
        message: '单曲播放',
        position: 'middle',
        duration: 1000
      })
      break;
    default:
      break;
  }
}

// 前后切换歌曲
export const switchSong = function({commit, state}, {num}) {
  let index = state.currentIndex + num
  index = (index + state.currentList.length) % state.currentList.length
  commit('SET_CURRENTINDEX', index)
  commit('SET_CURRENTSONG', state.currentList[state.currentIndex])
}