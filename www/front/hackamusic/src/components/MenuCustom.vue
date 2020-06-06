<template>
  <div>
    <div id="nav">
      <router-link :to="{ name: 'Home' }"><h1>Lastfm</h1></router-link>
      <router-link :to="{ name: 'TopTracks' }">Canciones</router-link>
      <router-link :to="{ name: 'TopArtists' }" class="grow"
        >Artistas</router-link
      >
      <router-link :to="{ name: 'About' }">About</router-link>
      <router-link :to="{ name: 'Contact' }">Contacto</router-link>
    </div>
  </div>
</template>

<script>
export default {
  name: "MenuCustom",
};
</script>

<style scoped>
#nav {
  padding: 30px;
  display: flex;
}

a:first-child {
  flex-grow: 1;
  text-align: left;
}

#nav a {
  font-weight: bold;
  color: #42b983;
  margin: auto 1rem;
  text-decoration: none;
}

#nav a.router-link-exact-active {
  color: white;
}
</style>
