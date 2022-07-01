<template>
  <div class="hello">
    <h1 @click="$emit('custom-event', { x: 'library1' })">Library1: {{ msg }}</h1>
  </div>
</template>

<script>
export default {
  props: {
    msg: String
  },
}
</script>

<style scoped>
h1 {
  color: green;
}
</style>
