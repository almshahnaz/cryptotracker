import dotenv from "dotenv";
import express, { application } from "express";
import ejs from "ejs";
import axios from "axios";

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;
const API_URL = "https://api.coingecko.com/api/v3/";

//Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

//Render page
app.get("/", async (req, res) => {
    try {
        const result =  await axios.get(API_URL + "coins/markets", {
            headers: {
                apiKey: process.env.API_KEY,
                
            },
            params: {
                vs_currency: "usd",
                order: "market_cap_desc",
                per_page: 20,
                page: 1,
                sparkline: true,

            },
        })
        
        //res.json(result.data);
        res.render("index.ejs", { data: result.data });

    } catch (error) {
        res.status(500).send( error.message );
    }
});

app.get("/coins/:id", async (req, res) => {
    const coinId = req.params.id;
    try {
        const response = await axios.get(API_URL + `coins/${coinId}`, {
            headers: {
                apiKey: process.env.API_KEY,
            },
            params: {
                id: coinId,
            },
        });

        // res.json(response.data);
        res.render("coin.ejs", {
            coin: response.data });

    } catch (error) {
        res.status(500).send( error.message );
    }
});

//Listen on server
app.listen(port, ()  => {
    console.log(`Server started on port: ${port}`);
})