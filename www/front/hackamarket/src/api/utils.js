// AUTENTICACIÓN

// IMPORTS - Importamos módulos
import axios from "axios";
import jwt from "jwt-decode";

// CONST -  API y Token
const ENDPOINT = "http://localhost:3050";
const AUTH_TOKEN_KEY = "authToken";
let ROLE = "role";
let USER = "user";

// FUNCION PARA LOGIN
export function loginUser(email, password) {
  return new Promise(async (resolve, reject) => {
    try {
      //Mandamos la info de usuario con axios a la ruta de autenticación
      let res = await axios({
        url: `${ENDPOINT}/auth`,
        method: "POST",
        data: {
          email: email,
          password: password,
          grant_type: "password",
        },
      });
      //Guardamos el token de usuario
      setAuthToken(res.data.token);
      //Guardamos si el usuario es admin
      setIsAdmin(res.data.isAdmin);
      //Guardamos el nombre de usuario
      setUserName(res.data.email);
      resolve();
    } catch (error) {
      console.error("Error en login -> ", error);
      reject(error);
    }
  });
}

// FUNCIÓN PARA GUARDAR TOKEN EN LOCALSTORAGE
export function setAuthToken(token) {
  //Creamos el token
  axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  //Lo enviamos a localStorage
  localStorage.setItem(AUTH_TOKEN_KEY, token);
}

// FUNCIÓN PARA LOGOUT
export function clearLogin() {
  //Declaramos el header de token vacío...
  axios.defaults.headers.common["Authorization"] = "";
  //...y borramos el token del localStorage
  localStorage.removeItem(AUTH_TOKEN_KEY);
  //Con esta función borramos el rol de usuario del localStorage
  clearAdmin();
}

// FUNCIÓN PARA COGER EL TOKEN
export function getAuthToken() {
  return localStorage.getItem(AUTH_TOKEN_KEY);
}

// FUNCIÓN PARA CONSEGUIR LA FECHA DE EXPIRACIÓN DEL TOKEN
export function getTokenExpirationDate(encodedToken) {
  let token = jwt(encodedToken);
  //Si no hay token, mandamos null
  if (!token.exp) {
    return null;
  } else {
    //Si hay token, sacamos la fecha en segundos
    let date = new Date(0);
    date.setUTCSeconds(token.exp);
    //Mandamos la fecha
    return date;
  }
}

// FUNCIÓN PARA COMPROBAR SI EL TOKEN ES VIGENTE O EXPIRÓ
export function isTokenExpired(token) {
  //Cogemos la fecha del token con la función anterior
  let expirationDate = getTokenExpirationDate(token);
  //Y la mandamos si es menor a la actual
  return expirationDate < new Date();
}

// FUNCIÓN PARA COMPROBAR SI EL USUARIO ESTÁ LOGUEADO
export function isLoggedIn() {
  //Cogemos el token del usuario
  let authToken = getAuthToken();
  //Enviamos en caso de que haya token y no esté expirado
  return !!authToken && !isTokenExpired(authToken);
}

//// FUNCIONES PARA COMPROBAR DATOS DE USUARIO

// FUNCIÓN PARA GUARDAR EN LOCALSTORAGE SI EL USUARIO ES ADMIN
export function setIsAdmin(isAdmin) {
  localStorage.setItem(ROLE, isAdmin);
}

// FUNCIÓN PARA BORRAR EL ROL DEL USUARIO DEL LOCALSTORAGE
export function clearAdmin() {
  return localStorage.removeItem(ROLE);
}

// FUNCIÓN PARA RECUPERAR EL ROL DEL USUARIO DESDE EL LOCALSTORAGE
export function getIsAdmin() {
  return localStorage.getItem(ROLE);
}

// FUNCIÓN PARA GUARDAR EN LOCALSTORAGE EL NOMBRE DEL USUARIO
export function setUserName(email) {
  const user = email.split("@");
  localStorage.setItem(USER, user[0]);
}

// FUNCIÓN PARA RECUPERAR EL NOMBRE DE USUARIO DESDE EL LOCALSTORAGE
export function getUserName() {
  return localStorage.getItem(USER);
}

// FUNCIÓN PARA COMPROBAR EL ROL DEL USUSARIO
export function checkAdmin() {
  let role = false;
  //Comprobamos si es admin
  let isAdmin = getIsAdmin();
  //Si lo es mandamos true....
  if (isAdmin === "true") {
    role = true;
  } else {
    //si no, mandamos false
    role = false;
  }
  // console.log(role);
  return role;
}
