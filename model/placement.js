const mongoose = require('mongoose')

const PlacementSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    position: {
        type: String,
        required: true
    },
    company: {
        type: String,
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

const PlacementModel = new mongoose.model('Placement', PlacementSchema)
module.exports = PlacementModel