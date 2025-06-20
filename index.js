import express from 'express';
import "dotenv/config";
import "./database/connectdb.js";
import authRouter from "./routes/auth.route.js";
import cookieParser from 'cookie-parser';
import linkRouter from "./routes/link.route.js";

const app = express(); 
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(cookieParser());
app.use("/api/v1/auth",authRouter);
app.use("/api/v1/links",linkRouter);

app.use(express.static("public"));

app.listen(PORT,()=>console.log("Servidor Iniciado. http://localhost:"+PORT));

