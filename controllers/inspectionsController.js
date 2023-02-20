let { opn } = require("../database/connect")
const fs = require("fs").promises

class inspectionsController {
  async getInspections(req, reply) {
    try {
      let sql = "SELECT * FROM `inspections`"
      let db = await opn()
      let res = await db.all(sql)
      return reply.send(
        JSON.stringify({
          status: 1,
          body: res,
          msg: "Список осмотров!"
        })
      )
    } catch (error) {
      console.log(error)
      reply.send(
        JSON.stringify({
          status: 0,
          body: {},
          msg: "Ошибка сервера (cathc)!"
        })
      )
    }
  }

  async addInspect(req, reply) {
    try {
      if (req.body == undefined) {
        return reply.send(
          JSON.stringify({
            status: 0,
            body: {},
            msg: "не передан параметр!"
          })
        )
      }

      console.log("req.body: " + req.body.srcPhoto.length)

      let listImg = []
      if (req.body.srcPhoto.length) {
        req.body.srcPhoto.forEach(async (item) => {
          let base64Image = item.split(";base64,").pop()
          let pathImg = `./img/${
            req.body.idSector
          }_${getTime()}_${Date.now()}.jpg`
          listImg.push(pathImg)
          await fs.writeFile(pathImg, base64Image, {
            encoding: "base64"
          })
        })
        console.log({ listImg })
      } else {
        return reply.send(
          JSON.stringify({
            status: 0,
            body: {},
            msg: "not photos!"
          })
        )
      }

      let srcPhoto = JSON.stringify(listImg)
      console.log({ srcPhoto })
      let args = [
        req.body.user,
        req.body.address,
        req.body.dateInspection,
        req.body.numberPU,
        req.body.typePU,
        req.body.datePU,
        req.body.kpDay,
        req.body.kpNight,
        req.body.kpTotal,
        srcPhoto,
        req.body.notation
      ]
      let sql =
        "INSERT INTO inspections (user, address, dateInspection, numberPU, typePU, datePU, kpDay, kpNight, kpTotal, srcPhoto, notation) VALUES(?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)"
      let db = await opn()
      let res = await db.run(sql, args)
      if (res != undefined && res.lastID > 0) {
        // let file = `${req.hostname}/list/${res.lastID}`
        // let sql2 = "UPDATE inspections SET file= ? WHERE id= ?"
        // let res2 = await db.run(sql2, [file, res.lastID])
        // if (res2 && res2?.changes == 1) {
        //   let inspect = await db.get(
        //     `SELECT * FROM inspections WHERE id =${res.lastID}`
        //   )
        return reply.send(
          JSON.stringify({
            status: 1,
            body: {},
            // body: inspect,
            msg: "Осмотр сохранен в бд!"
          })
        )
      }
      return reply.send(
        JSON.stringify({ status: 0, body: {}, msg: "Что то пошло не так!" })
      )
    } catch (error) {
      console.log(error)
    }
  }
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

module.exports = new inspectionsController()
