<template>
  <section>
    <div class="row">
      <div class="flex items-center justify-between">
        <table class="table tableHead mb-7">
          <tr>
            <td>page</td>
            <td>count</td>
            <td>version</td>
            <td>update</td>
            <td>create</td>
          </tr>
          <tr>
            <th>{{ versionUs.name }}</th>
            <td>{{ users.length }}</td>
            <td>{{ versionUs.version }}</td>
            <td>{{ versionUs.updatedAt }}</td>
            <td>{{ versionUs.createdAt }}</td>
          </tr>
        </table>

        <table class="table tableHead mb-7">
          <tr>
            <td>БД</td>
            <td>Фотки</td>
            <td>чистка</td>
            <td>
              <MyBtn class="btn btn_min2 btn_success" @click="clearImgs()">
                очистить
              </MyBtn>
            </td>
          </tr>
          <tr>
            <td>{{ myFormatBytes(size.sizeDB) }}</td>
            <th>{{ myFormatBytes(size.sizeImgs) }}</th>
            <td>{{ size.vers?.updatedAt }}</td>
            <td>{{ size.vers?.version }}</td>
          </tr>
        </table>
      </div>

      <div class="flex justify-between items-center text-center py-1">
        <div class="w-1/12">id</div>
        <div class="w-1/3">ФИО</div>
        <div class="w-1/6">Статус</div>
        <div class="w-1/4"></div>
      </div>
      <div v-if="users.length" class="">
        <div
          v-for="user in users"
          :key="user.id"
          class="user flex justify-between items-center text-center py-1"
        >
          <div class="w-1/12">{{ user.id }}</div>
          <div class="w-1/3">
            <MyInput v-model="user.fio" />
          </div>
          <div class="w-1/6">
            <MySelect
              v-model="user.status"
              :options="listStatus"
              :value="user.status"
            />
          </div>
          <div class="w-1/4 text-right">
            <MyBtn @click="saveUser(user)" class="btn btn_success">
              Сохранить
            </MyBtn>
          </div>
        </div>
      </div>
      <div v-else>Пользователей пока нет</div>

      <div class="user flex justify-between items-center text-center py-1">
        <div class="w-1/12">{{ newUser.id }}</div>
        <div class="w-1/3">
          <MyInput v-model="newUser.fio" />
        </div>
        <div class="w-1/6">
          <MySelect
            id="mySelect1"
            v-model="newUser.status"
            :value="newUser.status"
            :options="listStatus"
          />
        </div>
        <div class="w-1/4 text-right">
          <MyBtn @click="addUser" class="btn btn_success">Добавить</MyBtn>
        </div>
      </div>

      <div class="text-[12px] text-red-600 mt-5">
        <p>
          * Нельзя менять ФИО одного пользователя на другого! Иначе будет
          путаница в участниках прошлых осмотров
        </p>
        <p>* Если нужен новый - добавляем его</p>
        <p>
          * Если нужно убрать(удалить) из списка в приложении - меняем статус на
          0
        </p>
      </div>
    </div>
  </section>
</template>

<script>
import { ref } from "vue"
import { getTime, formatBytes } from "@/func"
import useUsers from "@/hooks/useUsers"
export default {
  name: "Users",
  data() {
    return {
      base_url: import.meta.env.VITE_BASE_URL,
      listStatus: [
        { value: 0, name: 0 },
        { value: 1, name: 1 }
      ],
      newUser: {
        id: 0,
        fio: "",
        status: -1
      }
    }
  },
  setup(props) {
    const { size, clearOldImgs, users, versionUs, addUser, updateUser } =
      useUsers()

    return { size, clearOldImgs, users, versionUs, addUser, updateUser }
  },
  methods: {
    async addUser() {
      try {
        await this.addUser(this.newUser)
        this.newUser = {
          id: 0,
          fio: "",
          status: -1
        }
        return
      } catch (e) {
        console.log(e)
      }
    },
    async saveUser(user) {
      try {
        console.log(user)
        await this.updateUser(user)
      } catch (e) {
        console.log(e)
      }
    },
    async clearImgs() {
      console.log("click clear")
      await this.clearOldImgs()
    },
    myTime(date = "now", format = "d.m.y") {
      return getTime(date, format)
    },
    myFormatBytes(bytes, decimals = 2) {
      return formatBytes(bytes, decimals)
    }
  }
}
</script>
<style></style>
