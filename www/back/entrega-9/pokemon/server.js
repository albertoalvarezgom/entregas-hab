//Importamos los métodos que vamos a utilizar
require("dotenv").config();
const express = require("express");
const path = require("path");

//Llamamos a las funciones que van a crear nuestro contenido HTML
//del directorio helpers
const {
  pageLayout,
  frontPage,
  errorPage,
  searchResults,
  pokemonCard,
} = require("./helpers/html.js");

//Declaramos el puerto en el que vamos a trabajar y ejecutamos express
const port = process.env.PORT;
const app = express();

//Almacenamos en una constante el array con todos los pokemons
const pokedex = require("./pokedex.json");

//Ejecutamos los contenidos estáticos (css e imágenes) que se encuentran en el directorio static
app.use(express.static(path.resolve(__dirname, "static")));

// --------
// Esta página muestra la portada con su formulario
app.get("/", (request, response) => {
  //Ejecutamos la funcion de helpers que nos crea el HTML de la home
  const pageContent = frontPage();

  //Respondemos a la petición ejecutando la función principal de helpers
  //que crea un template de documento de HTML cuyo contenido será
  //
  response.send(pageLayout({ title: "Portada", content: pageContent }));
});

// --------
// Esta página muestra los resultados de la búsqueda
app.get("/search", (request, response) => {
  //nos quedamos con la query, que será el valor de la petición de búsqueda
  const { query } = request.query;

  //Si la longitud de la búsqueda es menor que dos, lanzamos un error indicándolo
  if (query.length < 2)
    throw new Error("La cadena de búsqueda debe tener más de 1 caracteres");

  //guardamos en una constante aquellos índices del array de pokemon cuyo nombre
  //en inglés coincida con la query, el valor introducid en el buscador por el ususario
  const matchedPokemon = pokedex.filter((pokemon) => {
    return pokemon.name.english.toLowerCase().includes(query.toLowerCase());
  });

  //Si no encontramos ninguna coincidencia, lanzamos un error 404
  if (matchedPokemon.length === 0) {
    const error = new Error("Ningún pokémon encontrado");
    error.code = 404;
    throw error;
  }

  //Declaramos en contenido de la página llamando a una función de helpers pasándole el array
  //de pokemons encontrados tras la búsqueda
  const pageContent = searchResults({ results: matchedPokemon });
  //Enviamos la respuesta llamando a la función de helpers que nos genera el documento HTML
  response.send(
    pageLayout({
      title: `Resultados de la búsqueda: ${query}`,
      content: pageContent,
    })
  );
});

// --------
// Está página muestra la ficha del pokemon
app.get("/pokemon/:id", (request, response) => {
  //Nos quedamos con el id del pokemon de la request
  const id = request.params.id;

  //Buscamos en el array de pokemon por la posición de ese índice concreto
  const [pokemon] = pokedex.filter((pokemon) => pokemon.id === Number(id));

  //Si no encuentra ninguna coincidencia, lanzamos error 404
  if (!pokemon) {
    const error = new Error("Pokémon no encontrado");
    error.code = 404;
    throw error;
  }

  //Para crear el contenido de la página lanzamos la función de helpers correspondiente
  //pasándole el pokemon que queremos mostrar
  const pageContent = pokemonCard({ pokemon });

  //Respondemos creando el documento HTML con el contenido anterior
  //y el nombre del pokemon concreto
  response.send(
    pageLayout({
      title: `${pokemon.name.english} / ${pokemon.name.japanese}`,
      content: pageContent,
    })
  );
});

// --------
// Error middleware, sólo se va a ejecutar si hacemos un throw en las rutas anteriores
app.use((error, request, response, next) => {
  //Llamamos a la función de helpers correspondiente para que el contenido de la página
  //sea el mensaje del error
  const pageContent = errorPage({ message: error.message });

  response
    .status(error.code || 500)
    .send(
      pageLayout({ title: `Error: ${error.message}`, content: pageContent })
    );
});

// --------
// Middleware final. Sólo llega aquí si la url solicitada no encaja en ninguna de las peticiones anteriores
app.use((request, response) => {
  const pageContent = errorPage({ message: "Página no encontrada" });

  response
    .status(404)
    .send(
      pageLayout({ title: "Error: Página no encontrada", content: pageContent })
    );
});

app.listen(3000, () => {
  console.log(`Servidor web funcionando en http://localhost:${port}`);
});
