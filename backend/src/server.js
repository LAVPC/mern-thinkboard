import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import path from "path";
// import { fileURLToPath } from 'url'; // Required for ES Modules path resolution
// import { dirname } from 'path';

import notesRoutes from "./routes/notesRoutes.js";
import { connectDB } from "./config/db.js";
import rateLimiter from "./middleware/rateLimiter.js";
//const express = require("express");

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5001;
const __dirname = path.resolve();

// FIX: Redefine __dirname for ES Module compatibility
// const __filename = fileURLToPath(import.meta.url);
// const __dirname = dirname(__filename);


//connectDB();

//middleware - just before you send the response, you can do something

if (process.env.NODE_ENV !== "production") {
    app.use(
        cors({
            origin: "http://localhost:5173",
        })
    );
}

app.use(express.json()); //helps us to fetch browser's. we use use() function to add middleware

app.use(rateLimiter);

//our simple custom middleware
// app.use((req,resizeBy,next)=>{
//     console.log(`Request method is ${req.method"} & Request URL is ${req.url}`);
//     next();
// })

app.use("/api/notes", notesRoutes);

// if (process.env.NODE_ENV === "production") {
//     app.use(express.static(path.join(__dirname, "../frontend/dist")));

//     app.get("*", (req, res) => {
//         res.sendFile(path.join(__dirname, "../frontend", "dist", "index.html"));
//     });
// }

// server.js (Corrected Production Block)

if (process.env.NODE_ENV === "production") {
    // Correctly points from the root (mern-thinkboard) to the frontend/dist folder.
    app.use(express.static(path.join(__dirname, "frontend", "dist")));

    app.get("*", (req, res) => {
        res.sendFile(path.join(__dirname, "frontend", "dist", "index.html"));
    });
}

connectDB().then(() => {
    app.listen(PORT, () => {
        console.log("Server started on PORT:", PORT);
    });
});
