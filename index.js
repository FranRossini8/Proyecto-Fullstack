//PORT = 8080;

const express = require("express");
const app = express();
const http = require("http").createServer(app);
require(`dotenv`).config();
const PORT = process.env.PORT || 8000;

app.get("/",(req,res) => {
    res.send("Hola mundo!");
})

app.post("/",(req,res) => {
    res.send("Llamada post");
})

http.listen(PORT,()=>{
    console.log(`servidor corriendo ${PORT}`);
})