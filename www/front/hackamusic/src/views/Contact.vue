<template>
  <div class="container">
    <div class="contact">
      <vue-headful title="Contacto" description="Página de contacto" />
      <menucustom></menucustom>
      <formcustom v-on:send="send()" v-on:cancel="cancel()"></formcustom>
    </div>
    <footercustom class="footer"></footercustom>
  </div>
</template>

<script>
// @ is an alias to /src
import api from "@/api/index.js";
import Swal from "sweetalert2";
import menucustom from "@/components/MenuCustom.vue";
import formcustom from "@/components/FormCustom.vue";
import footercustom from "@/components/FooterCustom.vue";

export default {
  name: "Contact",
  data() {
    return {};
  },
  components: {
    menucustom,
    formcustom,
    footercustom,
  },
  methods: {
    send() {
      Swal.fire({
        position: "top-end",
        icon: "success",
        title: "Mensaje enviado",
        showConfirmButton: false,
        timer: 1500,
      });
    },
    cancel() {
      Swal.fire({
        position: "top-end",
        icon: "error",
        title: "Mensaje cancelado",
        showConfirmButton: false,
        timer: 1500,
      });
    },
  },
};
</script>

<style scoped>
ul {
  list-style: none;
}

.cointainer {
  position: relative;
  min-height: 100vh;
}

.footer {
  position: absolute;
  bottom: 0;
  width: 100%;
}
</style>
