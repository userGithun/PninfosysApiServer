const mongoose = require('mongoose')

const ContactScheme = new mongoose.Schema({
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
    message: {
        type: String,
        required: true
    },
}, { timestamps: true })

const contactModel = new mongoose.model('Contact', ContactScheme)
module.exports = contactModel