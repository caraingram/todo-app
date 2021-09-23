const express = require("express");
const Database = require("./database");

const app = express();
const port = 3001;

app.use(express.json());
app.use(function (request, response, next) {
  response.header("Access-Control-Allow-Origin", "http://localhost:3000");
  response.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  response.header("Access-Control-Allow-Headers", "Content-Type");
  next();
});

app.get("/api", (request, response) => {
  Database.allLists((err, todos) => {
    response.status(200).json(todos.rows);
  });
});

app.get("/api/:name", (request, response) => {
  Database.items(request.params.name, (err, items) => {
    if (err) {
      response.status(404, "The list is not found").send();
    } else {
      response.status(200).json(items.rows);
    }
  });
});

app.post("/api/:name", (request, response) => {
  console.log("Adding new list", request.params.name);
  Database.addList(request.params.name);
  response.status(201).json();
});

app.post("/api/:name/:item", (request, response) => {
  console.log(
    "Adding item",
    request.params.item,
    "to list",
    request.params.name
  );
  Database.addItem(request.params.name, request.params.item);
  response.status(201).json();
});

app.put("/api/:name/:item", (request, response) => {
  console.log(
    "Updating item",
    request.params.item,
    "as",
    request.body.completed ? "completed" : "incomplete"
  );
  Database.updateItem(
    request.params.item,
    request.body.completed,
    (err, data) => {
      if (err) {
        response.status(404, "The todo item is not found").send();
      } else {
        response.status(204).send(data);
      }
    }
  );
});

app.delete("/api/:name/:item", (request, response) => {
  console.log(
    "Deleting item",
    request.params.item,
    "from list",
    request.params.name
  );
  Database.deleteItem(request.params.item, (err) => {
    if (err) {
      response.status(404).send();
    } else {
      response.status(200).send();
    }
  });
});

app.delete("/api/:name", (request, response) => {
  console.log("Deleting list", request.params.name);
  Database.deleteList(request.params.name, (err) => {
    if (err) {
      response.status(404).send();
    } else {
      response.status(200).send();
    }
  });
});

app.listen(port);
