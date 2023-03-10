export { myFetch, getTime, deepClone, formatTimeVers, formatBytes }

function deepClone(obj) {
  return JSON.parse(JSON.stringify(obj))
}

function getTime(date = "now", format = "d.m.y", day = undefined) {
  let time = date == "now" ? new Date() : new Date(date)

  if (day == "lastDayMonth")
    time = new Date(time.getFullYear(), time.getMonth() + 1, 0)
  if (day == "firstDayMonth")
    time = new Date(time.getFullYear(), time.getMonth(), 1)

  let dd = time.getDate()
  let mo = time.getMonth() + 1
  let yy = time.getFullYear().toString()
  let hh = time.getHours()
  let mm = time.getMinutes()
  let ss = time.getSeconds()
  if (mo < 10) mo = "0" + mo
  if (dd < 10) dd = "0" + dd
  if (hh < 10) hh = "0" + hh
  if (mm < 10) mm = "0" + mm
  if (ss < 10) ss = "0" + ss
  if (format == "h:m d.m.y") return `${hh}:${mm} ${dd}.${mo}.${yy}`
  if (format == "h:m:s d.m.y") return `${hh}:${mm}:${ss} ${dd}.${mo}.${yy}`
  if (format === "y-m-d") return `${yy}-${mo}-${dd}`
  else return `${dd}.${mo}.${yy}`
}

function formatBytes(bytes, decimals = 2) {
  if (bytes === 0) {
    return "0"
  } else {
    var k = 1024
    var dm = decimals < 0 ? 0 : decimals
    var sizes = ["байт", "КБ", "МБ", "ГБ", "ТБ"]
    var i = Math.floor(Math.log(bytes) / Math.log(k))
    return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + " " + sizes[i]
  }
}

function formatTimeVers(version) {
  version.createdAt = getTime(version.createdAt, "h:m d.m.y")
  version.updatedAt = getTime(version.updatedAt, "h:m d.m.y")
  return version
}

function getLastDayMonth() {
  let time = date == "now" ? new Date() : new Date(date)
}

const myFetch = async (url, data = [], method = "POST") => {
  try {
    let response = await fetch(url, {
      method: method,
      headers: {
        "Content-Type": "application/json;charset=utf-8"
      },
      body: JSON.stringify(data)
    })
    if (response != undefined) {
      let result = await response.json()
      return result
    } else {
      return alert("Ошибка подключения к _серверу!")
    }
  } catch (error) {
    console.log("error", error)
    alert(`Ошибка подключения к серверу (${url})!  Error: ${error}`, "Ошибка:")
  }
}
