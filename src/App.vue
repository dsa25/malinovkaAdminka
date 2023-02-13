<template>
  <header>
    <div class="row flex items-center py-2">
      <MyLogo>Админка Малиновка</MyLogo>
      <div class="menu ml-auto">
        <a href="#" class="ml-1">sldkj</a>
        <a href="#" class="ml-1">sldkj</a>
        <a href="#" class="ml-1">sldkj</a>
      </div>
    </div>
  </header>

  <div class="row">
    <p class="mt-3">
      Lorem ipsum dolor, sit amet consectetur adipisicing elit. Quod nulla unde,
      cupiditate explicabo quidem magni dolorum eveniet hic voluptatibus et
      ipsum accusamus harum labore, ut maiores. Eius ipsa accusamus nostrum.
    </p>
  </div>
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
