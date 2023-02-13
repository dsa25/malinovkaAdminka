<template>
  <header>
    <div class="row flex items-center py-2">
      <router-link to="/">
        <MyLogo>Админка&nbsp; Малиновка</MyLogo>
      </router-link>
      <div class="menu ml-auto">
        <router-link
          class="ml-1"
          to="/"
          :class="{ active: $route.path === '/' }"
          >Inspects</router-link
        >
        <router-link
          class="ml-1"
          to="/users"
          :class="{ active: $route.path === '/users' }"
          >Users</router-link
        >
        <router-link
          class="ml-1"
          to="/list"
          :class="{ active: $route.path === '/list' }"
          >List</router-link
        >
      </div>
    </div>
  </header>

  <router-view />
</template>

<script>
import MyLogo from "@/components/MyLogo.vue"

export default {
  components: {
    MyLogo
  },
  data() {
    return {
      itemPage: "inspections"
    }
  },
  methods: {
    setPage(item) {
      this.itemPage = item
    }
  }
}
</script>

<style scoped></style>
