require("dotenv").config();

const bcrypt = require("bcrypt");
const faker = require("faker/locale/es");
const { random } = require("lodash");

const { getConnection } = require("./db");
const { formatDateToDB } = require("./helpers");

const args = process.argv;

const addData = args[2] === "--data";

async function main() {
  const connection = await getConnection();

  //Borramos las tablas si existían
  await connection.query("DROP TABLE IF EXISTS diary");
  await connection.query("DROP TABLE IF EXISTS diary_votes");
  await connection.query("DROP TABLE IF EXISTS users");

  console.log("Creando tablas");
  //Creamos la tabla de usuarios
  await connection.query(`  
  CREATE TABLE users (
      id INTEGER PRIMARY KEY AUTO_INCREMENT,
      registrationDate DATETIME NOT NULL,
      email VARCHAR(100) UNIQUE NOT NULL,
      password VARCHAR(255) NOT NULL,
      role ENUM("normal", "admin") DEFAULT "normal" NOT NULL,
      active BOOLEAN DEFAULT true NOT NULL,
      realName VARCHAR(100),
      image TEXT(255)
    )
  `);

  //Creamos la tabla de entradas
  await connection.query(`
  CREATE TABLE diary (
      id INTEGER PRIMARY KEY AUTO_INCREMENT,
      user_id INTEGER NOT NULL,
      place TEXT,
      date DATETIME,
      description TEXT,
      image TEXT
  )
  `);

  // Creamos la tabla de votos
  await connection.query(`
  CREATE TABLE diary_votes (
      id INTEGER PRIMARY KEY AUTO_INCREMENT,
      entry_id INTEGER NOT NULL,
      user_id INTEGER NOT NULL,
      vote INTEGER NOT NULL,
      date DATETIME NOT NULL,
      ip TEXT NOT NULL
  )
  `);

  //Añadimos en primer lugar un usuario administrador
  console.log("Añadiendo usuario administrador");
  const password = await bcrypt.hash(process.env.DEFAULT_ADMIN_PASSWORD, 10);

  await connection.query(`
  INSERT INTO users (registrationDate, email, password, role)
  VALUES ("${formatDateToDB(
    faker.date.recent()
  )}", "berto@gmail.com", "${password}", "admin")
  `);

  //Si nos llega el comando --data por consola, añadimos info a las tablas
  if (addData) {
    console.log("Añadiendo información aleatoria a las tablas");

    //Añadimos usuarios
    const users = 20;

    for (let i = 0; i < users; i++) {
      let userPassword = await bcrypt.hash(faker.internet.password(), 10);
      await connection.query(`
      INSERT INTO users (registrationDate, email, password, realName, image, role, active)
      VALUES("${formatDateToDB(
        faker.date.recent()
      )}", "${faker.internet.email()}", "${userPassword}","${faker.name.findName()}","${faker.image.avatar()}", "normal", true)
      `);
    }

    //Añadimos entradas
    const entries = 20;

    for (let i = 0; i < entries; i++) {
      await connection.query(`
      INSERT INTO diary (user_id, date, description, place)
      VALUES("${random(2, users + 1)}","${formatDateToDB(
        faker.date.recent()
      )}", "${faker.lorem.sentence()}", "${faker.address.city()}")
      `);
    }

    //Añadimos votos
    const votes = 100;

    for (let i = 0; i < votes; i++) {
      await connection.query(`
        INSERT INTO diary_votes (user_id,entry_id, vote, date, ip)
        VALUES ("${random(2, users + 1)}","${random(1, entries)}", "${random(
        1,
        5
      )}", "${formatDateToDB(faker.date.recent())}", "${faker.internet.ip()}")
      `);
    }
  }

  console.log("Estructura de BBDD creada");

  connection.release();

  process.exit();
}

main();
