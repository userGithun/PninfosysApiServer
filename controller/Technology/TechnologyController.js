const cloudinary = require('cloudinary');
const TechnologyModel = require('../../model/technology');
const env = require('dotenv')
env.config()
// Configuration
cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.API_KEY,
    api_secret: process.env.API_SECRET,
});

class TechnologyController {
    static createTechnology = async (req, res) => {
        try {
            // console.log(req.body)
            const { title, subtitle, cotegory } = req.body

            const file = req.files.image
            const imageupload = await cloudinary.uploader.upload(
                file.tempFilePath,
                {
                    folder: "Pninfosys"
                }
            );

            const technology = await TechnologyModel.create({
                title,
                subtitle,
                cotegory,
                image: {
                    public_id: imageupload.public_id,
                    url: imageupload.url
                }
            })
            return res.status(201).json(technology)
        } catch (error) {
            console.log(error)
        }
    }
    static technologyDisplay = async (req, res) => {
        try {
            const technology = await TechnologyModel.find()
            return res.status(200).json(technology)
        } catch (error) {
            console.log(error)
        }
    }
    static technologyView = async (req, res) => {
        try {
            const id = req.params.id
            const technology = await TechnologyModel.findById(id)
            return res.status(200).json({
                success: true,
                message: "detail Viewed successfull !",
                data: technology
            })
        } catch (error) {
            console.log(error)
        }
    }
    static technologyEdit = async (req, res) => {
        try {
            const id = req.params.id
            const { title, subtitle, cotegory } = req.body
            let data;
            if (req.files) {
                const Technology = await TechnologyModel.findById(id)
                const ImageOLD = Technology.image.public_id

                //destroying old
                await cloudinary.uploader.destroy(ImageOLD)

                //new upload
                const file = req.files.image
                const imageupdate = await cloudinary.uploader.upload(
                    file.tempFilePath,
                    {
                        folder: "Pninfosys"
                    }
                );
                data = {
                    title: title,
                    subtitle: subtitle,
                    cotegory: cotegory,
                    image: {
                        public_id: imageupdate.public_id,
                        url: imageupdate.url
                    }
                }
            }
            else {
                data = {
                    title: title,
                    subtitle: subtitle,
                    cotegory: cotegory
                }
            }
            const technologyUpdate = await TechnologyModel.findByIdAndUpdate(id, data)
            return res.status(201).json({
                success: true,
                message: "User Details updated !",
                data: technologyUpdate
            })

        } catch (error) {
            console.log(error)
        }
    }
    static technologyDelete = async (req, res) => {
        try {
            const id = req.params.id
            const technology = await TechnologyModel.findByIdAndDelete(id)
            return res.status(200).json({
                success: true,
                message: "Detail deleted Done!"
            })
        } catch (error) {
            console.log(error)
        }
    }
}
module.exports = TechnologyController