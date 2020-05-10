const express = require("express");
const path = require("path");
const fs = require("fs");


const app = express();



const PORT = process.env.PORT || 3000;

let noteArr =[];

app.listen(PORT, function() {
    console.log("Server listening on: http://localhost:" + PORT);
});

app.use(express.urlencoded({extended: true}));
app.use(express.json());

app.get("/notes",(req, res) =>{
    res.sendFile(path.join(__dirname,"public/notes.html"));
});

app.get("/assets/css/styles.css",(req, res) =>{
    res.sendFile(path.join(__dirname,"public/assets/css/styles.css"));
});

app.get("/assets/js/index.js",(req, res) =>{
    res.sendFile(path.join(__dirname,"public/assets/js/index.js"));
});

app.get("/api/notes", (req, res) => {
//     fs.readFile(path.join(__dirname,"db/db.json"), "utf8",((err, data) =>{
//     console.log(noteArr);
//     res.send(noteArr);
//   }));
  fs.readFile(path.join(__dirname, "db/db.json"), 'utf8', (error, data) => {
    if (error) {
      // oh no!
      // (you should do something here, like res.status(500) maybe.
      res.writeHead(500);
      return res.end('Error loading index.html');
    }
    else {
      noteArr = JSON.parse(data);
    }
  });
});

app.post("/api/notes",(req, res) =>{
    //    fs.writeFile(path.join(__dirname,"db/db.json"), "utf8",((err, data) =>{
    //     noteArr = JSON.parse(data);
    //     console.log(noteArr);
    //     res.send(noteArr);
    //   }));
      fs.writeFile(path.join(__dirname, 'etc'), JSON.stringify(noteArr), (error) => {
        if (error) { 
          // oh no!
        }
        else {
          res.send({});
        }
      });

});

app.delete("/api/notes/:id", (req, res) =>{
    res.send();
    noteArr.length =0;
   
})
app.get("*",(req, res) =>{
    res.sendFile(path.join(__dirname,"public/index.html"));
});