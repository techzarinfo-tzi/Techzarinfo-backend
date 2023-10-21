const http = require("http");
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const auth = require("./router/auth");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");

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
// const corsOptions ={
//   origin:'*',
//   credentials:true, //access-control-allow-credentials:true
//    optionSuccessStatus:200,
// }
app.set("trust proxy", 1);
app.use(cookieParser());
app.use(cors({ credentials: true, origin: "*" }));
const path = require("path");
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use("/", auth);
app.use(express.static("public"));
app.use("/uploads", express.static("uploads"));
app.listen(3001, () => console.log("bas"));
