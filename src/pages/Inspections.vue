<template>
  <section class="inspectionsPage">
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

        <div class="w-[120px]">
          <MyBtn
            class="btn btn_success mt-2"
            @click="saveXls()"
            alt="Скачать в Excel"
          >
            <svg class="svg_icon w-[30px]">
              <use xlink:href="@/assets/sprite.svg#install_app"></use>
            </svg>
            <span class="ml-1">save xls</span>
          </MyBtn>
        </div>
      </div>

      <div id="wrMyTable" ref="wrTable">
        <table v-if="emptySectors == false" class="table" id="myTable">
          <tr class="head_tbl head_th">
            <th>№</th>
            <th>id участка</th>
            <th>Лиц.счет</th>
            <th>Улица</th>
            <th>№ дома</th>
            <th>Литера</th>
            <th>№ ПУ</th>
            <th>Тип ПУ</th>
            <th>Дата осмотра</th>
            <th>КП.День</th>
            <th>КП.Ночь</th>
            <th>Общие</th>
            <th>user</th>
            <th>фото</th>
            <th>Дата ПУ</th>
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
            <td>
              <a :href="'/sectors/' + sectors.length + '/' + item.idSector">{{
                item.idSector
              }}</a>
            </td>
            <td>{{ item.persNum }}</td>
            <td>{{ item.street }}</td>
            <td>{{ item.houseNum }}</td>
            <td>{{ item.litera }}</td>
            <td>{{ item.numberPU }}</td>
            <td>{{ item.typePU }}</td>
            <td>{{ myTime(item.createdAt, "d.m.y") }}</td>
            <td class="w-[60px]">{{ item.kpDay }}</td>
            <td class="w-[60px]">{{ item.kpNight }}</td>
            <td class="w-[60px]">{{ item.kpTotal }}</td>
            <td>{{ item.user }}</td>
            <td>
              <a
                :href="'/sectors/' + sectors.length + '/' + item.idSector"
                class="count_photo"
                v-if="item.srcPhoto.length"
              >
                <span>{{ item.srcPhoto.length }}</span>
                <svg class="svg_icon">
                  <use xlink:href="@/assets/sprite.svg#camera"></use>
                </svg>
              </a>
            </td>
            <td>{{ item.datePU }}</td>
            <td>{{ item.notation }}</td>
          </tr>
          <tr v-if="inspections.length == 0" class="trEmpty">
            <td colspan="16" class="py-3">not data</td>
          </tr>
        </table>

        <table v-if="emptySectors" class="table" id="myTable">
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
      downloadFileXls,
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
      downloadFileXls,
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
    saveXls() {
      console.log("click save..xls...")
      let table = document.getElementById("myTable")
      this.downloadFileXls(
        table,
        "Осмотры",
        `Осмотр_${getTime("now", "d.m.y")}.xls`
      )
    }
  }
}
</script>
