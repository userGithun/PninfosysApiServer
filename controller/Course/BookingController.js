const courseModel = require("../../model/course")
const courseBookModel = require("../../model/courseBooking")
const sendCourseMail = require('../../utils/sendMail')

class CourseBookController {
    static CourseBookingInsert = async (req, res) => {
        try {
            const { name, email, phone, gender, address, college, qualification, branch, semester, courseId } = req.body
            const course = await courseBookModel.create({
                name,
                email,
                phone,
                address,
                gender,
                college,
                qualification,
                branch,
                semester,
                courseId
            })
            const courseid = await courseModel.findById(courseId)
            // console.log('insert 1st id=', courseid)
            const courseName = courseid?.title || "Selected course";
            await sendCourseMail(email, name, courseName)
            return res.status(201).json(course)

        } catch (error) {
            console.log(error)
        }
    }
    static CourseBookDisplay = async (req, res) => {
        try {
            const course = await courseBookModel.find().populate('courseId')
            return res.status(200).json(course)
        } catch (error) {
            console.log(error)
            return res.status(400).json(error)
        }
    }
    static CourseBookDelete = async (req, res) => {
        try {
            const id = req.params.id
            await courseBookModel.findByIdAndDelete(id)
            return res.status(201).json({
                message: 'course delete'
            })
        } catch (error) {
            console.log(error)
        }
    }

}
module.exports = CourseBookController