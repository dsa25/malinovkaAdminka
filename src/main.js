import { createApp } from "vue"
import "./style.css"
import App from "./App.vue"
import { createWebHistory, createRouter } from "vue-router"
import Inspections from "@/pages/Inspections.vue"
import Users from "@/pages/Users.vue"
import List from "@/pages/List.vue"
// import components from "@/components/UI"

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
      name: "list",
      path: "/list",
      component: List
    }
  ]
})

const app = createApp(App)

// components.forEach((component) => {
//   app.component(component.name, component)
// })

app.use(router).mount("#app")
