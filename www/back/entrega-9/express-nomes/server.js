//http://localhost:3000/names -> devuelve al navegador una respuesta tipo json con la lista completa de nombres
//http://localhost:3000/names?gender=F -> devuelve al navegador sólo los nombres de mujer
//http://localhost:3000/names?gender=M -> devuelve al nav sólo los nombres de hombre
//http://localhost:3000/random -> devuelve un nombre aleatorio de la lista

require("dotenv").config();
const express = require("express");
const app = express();

const names = require("./names.json");

app.get("/names", (request, response) => {
  const gender = request.query.gender;

  if (!gender) {
    response.send(names);
  }
  if (gender === "F") {
    const femenineNames = [];
    for (const name of names) {
      if ((name.gender = "F")) {
        femenineNames.push(name);
      }
    }
    response.send(femenineNames);
  }
  if (gender === "M") {
    const masculineNames = [];
    for (const name of names) {
      if ((name.gender = "M")) {
        masculineNames.push(name);
      }
    }
    response.send(masculineNames);
  }

  throw new Error("Gender is not defined");
});

app.use((error, request, response, next) => {
  response.status(400).send(error.message);
});

app.get("/names/random", (request, response) => {
  const random = Math.round(Math.random() * names.length);

  response.send(names[random]);
});

app.use((request, response) => {
  response.status(404).send("Page not found");
});

app.listen(process.env.PORT);
