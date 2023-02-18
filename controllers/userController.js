let { opn } = require("../database/connect")

class userController {
  async getUsers(req, reply) {
    try {
      let sql = "SELECT * FROM `users`"
      let db = await opn()
      let users = await db.all(sql)
      let sql2 = "SELECT * FROM `versions` WHERE `name`='users'"
      let vers = await db.all(sql2)
      return reply.send(
        JSON.stringify({
          status: 1,
          body: { users: users, version: vers },
          msg: "Список пользователей!"
        })
      )
    } catch (error) {
      console.log(error)
    }
  }

  async addUser(req, reply) {
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
        req.body.fio.trim().length == 0 ||
        req.body.status < 0 ||
        req.body.status > 1
      ) {
        return reply.send(
          JSON.stringify({
            status: 0,
            body: {},
            msg: "не все поля заполнены!"
          })
        )
      }
      let args = [req.body.fio.trim(), req.body.status]
      let sql = "INSERT INTO `users` (`fio`, `status`) VALUES ( ?, ?)"
      let db = await opn()
      let users = await db.run(sql, args)
      // users { stmt: Statement { stmt: undefined }, lastID: 3, changes: 1 }
      console.log("users", users)
      const { vers, version } = await this.updateVersUsers(db)

      if (users && users?.lastID > 0 && vers && vers?.changes == 1) {
        return reply.send(
          JSON.stringify({
            status: 1,
            body: { id: users.lastID, version: version },
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

  async updateUser(req, reply) {
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
        req.body.fio.trim().length == 0 ||
        req.body.status == undefined ||
        req.body.id == undefined ||
        req.body.status == -1
      ) {
        return reply.send(
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
      const { vers, version } = await this.updateVersUsers(db)

      if (res && res?.changes == 1 && vers && vers?.changes == 1) {
        return reply.send(
          JSON.stringify({
            status: 1,
            body: { id: res.lastID, version: version },
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

  async updateVersUsers(db) {
    try {
      let sql2 =
        "UPDATE `versions` SET version= version+1, updatedAt = datetime()  WHERE name='users'"
      let vers = await db.run(sql2)
      let sql3 = "SELECT * FROM `versions` WHERE `name`='users'"
      let version = await db.all(sql3)
      console.log({ vers, version })
      return { vers, version }
    } catch (error) {
      console.log(error)
    }
  }

  async creteRowVer(req, reply) {
    try {
      let db = await opn()
      let truncate = await db.run("DELETE FROM  `versions`")
      // resq { stmt: Statement { stmt: undefined }, lastID: 0, changes: 23 }
      console.log("truncate", truncate)
      let sql =
        "INSERT INTO versions (`name`, `version`) VALUES ('users', 0), ('sectors', 0)"
      let res = await db.run(sql)
      // { stmt: Statement { stmt: undefined }, lastID: 6, changes: 3 }
      if (res && res?.lastID > 0 && res?.changes > 0) {
        return reply.send(
          JSON.stringify({
            status: 1,
            body: { lastID: res.lastID, changes: res.changes },
            msg: "Успех!"
          })
        )
      }
      return reply.send(
        JSON.stringify({
          status: 0,
          body: {},
          msg: "Что то пошло не так!"
        })
      )
    } catch (error) {
      console.log(error)
    }
  }
}

module.exports = new userController()
