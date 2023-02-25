import { ref, onMounted } from "vue"
import { myFetch, deepClone, getTime } from "@/func"

const inspections = ref([])

export default function useInspections(props) {
  const BASE_URL = ref(import.meta.env.VITE_BASE_URL)

  const getInspections = async (data = {}) => {
    try {
      let dataDC = deepClone(data)
      const res = await myFetch(`${BASE_URL.value}/getInspects`, dataDC)
      console.log("insp", res)
      if (res?.status == 1 && res?.body != undefined) {
        console.log("body", res.body)
        // let result = []
        res.body.forEach((item) => {
          item.srcPhoto = JSON.parse(item.srcPhoto)
        })
        // console.log("photos", result)
        return (inspections.value = res.body)
      } else console.log("некорректные данные", res)
    } catch (e) {
      console.log(e)
    }
  }

  onMounted(getInspections)

  return {
    inspections,
    getInspections
  }
}
