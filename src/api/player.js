export const parseTime = function(second) {
  let hours = parseInt(second / 3600)
  let minutes = parseInt(second % 3600 / 60)
  let seconds = parseInt(second % 3600 % 60)

  minutes = minutes > 10 ? minutes : '0' + minutes
  seconds = seconds > 10 ? seconds : '0' + seconds
  if(hours) {
    hours = hours > 10 ? hours : '0' + hours
    return hours + ':' + minutes + ':' + seconds
  }
  return minutes + ':' + seconds
}