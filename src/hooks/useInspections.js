import { ref, onMounted } from "vue"
import { myFetch, deepClone } from "@/func"

const inspections = ref([])

export default function useInspections(props) {
  const BASE_URL = ref(import.meta.env.VITE_BASE_URL)

  const getInspections = async () => {
    try {
      const res = await myFetch(`${BASE_URL.value}/getInspects`)
      console.log("insp", res)
      if (res?.status == 1 && res?.body != undefined) {
        return (inspections.value = res.body)
      } else console.log("некорректные данные", res)
    } catch (e) {
      console.log(e)
    }
  }

  onMounted(getInspections)

  return {
    inspections
  }
}
