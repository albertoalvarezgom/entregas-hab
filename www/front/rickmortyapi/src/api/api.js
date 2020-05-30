const axios = require("axios").default;

//BASE URL DE LA API
const apiURL = "https://rickandmortyapi.com/api";

//FUNCIÓN PARA COGER TODOS LOS CHARACTERS
function getAll() {
  return axios.get(`${apiURL}/character`);
}

function getChar(id) {
  return axios.get(`${apiURL}/character/` + id);
}

export default {
  getAll,
  getChar,
};
