let { opn } = require("../database/connect")

class userController {
  async getUsers(req, reply) {
    try {
      let sql = "SELECT * FROM `users`"
      let db = await opn()
      let users = await db.all(sql)
      // let users = await db.query(sql)
      console.log("users", users)
      reply.send(
        JSON.stringify({
          status: 1,
          body: users,
          msg: "Список пользователей!"
        })
      )
    } catch (error) {
      console.log(error)
    }
  }

  async addUser(req, reply) {
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
        req.body.fio.trim().length == 0 ||
        req.body.status < 0 ||
        req.body.status > 1
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
      let args = [req.body.fio.trim(), req.body.status]
      let sql = "INSERT INTO `users`(`fio`, `status`) VALUES ( ?, ?)"
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

  async updateUser(req, reply) {
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
        req.body.fio.trim().length == 0 ||
        req.body.status == undefined ||
        req.body.id == undefined ||
        req.body.status == -1
      ) {
        reply.send(
          JSON.stringify({
            status: 0,
            body: {},
            msg: "не все поля заполнены!"
          })
        )
      }
      let args = [req.body.fio.trim(), req.body.status, req.body.id]
      let sql = "UPDATE users SET fio= ?, status= ? WHERE id= ?"
      let db = await opn()
      let res = await db.run(sql, args)
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

  async addAllUser(req, reply) {
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
      console.log("req.body", req.body)
      let db = await opn()
      let truncate = await db.run("DELETE FROM  users")
      // resq { stmt: Statement { stmt: undefined }, lastID: 0, changes: 23 }
      if (truncate != undefined) {
        console.log("truncate", truncate)
        let values = req.body
          .map(
            (item) => `(${item.id}, 
        '${item.fio}', 
        ${item.post}, 
        '${item.groupDop}', 
        ${item.status})`
          )
          .join(", ")
        let sql = `INSERT INTO users (id, fio, post, groupDop, status) VALUES ${values}`
        let res = await db.run(sql)
        // { stmt: Statement { stmt: undefined }, lastID: 6, changes: 3 }
        if (res && res?.lastID > 0 && res?.changes > 0) {
          reply.send(
            JSON.stringify({
              status: 1,
              body: { lastID: res.lastID, changes: res.changes },
              msg: "Успех!"
            })
          )
        }
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
}

module.exports = new userController()
