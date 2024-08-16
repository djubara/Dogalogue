
import jwt from "jsonwebtoken"
const secret = 'mysecretsshhhhh';
const expiration = '2h';

export default function createToken ({ username, email, id }) {
    const payload = { username, email, id };
    return jwt.sign({ data: payload }, secret, { expiresIn: expiration });
}
