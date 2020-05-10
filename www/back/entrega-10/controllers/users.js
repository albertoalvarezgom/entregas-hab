require("dotenv").config();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const { getConnection } = require("../db");
const { userSchema } = require("../validations");

//////////    POST - /users     //////////

async function newUser(request, response, next) {
  let connection;
  try {
    //Validamos el que el contenido del body cumpla con nuestros requisitos de búsqueda
    await userSchema.validateAsync(request.body);

    connection = await getConnection();
    const { email, password } = request.body;

    //Comprobamos si el email introducido ya existe en nuestra BBDD
    const [
      existing,
    ] = await connection.query("SELECT id from users where email=?", [email]);

    if (existing.length) {
      const error = new Error("The email already exists on the DB");
      error.httpCode = 409;
      throw error;
    }

    //Encriptamos la contraseña introducida por el usuario antes de incluírla en la BBDD
    const dbPassword = await bcrypt.hash(password, 10);

    //Insertamos los datos del ususario nuevo en la BBDD
    const [result] = await connection.query(
      `
      INSERT INTO users (registrationDate, email, password, role)
      VALUES(NOW(), ?, ?, "normal")
    `,
      [email, dbPassword]
    );

    //Mandamos respuesta con la info necesaria
    response.send({
      status: "ok",
      data: { id: result.insertId, email: email, role: "normal" },
    });
  } catch (error) {
    next(error);
  } finally {
    if (connection) {
      connection.release();
    }
  }
}

//////////    GET - /users/:id      //////////

async function getUser(request, response, next) {
  let connection;
  try {
    //Cogemos la id del usuario de la ruta
    const { id } = request.params;

    connection = await getConnection();

    //Seleccionamos el ususario de la BBDD con la id que queremos
    const [
      result,
    ] = await connection.query(
      "SELECT id, registrationDate, email, role from users where id=?",
      [id]
    );

    //Si no existe lanzamos error de NOT FOUND
    if (!result.length) {
      const error = new Error(`There is no user with the id ${id}`);
      error.httpCode = 404;
      throw error;
    }

    const [userData] = result;

    //Almacenamos la información pública en una constante
    const payload = {
      registration_date: userData.registration_date,
      realName: userData.realName,
      image: userData.image,
    };

    //Si quien hace la petición de ver usuario es el propio ususario o es administrador,
    //Mostramos información sensible (email y rol)
    if (userData.id === request.auth.id || request.auth.role === "admin") {
      payload.email = userData.email;
      payload.role = userData.role;
    }

    //Lanzamos respuesta
    response.send({
      status: "ok",
      data: payload,
    });
  } catch (error) {
    next(error);
  } finally {
    if (connection) {
      connection.release();
    }
  }
}

//////////    POST - /users/login      //////////

async function loginUser(request, response, next) {
  let connection;
  try {
    //Validamos el que el contenido del body cumpla con nuestros requisitos de ususario
    await userSchema.validateAsync(request.body);

    //Cogemos la info que nos interesa del body de la request
    const { email, password } = request.body;

    connection = await getConnection();

    //Seleccionamos el usuario con el email de nuestra BBDD
    const [
      dbUser,
    ] = await connection.query(
      "SELECT id, email, password, role from users where email=?",
      [email]
    );

    //Si no existe, lanzamos un error
    if (!dbUser.length) {
      const error = new Error("There is no user with that email on the DB");
      error.httpCode = 404;
      throw error;
    }

    const [user] = dbUser;

    //Comprobamos que la constraseña del usuario en la BBDD coincide con la enviada en el body
    const passwordsMatch = await bcrypt.compare(password, user.password);

    //Si no, lanzamos error
    if (!passwordsMatch) {
      const error = new Error("Password incorrect");
      error.httpCode = 401;
      throw error;
    }

    //Construimos el token de identificación del usuario
    const tokenPayload = { id: user.id, role: user.role };
    //Certificamos el token a través de nuestro SECRET del .env y le damos una vida de 30 días
    const token = jwt.sign(tokenPayload, process.env.SECRET, {
      expiresIn: "30d",
    });

    //Lanzamos la respuesta
    response.send({
      status: "ok",
      message: "Login succesful",
      data: { token },
    });
  } catch (error) {
    next(error);
  } finally {
    if (connection) {
      connection.release();
    }
  }
}

//////////    PUT - /users/:id      //////////

async function editUser(request, response, next) {
  let connection;
  try {
    //Validamos los datos de usuario que nos llegan en el body
    await userSchema.validateAsync(request.body);

    //Sacamos el id de usuario de la ruta y el resto de info del body
    const { id } = request.params;
    const { email, realName } = request.body;

    connection = await getConnection();

    //Lanzamos la query para obtener el usuario con el id que nos interesa
    const [
      current,
    ] = connection.query(
      "SELECT id, email, realName, image FROM users WHERE id=?",
      [id]
    );

    //Comprobamos si existe algún usuario con ese id en la BBDD
    if (!current.length) {
      const error = new Error(`El usuario con el id ${id} no existe`);
      error.httpCode = 404;
      throw error;
    }

    //Si el id de usuario que hace la petición no corresponde con el
    //del perfil que se quiere editar lanzamos error
    if (current.id[0] !== request.auth.id && request.auth.role !== "admin") {
      const error = new Error(
        "No tienes permiso para editar este perfil de ususario"
      );
      error.httpCode = 401;
      throw error;
    }

    let savedFileName;

    //Si la petición de upload tiene una imagen, borramos la anterior y guardamos la nueva
    if (request.files && request.files.image) {
      try {
        savedFileName = await processAndSavePhoto(request.files.image);
        if (current && current.image) {
          await deletePhoto(current.image);
        }
      } catch (error) {
        const imageError = new Error();
        imageError.httpCode = 400;
        throw imageError;
      }
    } else {
      //Si no, nos quedamos con la actual
      savedFileName = current.image;
    }

    //Lanzamos la query SQl con el update de la información
    await connection.query(
      "UPDATE users SET email=?, realName=?, image=? where id=?",

      [email, realName, savedFileName, id]
    );

    //Lanzamos respuesta
    response.send({
      status: "ok",
      message: `Perfil de usuario con ${id} actualizado correctamente`,
    });
  } catch (error) {
    next(error);
  } finally {
    if (connection) {
      connection.release();
    }
  }
}

module.exports = {
  newUser,
  loginUser,
  getUser,
  editUser,
};
