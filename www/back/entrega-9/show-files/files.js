const fs = require("fs").promises;
const chalk = require("chalk");

//Almacenamos en una constante el fichero o ruta que pasemos por la consola
const terminalOrder = process.argv.slice(2);
const filePath = terminalOrder[0];

//Ejecutamos la función para leer el contenido del fichero
async function readFileContent(command) {
  try {
    //Leemos las propiedades del fichero
    const info = await fs.stat(command);
    //Si el tamaño es menor de 10KB leemos el contenido
    if (info.size < 10000) {
      const content = await fs.readFile(command, "utf-8");
      console.log();
      console.log(chalk.blue.inverse("// El contenido del fichero es:"));
      console.log();
      console.log(chalk.yellow(content));
    } else {
      console.log("El archivo es mayor de 10KB. No es posible leerlo");
    }
  } catch (error) {
    console.error(error.message);
  }
}

readFileContent(filePath);
