const jwt = require('jsonwebtoken')
require('dotenv').config()



function auth(req, res, next) {
    // console.log(req.headers)
    // console.log("************************")
    // console.log(req.headers.authorization)

    let token = req.headers.authorization
    if (!token) {
        return res.status(400).send({ "msg": "Please Login" })
    }
    try {
        if (token.startsWith("Bearer ")) {
            token = token.split(" ")[1]
            console.log(token, "in auth file********")
            const decoded = jwt.verify(token, process.env.SECRET_KEY)
            console.log(decoded, "In auth file")
            req.user = {
                ID: decoded.ID,        
                role: decoded.role
            }
            // req.user = decoded
            console.log(req.user.ID, "In auth file")
            next()
        } else {
            res.status(400).send({ "msg": "Not authorized" })
        }

    } catch (err) {
        console.log(err, "auth***********************88")
        return res.status(401).send({ msg: "Invalid Token" })
    }


}

function admin(req, res, next) {
    if (req.user.role == "admin") {
        next()
    } else {
        res.status(400).send({ "msg": "Access denied" })
    }
}

function doctor(req, res, next) {
    if (req.user.role == "doctor") {
        next()
    } else {
        res.status(400).send({ "msg": "Access denied" })
    }
}

module.exports = { auth, admin, doctor }