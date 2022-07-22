// require express for setting up the express server
const express = require("express");
const path = require("path");

// set up the port number
const PORT = process.env.PORT || 8000;

// importing the MongoDB DataBase
const db = require("./config/mongoose");

// importng the Schema For tasks
const Task = require("./models/task");

// using express
const app = express();

// used for parsing
app.use(express.urlencoded());

// tell express to used this static html file
app.use(express.static("assets"));

// set up the view engine
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

// rendering the App Page
app.get("/", function (req, res) {
  Task.find({}, function (err, tasks) {
    if (err) {
      console.log("error in fetching contact from db");
      return;
    }
    return res.render("home", {
      title: "ToDoList",
      task_list: tasks,
    });
  });
});

// creating Tasks
app.post("/add-task", function (req, res) {
  // console.log(req.body.date.toString().split(GMT));
  Task.create(
    {
      description: req.body.description,
      category: req.body.category,
      date: req.body.date,
    },
    function (err, newTask) {
      if (err) {
        console.log("error in creating contact");
        return;
      }
      console.log("*******", newTask);
      return res.redirect("back");
    }
  );
});

// deleting selected task
app.get("/delete-task", function (req, res) {
  // get the id from query
  var id = req.query;
  // checking the number of tasks selected to delete
  var count = Object.keys(id).length;
  for (let i = 0; i < count; i++) {
    // finding and deleting tasks from the DB one by one using id
    Task.findByIdAndDelete(Object.keys(id)[i], function (err) {
      if (err) {
        console.log("error in deleting task");
      }
    });
  }
  return res.redirect("back");
});
// make the app to listen on asigned port number
app.listen(PORT, function (err) {
  if (err) {
    console.log("Error in running the server", err);
  }
  console.log(`Yup My server connected sucessfully to Port No: ${PORT}`);
});
