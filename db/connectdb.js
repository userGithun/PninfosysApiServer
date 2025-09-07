const mongoose = require('mongoose')
const connectdb = () => {
    return mongoose.connect(process.env.MONGODB_LIVE_URL)
        .then(() => {
            console.log('Database Connected :)')
        }).catch((error) => {
            console.log(error)
        })
}
module.exports = connectdb