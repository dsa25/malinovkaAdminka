import { ref, onMounted, computed } from "vue"
import { myFetch, deepClone, formatTimeVers } from "@/func"

const size = ref([])
const users = ref([])
const versionUs = ref({
  name: "users",
  version: "NaN",
  updatedAt: "NaN",
  createdAt: "NaN"
})

export default function useUsers(props) {
  const BASE_URL = ref(import.meta.env.VITE_BASE_URL)

  const addUser = async (data) => {
    try {
      let dataDC = deepClone(data)
      console.log("newUserData", dataDC)
      const res = await myFetch(`${BASE_URL.value}/addUser`, dataDC)
      console.log("res", res)
      if (res?.status == 1 && res?.body != undefined) {
        dataDC.id = res.body.id
        users.value.push(dataDC)
        versionUs.value = formatTimeVers(res.body.version[0])
        return
      } else return alert(res.msg)
    } catch (e) {
      console.log(e)
    }
  }

  const updateUser = async (data) => {
    try {
      console.log("saveUser", deepClone(data))
      const res = await myFetch(`${BASE_URL.value}/updateUser`, deepClone(data))
      console.log("res", res)
      if (res?.status == 1) {
        versionUs.value = formatTimeVers(res.body.version[0])
        console.log("finish user", users.value)
        return
      } else return alert(res.msg)
    } catch (e) {
      console.log(e)
    }
  }

  const clearOldImgs = async () => {
    try {
      let data = { date: size.value.vers?.updatedAt }
      const res = await myFetch(`${BASE_URL.value}/clearOldImgs`, data)
      console.log("clearOl", res)
      return
      if (res?.status == 1) {
        versionUs.value = formatTimeVers(res.body.version[0])
        console.log("finish user", users.value)
        return
      } else return alert(res.msg)
    } catch (e) {
      console.log(e)
    }
  }

  const getUsers = async () => {
    try {
      const res = await myFetch(`${BASE_URL.value}/users`)
      console.log("res", res)
      if (res?.status == 1 && res?.body != undefined) {
        users.value = res.body.users
        versionUs.value = formatTimeVers(res.body.version[0])
        return
      } else return console.log("не корректные данные", res)
    } catch (e) {
      console.log(e)
    }
  }

  const getSizes = async () => {
    try {
      const res = await myFetch(`${BASE_URL.value}/getSize`)
      console.log("res", res)
      if (res?.status == 1 && res?.body != undefined) {
        size.value.sizeDB = res.body.sizeDB
        size.value.sizeImgs = res.body.sizeImgs
        size.value.vers = formatTimeVers(res.body.version[0])
        return
      } else return console.log("не корректные данные", res)
    } catch (e) {
      console.log(e)
    }
  }

  onMounted(() => {
    getSizes()
    getUsers()
  })

  return {
    size,
    clearOldImgs,
    users,
    versionUs,
    addUser,
    updateUser
  }
}
