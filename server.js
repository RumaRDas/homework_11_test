const express = require("express");
const path = require("path");
const fs = require("fs");
const uuidv4 = require("uuid/v4");

const app = express();

const PORT = process.env.PORT || 3000;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

let noteArr = [];

//Get  note from db.json
app.get("/api/notes", (req, res) => {
  //Reade file from db.json file
  fs.readFile(path.join(__dirname, "db/db.json"), 'utf8', (error, data) => {
    if (error) {
      throw error;
    }
    else {
      noteArr = JSON.parse(data);
      return res.json(noteArr);
    }
  });
});

//write note to db.json
app.post("/api/notes", (req, res) => {
  fs.readFile(path.join(__dirname, "db/db.json"), 'utf8', (error, data) => {
    if (error) {
      throw error;
    }
    noteArr = JSON.parse(data);
    let newNote = {
      title: req.body.title,
      text: req.body.text,
      id: uuidv4()
    };
    noteArr.push(newNote);
    fs.writeFile(path.join(__dirname, 'db/db.json'), JSON.stringify(noteArr), (error) => {
      if (error) {
        // oh no!
        throw error;
      }
      return res.json(noteArr);
      //res.json(JSON.parse(noteArr));

    });
  });
});

//DELETE NOTE FROM DB.JSON
app.delete("/api/notes/:id", (req, res) => {
  fs.readFile(path.join(__dirname, "db/db.json"), 'utf8', (error, data) => {
    if (error) {
      throw error;
    }
    // console.log(req.params.id);
    noteArr = JSON.parse(data);
    let result = noteArr.filter(note => note.id != req.params.id);
    fs.writeFile(path.join(__dirname, 'db/db.json'), JSON.stringify(result), (error) => {
      if (error) {
        throw error;
      }
      return res.json(result);
    });
  });

})

//getting style sheet 
app.get("/assets/css/styles.css", (req, res) => {
  res.sendFile(path.join(__dirname, "public/assets/css/styles.css"));
});

//getting js file 
app.get("/assets/js/index.js", (req, res) => {
  res.sendFile(path.join(__dirname, "public/assets/js/index.js"));
});

//Getting page of notes.html
app.get("/notes", (req, res) => {
  res.sendFile(path.join(__dirname, "public/notes.html"));
});

//Getting page of index.html
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "public/index.html"));
});

// start server
app.listen(PORT, function () {
  console.log("Server listening on: http://localhost:" + PORT);
});