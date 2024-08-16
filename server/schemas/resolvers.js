import { GraphQLError } from "graphql"
import { User, Pet, Post } from "../models/index.js"
import jwt from 'jsonwebtoken';
const secret = 'mysecretsshhhhh';
const expiration = '2h';

function createToken ({ username, email, _id }) {
    const payload = { username, email, _id };
    return jwt.sign({ data: payload }, secret, { expiresIn: expiration });
};

async function getUsers() {
    
}

export default {
    Query: {
        users: async () => {
            const users = await User.find()

            for await (const user of users) {
                const userPets = await Pet.find({ owners: { $in: [user._id] }})
                user.pets = userPets
            }

            return users
        },

        pets: async () => {
            return await Pet.find().populate("owners")
        },

        pet: async ( parent, { id } ) => {
            return await Pet.find({ _id: id })
        },

        me: async (parent, args, { user }) => {
            if (!user) {
                throw new GraphQLError("You are not logged in.",
                    { extensions: { code: "UNAUTHENTICATED" } })
            }
            
            const userEntry = await User.findOne({ _id: user._id })
            const userPets = await Pet.find({ owners: { $in: [user._id] }})
            userEntry.pets = userPets
            console.log(userEntry)

            return userEntry
        },

        posts: async () => {
            const posts = await Post.find().populate("author", "-password").populate("postingAs")
            return posts
        }
    },
    Mutation: {
        createPost: async (parent, { post }, ctx) => {
            if (!ctx.user) throw new GraphQLError("Must be logged in")

            const createdPost = await (await Post.create({
                ...post,
                author: ctx.user._id
            })).populate("author")

            return createdPost
        },

        createPet: async (parent, { pet }) => {
            return await Pet.create(pet)
        },

        register: async (parent, { user, pet }) => {
            const createdPet = await Pet.create(pet)

            const createdUser = await User.create({
                ...user,
                pets: [createdPet.id]
            })
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
            
            const passwordValid = await user.checkPassword(password)

            if (!user || !passwordValid) {
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