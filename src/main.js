import { createApp } from "vue"
import "./style.css"
import App from "./App.vue"

import { createWebHistory, createRouter } from "vue-router"
import Inspections from "@/pages/Inspections.vue"
import Users from "@/pages/Users.vue"
import Sectors from "@/pages/Sectors.vue"
import HistorySector from "@/pages/HistorySector.vue"

import components from "@/components/UI"

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      name: "inspections",
      path: "/",
      component: Inspections
    },
    {
      name: "users",
      path: "/users",
      component: Users
    },
    {
      name: "sectors",
      path: "/sectors",
      component: Sectors
    },
    {
      name: "HistorySector",
      path: "/sectors/:countSectors/:idSector",
      component: HistorySector
    }
  ]
})

const app = createApp(App)

components.forEach((component) => {
  app.component(component.name, component)
})

app.use(router).mount("#app")
