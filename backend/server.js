const express = require("express");
const app = express();
const mongoose = require("mongoose");
const cors = require("cors");
const Breakfast = require("./models/breakfast.js");

// app.get("/", (req, res) => {
//   res.send("Hello World");
// });

app.use(cors())

app.use(express.json())

app.post("/breakfast", (req, res) => {
  Breakfast.create(req.body, (err, createdBreakfast) => {
    res.json(createdBreakfast);
  });
});

app.get("/breakfast", (req, res) => {
  Breakfast.find({}, (err, foundBreakfast) => {
    res.json(foundBreakfast);
  });
});

app.delete("/breakfast/:id", (req, res) => {
  Breakfast.findByIdAndRemove(req.params.id, (err, deletedBreakfast) => {
    res.json(deletedBreakfast);
  });
});

app.put("/breakfast/:id", (req, res) => {
  Breakfast.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true },
    (err, updatedBreakfast) => {
      res.json(updatedBreakfast);
    }
  );
});

app.listen(3000, () => {
  console.log("Listening...");
});

mongoose.connect("mongodb://localhost:27017/breakfast");
mongoose.connection.once("open", () => {
  console.log("Connected to Mongo...");
});
