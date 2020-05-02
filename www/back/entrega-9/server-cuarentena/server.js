require("dotenv").config();
const http = require("http");
const { formatDistance } = require("date-fns");
const { es } = require("date-fns/locale");

const server = http.createServer();
const port = process.env.PORT;

server.on("request", async function (request, response) {
  const { url, method } = request;

  if (method.toUpperCase() === "GET" && url === "/freedom") {
    const date1 = new Date();
    const date2 = new Date(2020, 5, 30);

    date = formatDistance(date1, date2, { locale: es });

    response.statusCode = 200;
    response.setHeader("Content-type", "application/json");
    response.end(
      JSON.stringify({
        message: `El final de la cuarentena será en ${date}`,
      })
    );
  } else {
    response.statusCode = 404;
    response.setHeader("Content-type", "text/plain");
    response.end("Error 404 NOT FOUND");
  }
});

server.listen(port);
console.log(`Servidor web funcionando en http://localhost:${port}`);
