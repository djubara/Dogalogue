import { GraphQLError } from "graphql"
import jsonwebtoken from "jsonwebtoken"

import { User, Pet } from "../models/index.js"
import { createToken } from "../utils/auth.js"

export default {
    Query: {
        users: async () => {
            return await User.find()
        },

        pets: async () => {
            return await Pet.find()
        },

        me: async (parent, args, { user }) => {
            if (!user) {
                throw new GraphQLError("You are not logged in.",
                    { extensions: { code: "UNAUTHENTICATED" } })
            }
            return User.findOne({ _id: user.id })
        }
    },
    Mutation: {
        createPet: async (parent, { pet }) => {
            return await Pet.create(pet)
        },

        register: async (parent, { user, pet }) => {
            const createdPet = await Pet.create(pet)

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