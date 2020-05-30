<template>
  <div class="home">
    <figure>
      <img src="../assets/logo.png" alt="Logo de Rick and Morty" />
    </figure>

    <form>
      <label for="bySearch">Busca tu personaje</label>
      <p>
        <i>Puedes buscar por nombre, estado o especie</i>
      </p>
      <input
        v-model="search"
        id="search"
        type="search"
        placeholder="Nombre, estado o especie"
        name="bySearch"
      />
    </form>

    <input v-model="id" placeholder="ID" id="id" />
    <button @click="searchChar(id)">Buscar por ID</button>

    <div class="container">
      <!-- CÓDIGO SIN OPTIMIZAR -->
      <!-- <CharCard
        v-for="char in filteredChars"
        :key="char.id"
        :charName="char.name"
        :charId="char.id"
        :charStatus="char.status"
        :charSpecies="char.species"
        :charImage="char.image"
        :charPlanet="char.origin.name"
        :charUrl="char.origin.url"
      ></CharCard>-->

      <!-- CÓDIGO OPTIMIZADO -->
      <p>{{char.name}}</p>
      <CharCard :chars="filteredChars"></CharCard>
    </div>
  </div>
</template>

<script>
// IMPORTANDO COMPONENTE
import CharCard from "@/components/CharCard.vue";

//IMPORTANDO LA CONFIGURACIÓN DE LA API
import api from "@/api/api.js";

export default {
  name: "Home",
  components: {
    CharCard
  },
  data() {
    return {
      chars: [],
      search: "",
      char: [],
      id: null
    };
  },
  methods: {
    searchChar(id) {
      api.getChar(id).then(response => (this.char = response.data));
    }
  },
  computed: {
    filteredChars() {
      if (!this.search) {
        return this.chars;
      }
      return this.chars.filter(
        char =>
          char.name.toLowerCase().includes(this.search.toLowerCase()) ||
          char.status.toLowerCase().includes(this.search.toLowerCase()) ||
          char.species.toLowerCase().includes(this.search.toLowerCase())
      );
    }
  },
  created() {
    api.getAll().then(response => (this.chars = response.data.results));
  }
};
</script>

<style scoped>
.container {
  margin: 0 auto;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
}

form {
  display: flex;
  flex-direction: column;
}

form label {
  font-size: 2rem;
}

form p {
  font-size: 0.8rem;
  margin-top: 0;
}

form input {
  margin: 0.5rem auto;
  width: 30%;
}

#id {
  width: 1rem;
  margin: 0 1rem;
}

button {
  background-color: #28b0c8;
  border: none;
  border-radius: 3px;
  padding: 0.3rem 1rem;
  color: white;
}

@media (max-width: 600px) {
  img {
    margin: 0 auto;
    width: 100%;
  }

  form input {
    margin: 0.5rem auto;
    width: 100%;
  }
}
</style>