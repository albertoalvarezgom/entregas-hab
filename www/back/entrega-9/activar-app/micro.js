const minimist = require("minimist");
const { formatDistance } = require("date-fns");
const { es } = require("date-fns/locale");
const path = require("path");
const fs = require("fs-extra");
const chalk = require("chalk");

const order = minimist(process.argv.slice(2));

const file = path.join(__dirname, "object.json");

async function callFile() {
  const readObjectFile = await fs.readFile(file, "utf-8");
  if (readObjectFile) {
    return JSON.parse(readObjectFile);
  } else {
    return {};
  }
}

async function operation() {
  const currentObject = await callFile();

  if (!currentObject.active) {
    console.log(chalk.green("Es la primera vez que me ejecutas"));

    currentObject.active = true;

    currentObject.activationdate = new Date();

    await fs.outputJSON("object.json", currentObject);
  } else {
    const humanDate = formatDistance(
      new Date(currentObject.activationdate),
      new Date(),
      {
        locale: es,
      }
    );

    console.log(
      chalk.yellow(`La última vez que me ejecutaste fue hace ${humanDate}`)
    );

    await fs.outputJSON("object.json", currentObject);
  }
}

if (order) {
  operation().then(() => {
    process.exit;
  });
}
