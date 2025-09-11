const jwt = require('jsonwebtoken')
const userModel = require('../model/users');

const checkAuth = async (req, res, next) => {
    // 1. Check cookie first
    let token = req.cookies?.token;

    // 2. If not in cookies, check Authorization header
    if (!token && req.headers.authorization) {
        const authHeader = req.headers.authorization; // "Bearer <token>"
        token = authHeader.split(' ')[1];
    }

    if (!token) {
        return res.status(401).json({
            success: false,
            message: "unauthorised user Please Login !"
        })
    }

    try {
        const verifyToken = jwt.verify(token, process.env.SECRETKEY)
        const userdata = await userModel.findOne({ _id: verifyToken.ID }); // ya verifyToken.id if server expects lowercase
        if (!userdata) {
            return res.status(401).json({ success: false, message: "User not found!" });
        }
        req.udata = userdata;
        next();
    } catch (err) {
        return res.status(401).json({ success: false, message: "Token is invalid or expired!" });
    }
}

module.exports = checkAuth;
