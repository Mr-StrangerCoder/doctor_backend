const express = require('express')
const doctorController = require('../controllers/doctorController')
const {auth , admin} = require('../middleware/auth')
const upload = require('../middleware/multer')
const router = express.Router()

router.post("/applyDoctor",auth , doctorController.applyDoctor)  //only docter 

router.get("/appliedDoctors",auth,admin, doctorController.appliedDoctors) //admin 

router.patch('/isDoctor/:doctorID', auth, admin, doctorController.isDoctor) //admin
router.get("/doctors", auth, doctorController.getAllDoctors) //admin user

module.exports = router