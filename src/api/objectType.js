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

export let rankId = {
  "云音乐新歌榜": "0",
 
  "云音乐热歌榜": "1",
  
  "网易原创歌曲榜": "2",
  
  "云音乐飙升榜" : "3",
  
  "云音乐电音榜" : "4",
  
  "UK排行榜周榜": "5",
  
  "美国Billboard周榜": "6",
  
  "KTV嗨榜": "7",
  
  "iTunes榜": "8",
  
  "Hit FM Top榜": "9",

  "日本Oricon周榜": "10",

  "韩国Melon排行榜周榜": "11",

  "韩国Mnet排行榜周榜": "12",

  "韩国Melon原声周榜": "13",

  "中国TOP排行榜(港台榜)": "14",

  "中国TOP排行榜(内地榜)": "15",

  "香港电台中文歌曲龙虎榜": "16",

  "华语金曲榜": "17",

  "中国嘻哈榜": "18",

  "法国 NRJ EuroHot 30周榜": "19",

  "台湾Hito排行榜": "20",

  "Beatport全球电子舞曲榜" : "21" ,

  "云音乐ACG音乐榜": "22",

  "云音乐说唱榜": "23",

  "云音乐古典音乐榜": "24",

  "云音乐电音榜": "25",

  "抖音排行榜": "26",

  "新声榜": "27",

  "云音乐韩语榜": "28",

  "英国Q杂志中文版周榜": "29",

  "电竞音乐榜": "30",

  "云音乐欧美热歌榜": "31",

  "云音乐欧美新歌榜": "32",

  "说唱TOP榜": "33" 
}


// 搜索结果歌曲数据
export class searchSongListType {
  constructor({id, name, artists}) {
    this.id = id,
    this.name = name,
    this.artists = artists,
    this.author = spliceSring(artists),
    this.type = 1,
    this.al = { picUrl: 'https://p1.music.126.net/6y-UleORITEDbvrOLV0Q8A==/5639395138885805.jpg' }
  }
}
// 搜索结果歌手数据
export class searchSingerListType {
  constructor({id, name}) {
    this.id = id,
    this.name = name
    this.type = 100
  }
}

// 歌单详情---歌单歌单数据
// export class songSongsListType {
//   constructor({id, name, ar, al}) {
//     this.id = id,
//     this.name = name
//     this.ar = ar,
//     this.author = spliceSring(ar),
//     this.al = al
//   }
// }

// 数组字符串拼接函数
function spliceSring(list) {
  let sub = []
  list.forEach(item => {
    sub.push(item.name)
  })
  return sub.join('/')
}

// 歌手详情---歌单数据
export class singerSongsListType {
  constructor({id, name, ar, al}) {
    this.id = id,
    this.name = name
    this.ar = ar,
    this.author = spliceSring(ar),
    this.al = al
  }
}

// 歌手详情---歌手信息
export class singerInfoType {
  constructor({id, name, picUrl , img1v1Url, musicSize}) {
    this.id = id,
    this.name = name,
    this.picUrl = picUrl,
    this.img1v1Url = img1v1Url,
    this.musicSize = musicSize
  }
}


// 排行榜详情---排行榜信息
export class rankInfoType {
  constructor({id, name, coverImgUrl}) {
    this.id = id,
    this.name = name,
    this.img1v1Url = coverImgUrl
  }
}

// 排行榜详情---排行榜歌单数据
export class rankSongsListType {
  constructor({id, name, ar, al}) {
    this.id = id,
    this.name = name
    this.ar = ar,
    this.author = spliceSring(ar),
    this.al = al
  }
}


// 歌单详情---歌单信息
export class songInfoType {
  constructor({id, name, coverImgUrl}) {
    this.id = id,
    this.name = name,
    this.img1v1Url = coverImgUrl
  }
}

// 歌单详情---歌单歌单数据
export class songSongsListType {
  constructor({id, name, ar, al}) {
    this.id = id,
    this.name = name
    this.ar = ar,
    this.author = spliceSring(ar),
    this.al = al
  }
}