const mongoose = require('mongoose')

const PorfolioSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    subtitle: {
        type: String
    },
    url: {
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

const PortfolioModel = new mongoose.model('Portfolio', PorfolioSchema)
module.exports = PortfolioModel