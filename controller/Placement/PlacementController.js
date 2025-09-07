const cloudinary = require('cloudinary');
const PlacementModel = require('../../model/placement');
const env = require('dotenv')
env.config()
// Configuration
cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.API_KEY,
    api_secret: process.env.API_SECRET,
});

class PlacementController {
    static createPlacement = async (req, res) => {
        try {
            // console.log(req.body)
            const { name, position, company } = req.body

            const file = req.files.image
            const imageupload = await cloudinary.uploader.upload(
                file.tempFilePath,
                {
                    folder: "PninfosysPlacement"
                }
            );

            const place = await PlacementModel.create({
                name,
                position,
                company,
                image: {
                    public_id: imageupload.public_id,
                    url: imageupload.secure_url
                }
            })
            return res.status(201).json({
                success: true,
                message: "Detail Inserted Successfull :)",
                data: place
            })
        } catch (error) {
            console.log(error)
        }
    }
    static placeDisplay = async (req, res) => {
        try {
            const place = await PlacementModel.find()
            return res.status(200).json(place)
        } catch (error) {
            console.log(error)
        }
    }
    static placeView = async (req, res) => {
        try {
            const id = req.params.id
            const place = await PlacementModel.findById(id)
            return res.status(200).json({
                success: true,
                message: "detail Viewed successfull !",
                data: place
            })
        } catch (error) {
            console.log(error)
        }
    }
    static placeEdit = async (req, res) => {
        try {
            const id = req.params.id
            const { name, position, company } = req.body
            let data;
            if (req.files) {
                const place = await PlacementModel.findById(id)
                const ImageOLD = place.image.public_id

                //destroying old
                await cloudinary.uploader.destroy(ImageOLD)

                //new upload
                const file = req.files.image
                const imageupdate = await cloudinary.uploader.upload(
                    file.tempFilePath,
                    {
                        folder: "PninfosysPlacement"
                    }
                );
                data = {
                    name: name,
                    position: position,
                    company: company,
                    image: {
                        public_id: imageupdate.public_id,
                        url: imageupdate.url
                    }
                }
            }
            else {
                data = {
                    name: name,
                    position: position,
                    company: company
                }
            }
            const placeUpdate = await PlacementModel.findByIdAndUpdate(id, data)
            return res.status(201).json({
                success: true,
                message: "User Details updated !",
                data: placeUpdate
            })
        } catch (error) {
            console.log(error)
        }
    }
    static placeDelete = async (req, res) => {
        try {
            const id = req.params.id
            const place = await PlacementModel.findByIdAndDelete(id)
            return res.status(200).json({
                success: true,
                message: "Detail deleted Done!"
            })
        } catch (error) {
            console.log(error)
        }
    }
}
module.exports = PlacementController