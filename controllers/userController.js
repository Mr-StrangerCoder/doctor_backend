const User = require('../models/userModel')
const bcryptjs = require('bcryptjs')
require('dotenv').config()
const jwt = require('jsonwebtoken')
// const Doctor = require('../models/doctorModel')

const BASE_URL = 'http://localhost:5010/upload/'


const register = async (req,res) =>{


      console.log(req.body, req.file)
    const { name, email, password, contactNumber,gender,DOB } = req.body
    const imgPATH =req.file ?  req.file.filename : null
    console.log(imgPATH, "%%%%%%%%%%%%%%%%%%%%%%%%%%%")
    try {
        existsUser = await User.findOne({email:email})
        if(existsUser){
            res.status(400).send({ msg: "email already registered" })
        }
        else{
            const salt = await bcryptjs.genSalt(8)
            const hashPassword = await bcryptjs.hash(password, salt)
            // calculate age with DOB
            const birthDay = new Date(DOB)
            const today = new Date()
            const userAge = today.getFullYear() - birthDay.getFullYear()

            const newUser =await User.create({
                name:name,
                email:email,
                password:hashPassword,
                contactNumber:contactNumber,
                age: userAge,
                img_path:imgPATH,
                gender:gender,
                DOB:DOB
            })
            await newUser.save()
            res.status(200).send({ success: true, msg: "registered successfully" })

        }
    } catch (error) {
        res.status(500).send({ success: false, msg: "Server Error" })
        
    }
} 


const login = async (req,res) =>{
        console.log(req.body)
    const { email, password } = req.body
    try{
                const alreadyUser = await User.findOne( { email: email } )
        console.log(alreadyUser)
        if(!alreadyUser) {
            res.status(400).send({ msg: "User not found" })
        } else {
            checkPassword = await bcryptjs.compare(password, alreadyUser.password)
            console.log(checkPassword)
            if (!checkPassword) {
                res.status(400).send({ msg: "Invalid Password" })
            } else {

                const ID = alreadyUser._id
                const role = alreadyUser.role
                console.log(ID,"******ID")
                const genToken = jwt.sign({ ID: ID,role:role }, process.env.SECREAT_KEY, { expiresIn: "1hr" })
                console.log(genToken,"******")
                res.status(202).send({success:true, msg: "Login successful", token: genToken })
            }

        }
    } catch (error) {
        res.status(500).send({ success: false, msg: "Server Error" })
        
    }
}

const getUserInfo = async(req,res) =>{

    try {
                const ID = req.user.ID
        const loggedUserInfo = await User.findById(ID, {password:0})
        console.log("$$$$$$$$$$$$",loggedUserInfo)

        const loggedUserInfoSTR=loggedUserInfo.toJSON()
        loggedUserInfoSTR.img_path =loggedUserInfo.img_path ? BASE_URL+loggedUserInfo.img_path : null
        console.log("***********",loggedUserInfoSTR)
        res.status(200).send({ user: loggedUserInfoSTR, success: true })
        
    } catch (error) {
        res.status(500).send({ success: false, msg: "Server Error" })
        
    }
}


module.exports = {
    register,
    login,
    getUserInfo,
   
}