<template>
  <a href="javascript:void(0);" class="logo">
    <img src="@/assets/logo.png" alt="logo" />
    <span class="logo__text"><slot></slot></span>
  </a>
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
  white-space: pre-line;
}
</style>
