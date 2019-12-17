import * as type from './mutation-types'

export default {
  [type.SET_FULLSCREEN](state, status) {
    state.fullScreen = status
  },
  [type.SET_CURRENTINDEX](state, index) {
    state.currentIndex = index
  },
  [type.SET_CURRENTSONG](state, song) {
    state.currentSong = song
  },
  [type.SET_MODE](state, mode) {
    state.mode = mode
  },
  [type.SET_RANDOMLIST](state, list) {
    state.randomList = list
  },
  [type.SET_SEQUENCELIST](state, list) {
    state.sequenceList = list
  },
  [type.SET_PLAYING](state, play) {
    state.playing = play
  },
  [type.SET_FAVORITELIST](state, favoriteList) {
    state.favoriteList = favoriteList
  },
  [type.SET_PLAYHISTORY](state, playHistory) {
    state.playHistory = playHistory
  },
  [type.SET_SEARCHHISTORY](state, searchHistory) {
    state.searchHistory = searchHistory
  },
  [type.SET_CURRENTLIST](state, currentList) {
    state.currentList = currentList
  },
  [type.DEL_CURRENTLIST_ONE](state, index) {
    state.currentList.splice(index, 1) 
  },
  [type.SET_TRANSMIT](state, value) {
    state.transmit = value
  }
}