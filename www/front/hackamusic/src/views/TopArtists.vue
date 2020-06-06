<template>
  <div>
    <div class="artists">
      <vue-headful
        title="Top Artists"
        description="Página de los artistas más escuchados"
      />
      <menucustom></menucustom>
      <p>Busca tu artista favorito por su nombre</p>
      <input
        v-model="search"
        id="search"
        type="search"
        placeholder="Artista"
        name="bySearch"
      />
      <loadingcustom v-if="artists.length === 0"></loadingcustom>
      <artists :artists="filteredArtists"></artists>
    </div>
    <footercustom></footercustom>
  </div>
</template>

<script>
import api from "@/api/index.js";
import artists from "@/components/TopArtists.vue";
import menucustom from "@/components/MenuCustom.vue";
import loadingcustom from "@/components/LoadingCustom.vue";
import footercustom from "@/components/FooterCustom.vue";

export default {
  name: "Home",
  data() {
    return {
      artists: [],
      search: "",
      artist: [],
    };
  },
  components: {
    artists,
    menucustom,
    loadingcustom,
    footercustom,
  },
  computed: {
    filteredArtists() {
      if (!this.search) {
        return this.artists.sort((a, b) =>
          a.listeners < b.listeners ? 1 : -1
        );
      } else {
        return this.artists.filter((artist) =>
          artist.name.toLowerCase().includes(this.search.toLowerCase())
        );
      }
    },
  },
  created() {
    api
      .getArtists()
      .then((response) => (this.artists = response.data.topartists.artist));
  },
};
</script>

<style>
ul {
  list-style: none;
}

input {
  border: 0;
  outline: 0;
  background: transparent;
  border-bottom: 2px solid #42b983;
  padding: 0.5rem 1rem;
  margin-bottom: 3rem;
}
</style>
