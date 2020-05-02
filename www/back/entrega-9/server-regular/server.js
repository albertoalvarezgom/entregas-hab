require("dotenv").config();
const chalk = require("chalk");
const express = require("express");
const app = express();

const port = process.env.PORT;

app.get("/", function (request, response) {
  //const hour = 12;
  const date = new Date();
  const hour = date.getHours();
  //Si la hora es mayor que 7 y menor que 14, devuelve hola.
  if (hour < 14 && hour > 7) {
    response.status(200).send({ message: "Hola" });
  }
  //Para el resto de casos lanzamos un error que será gestionado por el middleware de error
  else {
    throw new Error();
  }
});

app.use((error, request, response, next) => {
  console.error(error);
  response
    .status(404)
    .send("Error 404. Servidor abierto de 7 a 14h. Vuelva mañana :)");
});

app.listen(port);
console.log(chalk.inverse.yellow(`Funcionando en hhtp://localhost:${port}`));
