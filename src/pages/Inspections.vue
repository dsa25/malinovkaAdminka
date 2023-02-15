<template>
  <section>
    <div class="row">
      <h1>inspections ...</h1>
      <table class="table">
        <tr>
          <th>№</th>
          <th>Адресс</th>
          <th>Дата осмотра</th>
          <th>№ ПУ</th>
          <th>Тип ПУ</th>
          <th>Дата ПУ</th>
          <th>
            <table class="tbl_poc">
              <tr>
                <td colspan="3">Показания</td>
              </tr>
              <tr>
                <td class="w-1/3">КП День</td>
                <td class="w-1/3">КП Ночи</td>
                <td class="w-1/3">Общие</td>
              </tr>
            </table>
          </th>
          <th>фото</th>
          <th>user</th>
        </tr>
        <tr v-for="(item, index) in inspections" :key="item.id">
          <td>{{ index }}</td>
          <td>{{ item.address }}</td>
          <td>{{ item.dateInspection }}</td>
          <td>{{ item.numberPU }}</td>
          <td>{{ item.typePU }}</td>
          <td>{{ item.datePU }}</td>
          <td>
            <table class="tbl_poc">
              <tr>
                <td class="w-1/3">{{ item.kpDay }}</td>
                <td class="w-1/3">{{ item.kpNight }}</td>
                <td class="w-1/3">{{ item.kpTotal }}</td>
              </tr>
            </table>
          </td>

          <td>
            <img
              style="width: 80px; height: auto"
              :src="item.srcPhoto"
              alt=""
            />
          </td>
          <td>{{ item.user }}</td>
        </tr>
        <tr v-if="inspections.length == 0">
          <td>not data</td>
        </tr>
      </table>
    </div>
  </section>
</template>

<script>
import { ref } from "vue"
import useInspections from "@/hooks/useInspections"
export default {
  name: "Inspections",
  setup(props) {
    const { inspections } = useInspections()

    return { inspections }
  }
}
</script>

<style>
.table {
  width: 100%;
  /* border: 1px solid gray; */
  text-align: center;
}
.table th {
  text-align: center;
}
.table > tr > th,
.table > tr > td {
  border: 1px solid #89b289;
}
.tbl_poc {
  width: 100%;
}
</style>
