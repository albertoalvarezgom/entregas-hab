<template>
  <div class="container">
    <!-- CÓDIGO OPTIMIZADO -->
    <div class="card" v-for="char in chars" :key="char.id">
      <img :src="char.image" />
      <p>
        <i>Character id: {{ char.id }}</i>
      </p>
      <h2
        :class="{ dead: char.status === 'Dead' || char.status === 'unknown' }"
      >
        {{ char.name }}
      </h2>
      <p>Origin:</p>
      <a :href="char.origin.url">{{ char.origin.name }}</a>
      <p>
        {{ char.species }} -
        <i>{{ char.status }}</i>
      </p>
    </div>

    <!-- CÓDIGO SIN OPTIMIZAR -->
    <!-- <div class="card">
      <img :src="charImage" />
      <p>
        <i>Character id: {{charId}}</i>
      </p>
      <h2>{{charName}}</h2>
      <p>Origin:</p>
      <a :href="charUrl">{{charPlanet}}</a>
      <p>
        {{charSpecies}} -
        <i>{{charStatus}}</i>
      </p>
    </div>-->
  </div>
</template>

<script>
export default {
  name: "CharCard",
  props: {
    chars: Array,
    //PROPOS PARA CÓDIGO SIN OPTIMIZAR
    // charName: String,
    // charId: Number,
    // charStatus: String,
    // charSpecies: String,
    // charImage: String,
    // charPlanet: String,
    // charUrl: String
  },
};
</script>

<style scoped>
.dead {
  color: #68c1d0;
}

.card {
  margin: 2rem;
  width: 18rem;
  padding-bottom: 1rem;
  border: 1px solid #28b0c8;
  border-radius: 22px;
  display: flex;
  flex-direction: column;
}

.card img {
  width: 100%;
  border-top-left-radius: 21px;
  border-top-right-radius: 21px;
}

.card h2 {
  margin: 0.5rem;
  font-size: 2rem;
  flex-grow: 1;
}

.card p {
  font-size: 0.8rem;
  margin-top: 0.5rem;
  margin-bottom: 0;
}

.card a {
  text-decoration: none;
  color: black;
  text-decoration-line: underline;
  font-size: 0.8rem;
  margin-bottom: 2rem;
}

.card:hover {
  background-color: #28b0c8;
  color: white;
}

@media (max-width: 600px) {
  .card {
    width: 100%;
  }
}
</style>
