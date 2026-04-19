const express = require('express')
const {createAppointment,getAllAppointments,getAppointmentsByUser,getAppointmentOfDoctor,

    delAppointment,updateAppointment,statusUpdate
} = require('../controllers/appointmentController')
const {auth,admin,doctor} = require('../middleware/auth')
const User = require('../models/userModel')

const router = express.Router()



router.post('/createAppointment',auth, createAppointment)
router.get('/getAllAppointments',auth,admin, getAllAppointments)  //for admin
router.get('/getAppointmentsByUser',auth, getAppointmentsByUser) //for user
router.get('/getAppointmentOfDoctor',auth,doctor,getAppointmentOfDoctor) //for doctor 
router.delete('/delAppointment/:appID',auth, delAppointment)  //for user
router.put('/updateAppointment/:appID',auth, updateAppointment)  //for user
router.patch('/statusUpdate/:appID',auth,doctor,statusUpdate)   //for doctor


module.exports = router