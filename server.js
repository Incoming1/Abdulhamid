const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
require('dotenv').config()
let userRouter = require('./routes/user')
const usersModel = require('./models/user')
const bodyParser = require('body-parser');

//App setup
const app = express()
const PORT = 3000
const SECRET_KEY = process.env.SECRET_KEY || 'your_secret_key';


//middleware
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(express.json())
app.use('/user', userRouter)
app.use(bodyParser.json())


let URL = "mongodb+srv://Incoming:Incoming@cluster0.9zc07.mongodb.net/Incoming?retryWrites=true&w=majority&appName=Cluster0"


mongoose.connect(URL)
.then(()=>{
    console.log('connected successfully')
})
.catch((error)=>{
    console.log('something is wrong:', error)
})




app.listen((PORT), ()=>{
    console.log('app is running')
})