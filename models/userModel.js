const mongoose = require('mongoose')


const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true
    },
    contactNumber: {
        type: String
    },
    age:{
        type:Number
    },
    gender:{
        type:String,
        enum:['Male','Female']
    },
    DOB:{
        type:Date,
    },
    img_path: {
        type: String,
        default: ''
    },
    role: {
      type: String,
      enum: ['user', 'admin','doctor'],
      default: 'user'
    }},{
    timestamps: true // adds createdAt & updatedAt
  }
)


const User = mongoose.model("User", userSchema)

module.exports = User