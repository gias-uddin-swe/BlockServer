const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
require("dotenv").config();
const MongoClient = require("mongodb").MongoClient;
const ObjectId = require("mongodb").ObjectId;

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.jqsch.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`;

const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
const port = 5000;
const app = express();
app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.send("Hello World!");
});

client.connect((err) => {
  const usersCollection = client
    .db(`${process.env.DB_NAME}`)
    .collection("users");
  app.post("/userInfo", (req, res) => {
    const userInfo = req.body;
    usersCollection.insertOne(userInfo).then((documents) => {
      console.log(documents.insertCount > 0);
    });
    console.log(userInfo);
  });
});

app.listen(process.env.PORT || port);
