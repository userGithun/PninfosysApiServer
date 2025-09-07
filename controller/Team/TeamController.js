const cloudinary = require('cloudinary');
const TeamModel = require('../../model/team');
const env = require('dotenv')
env.config()
// Configuration
cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.API_KEY,
    api_secret: process.env.API_SECRET,
});

class TeamController {
    static createTeam = async (req, res) => {
        try {
            // console.log(req.body)
            const { name, desigation } = req.body

            const file = req.files.image
            const imageupload = await cloudinary.uploader.upload(
                file.tempFilePath,
                {
                    folder: "Pninfosys"
                }
            );

            const team = await TeamModel.create({
                name,
                desigation,
                image: {
                    public_id: imageupload.public_id,
                    url: imageupload.url
                }
            })
            return res.status(201).json({
                success: true,
                message: "Detail Inserted Successfull :)",
                data: team
            })
        } catch (error) {
            console.log(error)
        }
    }
    static teamDisplay = async (req, res) => {
        try {
            const team = await TeamModel.find()
            return res.status(200).json(team)
        } catch (error) {
            console.log(error)
        }
    }
    static teamView = async (req, res) => {
        try {
            const id = req.params.id
            const team = await TeamModel.findById(id)
            return res.status(200).json({
                success: true,
                message: "detail Viewed successfull !",
                data: team
            })
        } catch (error) {
            console.log(error)
        }
    }
    static teamEdit = async (req, res) => {
        try {
            const id = req.params.id
            const { name, desigation } = req.body
            let data;
            if (req.files) {
                const team = await TeamModel.findById(id)
                const ImageOLD = team.image.public_id

                //destroying old
                await cloudinary.uploader.destroy(ImageOLD)

                //new upload
                const file = req.files.image
                const imageupdate = await cloudinary.uploader.upload(
                    file.tempFilePath,
                    {
                        folder: "PninfosysTeam"
                    }
                );
                data = {
                    name: name,
                    desigation: desigation,
                    image: {
                        public_id: imageupdate.public_id,
                        url: imageupdate.url
                    }
                }
            } else {
                data = {
                    name: name,
                    desigation: desigation
                }
            }
            const teamUpdate = await TeamModel.findByIdAndUpdate(id, data)
            return res.status(201).json({
                success: true,
                message: "User Details updated !",
                data: teamUpdate
            })
        } catch (error) {
            console.log(error)
        }
    }
    static teamDelete = async (req, res) => {
        try {
            const id = req.params.id
            const team = await TeamModel.findByIdAndDelete(id)
            return res.status(200).json({
                success: true,
                message: "Detail deleted Done!"
            })
        } catch (error) {
            console.log(error)
        }
    }
}
module.exports = TeamController