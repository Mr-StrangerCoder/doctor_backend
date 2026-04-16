const mongoose = require('mongoose');
require('dotenv').config()

async function connectDB (){
await mongoose.connect(process.env.MONGO_URL)
  .then(() => console.log('Database Connected!'))

}

connectDB()


module.exports = {connectDB}