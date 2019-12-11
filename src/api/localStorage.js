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