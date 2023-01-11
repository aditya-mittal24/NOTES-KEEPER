import express from "express";
import mongoose from "mongoose";
import cors from "cors";

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());

mongoose.set("strictQuery", true);
mongoose.connect("mongodb://localhost:27017/keeperDB");

const noteSchema = new mongoose.Schema({
  title: String,
  content: String,
});

const userSchema = new mongoose.Schema({
  name: String,
  email: String,
  password: String, 
  notes: noteSchema
})

const Note = mongoose.model("Note", noteSchema);
const User = mongoose.model("User", userSchema);

app.get("/notes", function (req, res) {
  Note.find({}, function (err, notes) {
    if (!err) {
      res.send(notes);
    }
  });
});

app.post("/notes", function (req, res) {
  const note = new Note(req.body);
  note.save((err) => {
    if (err) {
      console.log(err);
    } else {
      res.send("Successful");
    }
  });
});

app.post("/user", function (req, res) {
  console.log(req.body);
  res.send("Successful");
});

app.post("/delete", function (req, res) {
  const id = req.body.id;
  Note.deleteOne({ _id: id }, function (err) {
    if (err) {
      console.log(err);
    } else {
      res.send("Successful");
    }
  });
});

app.listen(3001, function () {
  console.log("Server started on port 3001");
});
