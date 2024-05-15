const express = require('express')
const Router = require('./routers/user')
const cors = require('cors')
const mongoose = require('mongoose')
const app = express()
app.use(cors())

app.use(express.json()) 
app.use(Router)
mongoose.connect('mongodb+srv://akshoygorai33:HstZQ9W8Q16zMcTX@cluster0.fph0itf.mongodb.net/')
app.listen(8080, () => {
    console.log("Server is up on port 8080")
})