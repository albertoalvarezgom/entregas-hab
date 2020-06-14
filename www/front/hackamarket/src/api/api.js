// REQUIRES - Módulos
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const mysql = require("mysql");

// JSONWEBTOKEN - Autenticación
const jwt = require("jsonwebtoken");
const config = require("./config");

// APP - Lanzamos la app
const app = express();

// USES - Módulos usados
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.set("llave", config.llave);

// BBDD - Conexión
const connection = mysql.createConnection({
  host: "localhost",
  user: "berto",
  password: "SHIThappens123",
  database: "hackamarket",
});

// BBDD - Lanzamiento
connection.connect((error) => {
  //Si hay un error lo lanzamos
  if (error) {
    throw error;
    //Si no, mandamos mensaje por consola
  } else {
    console.log("¡A tope con la COPE!");
  }
});

// PORT - Api
const PORT = 3050;
app.listen(PORT, () => console.log("Antes todo esto era campo..."));

// LLAMADA DE PRUEBA
app.get("/", (req, res) => {
  res.send("Hola");
});

// GET CLIENTES - Mostramos todos los clientes de la BBDD
app.get("/clientes", (req, res) => {
  //Query de SQL
  const sql = "SELECT * FROM clientes";
  //Lanzamos la query
  connection.query(sql, (error, results) => {
    if (error) {
      throw error;
    } else {
      //Si hay resultados, los mandamos en un json
      if (results.length > 0) {
        res.json(results);
      } else {
        //Si no, mandamos mensaje por la consola
        res.send("No hay clientes en la BBDD :(");
      }
    }
  });
});

// GET PRODUCTOS - Mostramos todos los productos de la BBDD
app.get("/productos", (req, res) => {
  //Query de SQL
  const sql = "SELECT * FROM productos";
  //Lanzamos la query
  connection.query(sql, (error, results) => {
    if (error) {
      throw error;
    } else {
      //Si no, mandamos mensaje por la consola
      if (!results.length) {
        res.send("No hay productos en la BBDD :(");
      }
      //Si hay resultados, los mandamos en un json
      else {
        res.json(results);
      }
    }
  });
});

// DELETE CLIENTE - Borrar un cliente de la BBDD
app.delete("/clientes/delete/:id", (req, res) => {
  //Cogemos el id del cliente de params
  const { id } = req.params;
  //Query de SQL
  const sql = `DELETE FROM clientes WHERE id=${id}`;

  //Lanzamos la query
  connection.query(sql, (error) => {
    if (error) {
      throw error;
    } else {
      res.send("Cliente eliminado :/");
    }
  });
});

// POST CLIENTE - Añadimos un cliente a la BBDD
app.post("/add-client", (req, res) => {
  //Query de SQL
  const sql = "INSERT INTO clientes SET ?";
  //Almacenamos los datos que nos llegan del body
  //y queremos meter en la BBDD
  const newClient = {
    nombre: req.body.nombre,
    apellido: req.body.apellido,
    ciudad: req.body.ciudad,
    empresa: req.body.empresa,
  };

  //Lanzamos la query
  connection.query(sql, newClient, (error) => {
    if (error) {
      throw error;
    } else {
      res.send("Cliente añadido a la BBDD :)");
    }
  });
});

// POST USUARIO - Añadimos un usuario a la BBDD
app.post("/register", (req, res) => {
  //Query de SQL
  const sql = "INSERT INTO usuarios SET ?";
  //Almacenamos los datos que nos llegan del body
  //y queremos meter en la BBDD
  const newUser = {
    email: req.body.email,
    password: req.body.password,
  };

  //Lanzamos la query
  connection.query(sql, newUser, (error) => {
    if (error) {
      throw error;
    } else {
      res.send("Usuario añadido a la BBDD :)");
    }
  });
});

// PUT CLIENTE - Añadimos un usuario a la BBDD
app.put("/clientes/update/:id", (req, res) => {
  //Cogemos el id del cliente de params...
  const { id } = req.params;
  //Y el resto de datos del body de la request
  const { nombre, apellido, ciudad, empresa } = req.body;
  //Query de SQL
  const sql = `UPDATE clientes SET nombre="${nombre}", apellido="${apellido}",
  ciudad="${ciudad}", empresa="${empresa}" WHERE id=${id}`;

  //Lanzamos la query
  connection.query(sql, (error) => {
    if (error) {
      throw error;
    } else {
      res.send("Usuario actualizado en la BBDD :)");
    }
  });
});

// POST LOGIN - Hacemos login con un usuario registrado
app.post("/auth", (req, res) => {
  //Cogemos los datos del body
  const { email, password } = req.body;
  //Query de SQL
  const sql = `SELECT * FROM usuarios WHERE email='${email}' AND password='${password}'`;

  //Lanzamos la query
  connection.query(sql, (error, results) => {
    let admin = null;
    //Comprobamos si hay un error y lo lanzamos
    if (error) {
      throw error;
    }
    //Si hay resultados tras la query, ponemos a true el check del payload
    if (results.length > 0) {
      const payload = {
        check: true,
      };
      //Si el usuario resultado es admin, ponemos este campo a true
      if (results[0].admin === 1) {
        admin = true;
      } else {
        admin = false;
      }
      //Montamos el token con la llave y el payload y le damos caducidad
      const token = jwt.sign(payload, app.get("llave"), {
        expiresIn: "5 days",
      });
      //Respondemos con token y admin
      res.json({
        mensaje: "Autenticación correct",
        token: token,
        isAdmin: admin,
        email: email,
      });
    } else {
      console.log("Datos incorrectos");
    }
  });
});
