<template>
  <div class="error">
    <vue-headful title="Error" description="Página de error" />
    <menucustom></menucustom>
    <h1 id="code">404</h1>
    <h2>Página no encontrada :(</h2>
  </div>
</template>

<script>
import menucustom from "@/components/MenuCustom.vue";

export default {
  name: "Error",
  components: { menucustom },
};
</script>

<style scope>
#code {
  font-size: 5rem;
  margin-bottom: 0;
  color: #42b983;
}
h2 {
  margin: 0;
}
</style>
