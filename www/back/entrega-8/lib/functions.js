const fs = require("fs-extra");
const chalk = require("chalk");
const path = require("path");
//Importamos el módulo os para acceder al directorio personal del usuario
const os = require("os");
//Del módulo date-fns importamos formatDistance para calcular el tiempo entre dos fechas
//y poder mostrar "la tarea se añadió hace x tiempo"
const { formatDistance } = require("date-fns");
//Del módulo date-fns nos vamos a locale para importar los idiomas en los que queremos operar
const { es, gl, en } = require("date-fns/locale");

//Cargamos el archivo .env para poder trabajar con él
require("dotenv").config();

//

//Metemos en en una constante el archivo donde vamos a escribir la lista
//Lo metemos en nuestro directorio personal con os y asignamos el fichero con el .env TASKS_FILE
const todoFile = path.join(os.homedir(), process.env.TASKS_FILE);

//

let dateLocaleConfig;

//Asignamos un lenguaje para las fechas (date-fns) en función del idioma que tengamos en el .env
switch (process.env.LANGUAGE) {
  case "gl":
    dateLocaleConfig = { locale: gl };
    break;
  case "en":
    dateLocaleConfig = { locale: en };
    break;
  default:
    dateLocaleConfig = { locale: es };
}

//Ponemos un título para cada uno de los idiomas que tenemos cargados
const listTitle = {
  en: "Todo list",
  es: "Lista de tareas",
  gl: "Lista de tarefas",
};

//Con esta función cargaremos el archivo con nuestra lista. La primera vez que se ejecute
//creará este archivo.
async function readTodoList() {
  try {
    //Comprobamos que el fichero de nuestra lista existe y si no será creado
    await fs.ensureFile(todoFile);

    //Leemos el archivo de la lista y le pasamos el parámetro de codificación de caracteres para
    //convertirlo de búfer
    const currentTodos = await fs.readFile(todoFile, "utf-8");

    //Si existe nuestro archivo, que nos lo devuelva parseado para poder operar con él
    //Si no, el contenido del mismo será el objeto de lista de tareas vacía
    if (currentTodos) {
      return JSON.parse(currentTodos);
    } else {
      return { tasks: [] };
    }
  } catch (error) {
    console.error(error);
  }
}

//Con esta función añadimos una tarea nueva a nuestra lista
async function addTodo({ text, priority }) {
  //Cargamos nuestro fichero llamando a la función anterior
  const currentTodos = await readTodoList();

  //Nombramos y detallamos el contenido de cada tarea
  const newTask = {
    text,
    added: new Date(),
    priority: priority ? "high" : "normal",
    done: false,
  };

  //Accedemos al array dentro de tasks y añadimos la tarea nueva además de copiar lo que ya teníamos
  //guardado anteriormente
  currentTodos.tasks = [newTask, ...currentTodos.tasks];

  //Ejecutamos la función de guardado con las tareas actualizadas
  await saveTodosToFile(currentTodos);
}

//Esta función nos lista todas nuestras tareas
async function listTodos() {
  //Cargamos nuestro fichero en una const llamando a la primera función
  const currentTodos = await readTodoList();

  console.log();
  //Sacamos por la consola el título de la lista en el idioma indicado en el .env
  console.log(chalk.blue(listTitle[process.env.LANGUAGE]));

  //Recorremos el array de tareas. Con .entries accedemos además al índice de cada elemento del array
  for (const [index, task] of currentTodos.tasks.entries()) {
    //Tanto si la tarea está hecha como si no, nos mostratá un checkbox acorde
    const taskStatus = task.done ? "☑" : "☐";
    //Formateamos la fecha comparando la actual con la de cada tarea para que nos diga
    //"hace x minutos"
    const taskHumanDate = formatDistance(
      new Date(task.added),
      new Date(),
      dateLocaleConfig
    );
    //Si el la tarea está hecha, tachamos el texto con chalk. Si no, lo mostramos tal cual
    const taskText = task.done ? chalk.strikethrough(task.text) : task.text;
    //Armamos la tarea con todas las constantes definidas anteriormente.
    //Al index le añadimos 1 para que no empiece en 0
    const taskDisplay = `${
      index + 1
    } - ${taskStatus} ${taskText}(añadida hace ${taskHumanDate})`;

    //Si la tarea tiene prioridad alta la mostramos en color rojo. Si no, en color azul
    if (task.priority === "high") {
      console.log(chalk.red(taskDisplay));
    } else {
      console.log(chalk.blue(taskDisplay));
    }
  }
  console.log();
}

//Con esta función marcamos una tarea con hecha y guardamos el archivo
async function markAsDone({ index }) {
  //Cargamos nuestro fichero en una const llamando a la primera función
  const currentTodos = await readTodoList();

  //Marcamos la key done como true para la tarea con el índice seleccionado
  //Recordar que al índice le sumáramos 1, así que tenemos que restarlo aquí para que cuadre
  currentTodos.tasks[index - 1].done === true;

  //Ejecutamos la función de guardado con los cambios realizados
  await saveTodosToFile(currentTodos);
}

//Con esta función marcamos una tarea con no hecha y guardamos el archivo
async function markAsUndone({ index }) {
  //Cargamos nuestro fichero en una const llamando a la primera función
  const currentTodos = await readTodoList();

  //Marcamos la key done como false para la tarea con el índice seleccionado
  //Recordar que al índice le sumáramos 1, así que tenemos que restarlo aquí para que cuadre
  currentTodos.tasks[index - 1].done === false;

  //Ejecutamos la función de guardado con los cambios realizados
  await saveTodosToFile(currentTodos);
}

//Con esta función borramos de la lista las tareas hechas
async function cleanTodos() {
  //Cargamos nuestro fichero en una const llamando a la primera función
  const currentTodos = await readTodoList();

  //Filtramos el array quedándonos con las tareas en las que la key done sea false
  currentTodos.tasks = currentTodos.tasks.filter((task) => !task.done);

  //Ejecutamos la función de guardado con los cambios realizados
  await saveTodosToFile(currentTodos);
}

//Con esta función vaciamos la lista por completo
async function dropTodos() {
  //Cargamos nuestro fichero en una const llamando a la primera función
  const currentTodos = await readTodoList();

  //El array de tareas estará vacío
  currentTodos.tasks = [];

  //Ejecutamos la función de guardado con los cambios realizados
  await saveTodosToFile(currentTodos);
}

async function deleteTodo({ index }) {
  //Cargamos nuestro fichero en una const llamando a la primera función
  const currentTodos = await readTodoList();

  //Eliminamos del array el índice seleccionado
  const deleted = currentTodos.tasks.splice(index, 1);

  //Ejecutamos la función de guardado con los cambios realizados
  await saveTodosToFile(currentTodos);
}

//Con esta función guardamos los cambios en el json
async function saveTodosToFile(taskList) {
  //Añadimos otra key en el objeto que sea la fecha últa de modidificación
  taskList.lastModified = new Date();
  //Guardamos pasando parámetros del archivo original, el contenido y le metemos espacios para maquetarlo
  await fs.outputJSON(todoFile, taskList, { spaces: 2 });
}

module.exports = {
  addTodo,
  listTodos,
  markAsDone,
  markAsUndone,
  cleanTodos,
  dropTodos,
  deleteTodo,
  saveTodosToFile,
};
