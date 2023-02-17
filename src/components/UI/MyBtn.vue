<template>
  <button class="btn">
    <slot></slot>
  </button>
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
.btn_warning {
  @apply bg-orange-400 hover:bg-orange-300;
}
.btn_danger {
  @apply bg-red-500 hover:bg-red-400;
}
.btn_primary {
  @apply bg-sky-500 hover:bg-sky-400;
}
.btn_svg {
  width: 32px;
  min-width: 32px;
  height: 32px;
  padding: 1px 6px;
  line-height: 28px;
}
button:disabled:hover,
button:disabled {
  background: gray;
  opacity: 0.5;
}
</style>
