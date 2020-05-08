const express = require("express");
const path = require("path");
const fs = require("fs");

const app = express();
const PORT = process.env.PORT || 3000;

const noteArr =[];

app.listen(PORT, function() {
    console.log("Server listening on: http://localhost:" + PORT);
});

app.use(express.urlencoded({extended: true}));
app.use(express.json());

app.get("*",(req, res) =>{
    res.sendFile(path.join(__dirname,"/public/index.html"));
});

app.get("/notes",(req, res) =>{
    res.sendFile(path.join(__dirname,"/public/notes.html"));
});

app.get("/api/notes", (req, res) => {
    res.json({
        notes: noteArr
    });
});

app.post("/api/notes",(req, res) =>{
    const notes= req.body;
    noteArr.push(notes);
    res.send(JSON.stringify(noteArr));

});

app.delete("/api/notes/:id", (req, res) =>{
    res.send();
    noteArr.length =0;

   
})