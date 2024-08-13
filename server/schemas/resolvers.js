import { GraphQLError } from "graphql"
import jsonwebtoken from "jsonwebtoken"

import { User, Dog } from "../models/index.js"
import { createToken } from "../utils/auth.js"

export default {
    Query: {
        users: async () => {
            return await User.find()
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
        register: async (parent, { user }) => {
            return createToken(await User.create(user))

        },
        login: async (parent, { credentials }, ctx) => {
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

            return createToken(user)
        },
    }
}