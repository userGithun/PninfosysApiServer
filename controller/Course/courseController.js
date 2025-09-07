const cloudinary = require('cloudinary')
const courseModel = require('../../model/course')
const env = require('dotenv')
env.config()
// Configuration
cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.API_KEY,
    api_secret: process.env.API_SECRET,
});

class courseController {
    static AddCourse = async (req, res) => {
        try {
            const { title, price, date } = req.body

            const file = req.files.image
            const imageupload = await cloudinary.uploader.upload(
                file.tempFilePath,
                {
                    folder: 'Pninfosys_course'
                }
            )
            const course = await courseModel.create({
                title,
                price,
                date,
                image: {
                    public_id: imageupload.public_id,
                    url: imageupload.secure_url
                }
            })
            return res.status(201).json(course)
        } catch (error) {
            console.log(error)
        }
    }
    static courseDisplay = async (req, res) => {
        try {
            const course = await courseModel.find()
            return res.status(200).json(course)
        } catch (error) {
            console.log(error)
        }
    }
    static courseView = async (req, res) => {
        try {
            const id = req.params.id
            const course = await courseModel.findById(id)
            return res.status(201).json(course)
        } catch (error) {
            console.log(error)
        }
    }
    static courseDelete = async (req, res) => {
        try {
            const id = req.params.id
            const course = await courseModel.findByIdAndDelete(id)
            return res.status(201).json(course)
        } catch (error) {
            console.log(error)
        }
    }
    static courseEdit = async (req, res) => {
        try {
            const id = req.params.id
            const { title, price, date } = req.body
            let data;
            if (req.files) {
                const course = await courseModel.findById(id)
                const OLDImage = course.image.public_id

                //deletingOLD IMG
                await cloudinary.uploader.destroy(OLDImage)

                const file = req.files.image
                const imageUpdate = await cloudinary.uploader.upload(
                    file.tempFilePath,
                    {
                        folder: 'pninfosys_course'
                    }
                );
                data = {
                    title: title,
                    price: price,
                    date: date,
                    image: {
                        public_id: imageUpdate.public_id,
                        url: imageUpdate.secure_url
                    }
                }
            } else {
                data = {
                    title: title,
                    price: price,
                    date: date
                }
            }
            const course = await courseModel.findByIdAndUpdate(id, data)
            return res.status(201).json(course)
        } catch (error) {
            console.log(error)
        }
    }

}
module.exports = courseController