// Dependencies
// =============================================================
var express = require("express");
var bodyParser = require("body-parser");
var path = require("path");

// Sets up the Express App
// =============================================================
var app = express();
var PORT = 3000;

// Sets up the Express app to handle data parsing
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.text());
app.use(bodyParser.json({ type: "application/vnd.api+json" }));

// Friend Survey Results (DATA)
// =============================================================
var friends = [{
  name:"Ahmed",
  photo:"https://media.licdn.com/mpr/mpr/shrinknp_400_400/p/6/005/064/1bd/3435aa3.jpg",
  scores:[
     5,
     1,
     4,
     4,
     5,
     1,
     2,
     5,
     4,
     1
   ]
}];

// Routes
// =============================================================

// Basic route that sends the user first to the AJAX Page
app.get("/", function(req, res) {
  // res.send("Welcome to the Star Wars Page!")
  res.sendFile(path.join(__dirname, "view.html"));
});

// Search for Specific Friend (or all friends) - provides JSON
app.get("/api/:friends?", function(req, res) {
  var chosen = req.params.friends;

  if (chosen) {
    console.log(chosen);

    for (var i = 0; i < friends.length; i++) {
      if (chosen === friends[i].routeName) {
        res.json(friends[i]);
        return;
      }
    }

    res.json(false);
  }
  else {
    res.json(friends);
  }
});

// Create New friends - takes in JSON input
app.post("/api/new", function(req, res) {
  // req.body hosts is equal to the JSON post sent from the user
  var newfriend = req.body;

  console.log(newfriend);

  // We then add the json the user sent to the friend array
  friends.push(newfriend);

  // We then display the JSON to the users
  res.json(newfriend);
});

// Starts the server to begin listening
// =============================================================
app.listen(PORT, function() {
  console.log("App listening on PORT " + PORT);
});
Add Comment Collapse