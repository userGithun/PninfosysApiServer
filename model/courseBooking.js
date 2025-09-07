const mongoose = require('mongoose')

const CourseBookingSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    phone: {
        type: String,
        required: true
    },
    gender: {
        type: String,
        required: true
    },
    address: {
        type: String,
        required: true
    },
    college: {
        type: String,
        required: true
    },
    qualification: {
        type: String,
        required: true
    },
    branch: {
        type: String,
        required: true
    },
    semester: {
        type: String,
        required: true
    },
    courseId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Course'
    }
}, { timestamps: true })
const courseBookModel = new mongoose.model("Register Course's", CourseBookingSchema)
module.exports = courseBookModel