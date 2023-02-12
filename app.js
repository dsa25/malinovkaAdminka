require("dotenv").config()
const app = require("fastify")({ trustProxy: true, logger: false })
// const { pool } = require("./database/connect")
const { opn } = require("./database/connect")
const PORT = process.env.PORT || 5000
// const PORT = process.env.PORT || 80
// const IP = process.env.IP || "192.168.0.105"
const IP = process.env.IP || "0.0.0.0"
const mainController = require("./controllers/mainController")

app.register(require("@fastify/cors"))

const path = require("path")
app.register(require("@fastify/static"), {
  root: path.join(__dirname, "/public"),
  prefix: "/"
})

app.register((app, opts, done) => {
  app.post("/users", mainController.getUsers)

  app.get("/list/:id", mainController.getInspect)

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
