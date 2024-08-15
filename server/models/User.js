import { model, Schema } from "mongoose";
import { hash, compare } from "bcrypt";

const userSchema = new Schema(
    {
        // credentials
        email: {
            type: String,
            required: true,
            unique: true
        },
        password: {
            type: String,
            required: true,
            unique: false
        },

        // profile data
        firstName: {
            type: String,
            required: true,
            unique: false
        },
        lastName: {
            type: String,
            required: true,
            unique: false
        },
        photoUrl: {
            type: String,
            required: true,
            unique: false
        },

        // metadata
        created: {
            type: Date,
            default: (new Date(Date.now())).toISOString(),
            get: timestamp => (new Date(timestamp)).toISOString()
        },
        modified: {
            type: Date,
            unique: false,
            default: (new Date(Date.now())).toISOString(),
            get: timestamp => (new Date(timestamp)).toISOString()

        },
    },
    {
        id: true,
        method: {
            checkPassword: function (password) {
                return bcrypt.compare(password, this.password)
            }
        },
        toJSON: {
            getters: true,
            virtuals: true,
        }
    })
userSchema.pre("save", async function () {
    if (this.isNew || this.isModified("password")) {
        this.password = await hash(this.password, 10)
    }
})

export default model("User", userSchema)