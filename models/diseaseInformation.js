const mongoose = require("mongoose")

const InformationSchema = new mongoose.Schema({
    diseaseName:
        {type: String}
    ,
    diseaseDescription:{
        type: String
    },
    symptoms:{
        type: String
    }
})

module.exports = mongoose.model('Information', InformationSchema)