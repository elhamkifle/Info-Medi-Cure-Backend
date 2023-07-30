const mongoose = require("mongoose")

const EventsSchema = new mongoose.Schema({
    name:
        {type: String}
    ,
    description:{
        type: String
    },
    date:{
        type: String
    },
    time:{
        type: String
    }
})

module.exports = mongoose.model('Events', EventsSchema)
