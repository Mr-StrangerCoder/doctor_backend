const multer = require('multer')
const path = require('path')


const storage = multer.diskStorage({
    destination:function(req,file,cb){
        cb(null,'upload/')
    },
    filename:function(req,file,cb){
        const uniqueSuffix = Date.now()
        cb(null,Date.now()+path.extname(file.originalname))
        console.log("*****file*******",file)

    }
})


const fileFilter = (req,file, cb)=>{
    const allowedTypes = ['image/png', 'image/jpeg', 'image/jpg']

    if(allowedTypes.includes(file.mimetype)){
        cb(null,true)
    }else{
        cb(new Error("not allowed this type of file"), false)
    }
}


const upload = multer({storage,fileFilter})


module.exports = upload