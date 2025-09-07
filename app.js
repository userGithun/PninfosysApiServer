const express = require('express')
const app = express()
const web = require('./route/web')
const connectdb = require('./db/connectdb')
const fileupload = require('express-fileupload')
const cookieparser = require('cookie-parser')
const cors = require('cors')
const env = require('dotenv')
env.config()

const allowedOrigins = [
    "http://localhost:3000",
    "https://pninfosys-frontend-evmb.vercel.app",
    "https://pninfosys-frontend-evmb-gmip90db0.vercel.app" // preview builds ke liye
]

app.use(cors({
    origin: function (origin, callback) {
        if (!origin || allowedOrigins.includes(origin)) {
            callback(null, true)
        } else {
            callback(new Error("Not allowed by CORS"))
        }
    },
    credentials: true
}))
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