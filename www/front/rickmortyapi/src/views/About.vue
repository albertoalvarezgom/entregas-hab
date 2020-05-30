<template>
  <div class="about">
    <h1>Sobre mí</h1>
    <figure>
      <img src="../assets/eu.jpg" alt="Logo de Rick and Morty" />
    </figure>
    <p>
      Como no tengo redes sociales, pego un enlace a los mejores momentos de
      <a
        href="https://www.youtube.com/watch?v=DVPEsKCL20Q"
        target="_blank"
      >The Office</a>
    </p>
    <p>
      Este proyecto ha sido realizado con la api de
      <a
        href="https://rickandmortyapi.com/"
        target="_blank"
      >Rick and Morty</a> y la librería
      <a href="https://github.com/axios/axios" target="_blank">AXIOS</a>
    </p>
  </div>
</template>

<style scope>
img {
  width: 30%;
}

a {
  text-decoration: none;
  color: black;
  text-decoration-line: underline;
  margin-bottom: 2rem;
}
a:hover {
  color: #28b0c8;
}
</style>