import express from "express";
import dotenv from "dotenv";
import cors from "cors";

import notesRoutes from "./routes/notesRoutes.js";
import { connectDB } from "./config/db.js";
import rateLimiter from "./middleware/rateLimiter.js";
//const express = require("express");

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5001;

//connectDB();

//middleware - just before you send the response, you can do something
app.use(express.json()); //helps us to fetch browser's. we use use() function to add middleware
app.use(
    cors({
        origin:"http://localhost:5173",
    })
)
app.use(rateLimiter);

//our simple custom middleware
// app.use((req,resizeBy,next)=>{
//     console.log(`Request method is ${req.method"} & Request URL is ${req.url}`);
//     next();
// })

app.use("/api/notes", notesRoutes);

connectDB().then(() => {
    app.listen(PORT, ()=>{
        console.log("Server started on PORT:", PORT);
    });
})


//mongodb+srv://lavpc0312_db_user:01WaochLCJl6hDUB@cluster0.gyyirfs.mongodb.net/?appName=Cluster0