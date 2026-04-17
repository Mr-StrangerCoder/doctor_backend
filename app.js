const express = require('express')
require('dotenv').config()
const cors = require('cors')
// const path =require('path')

const dbConn = require('./config/db')
const userRouter = require('./routes/userRoute')
const doctorRouter = require('./routes/doctorRoute')



const port = process.env.PORT  || 5010
const app = express()

app.use(express.json())
app.use(cors())

app.get('/',(req,res)=>{
    res.send("I am Server ")
})

// create route user 
app.use('/user',userRouter)
app.use('/doctor',doctorRouter)



app.listen(port,()=>{
    console.log(`server running on http://localhost:${port}`)
})