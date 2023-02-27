<template>
  <section>
    <div class="row">
      <table class="table tableHead mb-5">
        <tr>
          <th>Id.участка</th>
          <th>кол-во</th>
        </tr>
        <tr>
          <td>{{ idSector }}</td>
          <td>{{ inspections.length }}</td>
        </tr>
      </table>

      <table class="table" id="myTable">
        <tr>
          <th>№</th>
          <th>Адресс</th>
          <th>№ ПУ</th>
          <th>user</th>
          <th>Дата ПУ</th>
          <th>notes</th>
          <th>КП.День</th>
          <th>КП.Ночь</th>
          <th>Общие</th>
          <th>Дата осмотра</th>
          <th>фото</th>
        </tr>
        <tr v-for="(item, index) in inspections" :key="item.id">
          <td>{{ index + 1 }}</td>
          <td>{{ item.address }}</td>
          <td>{{ item.numberPU }}</td>
          <td>{{ item.user }}</td>
          <td>{{ item.datePU }}</td>
          <td>{{ item.notation }}</td>
          <td>{{ item.kpDay }}</td>
          <td>{{ item.kpNight }}</td>
          <td>{{ item.kpTotal }}</td>
          <td>{{ myTime(item.createdAt, "d.m.y") }}</td>
          <td>
            <img
              v-for="src in item.srcPhoto"
              :key="src"
              class="table__img"
              :src="urlImg(src)"
              alt="jpeg"
              width="20"
              @click="increase(urlImg(src))"
              :class="{ active: currentImg == urlImg(src) }"
            />
          </td>
        </tr>
        <tr v-if="inspections.length == 0" class="trEmpty">
          <td colspan="16" class="py-3">not data</td>
        </tr>
      </table>

      <div>
        <img
          v-if="bigImg.length"
          :src="bigImg"
          class="bigImg"
          alt="big jpeg"
          height="1000"
        />

        <div v-if="bigImg.length == 0" class="wr_svg">
          <svg class="svg_icon">
            <use xlink:href="@/assets/sprite.svg#photo"></use>
          </svg>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import { myFetch, getTime } from "@/func"
const BU = import.meta.env.VITE_BASE_URL
export default {
  name: "HistorySector",
  data() {
    return {
      idSector: this.$route.params.idSector,
      BASE_URL: BU,
      inspections: [],
      currentImg: "",
      bigImg: ""
    }
  },
  methods: {
    async getHistory() {
      try {
        console.log("this.idSector", this.idSector)
        let data = { idSector: this.idSector }
        const res = await myFetch(`${this.BASE_URL}/historySector`, data)
        console.log("res", res)
        if (res?.status == 1 && res?.body != undefined) {
          res.body.forEach((item) => {
            item.srcPhoto = JSON.parse(item.srcPhoto)
          })
          this.inspections = res.body
          return
        } else return console.log("не корректные данные", res)
      } catch (e) {
        console.log(e)
      }
    },
    increase(src) {
      this.bigImg = src
      this.currentImg = src
    },
    urlImg(src) {
      return this.BASE_URL + src.substring(1)
    },
    myTime(date = "now", format = "d.m.y") {
      return getTime(date, format)
    }
  },
  mounted() {
    console.log("mounted()")
    this.getHistory()
  }
}
</script>
<style scoped>
.table__img {
  display: inline-block;
  width: 24px;
  height: auto;
  /* margin: 3px 0 0 4px; */
  cursor: pointer;
  border: 3px solid transparent;
}
.table__img.active {
  border-color: red;
}
.bigImg {
  display: block;
  margin: 50px auto;
  width: auto;
  height: auto;
  max-width: 100%;
}
.wr_svg {
  margin: 50px auto;
  display: block;
  max-width: 100%;
  width: 500px;
}
.wr_svg .svg_icon {
  width: 100%;
  display: block;
  height: auto;
}
</style>
