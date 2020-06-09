const mongoose = require('mongoose')

const configureDB = () => {
    mongoose.connect('mongodb://localhost:27017/tweets',{
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
        .then(() => {
            console.log('connected to db --> tweets')
        })
        .catch((err) => {
            console.loge(err)
        })
}

module.exports = configureDB