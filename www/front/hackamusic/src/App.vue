<template>
  <div id="app">
    <router-view />
  </div>
</template>

<style>
body {
  background-color: aquamarine;
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #1c1c1c;
}

.list {
  list-style: none;
  padding: 0 4rem;
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
}

.list li {
  margin: 2rem 6rem;
}
.list li a {
  text-decoration: none;
  color: #1c1c1c;
  margin: 0;
}

.list li a:hover {
  color: white;
}

.list li h2 {
  font-size: 2rem;
  margin: 0.5rem;
}

.list li h3 {
  margin: 0.5rem;
}

.list li h4 {
  margin: 0;
  color: #42b983;
}

.list li p {
  font-size: 0.8rem;
  margin: 0;
}
</style>
