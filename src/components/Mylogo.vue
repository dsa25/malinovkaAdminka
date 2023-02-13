<template>
  <router-link to="/" class="logo">
    <img src="@/assets/logo.png" alt="logo" />
    <span class="logo__text">
      <span>Админка</span> <span>Малиновка</span>
    </span>
  </router-link>
</template>

<script>
export default {
  name: "MyLogo"
}
</script>

<style scoped>
.logo {
  display: inline-flex;
  align-items: center;
}
.logo:hover {
  color: #ff4081;
}
.logo img {
  width: 32px;
  height: auto;
  display: block;
  margin-right: 5px;
}
.logo__text {
  line-height: 1.1;
  padding-top: 1px;
  font-size: 12px;
  color: #6a6e74c7;
  display: flex;
  flex-direction: column;
}
</style>
