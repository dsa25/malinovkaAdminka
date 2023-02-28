require("dotenv").config()
const app = require("fastify")({ trustProxy: true, logger: false })
// const { pool } = require("./database/connect")
const { opn } = require("./database/connect")

// comment 0123
const PORT = 5000
const IP = "0.0.0.0"
// const IP = "localhost"

const userController = require("./controllers/userController")
const sectorController = require("./controllers/sectorController")
const inspectionsController = require("./controllers/inspectionsController")
const settingsController = require("./controllers/settingsController")

const fastifyStatic = require("@fastify/static")
const path = require("path")

app.register(require("@fastify/cors"))

app.register(fastifyStatic, {
  root: path.join(__dirname, "/dist"),
  prefix: "/"
})
app.register(fastifyStatic, {
  root: path.join(__dirname, "/img"),
  prefix: "/img",
  decorateReply: false
})
app.register(fastifyStatic, {
  root: path.join(__dirname, "/pwa/"),
  prefix: "/malinovka",
  decorateReply: false
})

// bodyLimit  8048576  8мб для картинок в base64
const bLimit = { bodyLimit: 8048576 }

app.register((app, opts, done) => {
  app.get("/users", async (req, reply) => {
    return reply.sendFile("index.html")
  })
  app.get("/sectors", async (req, reply) => {
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

  // -------------------------------------------------------------

  app.post("/users", userController.getUsers)
  app.post(
    "/addUser",
    async (req, reply) => await userController.addUser(req, reply)
  )
  app.post(
    "/updateUser",
    async (req, reply) => await userController.updateUser(req, reply)
  )
  app.post("/createVersions", userController.creteRowVer)
  app.post("/checkVersions", userController.checkVers)

  // -------------------------------------------------------------

  app.post(
    "/updateSector",
    async (req, reply) => await sectorController.updateSector(req, reply)
  )
  app.post(
    "/deleteSector",
    async (req, reply) => await sectorController.removeSector(req, reply)
  )
  app.post(
    "/addSector",
    async (req, reply) => await sectorController.addSector(req, reply)
  )
  app.post("/sectors", sectorController.getSectors)
  app.post("/setAS", sectorController.addAllSectors)

  // -------------------------------------------------------------

  app.post("/addInspect", bLimit, inspectionsController.addInspect)
  app.post("/getInspects", bLimit, inspectionsController.getInspections)
  app.post("/historySector", inspectionsController.getSector)
  app.post("/saveInsp", inspectionsController.updateInspection)
  app.post("/deleteInsp", inspectionsController.removeInspection)
  app.post("/getSize", async (req, reply) =>
    settingsController.getSizeImgs(req, reply)
  )
  app.post("/clearOldImgs", async (req, reply) =>
    settingsController.removeImgs(req, reply)
  )

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
        app.log.error(err)
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
