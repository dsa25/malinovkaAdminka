<template>
  <section>
    <div class="row">
      <div class="flex justify-between items-center pb-5">
        <div class="flex items-center">
          <div>
            <MyInput
              :type="'date'"
              min="2023-01-01"
              v-model="fromDate"
              id="from"
            />
            <MyInput
              class="mt-2"
              :type="'date'"
              min="2023-01-02"
              v-model="beforeDate"
              id="before"
            />
          </div>
          <MyBtn class="btn btn_success btn_svg ml-2" @click="getInspDate()">
            <svg class="svg_icon">
              <use xlink:href="@/assets/sprite.svg#calendar_icon"></use>
            </svg>
          </MyBtn>
        </div>

        <table class="table tableHead">
          <tr>
            <td>участки</td>
            <td>осмотры</td>
            <td>
              <MyBtn class="btn btn_min2 btn_danger" @click="runTable('empty')">
                пустые
              </MyBtn>
            </td>
            <td>
              <MyBtn
                class="btn btn_min2 btn_success"
                @click="runTable('sector')"
              >
                по участкам
              </MyBtn>
            </td>
          </tr>
          <tr>
            <td>{{ sectors.length }}</td>
            <td>{{ inspections.length }}</td>
            <th>{{ getEmptySectors.length }}</th>
            <th>повторы: {{ listDuplicate.length }}</th>
          </tr>
        </table>

        <div class="flex flex-col">
          <div>
            <MyBtn class="btn btn_svg btn_success" @click="saveFile()">
              <svg class="svg_icon">
                <use xlink:href="@/assets/sprite.svg#save"></use>
              </svg>
            </MyBtn>
            <span class="ml-1">save</span>
          </div>
          <div>
            <MyBtn class="btn btn_svg btn_success mt-2" @click="saveXls()">
              <svg class="svg_icon">
                <use xlink:href="@/assets/sprite.svg#save"></use>
              </svg>
            </MyBtn>
            <span class="ml-1">save xls</span>
          </div>
        </div>
      </div>

      <div id="wrMyTable" ref="wrTable">
        <table
          v-if="emptySectors == false"
          class="table tableTest"
          id="myTable"
        >
          <!-- <tr>
          <td></td>
          <td><my-input>sdf</my-input></td>
          <td><my-input>sdf</my-input></td>
          <td><my-input>sdf</my-input></td>
          <td><my-input>sdf</my-input></td>
          <td><my-input>sdf</my-input></td>
          <td colspan="3"><my-input>sdf</my-input></td>
          <td></td>
          <td><my-input>sdf</my-input></td>
          <td></td>
        </tr> -->
          <tr>
            <th>№</th>
            <th>id участка</th>
            <th>Адресс</th>
            <th>Дата осмотра</th>
            <th>№ ПУ</th>
            <th>Тип ПУ</th>
            <th>Дата ПУ</th>
            <th colspan="3">
              <table class="tbl_poc">
                <tr>
                  <td colspan="3">Показания</td>
                </tr>
                <tr>
                  <td class="w-[60px]">КП День</td>
                  <td class="w-[60px]">КП Ночи</td>
                  <td class="w-[60px]">Общие</td>
                </tr>
              </table>
            </th>
            <th>фото</th>
            <th>user</th>
            <th>notes</th>
          </tr>
          <tr
            v-for="(item, index) in sortedInspections"
            :key="item.id"
            :class="{
              trDuplicate: listDuplicate.includes(item.idSector)
            }"
          >
            <td>{{ index + 1 }}</td>
            <td>{{ item.idSector }}</td>
            <td>{{ item.street }} {{ item.houseNum }} {{ item.litera }}</td>
            <td>{{ myTime(item.createdAt, "d.m.y") }}</td>
            <td>{{ item.numberPU }}</td>
            <td>{{ item.typePU }}</td>
            <td>{{ item.datePU }}</td>
            <td class="w-[60px]">{{ item.kpDay }}</td>
            <td class="w-[60px]">{{ item.kpNight }}</td>
            <td class="w-[60px]">{{ item.kpTotal }}</td>
            <td>
              <a
                v-for="src in item.srcPhoto"
                :key="src"
                :href="src"
                class="m-1 inline-block"
                target="_blank"
              >
                <img style="width: 20px; height: auto" :src="src" alt="img" />
              </a>
            </td>
            <td>{{ item.user }}</td>
            <td>{{ item.notation }}</td>
          </tr>
          <tr v-if="inspections.length == 0" class="trEmpty">
            <td colspan="13" class="py-3">not data</td>
          </tr>
        </table>

        <table v-if="emptySectors" class="table tableTest" id="myTable">
          <tr>
            <th>№</th>
            <th>участок(id)</th>
            <th>Лиц.счет</th>
            <th>Адресс</th>
            <th>№ ПУ</th>
            <th>Тип ПУ</th>
          </tr>
          <tr
            v-for="(item, index) in getEmptySectors"
            :key="item.id"
            class="trEmpty"
          >
            <td>{{ index + 1 }}</td>
            <td>{{ item.id }}</td>
            <td>{{ item.persNum }}</td>
            <td>{{ item.street }} {{ item.houseNum }} {{ item.litera }}</td>
            <td>{{ item.numberPU }}</td>
            <td>{{ item.typePU }}</td>
          </tr>
          <tr v-if="inspections.length == 0" class="trGreen">
            <td colspan="6" class="py-3">not data</td>
          </tr>
        </table>
      </div>
    </div>
  </section>
</template>

<script>
import { ref, computed } from "vue"
import { getTime } from "@/func"
import useInspections from "@/hooks/useInspections"
import useSectors from "@/hooks/useSectors"
import MyInput from "../components/UI/MyInput.vue"
export default {
  components: { MyInput },
  name: "Inspections",
  setup(props) {
    let fdm = getTime("now", "y-m-d", "firstDayMonth")
    let ldm = getTime("now", "y-m-d")

    let fromDate = ref(fdm)
    let beforeDate = ref(ldm)

    let emptySectors = ref(false)

    const {
      inspections,
      getInspections,
      typeSort,
      sortedInspections,
      getEmptySectors,
      listDuplicate,
      listSectors
    } = useInspections()
    const { sectors } = useSectors()

    return {
      inspections,
      getInspections,
      listDuplicate,
      listSectors,
      typeSort,
      sortedInspections,
      getEmptySectors,
      emptySectors,
      fromDate,
      beforeDate,
      sectors
    }
  },
  methods: {
    async getInspDate() {
      this.emptySectors = false
      let data = { from: this.fromDate, before: this.beforeDate }
      console.log({ data })
      await this.getInspections(data)
    },
    myTime(date = "now", format = "d.m.y") {
      return getTime(date, format)
    },
    runTable(type) {
      if (type == "sector") {
        this.emptySectors = false
        this.typeSort = "sector"
      }
      if (type == "empty") {
        this.emptySectors = true
        this.listSectors = this.sectors
      }
    },
    saveFile() {
      console.log("click save.....")
      const html = this.$refs.wrTable.innerHTML
      const name = "myTable.html"
      console.log(html)
      // return

      const b = new Blob([html], { type: "text/html" })
      const url = window.URL.createObjectURL(b)
      const a = document.createElement("a")
      a.href = url
      a.download = name || "text.html"
      a.type = "text/html"
      a.addEventListener("click", () => {
        setTimeout(() => window.URL.revokeObjectURL(url), 1000)
      })
      a.click()
    },
    saveXls() {
      console.log("click save..xls...")

      const uri = "data:application/vnd.ms-excel;base64,"
      const template =
        '<html xmlns:o="urn:schemas-microsoft-com:office:office" xmlns:x="urn:schemas-microsoft-com:office:excel" xmlns="http://www.w3.org/TR/REC-html40"><head><!--[if gte mso 9]><xml><x:ExcelWorkbook><x:ExcelWorksheets><x:ExcelWorksheet><x:Name>{worksheet}</x:Name><x:WorksheetOptions><x:DisplayGridlines/></x:WorksheetOptions></x:ExcelWorksheet></x:ExcelWorksheets></x:ExcelWorkbook></xml><![endif]--></head><body><table>{table}</table></body></html>'
      const base64 = (s) => {
        return window.btoa(unescape(encodeURIComponent(s)))
      }
      const format = (s, c) => {
        return s.replace(/{(\w+)}/g, function (m, p) {
          return c[p]
        })
      }
      const downloadURI = (uri, name) => {
        var link = document.createElement("a")
        link.download = name
        link.href = uri
        link.click()
      }

      const run = (table, name, fileName) => {
        var ctx = {
          worksheet: name || "Worksheet",
          table: table.innerHTML
        }
        var resuri = uri + base64(format(template, ctx))
        downloadURI(resuri, fileName)
      }

      let table = document.getElementById("myTable")
      run(table, "Осмотры", `Осмотр_${getTime("now", "d.m.y")}.xls`)
    }
  }
}
</script>
