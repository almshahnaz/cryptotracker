import dotenv from "dotenv";
import express from "express";
import ejs from "ejs";
import axios from "axios";

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

app.listen(port, ()  => {
    console.log(`Server started on port: ${port}`);
})