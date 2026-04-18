const Appointment = require("../models/appointmentModel")
const Doctor = require("../models/doctorModel")



async function createAppointment(req, res) {
        console.log(req.body)


    try {
        newAppoint = await Appointment.create(req.body)
        newAppoint.save()
        res.status(200).send({msg:"Appointment Created Successfully"})
    } catch (error) {
        res.status(500).send({ success: false, msg: "Server Error" })

    }
}

async function getAllAppointments(req, res) {
    try {
        const apps = await Appointment.find()
        .populate({
                path: "user_id",
                select: "name"
            })
            .populate({
                path: "doctor_id",
                populate: {
                    path: "user_id",
                    select: "name"
                }
            });
               const updatedApps = apps.map(app => {
            const appObj = app.toObject();

            return {
                _id: appObj._id,
                user_name: appObj.user_id?.name || null,
                doctor_name: appObj.doctor_id?.user_id?.name || null,
                date_time: appObj.date_time,
                status: appObj.status
            };
        });
        res.status(200).send({apps:updatedApps})

    } catch (error) {
        res.status(500).send({ success: false, msg: "Server Error" })

    }
}
async function getAppointmentsByUser(req, res) {
    try {
             const apps = await Appointment.find({user_id:req.user.ID})
             .populate({
                path: "user_id",
                select: "name"
            })
            .populate({
                path: "doctor_id",
                populate: {
                    path: "user_id",
                    select: "name"
                }
            });
               const updatedApps = apps.map(app => {
            const appObj = app.toObject();

            return {
                _id: appObj._id,
                user_name: appObj.user_id?.name || null,
                doctor_name: appObj.doctor_id?.user_id?.name || null,
                date_time: appObj.date_time,
                status: appObj.status
            };
        });
        res.status(200).send({apps:updatedApps})


    } catch (error) {
        res.status(500).send({ success: false, msg: "Server Error" })

    }
}
async function getAppointmentOfDoctor(req, res) {
    console.log(req.user.ID)
    try {

            const loggedInDoc = await Doctor.findOne({user_id:req.user.ID},{_id:1})
            console.log("***********",loggedInDoc)
           const apps = await Appointment.find({doctor_id:loggedInDoc})
           .populate({
                path: "user_id",
                select: "name"
            })
            .populate({
                path: "doctor_id",
                populate: {
                    path: "user_id",
                    select: "name"
                }
            });
               const updatedApps = apps.map(app => {
            const appObj = app.toObject();

            return {
                _id: appObj._id,
                user_name: appObj.user_id?.name || null,
                date_time: appObj.date_time,
                status: appObj.status
            };
        });

        res.status(200).send({apps:updatedApps})

    } catch (error) {
        res.status(500).send({ success: false, msg: "Server Error" })
    }}
   
async function delAppointment(req, res) {
    try {
        

    } catch (error) {
        res.status(500).send({ success: false, msg: "Server Error" })

    }
}

async function updateAppointment(req, res) {
    try {

    } catch (error) {
        res.status(500).send({ success: false, msg: "Server Error" })

    }
}
async function statusUpdate(req, res) {
    console.log(req.params.appID)
    console.log((req.body.status))
    const APP_ID =req.params.appID
    const status = req.body.status
    try {
        const updatedApp = await Appointment.findByIdAndUpdate(APP_ID,{status:status})
updatedApp.save()
        res.status(200).send({msg:"Appointment updated successfully"})
    } catch (error) {
        res.status(500).send({ success: false, msg: "Server Error" })

    }
}


module.exports = {
    createAppointment, getAllAppointments, getAppointmentsByUser,getAppointmentOfDoctor,

    delAppointment, updateAppointment, statusUpdate
}