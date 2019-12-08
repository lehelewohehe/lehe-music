// 轮播图的数据对象转换格式定义

export class imgsType {
  constructor({pic, url, targetId}) {
    this.pic = pic,
    this.url = url,
    this.targetId = targetId
  }
}
// 歌单推荐的对象准换格式定义
export class songsListType {
  constructor({id, name, trackCount, picUrl, playCount}) {
    this.id = id,
    this.name = name,
    this.trackCount = trackCount,
    this.picUrl = picUrl,
    this.playCount = playCount
  } l
}
// 热门mv推荐对象
export class mvListType {
  constructor({id, name, artists, cover, playCount}) {
    this.id = id,
    this.name = name,
    this.artists = artists,
    this.cover = cover,
    this.playCount = playCount
  }
}

// 歌手列表数据
export class singersListType {
  constructor({id, name, picUrl , img1v1Url, musicSize}) {
    this.id = id,
    this.name = name,
    this.picUrl = picUrl,
    this.img1v1Url = img1v1Url,
    this.musicSize = musicSize
  }
}


// 排行榜列表摘要数据
export class rankListType {
  constructor({id, name, coverImgUrl , tracks, trackUpdateTime}) {
    this.id = id,
    this.name = name,
    this.coverImgUrl = coverImgUrl,
    this.tracks = tracks,
    this.trackUpdateTime = trackUpdateTime
  }
}


//搜索结果歌曲数据
export class searchSongListType {
  constructor({id, name, artists}) {
    this.id = id,
    this.title = name,
    this.artists = artists
    this.name = spliceSring(artists)
    this.type = 1
  }
}
//搜索结果歌手数据
export class searchSingerListType {
  constructor({id, name}) {
    this.id = id,
    this.name = name
    this.type = 100
  }
}

function spliceSring(list) {
  let sub = []
  list.forEach(item => {
    sub.push(item.name)
  })
  return sub.join('/')
}