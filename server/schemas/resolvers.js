import { GraphQLError } from "graphql"
import { User, Pet, Post } from "../models/index.js"
import jwt from 'jsonwebtoken';
const secret = 'mysecretsshhhhh';
const expiration = '2h';

function createToken({ username, email, _id }) {
    const payload = { username, email, _id };
    return jwt.sign({ data: payload }, secret, { expiresIn: expiration });
};

export default {
    Query: {
        users: async () => {
            const users = await User.find()

            for await (const user of users) {
                const userPets = await Pet.find({ owners: { $in: [user._id] } })
                user.pets = userPets
            }

            return users
        },

        pets: async () => {
            return await Pet.find().populate("owners")
        },

        pet: async (parent, { id }) => {
            const pet = await Pet.findOne({ _id: id }).populate("owners", ["_id", "firstName", "lastName"])
            return pet
        },

        petPosts: async (parent, { id }) => {
            const pet = await Pet.findOne({ _id: id })
            const posts = await Post.find({ postingAs: pet }).populate(["postingAs", "author"])
            return posts
        },

        me: async (parent, args, { user }) => {
            if (!user) {
                throw new GraphQLError("You are not logged in.",
                    { extensions: { code: "UNAUTHENTICATED" } })
            }

            const foundUser = await User.findOne({ _id: user._id })
            await foundUser.populate("pets")

            return foundUser
        },
        user: async (parent, { id }) => {
            return await User.findById(id).populate("pets");

            // const userEntry = await User.findOne({ _id: user._id })
            // const userPets = await Pet.find({ owners: { $in: [user._id] }})
            // userEntry.pets = userPets
            // console.log(userEntry)

            // return userEntry
        },

        posts: async () => {
            const posts = await Post.find().populate("author").populate("postingAs")
            return posts
        },
        post: async (parent, { id }) => {
            return await Post.findById(id).populate("author").populate("postingAs").populate("comments.author").populate("comments.postingAs")
        }
    },
    Mutation: {
        createPost: async (parent, { post }, ctx) => {
            if (!ctx.user) throw new GraphQLError("Must be logged in")

            const postingAs = post.postingAs === "me"? undefined : post.postingAs

            const createdPost = await (await Post.create({
                ...post,
                author: ctx.user._id,
                postingAs
            })).populate("author")

            return createdPost
        },

        createPet: async (parent, { pet }, ctx) => {
            
            pet.owners = [ctx.user._id]
            const createdPet = await Pet.create(pet)
            
            const user = await User.findOne({ _id: ctx.user._id })
            user.pets.push(createdPet._id)
            await user.save()
            
            return createdPet
        },

        register: async (parent, { user, pet }) => {
            const createdPet = await Pet.create({
                ...pet,
                owners: [user._id]
            })

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
        createComment: async (parent, { postId, comment }, ctx) => {
            if (!ctx.user) throw new GraphQLError("Must be logged in")

            const post = await Post.findOneAndUpdate(
                { _id: postId },
                { $push: { comments: { ...comment, author: ctx.user._id } } },
                { new: true }
            ).populate("comments.author").populate("author").populate("postingAs")

            if (!post) throw new GraphQLError("Post not found")

            return post;
        }
    }
}