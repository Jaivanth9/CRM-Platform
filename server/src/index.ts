import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import bodyParser from "body-parser";
import { Connection } from "./database/db";
import Router from "./routes/route";

dotenv.config();  // <-- call dotenv.config() as a function

const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use("/", Router);
app.get("/", (req, res) => {
  res.send("🚀 CRM Platform Server is running!");
});


Connection();

// Use the port from environment variable or default to 8000
const port = process.env.PORT || 8000;

app.listen(port, () => console.log(`server is listening on port ${port}.`));
