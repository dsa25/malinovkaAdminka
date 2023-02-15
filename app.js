require("dotenv").config()
const app = require("fastify")({ trustProxy: true, logger: false })
// const { pool } = require("./database/connect")
const { opn } = require("./database/connect")
const PORT = process.env.PORT || 5000
// const PORT = process.env.PORT || 80
// const IP = process.env.IP || "192.168.0.105"
const IP = process.env.IP || "0.0.0.0"
// const IP = process.env.IP || "localhost"
const userController = require("./controllers/userController")
const inspectionsController = require("./controllers/inspectionsController")

app.register(require("@fastify/cors"))

const path = require("path")
app.register(require("@fastify/static"), {
  root: path.join(__dirname, "/dist"),
  prefix: "/"
})

// bodyLimit  8048576  8мб для картинок в base64
const bLimit = { bodyLimit: 8048576 }

app.register((app, opts, done) => {
  app.post("/users", userController.getUsers)
  app.post("/addUser", userController.addUser)
  app.post("/updateUser", userController.updateUser)
  app.post("/addAllUser", userController.addAllUser)

  app.post("/addInspect", bLimit, inspectionsController.addInspect)
  app.post("/getInspects", bLimit, inspectionsController.getInspections)

  // app.get("/list/:id", mainController.getInspect)

  app.get("/users", async (req, reply) => {
    return reply.sendFile("index.html")
  })
  app.get("/list", async (req, reply) => {
    return reply.sendFile("index.html")
  })

  app.get("/test", async (req, reply) => {
    try {
      console.log("ip", req.ip)
      console.log("ips", req.ips)
      console.log("hostname", req.hostname)
      console.log("protocol", req.protocol)
      reply.send("test 123")
    } catch (error) {
      console.log("error", error)
    }
  })

  done()
})

let time = new Date()

const start = async () => {
  try {
    // await pool.getConnection()
    let db = await opn()
    console.log("db", db)
    // await app.listen({ port: PORT }, (err, address) => {
    await app.listen({ port: PORT, host: IP }, (err, address) => {
      console.log(
        `${time.getHours()}:${time.getMinutes()}:${time.getSeconds()} server: ${address}`
      )
      if (err) {
        fastify.log.error(err)
        process.exit(1)
      }
    })
  } catch (err) {
    app.log.error(err)
    console.log(err)
    process.exit(1)
  }
}

start()
