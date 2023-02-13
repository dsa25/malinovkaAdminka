<template>
  <a href="javascript:void(0);" class="btn">
    <slot></slot>
  </a>
</template>

<script>
export default {
  name: "MyBtn"
}
</script>

<style scoped>
.btn {
  @apply inline-block text-white py-0 px-4 rounded whitespace-nowrap;
  height: 32px;
  line-height: 32px;
  text-align: center;
}
.btn_min {
  height: 25px;
  padding: 0 12px;
  line-height: 25px;
}
.btn.block {
  display: block;
}
.btn_success {
  @apply bg-green-500 hover:bg-green-400;
}
.btn_danger {
  @apply bg-red-500 hover:bg-red-400;
}
</style>
