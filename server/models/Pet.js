import { get, model, Schema } from "mongoose";

const petSchema = new Schema(
    {
        // profile data
        petName: {
            type: String,
            required: false,
            unique: false
        },
        age: {
            type: Number,
            min: 0,
            required: true,
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
            enum: ["Female", "Male"],
            required: true,
            unique: false
        },
        gotchaDate: {
            type: Date,
            required: true,
            unique: false,
            get: timestamp => (new Date(timestamp)).toLocaleDateString("en-us"),
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
        },

        // meta
        created: {
            type: Date,
            default: (new Date(Date.now())).toISOString(),
            get: timestamp => (new Date(timestamp)).toISOString(),
        },
        modified: {
            type: Date,
            default: (new Date(Date.now())).toISOString(),
            get: timestamp => (new Date(timestamp)).toISOString()
        },
    },
    {
        id: true,
        toJSON: {
            getters: true,
            virtuals: true,
        }
    })

export default model("Pet", petSchema)