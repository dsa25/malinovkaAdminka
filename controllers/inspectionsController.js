let { opn } = require("../database/connect")
const fs = require("fs").promises
const { getTime } = require("./func")

class inspectionsController {
  async getInspections(req, reply) {
    console.log(req.body.from, req.body.before)
    try {
      let select = `
        SELECT 
        inspections.id,
        inspections.idSector,
        inspections.user,
        inspections.datePU,
        inspections.kpDay,
        inspections.kpNight,
        inspections.kpTotal,
        inspections.srcPhoto,
        inspections.notation,
        inspections.createdAt,
        inspections.active,
        sectors.persNum,
        sectors.nameVillage,
        sectors.street,
        sectors.houseNum,
        sectors.litera,
        sectors.numberPU,
        sectors.typePU 
        FROM inspections`
      let join = "JOIN sectors ON sectors.id = inspections.idSector"
      let where = "WHERE inspections.active = 1 "
      if (req.body?.from && req.body?.before) {
        where += ` AND date(createdAt) BETWEEN date('${req.body.from.trim()}') AND  date('${req.body.before.trim()}')`
      } else {
        where +=
          " AND date(createdAt) BETWEEN date('now', 'start of month') AND date('now')"
      }
      let order = "ORDER BY createdAt ASC"
      let sql = `${select} ${join} ${where} ${order}`
      // console.log({ sql })
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

      let listImg = []
      if (req.body.srcPhoto.length) {
        req.body.srcPhoto.forEach(async (item, index) => {
          let base64Image = item.split(";base64,").pop()
          let pathImg = `./img/${
            req.body.idSector
          }_${index}_${getTime()}_${Date.now()}.jpg`
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
        req.body.idSector,
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
        "INSERT INTO inspections (idSector, user, address, dateInspection, numberPU, typePU, datePU, kpDay, kpNight, kpTotal, srcPhoto, notation) VALUES(?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)"
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

  async getSector(req, reply) {
    try {
      if (req.body.idSector == undefined) {
        return reply.send(
          JSON.stringify({
            status: 0,
            body: {},
            msg: "не передан параметр!"
          })
        )
      }
      let args = [req.body.idSector.trim()]
      let sql =
        "SELECT * FROM `inspections` WHERE active = 1 AND idSector = ? ORDER BY id DESC"
      let db = await opn()
      let res = await db.all(sql, args)
      return reply.send(
        JSON.stringify({
          status: 1,
          body: res,
          msg: `История осмотров ${req.body.idSector} участка`
        })
      )
    } catch (error) {
      console.log(error)
      return reply.send(
        JSON.stringify({
          status: 0,
          body: {},
          msg: "Ошибка сервера (cathc)!"
        })
      )
    }
  }

  async removeInspection(req, reply) {
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
      let sql = "UPDATE inspections SET active= 0 WHERE id= ?"
      let db = await opn()
      let res = await db.run(sql, args)
      // res { stmt: Statement { stmt: undefined }, lastID: 0, changes: 1 }
      console.log("res", res)
      if (res && res?.changes == 1) {
        return reply.send(
          JSON.stringify({
            status: 1,
            body: {},
            msg: "Осмотр удален!"
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

  async updateInspection(req, reply) {
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
      // console.log(req.body)
      let idSector = String(req.body?.idSector).trim()
      let kpDay = String(req.body?.kpDay).trim()
      let kpNight = String(req.body?.kpNight).trim()
      let kpTotal = String(req.body?.kpTotal).trim()
      if (
        idSector.length == 0 ||
        req.body.id < 1 ||
        (kpDay.length == 0 && kpNight.length == 0 && kpTotal.length == 0)
      ) {
        return reply.send(
          JSON.stringify({
            status: 0,
            body: {},
            msg: "не все поля заполнены!"
          })
        )
      }
      let args = [idSector, kpDay, kpNight, kpTotal, req.body.id]
      let sql =
        "UPDATE inspections SET idSector= ?, kpDay= ?, kpNight= ?, kpTotal= ? WHERE id= ?"
      let db = await opn()
      let res = await db.run(sql, args)
      // res { stmt: Statement { stmt: undefined }, lastID: 0, changes: 1 }
      console.log("res", res)
      if (res && res?.changes == 1) {
        return reply.send(
          JSON.stringify({
            status: 1,
            body: {},
            msg: "Изменения сохранены!"
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
      return reply.send(
        JSON.stringify({
          status: 0,
          body: {},
          msg: "что то пошло не так (catch)!"
        })
      )
    }
  }
}

module.exports = new inspectionsController()
