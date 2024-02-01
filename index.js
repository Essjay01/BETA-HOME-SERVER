require('dotenv').config();
const express = require('express');
const app = express()
const mongoose = require('mongoose');
const PORT = process.env.PORT ||3000;
const cors = require('cors');
const fileUpload = require('express-fileupload')
const cloudinary = require('cloudinary').v2
const profileRouter = require("./route/profileRouter");
const inspectionRouter = require('./route/inspectionRouter')
const propertyRouter = require("./route/propertyRouter")


//clodinary config
cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.CLOUD_API_KEY,
    api_secret: process.env.CLOUD_API_SECRET
})



//middleware
app.use(fileUpload({useTempFiles: true}));
app.use(express.json());
app.use(cors());

app.get ("/", (req, res)=>{
    res.status(200).send("BET HOME SERVER")
})
app.use("/api/v1", profileRouter)
app.use("/api/v1", inspectionRouter)
app.use("/api/v1/property", propertyRouter)


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