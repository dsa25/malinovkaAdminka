let { opn } = require("../database/connect")
const fs = require("fs").promises
const { getTime } = require("./func")

class userController {
  async getSizeImgs(req, reply) {
    try {
      const { sizeDB, sizeImgs, vers } = await this.getSizeData()
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
      let db = await opn()
      let sql1 = "SELECT `updatedAt` FROM `versions` WHERE `name`='images'"
      let res1 = await db.get(sql1)
      let from = res1.updatedAt
      let fromTo = new Date(from)
      fromTo.setDate(fromTo.getDate() + 1)
      let before = this.threeMonthsAgo()
      console.log(from, before)

      if (fromTo > new Date(before)) {
        return reply.send(
          JSON.stringify({
            status: 0,
            body: {},
            msg: "Время не пришло!"
          })
        )
      } else {
        let where = ` WHERE date(createdAt) BETWEEN date('${from}') AND  date('${getTime(
          before,
          "y-m-d"
        )}')`
        let sql2 = "SELECT srcPhoto, id FROM `inspections` " + where
        console.log("sql", sql2)
        let listImgs = await db.all(sql2)
        console.log("res", listImgs)

        let resDel = await this.deleteListImg(listImgs)
        if (resDel.counter == 0) {
          let msg = resDel.result
            ? "Фотки не найдены!"
            : "Нет фото, которые можно удалить!"
          return reply.send(
            JSON.stringify({
              status: 0,
              body: {},
              msg: msg
            })
          )
        } else {
          let sql3 = `UPDATE versions SET version= version+1, updatedAt= datetime('${getTime(
            before,
            "y-m-d"
          )} 07:07:07') WHERE name='images'`
          console.log({ sql3 })
          let res3 = await db.run(sql3)
          console.log({ res3 })
          const { sizeDB, sizeImgs, vers } = await this.getSizeData()
          if (res3 && res3?.changes == 1) {
            return reply.send(
              JSON.stringify({
                status: 1,
                body: { sizeImgs, sizeDB, version: vers },
                msg: `Успешно! Удалено: ${resDel.counter} фото`
              })
            )
          }
          return reply.send(
            JSON.stringify({
              status: 0,
              body: { sizeImgs, sizeDB, version: vers },
              msg: `Что то пошло не так! Дата не обновилась! Удалено: ${resDel.counter} фото`
            })
          )
        }
      }
    } catch (error) {
      console.log(error)
      JSON.stringify({
        status: 0,
        body: {},
        msg: `Что то пошло не так! (catch_)`
      })
    }
  }

  async getSizeData() {
    try {
      let getSizeDB = await fs.stat(`./database/malina.db`)
      let sizeDB = getSizeDB.size
      let sizeImgs = 0
      let files = await fs.readdir("./img")
      for (const item of files) {
        let file = await fs.stat(`./img/${item}`)
        sizeImgs += file.size
      }
      let db = await opn()
      let sql2 = "SELECT * FROM `versions` WHERE `name`='images'"
      let vers = await db.all(sql2)
      return { sizeDB, sizeImgs, vers }
    } catch (error) {
      console.log(error)
    }
  }

  async deleteImg(path) {
    try {
      let file = await fs.stat(path)
      if (file) {
        await fs.unlink(path)
        return true
      }
    } catch (err) {
      console.log("deleteImg", err)
      return false
    }
  }

  async deleteListImg(listImgs) {
    try {
      if (listImgs.length == 0) return { result: false, counter: 0 }

      let list = []

      listImgs.forEach((item) => {
        let srcList = JSON.parse(item.srcPhoto)
        srcList.forEach((img) => {
          list.push(img)
        })
      })
      console.log({ list })
      let counter = 0
      for (const item of list) {
        let res = await this.deleteImg(item)
        if (res) counter++
        console.log(item)
      }

      return { result: true, counter }
    } catch (error) {
      console.log("deleteListImg", error)
      return { result: false, counter }
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
