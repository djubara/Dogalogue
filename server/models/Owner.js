const { model, Schema } = require("mongoose");

const ownerSchema = new Schema({
    // meta
    // created: {
    //     type: Date,
    //     required: true,
    //     unique: false,
    //     default: Date.now
    createdAt: {
        type: Date,
        default: Date.now,
        get: timestamp => dateFormat(timestamp)
    },
    modified: {
        type: Date,
        required: true,
        unique: false,
        default: Date.now
    },

    // profile data
    firstName: {
        type: String,
        required: false,
        unique: false
    },
    lastName: {
        type: String,
        required: false,
        unique: false
    },
    photoUrl: {
        type: String,
        required: true,
        unique: false
    }
})

const Owner = model("Owner", ownerSchema)

module.exports = Owner