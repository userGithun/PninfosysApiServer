const cloudinary = require('cloudinary');
const PortfolioModel = require('../../model/portfolio');
const env = require('dotenv')
env.config()
// Configuration
cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.API_KEY,
    api_secret: process.env.API_SECRET,
});

class PorfolioController {
    static createPortfolio = async (req, res) => {
        try {
            // console.log(req.body)
            const { name, subtitle, url } = req.body

            const file = req.files.image
            const imageupload = await cloudinary.uploader.upload(
                file.tempFilePath,
                {
                    folder: "PninfosysPortfolio"
                }
            );

            const portfolio = await PortfolioModel.create({
                name,
                subtitle,
                url,
                image: {
                    public_id: imageupload.public_id,
                    url: imageupload.url
                }
            })
            return res.status(201).json({
                success: true,
                message: "Detail Inserted Successfull :)",
                data: portfolio
            })
        } catch (error) {
            console.log(error)
        }
    }
    static portDisplay = async (req, res) => {
        try {
            const portfolio = await PortfolioModel.find()
            return res.status(200).json(portfolio)
        } catch (error) {
            console.log(error)
        }
    }
    static portView = async (req, res) => {
        try {
            const id = req.params.id
            const portfolio = await PortfolioModel.findById(id)
            return res.status(200).json({
                success: true,
                message: "detail Viewed successfull !",
                data: portfolio
            })
        } catch (error) {
            console.log(error)
        }
    }
    static portEdit = async (req, res) => {
        try {
            const id = req.params.id
            const { name, subtitle, url } = req.body
            let data;
            if (req.files) {
                const portfolio = await PortfolioModel.findById(id)
                const ImageOLD = portfolio.image.public_id

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
                    subtitle: subtitle,
                    url: url,
                    image: {
                        public_id: imageupdate.public_id,
                        url: imageupdate.url
                    }
                }
            }
            else {
                data = {
                    name: name,
                    subtitle: subtitle,
                    url: url
                }
            }
            const portfolioUpdate = await PortfolioModel.findByIdAndUpdate(id, data)
            return res.status(201).json({
                success: true,
                message: "Details updated !",
                data: portfolioUpdate
            })
        } catch (error) {
            console.log(error)
        }
    }
    static portDelete = async (req, res) => {
        try {
            const id = req.params.id
            const portfolio = await PortfolioModel.findByIdAndDelete(id)
            return res.status(200).json({
                success: true,
                message: "Detail deleted Done!"
            })
        } catch (error) {
            console.log(error)
        }
    }
}
module.exports = PorfolioController