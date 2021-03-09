const express = require("express");
const fs = require("fs");
const bodyParser = require("body-parser");
const app = express();


app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static("public"));

const sqlite3 = require("sqlite3").verbose();
const dbfile = "data.db";
const fileExists = fs.existsSync(dbfile);
const db = new sqlite3.Database(dbfile);


// check if the db file exist
db.serialize(() => {
  if (!fileExists) {
    db.run("CREATE TABLE ToDos (id INTEGER PRIMARY KEY AUTOINCREMENT,\
       title TEXT, description TEXT, status TEXT, date DATE)"
    );
    console.log("ToDo table created");
  }
});

// Main Page
app.get("/", (request, response) => {
  response.sendFile(`${__dirname}/views/index.html`);
});

// Show and Edit a ToDo
app.get("/show/:id", (request, response) => {
  var id = request.params.id;
  response.sendFile(`${__dirname}/views/edit.html`);
});

// Get all ToDos 
app.get("/getToDos", (request, response) => {
  db.all("SELECT * from ToDos", (err, rows) => {
    response.send(JSON.stringify(rows));
  });
});

// Get a ToDo
app.get("/getToDo/:id", (request, response) => {
  db.all("SELECT * from ToDos WHERE ID=?", request.params.id, (err, rows) => {
    response.send(JSON.stringify(rows));
  });
});

// Create new ToDo
app.get("/create", (request, response) => {
  response.sendFile(`${__dirname}/views/create.html`);
});

// Add ToDo
app.post("/addToDo", (request, response) => {

  var title = request.body.title;
  var description = request.body.description;
  var status = request.body.status;
  var date = request.body.date;

  if (!process.env.DISALLOW_WRITE) {
    db.run(`INSERT INTO ToDos (title, description, status, date) VALUES (?, ?, ?, ?)`, title, description, status, date, error => {
      if (error) {
        response.send({ message: "error!" });
      } else {
        response.redirect("/");
      }
    });
  }
});

// Delete ToDo
app.get("/deleteToDo/:id", (request, response) => {
  var id = request.params.id;
    if (!process.env.DISALLOW_WRITE) {
      db.run("DELETE FROM ToDos WHERE ID=?", id, err => {
        if (err) {
            response.send({ message: "error!" });
          } else {
            response.redirect("/");
        }
      });
    }
});

//Update ToDo
app.post("/updateToDo/:id", (request, response) => {
  var id = request.params.id;
  var title = request.body.title;
  var description = request.body.description;
  var status = request.body.status;
  var date = request.body.date;

  if (!process.env.DISALLOW_WRITE) {
    db.run("UPDATE ToDos SET title = ?, description = ?, status = ?, date = ? WHERE ID=?", title, description, status, date, id, err => {
      if (err) {
          response.send({ message: "error!" });
        } else {
          response.redirect("/");
        }
    });
  }
});

// listen for request
var listener = app.listen(process.env.PORT, () => {
  console.log(`Your app is listening on port ${listener.address().port}`);
});
