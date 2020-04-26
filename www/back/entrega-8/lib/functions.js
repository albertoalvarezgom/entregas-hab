const minimist = require("minimist");
const fs = require("fs-extra");
const datefns = require("date-fns");
const chalk = require("chalk");

const date = new Date();

function priorityCheck(priority) {
  if (priority) {
    return "high";
  } else {
    return "normal";
  }
}

let arrayTasks = [];

async function addTask({ text, priority }) {
  try {
    const task = {
      text: `${text}`,
      added: `${date}`,
      priority: priorityCheck(priority),
      done: false,
    };

    arrayTasks.push(task);

    await fs.outputJson("./.tasks.json", {
      tasks: [arrayTasks],
      lastUpdate: `${date}`,
    });
  } catch (error) {
    console.error(error);
  }
}

// function removeTask({ index }) {}

async function showList() {
  const json = require("./.tasks.json");
  const readJson = await fs.readJSON(json);

  console.log(readJson);
}

function markDone({ index }) {
  // json.tasks[index].done === true;
}

function markUndone({ index }) {
  // json.tasks[index].done === false;
}

async function clearList() {
  const json = require("./.tasks.json");
  const cleanArray = [];

  for (let i = 0; i <= json.length; i++) {
    if (json.tasks[i][3] === false) {
      cleanArray.push(jason.tasks[i]);
    }
  }

  await fs.outputJson("./.tasks.json", {
    tasks: [cleanArray],
    lastUpdate: `${date}`,
  });
}

module.exports = {
  addTask,
  // removeTask,
  showList,
  markDone,
  markUndone,
  clearList,
};
