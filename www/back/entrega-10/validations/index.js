const joi = require("@hapi/joi");

//Validación de contenido de las entradas
const entrySchema = joi.object().keys({
  place: joi
    .string()
    .max(100)
    .required()
    .error(
      new Error(
        "El campo place es obligatorio y tiene un máximo de 100 caracteres"
      )
    ),
  description: joi
    .string()
    .max(1000)
    .required()
    .error(
      new Error(
        "El campo description es obligatorio y tiene un máximo de 1000 caracteres"
      )
    ),
});

//Validación de valor de votos
const voteSchema = joi.object().keys({
  vote: joi
    .number()
    .min(1)
    .max(5)
    .integer()
    .required()
    .error(
      new Error(
        "Votar es obligatorio y el valor debe ser un número entero entre 1 y 5"
      )
    ),
});

//Validación de valores de búsqueda
const searchSchema = joi
  .string()
  .required()
  .min(2)
  .error(
    new Error("La palabra a buscar debe tener un mínimo de 2 caracteres.")
  );

//Validación de datos obligatorios en el registro de usuario
const userSchema = joi.object().keys({
  email: joi
    .string()
    .email()
    .required()
    .error(new Error("The provided email is not well formed.")),
  password: joi
    .string()
    .min(6)
    .max(100)
    .required()
    .error(new Error("The password must have 6 characters or more.")),
});

module.exports = {
  entrySchema,
  voteSchema,
  searchSchema,
  userSchema,
};
