<template>
  <div class="container">
    <div class="tracks">
      <vue-headful
        title="Top Tracks"
        description="Página de las canciones más escuchadas"
      />
      <menucustom></menucustom>
      <h3>Dinos tu TOP 3 de canciones</h3>
      <button @click="question()">Participa</button>
      <loadingcustom v-if="tracks.length === 0"></loadingcustom>
      <tracks :tracks="tracks"></tracks>
    </div>
    <footercustom class="footer"></footercustom>
  </div>
</template>

<script>
// @ is an alias to /src
import api from "@/api/index.js";
import Swal from "sweetalert2";
import tracks from "@/components/TopTracks.vue";
import menucustom from "@/components/MenuCustom.vue";
import loadingcustom from "@/components/LoadingCustom.vue";
import footercustom from "@/components/FooterCustom.vue";

export default {
  name: "Home",
  data() {
    return {
      tracks: [],
    };
  },
  components: { tracks, menucustom, loadingcustom, footercustom },
  created() {
    api
      .getTopTracks()
      .then(
        (response) =>
          (this.tracks = response.data.tracks.track.sort((a, b) =>
            a.listeners > b.listeners ? 1 : -1
          ))
      );
  },
  methods: {
    question() {
      Swal.mixin({
        input: "text",
        confirmButtonText: "Siguiente",
        showCancelButton: true,
      })
        .queue([
          {
            title: "Tu canción favorita",
            text: "¿Cuál es la canción que más veces escuchaste?",
          },
          {
            title: "Tu canción favorita",
            text: "¿Qué canción te pones cuando estás de bajona?",
          },
          {
            title: "Tu canción favorita",
            text: "¿Qué canción pinchas cuando una fiesta es un rollo?",
          },
        ])
        .then((result) => {
          if (result.value) {
            Swal.fire({
              title: "¡Gracias por tus respuestas!",
              confirmButtonText: "Aceptar",
            });
          }
        });
    },
  },
};
</script>

<style>
ul {
  list-style: none;
}

.tracks {
  margin: 0 auto;
  text-align: center;
}

button {
  border-radius: 30px;
  border: 2px solid #42b983;
  background-color: rgba(255, 255, 255, 0);
  padding: 0.5rem 1.5rem;
  color: #42b983;
  font-weight: 700;
}

button:hover {
  background-color: #42b983;
  color: white;
}
</style>
