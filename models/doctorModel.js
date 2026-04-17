const mongoose = require('mongoose')
const User = require('./userModel')


const doctorSchema = new mongoose.Schema({
    user_id:{
        type:mongoose.Schema.Types.ObjectId,
        ref:User
    },
    Qualification:{
        type:String
    },
    specialization:{
        type:String
    },
    fees:{
        type:Number
    },
    isDoctor:{
        type:Boolean,
        default:false
    },
    rating:{
        type:Number
    },
    reviews:{
        type:Array
    }
},{
    timestamps: true // adds createdAt & updatedAt
  })

const Doctor = mongoose.model("Doctor",doctorSchema)

module.exports = Doctor