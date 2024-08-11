import * as jwt from "jsonwebtoken"
export const createToken = ({ _id: id }) => {
    return jwt.sign({ id }, process.env.AUTH_JWT_SECRET, { expiresIn: "1d" })
}
export const verifyToken = token => {
    return jwt.decode(token, process.env.AUTH_JWT_SECRET)
}   