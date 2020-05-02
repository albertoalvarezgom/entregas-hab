//Creamos una plantilla de documento HTML con un título y un contenido que le pasaremos
//en el .js principal
function pageLayout({ title, content }) {
  return `
  <!DOCTYPE html>
  <html lang="en">
  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    
    <title>${title}</title>
    
    <link rel="stylesheet" href="/css/style.css" />
  </head>
  <body>
    <header>
      <h1><a href="/">POKEDEX</a></h1>
    </header>

      ${content}
  
    </body>
  </html>
  `;
}

//Escribimos el HTML del buscador que estará en la home
function frontPage() {
  return `
  <section>
    <form action="/search" method="GET">
      <fieldset>
        <label for="query">Busca tu pokemon</label>
        <input type="search" name="query" id="query" /> 
      </fieldset>
      <button>Buscar</button>
    </form>
  </section>
  `;
}

//Con esta función presentamos los resultados de la búsqueda
function searchResults({ results }) {
  //Hacemos un map del array de resultados para organizar la información del json
  //como nos interese en el HTML
  const htmlResults = results.map((result) => {
    const { english, japanese } = result.name;
    //Pasamos cada índice del array a li en html con el contenido
    //Con la función imagePath formateamos la ruta para coger las fotos correspondientes
    return `<li>   
              <img src="/sprites${imagePath({
                id: result.id,
                suffix: "MS",
              })}" alt="${english} / ${japanese} icon" />
              <a href="/pokemon/${result.id}" id="name">
                ${english} <br> ${japanese}
              </a>
              <p class="type">${result.type.join(" / ")}</p>
            </li>`;
  });

  //Pasamos a texto y metemos el array de li dentro de un ul
  return `
  <section>
   <ul>
    ${htmlResults.join("")}
   </ul>
  </section>
  `;
}

//Con esta función creamos la ficha de cada pokemon
function pokemonCard({ pokemon }) {
  //Sacamos los datos que nos interesan del json y los maquetamos en HTML
  const { id, name, type, base } = pokemon;
  return `
    <article class="pokemon">
      <header>
      <nav>
        <button class="arrow"><a href="/pokemon/${
          pokemon.id - 1
        }">Previous</a></button>
        <div><h2>${name.english} <br> ${
    name.japanese
  }</h2><p class="type">${type.join(" / ")}</p></div>      
        <button class="arrow"><a href="/pokemon/${pokemon.id + 1}">
                Next
              </a></button>
              </nav>
      </header>
      <section id="ficha">
      <section>
        <figure>
          <img src="/images/${imagePath({ id })}" alt="${name.english} / ${
    name.japanese
  }" />
          
        </figure>
      </section>

      <dl>
        <dt>HP</dt>
        <dd>${base.HP}</dd>
        <dt>Attack</dt>
        <dd>${base.Attack}</dd>
        <dt>Defense</dt>
        <dd>${base.Defense}</dd>
        <dt>Sp. Attack</dt>
        <dd>${base["Sp. Attack"]}</dd>
        <dt>Sp. Defense</dt>
        <dd>${base["Sp. Defense"]}</dd>
        <dt>Speed</dt>
        <dd>${base.Speed}</dd>
      </dl>
      </section>
      <button class="external"><a href="https://www.pokemon.com/es/pokedex/${
        name.english
      }" target="_blank">
                Read more about ${name.english}
              </a></button>
    </article>
  `;
}

//Con esta función maquetamos las respuestas de errores
function errorPage({ message }) {
  return `
    <section class="error">
      <p>${message}</p>
      <button><a href="/">Volver a la portada</a></button>
    </section>
  `;
}

function imagePath({ id, suffix = "", extension = "png" }) {
  //Añadimos 0 al principio de cada nombre de imagen para que coincidan con el índice del array
  //de pokemons
  //Contruimos la ruta con el nombre, sufijo para las miniaturas y la extensión
  //El primer valor del padStart es la longitud de la cifra y el segundo el caracter con el que
  //se "rellena" la cifra --> 001, 012, 123
  return `/${`${id}`.padStart(3, 0)}${suffix}.${extension}`;
}

module.exports = {
  pageLayout,
  frontPage,
  errorPage,
  searchResults,
  pokemonCard,
};
