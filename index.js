import "dotenv/config";
import "./database/connectdb.js";
import cookieParser from 'cookie-parser';
import express from 'express';
import cors from "cors";

import authRouter from "./routes/auth.route.js";
import linkRouter from "./routes/link.route.js";
import redirectRouter from "./routes/redirect.route.js";

const app = express(); 
const PORT = process.env.PORT || 3000;

const whiteList =[process.env.ORIGIN1,process.env.ORIGIN2];

app.use(cors({
    origin:function(origin,callback){
        if(!origin  || whiteList.includes(origin)){
            return callback(null,origin);
        }
        return callback("Error de CORS"+origin+" No autorizado");
    }
}));
app.use(express.json());
app.use(cookieParser());
app.use("/",redirectRouter);
app.use("/api/v1/auth",authRouter);
app.use("/api/v1/links",linkRouter);

// app.use(express.static("public"));

app.listen(PORT,()=>console.log("Servidor Iniciado. http://localhost:"+PORT));

