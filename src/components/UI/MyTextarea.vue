<template>
  <textarea
    :value="modelValue"
    @input="updateInput"
    class="textarea"
    name="notation"
    cols="30"
    rows="10"
  ></textarea>
</template>

<script>
export default {
  name: "MyTextarea",
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
.textarea {
  @apply w-full block border rounded px-2;
  padding: 4px 8px;
  height: 50px;
  min-height: 32px;
  max-height: 132px;
}
</style>
