let { opn } = require("../database/connect")
const fs = require("fs")
const { getTime } = require("./func")

class userController {
  async getSizeImgs(req, reply) {
    try {
      const { sizeDB, sizeImgs } = await this.getSizeData()
      let db = await opn()
      let sql2 = "SELECT * FROM `versions` WHERE `name`='images'"
      let vers = await db.all(sql2)
      return reply.send(
        JSON.stringify({
          status: 1,
          body: { sizeImgs, sizeDB, version: vers },
          msg: "sizes!"
        })
      )
    } catch (error) {
      console.log(error)
    }
  }

  async removeImgs(req, reply) {
    try {
      //   const { sizeDB, sizeImgs } = await this.getSizeData()
      let db = await opn()
      let sql1 = "SELECT `updatedAt` FROM `versions` WHERE `name`='images'"
      let res1 = await db.get(sql1)
      let from = res1.updatedAt
      let before = this.threeMonthsAgo()
      console.log(from, before)

      if (new Date(from) < new Date(before)) {
        let where = ` WHERE date(createdAt) BETWEEN date('${from}') AND  date('${getTime(
          before,
          "y-m-d"
        )}')`
        let sql2 = "SELECT srcPhoto, id FROM `inspections` " + where
        console.log("sql", sql2)
        let res = await db.all(sql2)
        console.log("res", res)
        return
        return reply.send(
          JSON.stringify({
            status: 1,
            //   body: { sizeImgs, sizeDB, version: vers },
            body: { d: 123 },
            msg: "clear status!"
          })
        )
      } else {
        return reply.send(
          JSON.stringify({
            status: 0,
            body: {},
            msg: "Время не пришло!"
          })
        )
      }
    } catch (error) {
      console.log(error)
    }
  }

  async getSizeData() {
    try {
      let getSizeDB = await fs.promises.stat(`./database/malina.db`)
      let sizeDB = getSizeDB.size
      let sizeImgs = 0
      let files = await fs.promises.readdir("./img")
      for (const item of files) {
        let file = await fs.promises.stat(`./img/${item}`)
        sizeImgs += file.size
      }
      return { sizeDB, sizeImgs }
    } catch (error) {
      console.log(error)
    }
  }

  threeMonthsAgo() {
    let time = new Date()
    time.setDate(time.getDate() + 2)
    time.setMonth(time.getMonth() - 3)
    return time
  }
}

module.exports = new userController()
