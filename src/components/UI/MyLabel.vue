<template>
  <label :for="forId"><slot></slot></label>
</template>

<script>
export default {
  name: "MyLabel",
  props: {
    forId: {
      type: String
    }
  }
}
</script>

<style scoped>
label {
  font-size: 16px;
}
</style>
