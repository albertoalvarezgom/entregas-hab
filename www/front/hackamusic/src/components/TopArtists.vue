<template>
  <div>
    <ul class="list">
      <li v-for="artist in artists" :key="artist.id">
        <img :src="artist.image[2]['#text']" />
        <a :href="artist.url">
          <h2>{{ artist.name }}</h2></a
        >
        <p>{{ artist.listeners }} oyentes</p>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: "TopArtists",
  props: {
    artists: Array,
  },
};
</script>

<style scoped>
ul {
  list-style: none;
}
</style>
