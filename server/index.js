require('dotenv').config(); 
const express = require('express')
const Router = require('./src/routers/user')
const cors = require('cors')
const mongoose = require('mongoose')
const app = express()
app.use(cors())
app.use(express.json()) 
app.use(Router)
const mongouri=process.env.MONGODB_URI  
mongoose.connect(mongouri);
app.listen(8080, () => {
    console.log("Server is up on port 8080")
})