const User = require('../models/userModel')
const bcryptjs = require('bcryptjs')
require('dotenv').config()
const jwt = require('jsonwebtoken')
const Doctor = require('../models/doctorModel')

const BASE_URL = `http://localhost:5002/upload/`;


const register = async (req,res) =>{


      console.log(req.body, req.file)
    const { name, email, password, contactNumber,gender,DOB } = req.body
    const imgPATH =req.file ?  req.file.filename : null
    console.log(imgPATH, "%%%%%%%%%%%%%%%%%%%%%%%%%%%")
    try {
     const existsUser = await User.findOne({email:email})
        if(existsUser){
          return  res.status(400).send({ msg: "email already registered" })
        }
        else{
            const salt = await bcryptjs.genSalt(8)
            const hashPassword = await bcryptjs.hash(password, salt)
            // calculate age with DOB
            const birthDay = new Date(DOB)
            const today = new Date()
            const userAge = today.getFullYear() - birthDay.getFullYear()

            await User.create({
                name:name,
                email:email,
                password:hashPassword,
                contactNumber:contactNumber,
                age: userAge,
                img_path:imgPATH,
                gender:gender,
                DOB:DOB
            })
            // await newUser.save()
            res.status(200).send({ success: true, msg: "registered successfully" })

        }
    } catch (error) {
        console.log(error, "rrrrrrrrrrrrrrrrrrrrrrrrrrr")
        res.status(500).send({ success: false, msg: "Server Error" })
        
    }
} 


const login = async (req, res) => {
  console.log(req.body)
  const { email, password } = req.body
  try {
    const alreadyUser = await User.findOne({ email: email })
    if (!alreadyUser) {
      return res.status(400).send({ msg: "User not found" })
    }
 
    const checkPassword = await bcryptjs.compare(password, alreadyUser.password)
    if (!checkPassword) {
      return res.status(400).send({ msg: "Invalid Password" })
    }
 
    const ID = alreadyUser._id
    const role = alreadyUser.role
    const genToken = jwt.sign({ ID: ID, role: role }, process.env.SECRET_KEY, { expiresIn: "1h" })
 
    // FIX: return user info along with token so frontend can use it
    res.status(202).send({
      success: true,
      msg: "Login successful",
      token: genToken,
      user: {
        _id: alreadyUser._id,
        name: alreadyUser.name,
        email: alreadyUser.email,
        role: alreadyUser.role,
        img_path: alreadyUser.img_path || null,
      }
    })
 
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

const getAllUsers = async (req,res)=>{
    try{

        const users = await User.find({},{name:1,email:1,contactNumber:1,role:1,DOB:1,img_path:1})
        // console.log(users)
                const updatedUsers = users.map(user => {
            const userObj = user.toObject();

            userObj.img_path = userObj.img_path
                ? BASE_URL + userObj.img_path
                : null;

            return userObj;
        });
        res.status(200).send({success: true, users:updatedUsers})
    }catch (error) {
        res.status(500).send({ success: false, msg: "Server Error" })
        
    }
}


const getAllDoctors = async(req,res)=>{
    try {

        const doctors = await Doctor.find({isDoctor:true})
            .populate({
                path: "user_id",
                select: "name contactNumber role img_path email DOB"
            });

        const updatedDoctors = doctors.map(doc => {
            const docObj = doc.toObject();

            // Handle user data
            if (docObj.user_id) {
                docObj.user_id.img_path = docObj.user_id.img_path
                    ? BASE_URL + docObj.user_id.img_path
                    : null;
            }

            return docObj;
        });
             res.status(200).json({ success: true, doctors: updatedDoctors });

        
    } catch (error) {
        res.status(500).send({ success: false, msg: "Server Error" })
        
    }
}
const updateUser = async (req, res) => {
    const user_Id = req.params.user_Id

    try {
    
        if (req.user.ID !== user_Id) {
            return res.status(403).send({ msg: "Not authorized to update this user" })
        }

        if (req.body.password) {
            const salt = await bcryptjs.genSalt(8)
            req.body.password = await bcryptjs.hash(req.body.password, salt)
        }

        if (req.body.DOB) {
            const birthDay = new Date(req.body.DOB)
            const today = new Date()
            req.body.age = today.getFullYear() - birthDay.getFullYear()
        }

        if (req.file) {
            req.body.img_path = req.file.filename
        }

        const updatedUser = await User.findByIdAndUpdate(
            user_Id,
            req.body,
            { new: true, runValidators: true }
        ).select('-password') 

        if (!updatedUser) {
            return res.status(404).send({ msg: "User not found" })
        }

        
        const userObj = updatedUser.toObject()
        userObj.img_path = userObj.img_path ? BASE_URL + userObj.img_path : null

        res.status(200).send({ 
            success: true, 
            msg: "User updated successfully", 
            user: userObj 
        })

    } catch (error) {
        console.log(error)
        res.status(500).send({ success: false, msg: "Server Error" })
    }
}


module.exports = {
    register,
    login,
    getUserInfo,
    getAllUsers,
    getAllDoctors,
    updateUser 
   
}