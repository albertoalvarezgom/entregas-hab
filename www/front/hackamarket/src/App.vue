<template>
  <div id="app">
    <router-link :to="{ name: 'Productos' }"></router-link>

    <router-view />
  </div>
</template>

<script>
export default {
  name: "App",
  components: {}
};
</script>

<style>
body {
  margin: 0;
  padding: 0;
}
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #4eb4bf;
}
a {
  text-decoration: none;
  color: #7a9fbf;
}
</style>
