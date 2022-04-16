import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import database from "./config/database";

import router from "./routes/router";

const { error } = dotenv.config();

if (error) console.log("Falha ao carregar .env");
else console.log(".env carregado com sucesso");

database();

const app = express();
app.use(cors());
app.use(express.json());

app.use("/", router);

module.exports = app;
