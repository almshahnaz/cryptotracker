import dotenv from "dotenv";
import express from "express";
import ejs from "ejs";
import axios from "axios";

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

//Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

//Render page
app.get("/", (req, res) => {
    res.render("index.ejs", { message: "Success" });
});

//Listen on server
app.listen(port, ()  => {
    console.log(`Server started on port: ${port}`);
})