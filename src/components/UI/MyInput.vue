<template>
  <input :type="type" :value="modelValue" @input="updateInput" class="input" />
</template>

<script>
export default {
  name: "MyInput",
  props: {
    modelValue: [String, Number],
    type: {
      type: String,
      default: "text"
    }
  },
  methods: {
    updateInput(event) {
      this.$emit("update:modelValue", event.target.value)
    }
  }
}
</script>

<style scoped>
.input {
  @apply w-full block border rounded px-2;
  height: 32px;
}
</style>
