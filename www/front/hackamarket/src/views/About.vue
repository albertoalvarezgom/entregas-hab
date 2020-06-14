<template>
  <div>
    <div class="about">
      <vue-headful title="About" description="Página de info del autor de la web" />
      <headercustom></headercustom>
      <menucustom></menucustom>
      <figure>
        <img src="../assets/eu.jpg" alt="Imagen de Berto" />
      </figure>
      <p>
        Como sigo sin redes sociales, pego un enlace a un conciero de
        <a
          href="https://www.youtube.com/watch?v=e4TFD2PfVPw"
          target="_blank"
        >Parcels</a>
      </p>
      <p>Este proyecto ha sido realizado con:</p>
      <ul>
        <li>una base de datos propia en SQL</li>
        <li>
          la librería
          <a href="https://github.com/axios/axios" target="_blank">AXIOS</a>
        </li>
        <li>
          el módulo
          <a href="https://sweetalert2.github.io/" target="_blank">sweetalert2</a>
        </li>
        <li>
          el módulo
          <a href="https://www.npmjs.com/package/vue-headful" target="_blank">vue-headful</a>
        </li>
        <li>
          el módulo
          <a href="https://www.npmjs.com/package/mysql" target="_blank">mysql</a>
        </li>
        <li>
          el módulo
          <a href="https://www.npmjs.com/package/body-parser" target="_blank">body-parser</a>
        </li>
        <li>
          el módulo
          <a href="https://www.npmjs.com/package/cors" target="_blank">cors</a>
        </li>
        <li>
          el módulo
          <a href="https://www.npmjs.com/package/nodemon" target="_blank">nodemon</a>
        </li>
        <li>
          el módulo
          <a href="https://www.npmjs.com/package/express" target="_blank">express</a>
        </li>
        <li>
          el módulo
          <a href="https://www.npmjs.com/package/jsonwebtoken" target="_blank">jsonwebtoken</a>
        </li>
        <li>
          el módulo
          <a href="https://www.npmjs.com/package/jwt-decode" target="_blank">jwt-decode</a>
        </li>
      </ul>
    </div>
    <footercustom></footercustom>
  </div>
</template>

<script>
import menucustom from "@/components/MenuCustom.vue";
import footercustom from "@/components/FooterCustom.vue";
import headercustom from "@/components/HeaderCustom.vue";
export default {
  name: "About",
  components: {
    menucustom,
    footercustom,
    headercustom
  }
};
</script>

<style scoped>
.about {
  margin-bottom: 3rem;
}

img {
  width: 30%;
}

ul {
  list-style: none;
}

a {
  text-decoration: none;
  color: #203b8c;
  margin-bottom: 2rem;
}
a:hover {
  color: #d9048e;
}
</style>
