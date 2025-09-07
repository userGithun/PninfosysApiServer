const contactModel = require("../../model/contact")

class contactController {
    static createContact = async (req, res) => {
        try {
            // console.log(req.body)
            const { name, email, phone, message } = req.body
            const contact = await contactModel.create({
                name,
                email,
                phone,
                message
            })
            return res.status(200).json({
                success: true,
                message: "contact Inserted :)",
                data: contact
            })
        } catch (error) {
            console.log(error)
        }
    }
    static contactDisplay = async (req, res) => {
        try {
            const contact = await contactModel.find()
            return res.status(200).json(contact)
        } catch (error) {
            console.log(error)
        }
    }
    static deleteContact = async (req, res) => {
        try {
            const id = req.params.id
            const contact = await contactModel.findByIdAndDelete(id)
            return res.status(201).json({
                success: true,
                message: "Contact Deleted Success !"
            })

        } catch (error) {
            console.log(error)
        }
    }
}
module.exports = contactController