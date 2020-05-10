require("dotenv").config();
const jwt = require("jsonwebtoken");

const { getConnection } = require("../db");
const { entrySchema, voteSchema, searchSchema } = require("../validations");
const {
  formatDateToDB,
  processAndSavePhoto,
  deletePhoto,
} = require("../helpers");

//////////    GET - /entries      //////////

async function listEntries(request, response, next) {
  let connection;
  try {
    connection = await getConnection();

    //Sacamos la búsqueda de la query
    const { search } = request.query;

    let result;

    //Si hay búsqueda cogemos de la BBDD las entradas que coincidan
    if (search) {
      //Validamos el valor de búsqueda
      await searchSchema.validateAsync(search);

      result = await connection.query(
        `SELECT diary.*,
        (SELECT ROUND(AVG(vote), 1) FROM diary_votes WHERE entry_id=diary.id) AS voteAverage
        FROM diary
        WHERE diary.place LIKE ? OR diary.description LIKE ?
        ORDER BY diary.date DESC`,
        [`%${search}%`, `%${search}%`]
      );
    }
    //Si no, mostramos todas las entradas
    else {
      result = await connection.query(
        `SELECT diary.*, 
        (SELECT ROUND(AVG(vote), 1) FROM diary_votes WHERE entry_id=diary.id) AS voteAverage
        FROM diary  
        ORDER BY diary.date DESC`
      );
    }

    const [entries] = result;

    //Respondemos a la petición con los datos que obtuvimos
    response.send({
      status: "ok",
      data: entries,
    });
  } catch (error) {
    next(error);
  } finally {
    if (connection) {
      connection.release();
    }
  }
}

//////////    POST - /entries      //////////

async function newEntry(request, response, next) {
  let connection;
  try {
    //Validamos los datos que nos llegan en el body
    await entrySchema.validateAsync(request.body);

    //Cogemos los campos de la request que nos interesan
    const { place, description } = request.body;

    let savedFileName;

    //Si hay una imagen en la request, la pasamos por sharp y la adaptamos
    if (request.files && request.files.image) {
      try {
        savedFileName = await processAndSavePhoto(request.files.image);
      } catch (error) {
        const imageError = new Error("Can not upload the image. Try again");
        imageError.httpCode = 400;
        throw imageError;
      }
    }

    connection = await getConnection();

    const date = formatDateToDB(new Date());

    //Escribimos la query para introducir los datos en la BBDD
    const result = await connection.query(
      "INSERT INTO diary(user_id, date, place, description, image) VALUES(?,?,?,?,?)",
      [request.auth.id, date, place, description, savedFileName]
    );

    //Lanzamos la respuesta
    response.send({
      status: "ok",
      data: {
        user_id: request.auth.id,
        id: result.insertId,
        place,
        description,
        date,
        image: savedFileName,
      },
    });
  } catch (error) {
    next(error);
  } finally {
    if (connection) {
      connection.release();
    }
  }
}

//////////    GET - /entries/:id      //////////

async function getEntry(request, response, next) {
  let connection;

  try {
    //Cogemos la id de params (url)
    const { id } = request.params;

    connection = await getConnection();

    //Hacemos un select en SQL para id de entrada que nos interesa
    const [result] = await connection.query(
      `SELECT d.id, d.date, d.user_id, description, place, image, ROUND(AVG(v.vote), 1) AS vote FROM diary d
      LEFT JOIN diary_votes v
      ON d.id = v.entry_id
      WHERE d.id = ?`,
      [id]
    );

    //Si ese id no existe, lanzamos error de NOT FOUND
    if (!result[0].id) {
      const error = new Error(`La entrada con el id ${id} no existe`);
      error.httpCode = 404;
      throw error;
    }

    //Enviamos la respuesta con el resultado
    response.send({ status: "ok", data: result[0] });
  } catch (error) {
    next(error);
  } finally {
    if (connection) {
      connection.release();
    }
  }
}

//////////    PUT - /entries/:id      //////////

async function editEntry(request, response, next) {
  let connection;
  try {
    //Guardamos la información de la entrada tanto del request como de la ruta (params)
    const { place, description } = request.body;
    const { id } = request.params;

    //Nos aseguramos de que los datos que nos pasa el usuario sean válidos
    await entrySchema.validateAsync(request.body);

    connection = await getConnection();

    //Cargamos la imagen y la user_id de la entry correspondiente
    const [
      current,
    ] = await connection.query("SELECT image, user_id FROM diary WHERE id=?", [
      id,
    ]);

    //Si el array resultante no tiene longitud, es que esa id no existe
    if (!current.length) {
      const error = new Error(`The entry with the id ${id} does not exist`);
      error.httpCode = 404;
      throw error;
    }

    //Hacemos la comprobación de que el usuario tiene que ser el autor o bien tener
    //el rol de administrador para poder editar una entrada
    if (
      current.user_id[0] !== request.auth.id &&
      request.auth.role !== "admin"
    ) {
      const error = new Error("No tienes permiso para editar esta entrada");
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
      "UPDATE diary SET place=?, description=?, image=? where id=?",

      [place, description, savedFileName, id]
    );

    //Enviamos la respuesta con los datos modificados
    response.send({
      status: "ok",
      data: {
        place,
        description,
        image: savedFileName,
        id,
      },
    });
  } catch (error) {
    next(error);
  } finally {
    if (connection) {
      connection.release();
    }
  }
}

//////////    DELETE - /entries/:id      //////////

async function deleteEntry(request, response, next) {
  let connection;
  try {
    //Cogemos el id de la entrada concreta de la ruta (params)
    const { id } = request.params;

    connection = await getConnection();

    //Cogemos la entrada de la BBDD con el id que queremos
    const [
      current,
    ] = await connection.query("SELECT image FROM diary WHERE id=?", [id]);

    //Si esta entrada no existe, lanzamos error 404
    if (!current.length) {
      const error = new Error(`La entrada con el id ${id} no existe`);
      error.httpCode = 404;
      throw error;
    }

    //Comprobamos si el usuario que solicita la acción es el propio autor o bien administrador
    if (
      current.user_id[0] !== request.auth.id &&
      request.auth.role !== "admin"
    ) {
      const error = new Error("No tienes permiso para eliminar esta entrada");
      error.httpCode = 401;
      throw error;
    }

    //Si existe y tiene una foto, ejecutamos la función para eliminar el fichero
    if (current.image) {
      await deletePhoto(current.image);
    }

    //Borramos la entrada con el id correspondiente
    await connection.query("DELETE FROM diary WHERE id=?", [id]);
    await connection.query("DELETE FROM diary_votes WHERE entry_id=?", [id]);

    //Mandamos el mensaje de confirmación de que fue borrada
    response.send({
      status: "ok",
      message: `La entrada con id ${id} ha sido eliminada`,
    });
  } catch (error) {
    next(error);
  } finally {
    if (connection) {
      connection.release();
    }
  }
}

//////////    POST - /entries/:id/votes      //////////

async function voteEntry(request, response, next) {
  let connection;
  try {
    //Cogemos la id de la ruta
    const { id } = request.params;

    //Validamos el body de la request
    await voteSchema.validateAsync(request.body);

    //Cogemos el voto del body
    const { vote } = request.body;

    connection = await getConnection();

    //Lanzamos la query para la entrada con el id que queremos
    const [entry] = await connection.query("SELECT id FROM diary WHERE id=?", [
      id,
    ]);

    //Si no existe lanzamos un error
    if (!entry.length) {
      const error = new Error(`The entry with id ${id} does not exist`);
      error.httpCode = 404;
      throw error;
    }

    //Lanzamos la query para ver si el voto de la entrada y usuario correspondiente existe
    const [
      existingVote,
    ] = await connection.query(
      "SELECT id FROM diary_votes WHERE entry_id=? AND user_id=?",
      [id, request.auth.id]
    );

    //Si ya existe un voto lanzamos un error
    if (existingVote.length) {
      const error = new Error("Ya se votó con tu ip");
      error.httpCode = 403;
      throw error;
    }
    //Si no, introducimos los valores en la BBDD
    else {
      await connection.query(
        `INSERT INTO diary_votes (entry_id, user_id, vote, date, user_id)
        VALUES (?,?,?,?,?)`,
        [id, user_id, vote, formatDateToDB(new Date()), request.auth.id]
      );
    }

    //Mandamos respuesta
    response.send({
      status: "ok",
      message: `Your vote (${vote} points) to entry with id ${id} has been submited succesfully`,
    });
  } catch (error) {
    next(error);
  } finally {
    if (connection) {
      connection.release();
    }
  }
}

//////////    GET - /entries/:id/votes      //////////

async function getEntryVotes(request, response, next) {
  let connection;
  try {
    //Sacamos la id de la ruta
    const { id } = request.params;

    connection = await getConnection();

    //Lanzamos la query para el id que nos interesa
    const [
      votes,
    ] = await connection.query(`SELECT * FROM diary_votes WHERE entry_id=?`, [
      id,
    ]);

    //Enviamos respuesta
    response.send({ status: "ok", data: votes });
  } catch (error) {
    next(error);
  } finally {
    if (connection) {
      connection.release();
    }
  }
}

module.exports = {
  listEntries,
  newEntry,
  deleteEntry,
  getEntry,
  editEntry,
  voteEntry,
  getEntryVotes,
};
