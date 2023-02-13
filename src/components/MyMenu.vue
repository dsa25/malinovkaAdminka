<template>
  <div class="menu">
    <router-link to="/" :class="{ active: $route.path === '/' }"
      >Inspects</router-link
    >
    <router-link to="/users" :class="{ active: $route.path === '/users' }"
      >Users</router-link
    >
    <router-link to="/list" :class="{ active: $route.path === '/list' }"
      >List</router-link
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
  margin-left: 12px;
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
