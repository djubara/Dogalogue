import { model, Schema } from "mongoose";
import { hash, compare } from "bcrypt";

const userSchema = new Schema(
    {
        // credentials
        email: {
            type: Date,
            required: true,
            unique: true
        },
        password: {
            type: String,
            required: true,
            unique: false
        },

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