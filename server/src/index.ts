import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import bodyParser from "body-parser";
import { Connection } from "./database/db";
import Router from "./routes/route";

dotenv.config();

const app = express();

// Allowed origins - add your frontend URL(s) here
const allowedOrigins = [
  "https://crm-platform-main.vercel.app",
  "http://localhost:3000", // for local dev if you want
];

app.use(cors({
  origin: function (origin, callback) {
    // allow requests with no origin like mobile apps or curl requests
    if (!origin) return callback(null, true);
    if (allowedOrigins.indexOf(origin) === -1) {
      const msg = `The CORS policy for this site does not allow access from the specified Origin: ${origin}`;
      return callback(new Error(msg), false);
    }
    return callback(null, true);
  },
  credentials: true,
}));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use("/", Router);

app.get("/", (req, res) => {
  res.send("🚀 CRM Platform Server is running!");
});

Connection();

const port = process.env.PORT || 8000;

app.listen(port, () => console.log(`server is listening on port ${port}.`));
