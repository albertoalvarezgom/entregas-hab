<template>
  <div>
    <ul class="list">
      <li v-for="track in tracks" :key="track.id">
        <h3>{{ track.name }}</h3>
        <h4>{{ track.artist.name }}</h4>
        <p>{{ track.listeners }} escuchas</p>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: "TopTracks",
  props: {
    tracks: Array,
  },
};
</script>

<style scoped>
ul {
  list-style: none;
}
</style>
