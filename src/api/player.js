
// 格式化时间
export const parseTime = function(second) {
  let hours = parseInt(second / 3600)
  let minutes = parseInt(second % 3600 / 60)
  let seconds = parseInt(second % 3600 % 60)

  minutes = minutes >= 10 ? minutes : '0' + minutes
  seconds = seconds >= 10 ? seconds : '0' + seconds
  if(hours) {
    hours = hours >= 10 ? hours : '0' + hours
    return hours + ':' + minutes + ':' + seconds
  }
  return minutes + ':' + seconds
}
// 图片旋转添加和移除不停旋转的动画
export const rotateImg = function(el, className) {
  if(!el) {
    return
  }
  if(className) {
    el.className = className
    console.log(el.className)
  } else {
    el.className = ''
    console.log(el.className)
  }
}


// 格式化歌词
export const parseLyric = function(lyric) {
  let lyricObjArr = []
  //按照/n为分割符将歌词拆分，存储在数组中
  let lyricArr = lyric.split("\n")
  console.log(lyricArr)
  //遍历拆分好的歌词数组，继续按照正则表达式获取每个时间字符串和对应的歌词
  lyricArr.forEach(item => {
    if(item) {
      let timeArr = item.match(/\[.*?\]/gi)
      let content = item.split(']')
      // console.log(timeArr, content[content.length-1])
      content = content[content.length-1]
      timeArr.forEach(subItem => { 
        // console.log(subItem)
        let seconds = 0
        let timeStrArr = subItem.substring(1, subItem.length-1).split(':')
        // timeStrArr.forEach(value => {
        //   seconds += parseFloat(value)
        // })
        seconds = parseInt(timeStrArr[0]) * 60 + parseFloat(timeStrArr[1])
        lyricObjArr.push({
          time: seconds.toFixed(3) * 1000 / 1000,
          oneLyric: content
        }) 
      })
    }
  })
  lyricObjArr.sort((a, b) => {
    return ((a.time * 1000) - (b.time * 1000))
  })
  console.log(lyricObjArr)
  return lyricObjArr
}