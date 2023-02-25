<template>
  <section>
    <div class="row">
      <div class="flex pb-5">
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
      </div>

      <table class="table">
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
        <tr v-for="(item, index) in inspections" :key="item.id">
          <td>{{ index }}</td>
          <td>{{ item.address }}</td>
          <td>{{ item.createdAt }}</td>
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
        <tr v-if="inspections.length == 0">
          <td colspan="12" class="py-3">not data</td>
        </tr>
      </table>
    </div>
  </section>
</template>

<script>
import { ref } from "vue"
import { getTime } from "@/func"
import useInspections from "@/hooks/useInspections"
import MyInput from "../components/UI/MyInput.vue"
export default {
  components: { MyInput },
  name: "Inspections",
  setup(props) {
    let fdm = getTime("now", "y-m-d", "firstDayMonth")
    let ldm = getTime("now", "y-m-d")

    let fromDate = ref(fdm)
    let beforeDate = ref(ldm)

    const { inspections, getInspections } = useInspections()

    return {
      inspections,
      getInspections,
      fromDate,
      beforeDate
    }
  },
  methods: {
    async getInspDate() {
      let data = { from: this.fromDate, before: this.beforeDate }
      console.log({ data })
      await this.getInspections(data)
    }
  }
}
</script>
