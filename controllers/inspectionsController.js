let { opn } = require("../database/connect")

class inspectionsController {
  async getInspections(req, reply) {
    try {
      let sql = "SELECT * FROM `inspections`"
      let db = await opn()
      let res = await db.all(sql)
      reply.send(
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
        reply.send(
          JSON.stringify({
            status: 0,
            body: {},
            msg: "не передан параметр!"
          })
        )
      }

      //   console.log(req.body)
      //   reply.send(
      //     JSON.stringify({
      //       status: 1,
      //       body: {},
      //       msg: "return!!!!"
      //     })
      //   )
      //   let srcPhoto = JSON.stringify(req.body.srcPhoto)
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
        req.body.srcPhoto,
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
        reply.send(
          JSON.stringify({
            status: 1,
            body: {},
            // body: inspect,
            msg: "Осмотр сохранен в бд!"
          })
        )
        // }
      }
      reply.send(
        JSON.stringify({ status: 0, body: {}, msg: "Что то пошло не так!" })
      )
    } catch (error) {
      console.log(error)
    }
  }
}

module.exports = new inspectionsController()
