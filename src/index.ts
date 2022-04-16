import express from "express";
const app = express();

app.get("/", (req, res) => {
  return res.status(200).send({ message: "Hello World" });
});

module.exports = app;
