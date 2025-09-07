const mongoose = require('mongoose')

const sliderSchema = mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    subtitle: {
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
            require: true
        }
    }
}, { timestamps: true })
const sliderModel = mongoose.model('Slider', sliderSchema)
module.exports = sliderModel