var pinyin = require("pinyin")
// 按照对象中的name属性的首字母给对象归类
export function categoryByInitials(name) {
  let pattern2 = new RegExp("[A-Za-z]+")
  var pattern = new RegExp("[\u4E00-\u9FA5]+")
  let pattern3 = new RegExp("[0-9]+")
  if(pattern.test(name)) {
    return pinyin(name, {
      style: pinyin.STYLE_FIRST_LETTER, // 设置拼音风格
      heteronym: true
    })[0][0].toUpperCase()
  }
  if(pattern2.test(name)) {
    return name.toUpperCase()
  }
  return '#'
}

 
export function parseSingers(singersList) {
  let result = {}
  singersList.forEach((item, index) => {
    if(index > 9) {
      return
    }
    result['热'] || (result['热'] = [])
    item.hot = '热'
    result['热'].push(item)
  })
  
  singersList.forEach(item => {
    let key = categoryByInitials(item.name[0])
    result[key] || (result[key] = [])
    item.index = key
    result[key].push(item)
  })
  return result
}


export function serialize(result) {
  let arr = []
  let obj = {}
  for(var key in result) { 
    if (key !== '#' && key !== '热') {
      obj = {}
      obj.title = key
      obj.data = result[key]
      arr.push(obj)
    } else {
      continue
    }
  }
  arr.sort(function(a, b) {
    return a.title.charCodeAt(0) - b.title.charCodeAt(0)
  })
  console.log(arr)
  obj = {}
  obj.title = '热'
  obj.data = result['热']
  arr.unshift(obj)
  obj = {}
  obj.title = '#'
  obj.data = result['#']
  arr.push(obj)
  return arr
}