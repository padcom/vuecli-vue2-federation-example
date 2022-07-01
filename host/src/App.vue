<template>
  <div id="app">
    <label>Show UI<input type="checkbox" v-model="showUI" /></label>
    <div v-if="showUI">
      <HelloWorld1 msg="This text is from host" @custom-event="handleCustomEvent" />
      <HelloWorld2 msg="This text is from host" @custom-event="handleCustomEvent" />
    </div>
  </div>
</template>

<script>
import LoadingIndicator from './components/LoadingIndicator.vue'
import LoadingError from './components/LoadingError.vue'

function defineFederatedComponent(importer, component) {
  return () => ({
    component: importer().then(lib => lib[component]),
    loading: LoadingIndicator,
    error: LoadingError,
    timeout: 1000,
  })
}

export default {
  components: {
    HelloWorld1: defineFederatedComponent(() => import('library1/root'), 'HelloWorld1'),
    HelloWorld2: defineFederatedComponent(() => import('library2/root'), 'HelloWorld2'),
  },
  data() {
    return {
      showUI: false,
    }
  },
  methods: {
    handleCustomEvent(e) {
      console.log('App.vue - HelloWorld/custom-event', e)
    }
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
