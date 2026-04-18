const Doctor = require('../models/doctorModel')
const User = require('../models/userModel')

async function  applyDoctor(req,res){

    console.log(req.body)
    const {Qualification,specialization, fees} = req.body
    const user_Id = req.user.ID
try{

    const existsDoctor = await Doctor.findOne({user_id:user_Id})
    if(existsDoctor){
        res.status(400).send({msg:"already exists"})
    }else{
        const newDoctor = await Doctor.create({
            user_id:user_Id,
            Qualification:Qualification,
            specialization:specialization,
            fees:fees,
        })
        newDoctor.save()
        res.status(200).send({msg:"You have appied succesfully"})
    }
        } catch (error) {
        res.status(500).send({ success: false, msg: "Server Error" })
        
    }
}


async function appliedDoctors(req,res){
    try{

        const doctorsList = await Doctor.find()
        res.status(200).send({doctorsList:doctorsList})
                } catch (error) {
        res.status(500).send({ success: false, msg: "Server Error" })
        
    }
}


async function isDoctor(req,res){

    const doc_id = req.params.doctorID
    console.log(doc_id)
    try{
        const doctor = await Doctor.findById(doc_id)
        console.log(doctor,"*************Doctor")
        doctor.isDoctor = true
        await doctor.save()
        const doctorAsUser = await User.findById(doctor.user_id)
        console.log(doctorAsUser,"doctorAsUser")
        if(doctorAsUser.role == 'user'){
            doctorAsUser.role = 'doctor'
            await doctorAsUser.save()
        res.status(200).send({msg:"Appied Doctor successfully"})

        }else{
            res.status(400).send({msg:"Not accepted as doctor"})
        }

                } catch (error) {
        res.status(500).send({ success: false, msg: "Server Error" })
        
    }
}

module.exports = {
    applyDoctor,
    appliedDoctors,
    isDoctor
}