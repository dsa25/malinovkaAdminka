<template>
  <select @change="changeOption" class="select">
    <option disabled selected value="-1">выбрать</option>
    <option v-for="option in options" :key="option.value" :value="option.value">
      {{ option.name }}
    </option>
  </select>
</template>

<script>
export default {
  name: "MySelect",
  props: {
    modelValue: {
      type: [String, Number]
    },
    options: {
      type: Array,
      default: () => []
    }
  },
  methods: {
    changeOption(event) {
      this.$emit("update:modelValue", event.target.value)
    }
  }
}
</script>

<style>
.select {
  min-width: 100px;
  @apply w-full block border rounded px-2;
  height: 32px;
}
</style>
