import { ref, onMounted, computed } from "vue"
import { myFetch, deepClone, getTime } from "@/func"

const users = ref([])
const versionUs = ref([])

export default function useUsers(props) {
  const BASE_URL = ref(import.meta.env.VITE_BASE_URL)

  function formatTimeVers(version) {
    version.createdAt = getTime(version.createdAt, "h:m d.m.y")
    version.updatedAt = getTime(version.updatedAt, "h:m d.m.y")
    return version
  }

  const addUser = async (data) => {
    try {
      console.log("newUserData", deepClone(data))
      const res = await myFetch(`${BASE_URL.value}/addUser`, deepClone(data))
      console.log("res", res)
      if (res?.status == 1 && res?.body != undefined) {
        let newUser = { id: res.body.id, fio: data.fio, status: data.status }
        users.value.push(newUser)
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

  onMounted(getUsers)

  return {
    users,
    versionUs,
    addUser,
    updateUser
  }
}
