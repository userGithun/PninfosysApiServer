const express = require('express')
const app = express()
const web = require('./route/web')
const connectdb = require('./db/connectdb')
const fileupload = require('express-fileupload')
const cookieparser = require('cookie-parser')
const cors = require('cors')
const env = require('dotenv')
env.config()

//cors
app.use(cors({
    origin: [process.env.ORIGIN, "http://localhost:3000"],
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true
}));
//cookiee
app.use(cookieparser())

// //Temp image Package
app.use(fileupload({ useTempFiles: true }))

//database connection
connectdb()

//datatype json
app.use(express.json())


app.use('/api', web)
//server start
app.listen(process.env.PORT, () => {
    console.log(`server start localhost:${process.env.PORT}`)
})