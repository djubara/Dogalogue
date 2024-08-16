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
            required: true
        },

        // pet data
        pets: [
            {
                type: Schema.Types.ObjectId,
                ref: "Pet",
            }
        ],

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

userSchema.methods.checkPassword = async function (password) {
    return compare(password, this.password);
};

//static register method
userSchema.statics.register = async (email, password, firstName, lastName, photoUrl) => {
    const exists = await this.findOne({ email})

    if (exists) {
        throw new Error('Email already in use')
    }
}

//static login method
userSchema.statics.login = async function(email, password) {


    if(!email || !password) {
        throw new Error('Invalid email or password')
    }

    const user = await this.findOne({ email })

    if(!user) {
        throw new Error('User not found')
    }

    const match = await bcrypt.compare(password, user.password)

    if (!match) {
        throw new Error('Invalid email or password')
    }

    return user;
}



export default model("User", userSchema)