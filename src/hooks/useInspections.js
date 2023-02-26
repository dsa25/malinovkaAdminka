import { ref, computed, onMounted } from "vue"
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
        typeSort.value = "date"
        return (inspections.value = res.body)
      } else console.log("некорректные данные", res)
    } catch (e) {
      console.log(e)
    }
  }

  const typeSort = ref("date")
  const sortedInspections = computed(() => {
    if (typeSort.value == "date") {
      return [...inspections.value]
    }
    if (typeSort.value == "sector") {
      return [...inspections.value].sort((item1, item2) =>
        item1.idSector > item2.idSector ? 1 : -1
      )
    }
    return []
  })

  const listSectors = ref([])
  const getEmptySectors = computed(() => {
    console.log("send getEmptySectors...........")
    let result = []
    let idsInspections = []

    inspections.value.forEach((item) => {
      idsInspections.push(item.idSector)
    })
    idsInspections = Array.from(new Set(idsInspections))

    console.log("listSectors.value", listSectors.value)
    listSectors.value.forEach((item) => {
      if (idsInspections.includes(item.id) == false) {
        result.push(item)
      }
    })
    console.log({ result })

    return result
  })

  const listDuplicate = computed(() => {
    if (typeSort.value == "sector") {
      let list = sortedInspections.value
      console.log("test", list)
      let listNumber = []
      list.forEach((item, index) => {
        if (
          item.idSector == list[index + 1]?.idSector ||
          item.idSector == list[index - 1]?.idSector
        ) {
          listNumber.push(item.idSector)
        }
      })
      return Array.from(new Set(listNumber))
    } else return []
  })

  onMounted(getInspections)

  return {
    inspections,
    typeSort,
    sortedInspections,
    getEmptySectors,
    listDuplicate,
    listSectors,
    getInspections
  }
}
