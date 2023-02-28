module.exports = { getTime }

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
