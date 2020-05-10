//////////  REQUIRES

require("dotenv").config();

const express = require("express");
const bodyParser = require("body-parser");
const morgan = require("morgan");
const fileUpload = require("express-fileupload");
const cors = require("cors");

const app = express();
const port = process.env.PORT;

const {
  listEntries,
  newEntry,
  deleteEntry,
  getEntry,
  editEntry,
  voteEntry,
  getEntryVotes,
} = require("./controllers/diary");

const {
  newUser,
  loginUser,
  getUser,
  editUser,
} = require("./controllers/users.js");

const { userAuthenticated, userIsAdmin } = require("./middlewares/auth");

//////////  MIDDLEWARES

app.use(morgan("dev"));
app.use(bodyParser.json());
app.use(fileUpload());
app.use(cors());

//////////  ROUTES - USERS

// method: POST url: /users --> newUser
app.post("/users", newUser);
// method: POST url: /users/login --> loginUser
app.post("/users/login", loginUser);
// method: GET url: /users/:id --> info
app.get("/users/:id", userAuthenticated, getUser);
// method: PUT url /users/:id --> edit user profile
app.put("/users/:id", userAuthenticated, editUser);

//////////  ROUTES - ENTRIES

// method: GET url: /entries --> listEntries
app.get("/entries", listEntries);
// method: GET url: /entries/:id --> getEntry
app.get("/entries/:id", getEntry);
// method: GET url: /entries/:id/votes --> getEntryVotes
app.get("/entries/:id/votes", getEntryVotes);
// method: POST url: /entries --> userAuthenticaded --> newEntry
app.post("/entries", userAuthenticated, newEntry);
// method: POST url: /entries/:id/votes --> userAuthenticaded --> voteEntry
app.post("/entries/:id/votes", userAuthenticated, voteEntry);
// method: PUT url: /entries/:id --> userAuthenticaded --> userIsAdmin --> editEntry
app.put("/entries/:id", userAuthenticated, userIsAdmin, editEntry);
// method: DELETE url: /entries/:id --> userAuthenticaded --> userIsAdmin --> deleteEntry
app.delete("/entries/:id", userAuthenticated, userIsAdmin, deleteEntry);

//////////  ERROR MIDDLEWARE
app.use((error, request, response, next) => {
  console.log(error);
  response
    .status(error.httpCode || 500)
    .send({ status: "error", message: error.message });
});

//////////  NOT FOUND MIDDLEWARE
app.use((request, response) => {
  response.status(404).send({ status: "error", message: "Not found" });
});

//////////  PORT

app.listen(port, () => {
  console.log(`Servidor funcionando en http://localhost:${port}`);
});
