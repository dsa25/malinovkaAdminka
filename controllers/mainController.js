class mainController {
  async getUsers(req, reply) {
    try {
      console.log("users..")
      reply.send(
        JSON.stringify({
          status: 1,
          body: ["user1", "user2", "user3"],
          msg: "Список пользователей!"
        })
      )
    } catch (error) {
      console.log(error)
    }
  }

  async getInspect(req, reply) {
    try {
      console.log(req.params.id)
      reply.type("text/html").send("text inspects...")
    } catch (error) {
      console.log(error)
    }
  }
}

module.exports = new mainController()
