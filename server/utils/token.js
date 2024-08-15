import jwt from "jsonwebtoken"
const secret = 'mysecretsshhhhh';
const expiration = '2h';

export default function createToken ({ username, email, _id }) {
    const payload = { username, email, _id };
    return jwt.sign({ data: payload }, secret, { expiresIn: expiration });
}