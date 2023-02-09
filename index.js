const http = require("http");
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const auth = require("./router/auth");
const mongoose = require("mongoose");

const app = express();

mongoose.connect(
  "mongodb://0.0.0.0:27017/techzar",
  {
    useUnifiedTopology: true,
    useNewUrlParser: true,
  },
  (err) => {
    if (err) throw err;
    console.log("connected to db success");
  }
);
app.use(cors());
const path = require("path");
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use("/", auth);
app.use(express.static('public')); 
app.use('/uploads', express.static('uploads'))
app.listen(3001, () => console.log("bas"));
