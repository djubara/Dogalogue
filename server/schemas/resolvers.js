import { GraphQLError } from "graphql"
import jsonwebtoken from "jsonwebtoken"

import { User, Dog } from "../models/index.js"
import { createToken } from "../utils/auth.js"

export default {
    Query: {
        users: async () => {
            return await User.find()
        },

        dogs: async () => {
            return await Dog.find()
        },

        me: async (parent, args, { user }) => {
            if (!user) {
                throw new GraphQLError("You are not logged in.",
                    { extensions: { code: "UNAUTHENTICATED" } })
            }
            return User.findOne({ _id: user.id }) //.populate("dogs")
        }
    },
    Mutation: {
        createDog: async (parent, { dog }) => {
            return await Dog.create(dog)
        },

        register: async (parent, { user, dog }) => {
            const createdDog = await Dog.create(dog)

            const createdUser = await User.create(user)
            return {
                token: createToken(createdUser),
                user: createdUser
            }
        },
        login: async (parent, { credentials }, ctx) => {
            
            // check if user is already signed in with context
            if (ctx.user) {
                throw new GraphQLError("You are already logged in.",
                    { extensions: { code: "BAD REQUEST" } })
            }

            const { email, password } = credentials
            const user = await User.findOne({ email })

            if (!user || !user.checkPassword(password)) {
                throw new GraphQLError("Invalid credentials.",
                    { extensions: { code: "UNAUTHENTICATED" } })
            }

            return {
                token: createToken(user),
                user
            }
        },
    }
}