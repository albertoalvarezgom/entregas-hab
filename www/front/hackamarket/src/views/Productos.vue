<template>
  <div class="container">
    <vue-headful title="Productos" description="Página de los productos" />
    <headercustom></headercustom>
    <menucustom></menucustom>
    <div class="productos">
      <!-- BÚSQUEDA POR ID DE PRODUCTO -->
      <div class="search">
        <input v-model="id" placeholder="id" id="id" />
        <button @click="searchProduct(id)">Buscar por código</button>
        <button @click="reload()">Borrar búsqueda</button>
      </div>
      <!-- LOADING -->
      <loadingcustom v-if="productos.length===0"></loadingcustom>
      <!-- /LOADING -->
      <!-- RESULTADO BÚSQUEDA -->
      <div v-show="search" class="producto">
        <div>
          <img :src="producto.img" />
        </div>
        <div class="info">
          <h2>{{ producto.nombre }}</h2>
          <p>{{ producto.descripcion }}</p>
          <i>Código de producto: {{ producto.id }}</i>
          <h1>{{ producto.precio }} €</h1>
          <p
            :class="{ disponible: producto.stock > 0, agotado: producto.stock === 0 }"
          >Unidades disponibles: {{ producto.stock }}</p>
          <button @click="buyItem()">Añadir al carrito</button>
        </div>
      </div>
      <!-- /RESULTADO BÚSQUEDA -->
      <!-- /BÚSQUEDA POR ID DE PRODUCTO -->
      <!-- PRODUCTOS -->
      <productoscustom :productos="productos" v-on:buy="buyItem()" v-show="!search"></productoscustom>
    </div>
    <!-- /PRODUCTOS -->
    <footercustom></footercustom>
  </div>
</template>

<script>
import axios from "axios";
import menucustom from "@/components/MenuCustom.vue";
import productoscustom from "@/components/ProductosCustom.vue";
import footercustom from "@/components/FooterCustom.vue";
import loadingcustom from "@/components/LoadingCustom.vue";
import headercustom from "@/components/HeaderCustom.vue";
import Swal from "sweetalert2";

export default {
  name: "Productos",
  components: {
    menucustom,
    productoscustom,
    footercustom,
    loadingcustom,
    headercustom
  },
  data() {
    return {
      productos: [],
      id: null,
      producto: [],
      search: false
    };
  },
  methods: {
    getProducts() {
      let self = this;
      axios
        .get("http://localhost:3050/productos")
        .then(function(response) {
          self.productos = response.data;
        })
        .catch(function(error) {
          console.error(error);
        });
    },
    buyItem() {
      //Lanzamos cuadro de diálogo de éxito :)
      Swal.fire({
        position: "center",
        icon: "success",
        title: "Producto añadido al carrito",
        showConfirmButton: false,
        timer: 1500
      });
    },
    searchProduct(id) {
      this.producto = this.productos[id - 1];
      this.search = true;
      return this.producto;
    },
    reload() {
      this.$router.go();
    }
  },
  created() {
    this.getProducts();
  }
};
</script>

<style>
.productos {
  margin-top: 2rem;
}

.search input {
  border: none;
  border-bottom: 2px solid #203b8c;
  text-align: center;
  margin: 0 1rem;
  width: 20px;
}

button {
  border-radius: 20px;
  border: 2px solid #203b8c;
  font-family: Avenir, Helvetica, Arial, sans-serif;
  padding: 0 1rem;
  margin: 0 0.4rem;
  max-width: 200px;
  background-color: white;
}

button:hover {
  background-color: #203b8c;
  color: white;
}

.producto {
  display: flex;
  justify-content: center;
  margin-top: 3rem;
  text-align: left;
}

.producto img {
  width: 300px;
  margin-right: 2rem;
}

.info {
  display: flex;
  flex-direction: column;
}

i {
  flex-grow: 1;
  font-size: 0.8rem;
}
</style>
