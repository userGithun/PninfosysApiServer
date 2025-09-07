const mongoose = require('mongoose')

const workshopSchema = new mongoose.Schema({
    collegename: { type: String, required: true },
    slug: { type: String, required: true, unique: true },
    name: { type: String, required: true }, // Banner name
    heading: { type: String, required: true }, // Header
    image: [
        {
            public_id: String,
            url: String
        }
    ]
}, { timestamps: true });

const workshopModel = new mongoose.model('Workshop', workshopSchema)
module.exports = workshopModel
