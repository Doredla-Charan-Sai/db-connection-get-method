const express = require("express");
const app = express();
const sqlite3 = require("sqlite3");
const path = require("path");
const dbpath = path.join(__dirname, "goodreads.db");
// __dirname will return the current js file location
const { open } = require("sqlite");
// importing the sqlite package taking the open method from that will take the object as argument
let db = null; // db will take the database connection in try block
const initializeDBAndServer = async () => {
  try {
    db = await open({
      // open will return the promise object, await will execute the promise
      filename: dbpath,
      driver: sqlite3.Database,
    });
    app.listen(3000, () => {
      console.log("Server running at http://localhost:3000");
    });
  } catch (e) {
    console.log(`DB Error: ${e.message}`);
    process.exit(1);
  }
};
initializeDBAndServer();
app.get("/books/", async (request, response) => {
  const getBooksQuery = `SELECT * FROM book ORDER BY book_id`;
  // all() is method to get all the rows but it returns the promise object so we used the
  // async and await to resolve the promise, after resolving all() will return the array of rows
  const booksArray = await db.all(getBooksQuery);
  response.send(booksArray);
});
