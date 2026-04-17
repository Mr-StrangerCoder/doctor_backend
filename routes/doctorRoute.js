const express = require('express')
const doctorController = require('../controllers/doctorController')
const {auth , admin} = require('../middleware/auth')
const upload = require('../middleware/multer')
const { model } = require('mongoose')
const router = express.Router()

router.post("/applyDoctor",auth , doctorController.applyDoctor)

router.get("/appliedDoctors",auth,admin, doctorController.appliedDoctors)

router.patch('/isDoctor/:doctorID', auth, admin, doctorController.isDoctor)




module.exports = router