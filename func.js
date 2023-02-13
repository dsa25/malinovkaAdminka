export { myFetch, getTime, deepClone }

function deepClone(obj) {
  return JSON.parse(JSON.stringify(obj))
}

function getTime(type = "dd.mm.yyyy") {
  let time = new Date()
  let dd = time.getDate()
  let mm = time.getMonth() + 1
  let yy = time.getFullYear().toString()
  if (mm < 10) mm = "0" + mm
  if (dd < 10) dd = "0" + dd

  if (type === "yyyy-mm-dd") return `${yy}-${mm}-${dd}`
  else return `${dd}.${mm}.${yy}`
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
