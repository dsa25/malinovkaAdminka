import { ref, onMounted } from "vue"
import { myFetch, deepClone } from "@/func"

const sectors = ref([])

export default function useSectors(props) {
  const BASE_URL = ref(import.meta.env.VITE_BASE_URL)

  const addSector = async (data) => {
    try {
      let dataDC = deepClone(data)
      console.log("newSector:", dataDC)
      console.log("newSector:", dataDC)
      const res = await myFetch(`${BASE_URL.value}/addSector`, dataDC)
      console.log("res", res)
      if (res?.status == 1 && res?.body != undefined) {
        dataDC.id = res.body.id
        sectors.value.push(dataDC)
        return true
      } else {
        alert(res.msg)
        return false
      }
    } catch (e) {
      console.log(e)
    }
  }

  const updateSector = async (data) => {
    try {
      let dataDC = deepClone(data)
      console.log("updateSector", dataDC)
      const res = await myFetch(`${BASE_URL.value}/updateSector`, dataDC)
      console.log("res", res)
      if (res?.status == 1) {
        for (let i = 0; i < sectors.value.length; i++) {
          if (sectors.value[i].id == dataDC.id) {
            sectors.value[i] = dataDC
            break
          }
        }
        return
      } else alert(res.msg)
    } catch (e) {
      console.log(e)
    }
  }

  const delSector = async (id) => {
    try {
      console.log("delSector id", id)
      const res = await myFetch(`${BASE_URL.value}/deleteSector`, { id: id })
      console.log("res", res)
      if (res?.status == 1) {
        sectors.value = sectors.value.filter((item) => item.id != id)
        return
      } else alert(res.msg)
    } catch (e) {
      console.log(e)
    }
  }

  const getSectors = async () => {
    try {
      const res = await myFetch(`${BASE_URL.value}/sectors`)
      console.log("res", res)
      if (res?.status == 1 && res?.body != undefined) {
        return (sectors.value = res.body)
      } else console.log("не корректные данные", res)
    } catch (e) {
      console.log(e)
    }
  }

  onMounted(getSectors)

  return {
    sectors,
    updateSector,
    delSector,
    addSector
  }
}
