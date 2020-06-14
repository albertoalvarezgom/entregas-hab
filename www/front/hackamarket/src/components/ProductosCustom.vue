<template>
  <div>
    <div class="producto" v-for="producto in productos" :key="producto.id">
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
        <button @click="buyEvent">Añadir al carrito</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "ProductosCustom",
  props: {
    productos: Array
  },
  methods: {
    buyEvent() {
      this.$emit("buy");
    }
  }
};
</script>

<style>
.disponible {
  color: #4eb4bf;
}
.agotado {
  color: #d9048e;
}
</style>
