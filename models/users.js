const mongoose = require("mongoose")

const UsersSchema = new mongoose.Schema(
        {
            name: {
                type: String
            },
            password: {
                type: String
            },
            role: {
                type: String
            }
        }
)

module.exports = mongoose.model('Users', UsersSchema)