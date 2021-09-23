const Pool = require("pg").Pool;
const pool = new Pool({
  user: "smmadden",
  host: "localhost",
  database: "todo-app",
  password: "password",
  port: 5432,
});

class Database {
  static allLists(callback) {
    pool.query('SELECT * FROM "todoLists";', callback);
  }

  static items(name, callback) {
    pool.query('SELECT * FROM "todoItems" WHERE list = $1;', [name], callback);
  }

  static addList(name) {
    pool.query('INSERT INTO "todoLists" (name) VALUES ($1);', [name]);
  }

  static addItem(name, todo) {
    pool.query('INSERT INTO "todoItems" (name, list) VALUES ($1, $2);', [
      todo,
      name,
    ]);
  }

  static updateItem(todo, completed, callback) {
    pool.query(
      'UPDATE "todoItems" SET completed = $1 WHERE name = $2;',
      [completed, todo],
      callback
    );
  }

  static deleteItem(todo, callback) {
    pool.query('DELETE FROM "todoItems" WHERE name = $1;', [todo], callback);
  }

  static deleteList(name, callback) {
    pool.query('DELETE FROM "todoLists" where name = $1;', [name], callback);
  }
}

module.exports = Database;
