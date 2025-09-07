const cloudinary = require('cloudinary');
const sliderModel = require('../../model/slider');
const env = require('dotenv')
env.config()
// Configuration
cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.API_KEY,
    api_secret: process.env.API_SECRET,
});

class silderController {
    static createSlide = async (req, res) => {
        try {
            console.log(req.body)
            const { title, subtitle } = req.body
            if (!title || !subtitle) {
                return res.status(200).json({
                    success: true,
                    message: 'All Fields are Require!'
                })
            }

            const file = req.files.image
            const imageUpload = await cloudinary.uploader.upload(
                file.tempFilePath,
                {
                    folder: 'PnInfosys_slider'
                }
            )
            // console.log(imageUpload)
            const slider = await sliderModel.create({
                title,
                subtitle,
                image: {
                    public_id: imageUpload.public_id,
                    url: imageUpload.secure_url
                }
            })
            return res.status(201).json({
                success: true,
                message: 'slider created done!',
                data: slider
            })

        } catch (error) {
            console.log(error)
        }
    }
    static silderDisplay = async (req, res) => {
        try {
            const slides = await sliderModel.find()
            return res.status(201).json(slides)
        } catch (error) {
            console.log(error)
        }
    }
    static Sliderview = async (req, res) => {
        try {
            const id = req.params.id
            const slider = await sliderModel.findById(id)
            return res.status(201).json({
                success: true,
                message: 'slider View Success!',
                data: slider
            })
        } catch (error) {
            console.log(error)
        }
    }
    static sliderDelete = async (req, res) => {
        try {
            const id = req.params.id
            const slides = await sliderModel.findByIdAndDelete(id)
            return res.status(201).json(slides)
        } catch (error) {
            console.log(error)
        }
    }
    static sliderUpdate = async (req, res) => {
        try {
            const id = req.params.id
            const { title, subtitle } = req.body
            let data;
            if (req.files) {
                const user = await sliderModel.findById(id)
                const OldImage = user.image.public_id

                await cloudinary.uploader.destroy(OldImage)

                //new image
                const imagefile = req.files.image
                const imageupdate = await cloudinary.uploader.upload(
                    imagefile.tempFilePath,
                    {
                        folder: "PnInfosys_Slider"
                    }
                )
                data = {
                    title: title,
                    subtitle: subtitle,
                    image: {
                        public_id: imageupdate.public_id,
                        url: imageupdate.secure_url
                    }
                }
            }
            else {
                data = {
                    title: title,
                    subtitle: subtitle
                }
            }
            await sliderModel.findByIdAndUpdate(id, data)
            return res.status(201).json({
                success: true,
                message: 'slider Updated success'
            })
        } catch (error) {
            console.log(error)
        }
    }

}
module.exports = silderController