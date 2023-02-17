<template>
  <div class="menu">
    <router-link to="/" :class="{ active: $route.path === '/' }"
      >Осмотры</router-link
    >
    <router-link to="/sectors" :class="{ active: $route.path === '/sectors' }"
      >Участки</router-link
    >
    <router-link to="/users" :class="{ active: $route.path === '/users' }"
      >Users</router-link
    >
  </div>
</template>

<script>
export default {
  name: "MyMenu",
  data() {
    return {
      base_url: import.meta.env.VITE_BASE_URL
    }
  }
}
</script>
<style>
.menu {
  margin-left: auto;
  white-space: nowrap;
  display: flex;
}
.menu a {
  margin-left: 20px;
  color: #6a6e74c7;
  text-transform: uppercase;
  font-size: 14px;
}
.menu a:hover {
  opacity: 0.8;
}
.menu a.active {
  color: green;
}
</style>
