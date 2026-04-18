const mongoose = require('mongoose')
const User = require('./userModel')
const Doctor = require('./doctorModel')



const appointmentSchema = new mongoose.Schema({
    user_id:{
        type:mongoose.Schema.Types.ObjectId,
        ref:User
    },
    doctor_id:{
        type:mongoose.Schema.Types.ObjectId,
        ref:Doctor
    },
    date_time:{
        type:Date
    },
    status:{
        type:String,
        enum:['pending','accept','reject'],
        default:'pending'
    }
})


const Appointment = mongoose.model('Appointment', appointmentSchema)
module.exports = Appointment