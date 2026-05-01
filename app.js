require('dotenv').config()
const express = require('express')
const cors = require('cors')
const path = require('path')

const dbConn = require('./config/db')
const userRouter = require('./routes/userRoute')
const doctorRouter = require('./routes/doctorRoute')

const port = process.env.PORT || 5010
const app = express()


app.use(cors({
  origin: ["http://localhost:5173"],
  methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
  credentials: true,
  allowedHeaders: ["Content-Type", "Authorization"]
}))

app.use(express.json())

app.get('/', (req, res) => {
  res.send("I am Server")
})

app.use('/user', userRouter)
app.use('/doctor', doctorRouter)
app.use('/appointment', require('./routes/appointmentRoute')) 

app.use('/upload', express.static(path.join(__dirname, 'upload')))

app.listen(port, () => {
  console.log(`server running on http://localhost:${port}`)
})