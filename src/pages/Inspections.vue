<template>
  <section>
    <div class="row">
      <h1>inspections ...</h1>
      <!-- <img width="30" src="../../dist/img/logo.png" alt="new_img" /> -->
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
          <td>{{ item.dateInspection }}</td>
          <td>{{ item.numberPU }}</td>
          <td>{{ item.typePU }}</td>
          <td>{{ item.datePU }}</td>
          <td class="w-[60px]">{{ item.kpDay }}</td>
          <td class="w-[60px]">{{ item.kpNight }}</td>
          <td class="w-[60px]">{{ item.kpTotal }}</td>
          <td>
            <img
              style="width: 80px; height: auto"
              :src="item.srcPhoto"
              alt=""
            />
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
import useInspections from "@/hooks/useInspections"
import MyInput from "../components/UI/MyInput.vue"
export default {
  components: { MyInput },
  name: "Inspections",
  setup(props) {
    const { inspections } = useInspections()

    return { inspections }
  }
}
</script>

<style></style>
