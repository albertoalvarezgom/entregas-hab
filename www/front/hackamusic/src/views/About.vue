<template>
  <div>
    <div class="about">
      <vue-headful
        title="About"
        description="Página de info del autor de la web"
      />
      <menucustom></menucustom>
      <figure>
        <img src="../assets/eu.jpg" alt="Imagen de Berto" />
      </figure>
      <p>
        Como sigo sin redes sociales, pego un enlace a un conciero de
        <a href="https://www.youtube.com/watch?v=esIoysoTqmY" target="_blank"
          >Bon Iver</a
        >
      </p>
      <p>
        Este proyecto ha sido realizado con:
      </p>
      <ul>
        <li>
          la api de
          <a href="https://www.last.fm/api/" target="_blank">Lastfm</a>
        </li>
        <li>
          la librería
          <a href="https://github.com/axios/axios" target="_blank">AXIOS</a>
        </li>
        <li>
          el módulo
          <a href="https://sweetalert2.github.io/" target="_blank"
            >sweetalert2</a
          >
        </li>
        <li>
          el módulo
          <a href="https://www.npmjs.com/package/vue-headful" target="_blank"
            >vue-headful</a
          >
        </li>
      </ul>
    </div>
    <footercustom></footercustom>
  </div>
</template>

<script>
import menucustom from "@/components/MenuCustom.vue";
import footercustom from "@/components/FooterCustom.vue";

export default {
  name: "About",
  components: { menucustom, footercustom },
};
</script>

<style scope>
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
  color: black;
  text-decoration-line: underline;
  margin-bottom: 2rem;
}
a:hover {
  color: white;
}
</style>
