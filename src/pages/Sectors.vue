<template>
  <section>
    <div class="row">
      <!-- <img src="@/assets/vue-5532db34.svg" alt="" /> -->
      <h1>Список участков ({{ sectors.length }})</h1>
      <table class="table">
        <tr>
          <th>id</th>
          <th>Лиц.счет <span class="text-red-500">*</span></th>
          <th>Нас.пункт <span class="text-red-500">*</span></th>
          <th>Улица <span class="text-red-500">*</span></th>
          <th>Дом <span class="text-red-500">*</span></th>
          <th>Литера</th>
          <th>№ ПУ</th>
          <th>Тип ПУ</th>
          <th>Дата выпуска ПУ</th>
          <th>actions</th>
        </tr>
        <tr>
          <th></th>
          <th>
            <MyInput v-model="itemSector.persNum" />
          </th>
          <th>
            <MyInput v-model="itemSector.nameVillage" />
          </th>
          <th><MyInput v-model="itemSector.street" /></th>
          <th><MyInput v-model="itemSector.houseNum" /></th>
          <th><MyInput v-model="itemSector.litera" /></th>
          <th><MyInput v-model="itemSector.numberPU" /></th>
          <th><MyInput v-model="itemSector.typePU" /></th>
          <th>
            <MyInput v-model="itemSector.datePU" :type="'date'" />
          </th>
          <th>
            <MyBtn
              v-if="!moodEdit"
              class="btn_success btn_svg"
              @click="addNewSector"
            >
              <svg class="svg_icon">
                <use xlink:href="@/assets/sprite.svg#plus"></use>
              </svg>
            </MyBtn>
            <div v-if="moodEdit" class="flex">
              <MyBtn class="btn_svg btn_primary" @click="editSector">
                <svg class="svg_icon">
                  <use xlink:href="@/assets/sprite.svg#save"></use>
                </svg>
              </MyBtn>
              <MyBtn class="btn_svg btn_danger ml-2" @click="clearIS">
                <svg class="svg_icon">
                  <use xlink:href="@/assets/sprite.svg#close"></use>
                </svg>
              </MyBtn>
            </div>
          </th>
        </tr>
        <tr v-for="item in sectors" :key="item.id">
          <td>{{ item.id }}</td>
          <td>{{ item.persNum }}</td>
          <td>{{ item.nameVillage }}</td>
          <td>{{ item.street }}</td>
          <td>{{ item.houseNum }}</td>
          <td>{{ item.litera }}</td>
          <td>{{ item.numberPU }}</td>
          <td>{{ item.typePU }}</td>
          <td>{{ item.datePU }}</td>
          <td>
            <div class="flex">
              <MyBtn
                class="btn_svg btn_warning"
                @click="readSector(item, index)"
              >
                <svg class="svg_icon">
                  <use xlink:href="@/assets/sprite.svg#edit"></use>
                </svg>
              </MyBtn>
              <MyBtn
                class="btn_svg btn_danger ml-2"
                @click="deleteSector(item)"
              >
                <svg class="svg_icon">
                  <use xlink:href="@/assets/sprite.svg#delete"></use>
                </svg>
              </MyBtn>
            </div>
          </td>
        </tr>
        <tr v-if="sectors.length == 0">
          <td colspan="10" class="py-3">not data</td>
        </tr>
      </table>
    </div>
  </section>
</template>

<script>
import useSectors from "@/hooks/useSectors"
export default {
  name: "Sectors",
  setup(props) {
    const { sectors, addSector, updateSector, delSector } = useSectors()

    return { sectors, addSector, updateSector, delSector }
  },
  data() {
    return {
      itemSector: {
        id: 0,
        persNum: "",
        nameVillage: "",
        street: "",
        houseNum: "",
        litera: "",
        numberPU: "",
        typePU: "",
        datePU: "",
        active: 1
      },
      moodEdit: false
    }
  },
  methods: {
    async addNewSector() {
      try {
        console.log(this.itemSector)
        if (!this.requiredFields()) alert("Обязательные поля * ")
        else {
          await this.addSector(this.itemSector)
          this.clearItemSector()
        }
      } catch (e) {
        console.log(e)
      }
    },
    async editSector() {
      try {
        console.log(this.itemSector)
        if (!this.requiredFields()) alert("Обязательные поля * ")
        else {
          await this.updateSector(this.itemSector)
          this.clearIS()
        }
      } catch (e) {
        console.log(e)
      }
    },
    async deleteSector(item) {
      try {
        let modal = confirm(
          `Вы точно хотите удалить ${item.id}) ${item.street} ${item.houseNum} ${item.litera} ?`
        )
        if (modal) {
          await this.delSector(item.id)
        }
      } catch (e) {
        console.log(e)
      }
    },

    requiredFields() {
      if (
        this.itemSector.persNum.trim() == "" ||
        this.itemSector.nameVillage.trim() == "" ||
        this.itemSector.street.trim() == "" ||
        this.itemSector.houseNum.trim() == ""
      )
        return false
      else return true
    },
    clearItemSector() {
      this.itemSector = {
        id: 0,
        persNum: "",
        nameVillage: "",
        street: "",
        houseNum: "",
        litera: "",
        numberPU: "",
        typePU: "",
        datePU: "",
        active: 1
      }
    },
    clearIS() {
      this.clearItemSector()
      this.moodEdit = false
    },
    readSector(item) {
      console.log(item)
      this.itemSector = {
        id: item.id,
        persNum: item.persNum,
        nameVillage: item.nameVillage,
        street: item.street,
        houseNum: item.houseNum,
        litera: item.litera,
        numberPU: item.numberPU,
        typePU: item.typePU,
        datePU: item.datePU,
        active: item.active
      }
      this.moodEdit = true
    }
  }
}
</script>
