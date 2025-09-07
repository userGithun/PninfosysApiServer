const mongoose = require('mongoose')

const TechnologySchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    subtitle: {
        type: String,
        required: true
    },
    cotegory: {
        type: String,
        required: true
    },
    image: {
        public_id: {
            type: String,
            required: true
        },
        url: {
            type: String,
            required: true
        }
    }
}, { timestamps: true })

const TechnologyModel = new mongoose.model('Technology', TechnologySchema)
module.exports = TechnologyModel