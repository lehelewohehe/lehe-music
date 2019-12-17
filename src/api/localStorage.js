// 本地存储初始化
export const initLocalStorage = function () {
  //先获取对应的存储对象
  let playHistory = localStorage.getItem('playHistory') || '[]'
  let favoriteList = localStorage.getItem('favoriteList') || '[]'
  let searchHistory = localStorage.getItem('searchHistory') || '[]'
  //设置存储对象
  localStorage.setItem('playHistory',playHistory)
  localStorage.setItem('favoriteList', favoriteList)
  localStorage.setItem('searchHistory', searchHistory)
}

// 调用初始化
initLocalStorage()

// 加载播放历史
export const loadPlayHistory = function () {
  return JSON.parse(localStorage.getItem('playHistory'))
}

// 加载最喜爱的列表
export const loadFavoriteList = function () {
  return JSON.parse(localStorage.getItem('favoriteList'))
}

// 加载搜索历史
export const loadSearchHistory = function () {
  return JSON.parse(localStorage.getItem('searchHistory'))
}

// 保存播放歌曲历史
export const savePlayHistory = function(song) {
  let playHistory = localStorage.getItem('playHistory') || '[]'
  let playArr = JSON.parse(playHistory)
  let flag = playArr.findIndex(function(item) {
    return item.id === song.id
  })
  console.log('------',flag)
  if(flag === -1) {
    playArr.unshift(song)
  } else {
    playArr.splice(flag, 1)
    playArr.unshift(song)
  }
  localStorage.setItem('playHistory', JSON.stringify(playArr))
}
// 保存喜爱歌曲
export const saveFavoriteList = function(song) {
  let favoriteList = localStorage.getItem('favoriteList') || '[]'
  let favoriteArr = JSON.parse(favoriteList)
  let flag = favoriteArr.findIndex(function(item) {
    return item.id === song.id
  })
  console.log(flag, song)
  if(flag === -1) {
    favoriteArr.push(song)
  } else {
    favoriteArr.splice(flag, 1)
  }
  localStorage.setItem('favoriteList',JSON.stringify(favoriteArr))
}

// 保存搜索列表
export const saveSearchHistory = function(value) {
  let searchHistory = localStorage.getItem('searchHistory') || '[]'
  let searchArr = JSON.parse(searchHistory)
  let flag = searchArr.findIndex(function(item){
    return item === value
  })
  if(flag === -1) {
    searchArr.unshift(value)
  } else {
    searchArr.splice(flag, 1)
    searchArr.unshift(value)
  }
  localStorage.setItem('searchHistory',JSON.stringify(searchArr))
}
// 删除一条或搜索列表数据
export const deleteSearchHistory = function(index) {
  let searchHistory = localStorage.getItem('searchHistory') || '[]'
  let searchArr = JSON.parse(searchHistory)
  if(index) {
    searchArr.splice(index, 1)
  } else {
    searchArr = []
  }
  localStorage.setItem('searchHistory',JSON.stringify(searchArr))
}