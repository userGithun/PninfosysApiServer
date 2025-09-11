const jwt = require('jsonwebtoken')
const userModel = require('../model/users');


const checkAuth = async (req, res, next) => {
    const { token } = req.cookies;
    console.log("Auth Token",token)
    // console.log("Cookie token:",token);
    if (!token) {
        return res.status(401).json({
            success: false,
            message: "unauthorised user Please Login !"
        })
    } else {
        const verifyToken = jwt.verify(token, process.env.SECRETKEY)
        // console.log("Verified Token:",verifyToken);
        const userdata = await userModel.findOne({ _id: verifyToken.ID });

        req.udata = userdata;
        next();
    }
}
module.exports = checkAuth