<template>
  <header>
    <div class="row flex items-center py-2">
      <MyLogo></MyLogo>
      <MyMenu />
    </div>
  </header>

  <div class="py-10">
    <router-view />
  </div>
</template>

<script>
import MyLogo from "@/components/MyLogo.vue"
import MyMenu from "@/components/MyMenu.vue"

export default {
  components: {
    MyLogo,
    MyMenu
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

<style scoped>
.menu a.active {
  color: green;
}
</style>
