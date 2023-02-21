import { ref, onMounted } from "vue"
import { myFetch, deepClone, formatTimeVers } from "@/func"
import { setAllSectorsFunc } from "@/list"

const sectors = ref([])
const versionSec = ref({
  name: "sectors",
  version: "NaN",
  updatedAt: "NaN",
  createdAt: "NaN"
})

export default function useSectors(props) {
  const BASE_URL = ref(import.meta.env.VITE_BASE_URL)

  const addSector = async (data) => {
    try {
      let dataDC = deepClone(data)
      console.log("newSector:", dataDC)
      const res = await myFetch(`${BASE_URL.value}/addSector`, dataDC)
      console.log("res", res)
      if (res?.status == 1 && res?.body != undefined) {
        dataDC.id = res.body.id
        sectors.value.push(dataDC)
        versionSec.value = formatTimeVers(res.body.version[0])
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
        versionSec.value = formatTimeVers(res.body.version[0])
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
        versionSec.value = formatTimeVers(res.body.version[0])
        sectors.value = sectors.value.filter((item) => item.id != id)
        return
      } else alert(res.msg)
    } catch (e) {
      console.log(e)
    }
  }

  const setAllSectors = async (data) => {
    try {
      console.log(setAllSectorsFunc())
      let data = setAllSectorsFunc()
      // return
      // let dataDC = deepClone(data)
      const res = await myFetch(`${BASE_URL.value}/setAS`, data)
      console.log("resAs", res)
      if (res?.status == 1 && res?.body != undefined) {
        return
      } else {
        console.log(res.msg)
        return
      }
    } catch (e) {
      console.log(e)
    }
  }

  const getSectors = async () => {
    try {
      const res = await myFetch(`${BASE_URL.value}/sectors`)
      console.log("res", res)
      if (res?.status == 1 && res?.body != undefined) {
        sectors.value = res.body.sectors
        versionSec.value = formatTimeVers(res.body.version[0])
        return
      } else console.log("не корректные данные", res)
    } catch (e) {
      console.log(e)
    }
  }

  onMounted(getSectors)

  return {
    sectors,
    versionSec,
    updateSector,
    delSector,
    setAllSectors,
    addSector
  }
}
