const express = require('express')
const userController = require('../controllers/userController')
const {auth , admin} = require('../middleware/auth')
const upload = require('../middleware/multer')
const router = express.Router()

router.post('/register',upload.single('myFile'),userController.register)
router.post('/login',userController.login) 
router.get('/getUserInfo',auth, userController.getUserInfo)


router.patch('/updateUser/:user_Id', auth, upload.single('myFile'), userController.updateUser)

router.get('/getAllUsers',auth,admin, userController.getAllUsers)

router.get('/getAllDoctors',auth, userController.getAllDoctors)

module.exports =router