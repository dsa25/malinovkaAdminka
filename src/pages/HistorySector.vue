<template>
  <section>
    <div class="row">
      <div class="flex item-center justify-between mb-7">
        <table class="table tableHead">
          <tr>
            <th>Id.участка</th>
            <th>кол-во</th>
          </tr>
          <tr>
            <td>{{ idSector }}</td>
            <td>{{ inspections.length }}</td>
          </tr>
        </table>

        <table v-if="readInsp" class="table tableHead read_tbl">
          <tr>
            <th>№</th>
            <th>id.Участка <span class="text-red-500">*</span></th>
            <th>КП.День</th>
            <th>КП.Ночь</th>
            <th>Общие</th>
            <th>actions</th>
          </tr>
          <tr>
            <th>{{ itemInsp.index }}</th>
            <th><MyInput v-model="itemInsp.idSector" :type="'number'" /></th>
            <th><MyInput v-model="itemInsp.kpDay" /></th>
            <th><MyInput v-model="itemInsp.kpNight" /></th>
            <th><MyInput v-model="itemInsp.kpTotal" /></th>
            <th>
              <MyBtn class="btn_svg btn_primary" @click="saveInsp()">
                <svg class="svg_icon">
                  <use xlink:href="@/assets/sprite.svg#save"></use>
                </svg>
              </MyBtn>
              <MyBtn class="btn_svg btn_danger ml-2" @click="readInsp = false">
                <svg class="svg_icon">
                  <use xlink:href="@/assets/sprite.svg#close"></use>
                </svg>
              </MyBtn>
            </th>
          </tr>
        </table>
      </div>

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
          <th>actions</th>
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
          <td>
            <div
              class="flex"
              v-if="currentMonth(myTime(item.createdAt, 'd.m.y'))"
            >
              <MyBtn
                class="btn_svg btn_warning"
                @click="readInspect(item, index)"
              >
                <svg class="svg_icon">
                  <use xlink:href="@/assets/sprite.svg#edit"></use>
                </svg>
              </MyBtn>
              <MyBtn
                class="btn_svg btn_danger ml-2"
                @click="deleteInspect(item, index)"
              >
                <svg class="svg_icon">
                  <use xlink:href="@/assets/sprite.svg#delete"></use>
                </svg>
              </MyBtn>
            </div>
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
import { myFetch, getTime, deepClone } from "@/func"
const BU = import.meta.env.VITE_BASE_URL
export default {
  name: "HistorySector",
  data() {
    return {
      idSector: this.$route.params.idSector,
      countSectors: this.$route.params.countSectors,
      BASE_URL: BU,
      inspections: [],
      currentImg: "",
      bigImg: "",
      itemInsp: {
        id: -1,
        idSector: -1,
        kpDay: "",
        kpNight: "",
        kpTotal: ""
      },
      readInsp: false
    }
  },
  methods: {
    increase(src) {
      this.bigImg = src
      this.currentImg = src
    },
    urlImg(src) {
      return this.BASE_URL + src.substring(1)
    },
    myTime(date = "now", format = "d.m.y") {
      return getTime(date, format)
    },
    currentMonth(date) {
      let month = date.split(".")[1]
      let curMonth = getTime("now", "d.m.y").split(".")[1]
      return month == curMonth ? true : false
    },
    readInspect(item, index) {
      this.readInsp = true
      this.itemInsp.index = index + 1
      this.itemInsp.id = item.id
      this.itemInsp.idSector = item.idSector
      this.itemInsp.kpDay = item.kpDay
      this.itemInsp.kpNight = item.kpNight
      this.itemInsp.kpTotal = item.kpTotal
    },
    validForm() {
      if (
        this.itemInsp.idSector <= 0 ||
        Number(this.itemInsp.idSector) > this.countSectors
      ) {
        alert("Некорректный id.Участка!")
        return false
      }
      if (
        String(this.itemInsp.kpDay).trim().length == 0 &&
        String(this.itemInsp.kpNight).trim().length == 0 &&
        String(this.itemInsp.kpTotal).trim().length == 0
      ) {
        alert("хотя бы 1 из показаний должны быть заполнены!")
        return false
      }
      return true
    },
    async saveInsp() {
      try {
        if (!this.validForm()) return
        const res = await myFetch(
          `${this.BASE_URL}/saveInsp`,
          deepClone(this.itemInsp)
        )
        console.log("res", res)
        if (res?.status == 1) {
          if (this.itemInsp.idSector != this.idSector) {
            this.inspections = this.inspections.filter(
              (item) => item.id != this.itemInsp.id
            )
          } else {
            for (let i = 0; i < this.inspections.length; i++) {
              if (this.inspections[i].id == this.itemInsp.id) {
                this.inspections[i].idSector = this.itemInsp.idSector
                this.inspections[i].kpDay = this.itemInsp.kpDay
                this.inspections[i].kpNight = this.itemInsp.kpNight
                this.inspections[i].kpTotal = this.itemInsp.kpTotal
                break
              }
            }
          }
          this.readInsp = false
          return alert(res.msg)
        } else alert(res.msg)
      } catch (e) {
        console.log(e)
      }
    },
    async deleteInspect(item, index) {
      try {
        let modal = confirm(
          `Вы точно хотите удалить осмотр № ${index + 1} от ${getTime(
            item.createdAt,
            "d.m.y"
          )} ?`
        )
        if (modal) {
          const id = item.id
          const res = await myFetch(`${this.BASE_URL}/deleteInsp`, {
            id: id
          })
          console.log("res", res)
          if (res?.status == 1) {
            // versionSec.value = formatTimeVers(res.body.version[0])
            this.inspections = this.inspections.filter((item) => item.id != id)
            this.readInsp = false
            alert(res.msg)
            return
          } else alert(res.msg)
        }
        return
      } catch (e) {
        console.log(e)
      }
    },
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
