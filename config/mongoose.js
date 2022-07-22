const express = require("express");

// Require moongoose library

const mongoose = require("mongoose");

// provide the path of the database on mongodb atlas
const DB =
  "mongodb+srv://root:root@cluster0.umxra.mongodb.net/todolistdb?retryWrites=true&w=majority";

// Established the connection to database

mongoose
  .connect(DB)
  .then(() => {
    console.log("Mongo Atlas server connected ");
  })
  .catch((err) => {
    console.log("error", err);
  });

// // require the library
// const mongoose = require("mongoose");
// // connect to the database
// mongoose.connect("mongodb://localhost/to_do_list_db");
// // aquire the connection (to check if it is successful)
// const db = mongoose.connection;

// // error handling
// db.on("error", console.error.bind(console, "error connecting to db"));
// // up and running then print the message
// db.once("open", function () {
//   console.log("successfully connected to the database");
// });

// exporting the database
module.exports = DB;
