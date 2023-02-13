<template>
  <div>
    <MyInput
      :type="'search'"
      placeholder="Search"
      :id="`${id}`"
      :list="`${list}`"
      @input="changeOption"
    />

    <datalist :id="`${list}`">
      <option v-for="option in options" :value="option" :key="option.id" />
    </datalist>
  </div>
</template>

<script>
export default {
  name: "MyDatalist",
  props: {
    modelValue: {
      type: String
    },
    options: {
      type: Array,
      default: () => []
    },
    id: {
      type: String,
      default: "datalistFor01"
    },
    list: {
      type: String,
      default: "datalist01"
    }
  },
  methods: {
    changeOption(event) {
      this.$emit("dataListValue", event.target.value)
    }
  }
}
</script>

<style scoped>
.wrap_input {
  position: relative;
  /* border: 1px solid; */
}
.wrap_input input {
}
</style>
