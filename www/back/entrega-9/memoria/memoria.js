const os = require("os");
const chalk = require("chalk");

const totalMemory = os.totalmem();
const freeMemory = os.freemem();

const percentage = (freeMemory / totalMemory) * 100;

console.log(
  `Porcentaje de memoria libre:`,
  chalk.green(percentage.toFixed(2)),
  `%`
);
