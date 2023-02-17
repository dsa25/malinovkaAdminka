let { opn } = require("../database/connect")

class sectorController {
  async getSectors(req, reply) {
    try {
      let sql = "SELECT * FROM `sectors` WHERE `active`=1"
      let db = await opn()
      let sectors = await db.all(sql)
      reply.send(
        JSON.stringify({
          status: 1,
          body: sectors,
          msg: "Участки!"
        })
      )
    } catch (error) {
      console.log(error)
    }
  }

  async addSector(req, reply) {
    try {
      console.log("req.body", req.body)
      if (req.body == undefined) {
        reply.send(
          JSON.stringify({
            status: 0,
            body: {},
            msg: "не передан параметр!"
          })
        )
      }
      if (
        req.body.persNum.trim().length == 0 ||
        req.body.nameVillage.trim().length == 0 ||
        req.body.street.trim().length == 0 ||
        req.body.houseNum.trim().length == 0
      ) {
        reply.send(
          JSON.stringify({
            status: 0,
            body: {},
            msg: "не все поля заполнены!"
          })
        )
        return
      }
      let args = [
        req.body.persNum.trim(),
        req.body.nameVillage.trim(),
        req.body.street.trim(),
        req.body.houseNum.trim(),
        req.body.litera.trim(),
        req.body.numberPU.trim(),
        req.body.typePU.trim(),
        req.body.datePU.trim()
      ]
      let sql =
        "INSERT INTO `sectors`(`persNum`, `nameVillage`, `street`, `houseNum`, `litera`, `numberPU`, `typePU`,  `datePU`) VALUES ( ?, ?, ?, ?, ?, ?, ?, ?)"
      let db = await opn()
      let res = await db.run(sql, args)
      console.log("res", res)
      // res { stmt: Statement { stmt: undefined }, lastID: 3, changes: 1 }
      if (res && res?.lastID > 0) {
        reply.send(
          JSON.stringify({
            status: 1,
            body: { id: res.lastID },
            msg: "Успех!"
          })
        )
      }
      JSON.stringify({
        status: 0,
        body: {},
        msg: "что то пошло не так!"
      })
    } catch (error) {
      console.log(error)
    }
  }

  async updateSector(req, reply) {
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
      if (
        req.body.persNum.trim().length == 0 ||
        req.body.nameVillage.trim().length == 0 ||
        req.body.street.trim().length == 0 ||
        req.body.houseNum.trim().length == 0 ||
        req.body.id < 1
      ) {
        reply.send(
          JSON.stringify({
            status: 0,
            body: {},
            msg: "не все поля заполнены!"
          })
        )
      }
      let args = [
        req.body.persNum.trim(),
        req.body.nameVillage.trim(),
        req.body.street.trim(),
        req.body.houseNum.trim(),
        req.body.litera.trim(),
        req.body.numberPU.trim(),
        req.body.typePU.trim(),
        req.body.datePU.trim(),
        req.body.id
      ]
      let sql =
        "UPDATE sectors SET persNum= ?, nameVillage= ?, street= ?, houseNum= ?, litera= ?, numberPU= ?, typePU= ?, datePU= ? WHERE id= ?"
      let db = await opn()
      let res = await db.run(sql, args)
      // res { stmt: Statement { stmt: undefined }, lastID: 0, changes: 1 }
      console.log("res", res)
      if (res && res?.changes == 1) {
        reply.send(
          JSON.stringify({
            status: 1,
            body: {},
            msg: "Успешно!"
          })
        )
      }
      reply.send(
        JSON.stringify({
          status: 0,
          body: {},
          msg: "что то пошло не так!"
        })
      )
    } catch (error) {
      console.log(error)
    }
  }

  async removeSector(req, reply) {
    try {
      if (
        req.body == undefined ||
        req.body?.id < 1 ||
        req.body.id == undefined
      ) {
        reply.send(
          JSON.stringify({
            status: 0,
            body: {},
            msg: "не передан параметр!"
          })
        )
      }
      let args = [req.body.id]
      let sql = "UPDATE sectors SET active= 0 WHERE id= ?"
      let db = await opn()
      let res = await db.run(sql, args)
      // res { stmt: Statement { stmt: undefined }, lastID: 0, changes: 1 }
      console.log("res", res)
      if (res && res?.changes == 1) {
        reply.send(
          JSON.stringify({
            status: 1,
            body: {},
            msg: "Успешно!"
          })
        )
      }
      reply.send(
        JSON.stringify({
          status: 0,
          body: {},
          msg: "что то пошло не так!"
        })
      )
    } catch (error) {
      console.log(error)
    }
  }
}

module.exports = new sectorController()
