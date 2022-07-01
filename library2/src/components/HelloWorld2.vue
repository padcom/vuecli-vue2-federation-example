<template>
  <div class="hello">
    <h1 @click="$emit('custom-event', { x: 'library2' })">Library2: {{ msg }}</h1>
    <HelloWorld1 msg="This text is from library2" />
  </div>
</template>

<script>
function defineFederatedComponent(importer, component) {
  return () => ({
    component: importer().then(lib => lib[component]),
    timeout: 1000,
  })
}

export default {
  name: 'HelloWorld2',
  components: {
    HelloWorld1: defineFederatedComponent(() => import('library1/root'), 'HelloWorld1')
  },
  props: {
    msg: String
  },
}
</script>

<style scoped>
h1 {
  margin: 40px 0 0;
  color: red;
}
</style>
