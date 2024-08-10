const { model, Schema } = require("mongoose")

const dogSchema = new Schema({
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
    size: {
        type: String,
        enum: ["xs", "sm", "md", "lg", "xl"],
        required: true,
        unique: false
    },
    breed: {
        type: String,
        required: true,
        unique: false
    },
    gender: {
        type: String,
        enum: ["female", "male"],
        required: true,
        unique: false
    },
    gotchaDate: {
        type: Date,
        required: true,
        unique: false
    },
    altered: {
        type: Boolean,
        required: true,
        unique: false
    },
    energyLevel: {
        type: Number,
        min: 0,
        max: 5,
        required: true,
        unique: false
    },
    photoUrl: {
        type: String,
        required: true,
        unique: false
    }
})

const Dog = model("Dog", dogSchema)

module.exports = Dog;