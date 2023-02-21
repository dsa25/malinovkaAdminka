let { opn } = require("../database/connect")

class sectorController {
  async getSectors(req, reply) {
    try {
      let sql = "SELECT * FROM `sectors` WHERE `active`=1"
      let db = await opn()
      let sectors = await db.all(sql)
      let sql2 = "SELECT * FROM `versions` WHERE `name`='sectors'"
      let vers = await db.all(sql2)
      return reply.send(
        JSON.stringify({
          status: 1,
          body: { sectors, version: vers },
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
        return reply.send(
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
        return reply.send(
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
        req.body.datePU.trim()
      ]
      let sql =
        "INSERT INTO `sectors`(`persNum`, `nameVillage`, `street`, `houseNum`, `litera`, `numberPU`, `typePU`,  `datePU`) VALUES ( ?, ?, ?, ?, ?, ?, ?, ?)"
      let db = await opn()
      let sector = await db.run(sql, args)
      console.log("sector", sector)
      // sector { stmt: Statement { stmt: undefined }, lastID: 3, changes: 1 }
      const { vers, version } = await this.updateVersSectors(db)
      if (sector && sector?.lastID > 0 && vers && vers?.changes == 1) {
        return reply.send(
          JSON.stringify({
            status: 1,
            body: { id: sector.lastID, version: version },
            msg: "Успех!"
          })
        )
      }
      return reply.send(
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

  async updateSector(req, reply) {
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
      if (
        req.body.persNum.trim().length == 0 ||
        req.body.nameVillage.trim().length == 0 ||
        req.body.street.trim().length == 0 ||
        req.body.houseNum.trim().length == 0 ||
        req.body.id < 1
      ) {
        return reply.send(
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
      const { vers, version } = await this.updateVersSectors(db)
      if (res && res?.changes == 1 && vers && vers?.changes == 1) {
        return reply.send(
          JSON.stringify({
            status: 1,
            body: { version },
            msg: "Успешно!"
          })
        )
      }
      return reply.send(
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
        return reply.send(
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
      const { vers, version } = await this.updateVersSectors(db)
      if (res && res?.changes == 1 && vers && vers?.changes == 1) {
        return reply.send(
          JSON.stringify({
            status: 1,
            body: { version },
            msg: "Успешно!"
          })
        )
      }
      return reply.send(
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

  async updateVersSectors(db) {
    try {
      let sql2 =
        "UPDATE `versions` SET version= version+1, updatedAt = datetime()  WHERE name='sectors'"
      let vers = await db.run(sql2)
      let sql3 = "SELECT * FROM `versions` WHERE `name`='sectors'"
      let version = await db.all(sql3)
      console.log({ vers, version })
      return { vers, version }
    } catch (error) {
      console.log(error)
    }
  }

  async addAllSectors(req, reply) {
    try {
      if (req.body == undefined) {
        return reply.send(
          JSON.stringify({
            status: 0,
            body: {},
            msg: " body = undefined!"
          })
        )
      }
      console.log("req.body", req.body)
      let values = req.body
        .map(
          (item) =>
            `(
        '${item.persNum}', 
        '${item.nameVillage}', 
        '${item.street}', 
        '${item.houseNum}', 
        '${item.litera}', 
        '${item.numberPU}', 
        '${item.typePU}', 
        '${item.datePU}' 
        )`
        )
        .join(", ")
      console.log("values", values)
      // return reply.send(
      //   JSON.stringify({
      //     status: 0,
      //     body: {},
      //     msg: "stop!"
      //   })
      // )
      let db = await opn()
      let sql = `INSERT INTO sectors (persNum, nameVillage, street, houseNum, litera, numberPU, typePU, datePU) VALUES ${values}`
      let res = await db.run(sql)
      // { stmt: Statement { stmt: undefined }, lastID: 6, changes: 3 }
      console.log({ res })
      if (res && res?.lastID > 0 && res?.changes > 0) {
        reply.send(
          JSON.stringify({
            status: 1,
            body: { lastID: res.lastID, changes: res.changes },
            msg: "All sectors add: Успех!"
          })
        )
      }
    } catch (error) {
      console.log(error)
    }
  }
}

module.exports = new sectorController()
