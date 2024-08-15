import jwt from "jsonwebtoken"

export const createToken = ({ _id: id }) => {
    id = id.toString()
    const token = jwt.sign({ id }, process.env.AUTH_JWT_SECRET, { expiresIn: "1d" })
    return token
}

export const verifyToken = token => {
    return jwt.decode(token, process.env.AUTH_JWT_SECRET)
}