import { ref, onMounted } from "vue"
import { myFetch, deepClone } from "../../func"

const users = ref([])

export default function useUsers(props) {
  const BASE_URL = ref(import.meta.env.VITE_BASE_URL)

  const addUser = async (data) => {
    try {
      console.log("newUserData", deepClone(data))
      const res = await myFetch(`${BASE_URL.value}/addUser`, deepClone(data))
      console.log("res", res)
      if (res?.status == 1 && res?.body != undefined) {
        let newUser = { id: res.body.id, fio: data.fio, status: data.status }
        users.value.push(newUser)
        return
      } else alert(res.msg)
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
        // let newUser = { id: res.body.id, fio: data.fio, status: data.status }
        // users.value.push(newUser)
        console.log("finish user", users.value)
        return
      } else alert(res.msg)
    } catch (e) {
      console.log(e)
    }
  }

  const getUsers = async () => {
    try {
      const res = await myFetch(`${BASE_URL.value}/users`)
      console.log("res", res)
      if (res?.status == 1 && res?.body != undefined) {
        return (users.value = res.body)
      } else console.log("не корректные данные", res)
    } catch (e) {
      console.log(e)
    }
  }

  onMounted(getUsers)

  return {
    users,
    addUser,
    updateUser
  }
}
