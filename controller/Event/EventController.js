const cloudinary = require('cloudinary');
const EventModel = require('../../model/event');
const env = require('dotenv')
env.config()
// Configuration
cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.API_KEY,
    api_secret: process.env.API_SECRET,
});

class EventController {
    static createEvent = async (req, res) => {
        try {
            // console.log(req.body)
            const { title, subtitle } = req.body

            const file = req.files.image
            const imageupload = await cloudinary.uploader.upload(
                file.tempFilePath,
                {
                    folder: "PninfosysEvent"
                }
            );

            const Event = await EventModel.create({
                title,
                subtitle,
                image: {
                    public_id: imageupload.public_id,
                    url: imageupload.url
                }
            })
            return res.status(201).json({
                success: true,
                message: "Detail Inserted Successfull :)",
                data: Event
            })
        } catch (error) {
            console.log(error)
        }
    }
    static eventDisplay = async (req, res) => {
        try {
            const event = await EventModel.find()
            return res.status(200).json(event)
        } catch (error) {
            console.log(error)
        }
    }
    static eventView = async (req, res) => {
        try {
            const id = req.params.id
            const event = await EventModel.findById(id)
            return res.status(200).json({
                success: true,
                message: "detail Viewed successfull !",
                data: event
            })
        } catch (error) {
            console.log(error)
        }
    }
    static eventEdit = async (req, res) => {
        try {
            const id = req.params.id
            const { title, subtitle } = req.body
            let data;
            if (req.files) {
                const event = await EventModel.findById(id)
                const ImageOLD = event.image.public_id

                //destroying old
                await cloudinary.uploader.destroy(ImageOLD)

                //new upload
                const file = req.files.image
                const imageupdate = await cloudinary.uploader.upload(
                    file.tempFilePath,
                    {
                        folder: "PninfosysEvent"
                    }
                );
                data = {
                    title: title,
                    subtitle: subtitle,
                    image: {
                        public_id: imageupdate.public_id,
                        url: imageupdate.url
                    }
                }
            }
            else {
                data = {
                    title: title,
                    subtitle: subtitle
                }
            }
            const eventUpdate = await EventModel.findByIdAndUpdate(id, data)
            return res.status(201).json({
                success: true,
                message: "User Details updated !",
                data: eventUpdate
            })
        } catch (error) {
            console.log(error)
        }
    }
    static eventDelete = async (req, res) => {
        try {
            const id = req.params.id
            const event = await EventModel.findByIdAndDelete(id)
            return res.status(200).json({
                success: true,
                message: "Detail deleted Done!"
            })
        } catch (error) {
            console.log(error)
        }
    }
}
module.exports = EventController