require('dotenv').config();
const express = require('express');
const app = express()
const mongoose = require('mongoose');
const PORT = process.env.PORT ||3000;
const cors = require('cors');
const profileRouter = require("./route/profileRouter");
const inspectionRouter = require('./route/inspectionRouter')


//middleware
app.use(express.json());
app.use(cors());

app.get ("/", (req, res)=>{
    res.status(200).send("BET HOME SERVER")
})
app.use("/api/v1", profileRouter)
app.use("/api/v1", inspectionRouter)


//error route
app.use((req, res)=>{
    res.status(404).send("resource not found")
});

//db connection
const startServer = async () =>{
    try {
        await mongoose.connect(process.env.MONGO_URL, {dbName: "beta"});
        app.listen(PORT, () =>{
            console.log(`Server running on port: ${PORT}`)
        })
    } catch (error) {
        console.log(error); 
    }
}


startServer()