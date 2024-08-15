import jwt from "jsonwebtoken"
import { GraphQLError } from "graphql"
const secret = 'mysecretsshhhhh';
const expiration = '2h';

export const AuthenticationError = new GraphQLError('Could not authenticate user.', {
    extensions: {
        code: 'UNAUTHENTICATED',
    },
})

export function authMiddleware ({ req }) {
    // allows token to be sent via req.body, req.query, or headers
    let token = req.body.token || req.query.token || req.headers.authorization;
    // ["Bearer", "<tokenvalue>"]
    if (req.headers.authorization) {
        token = token.split(' ').pop().trim();
    }
    if (!token) {
        return req;
    }
    try {
        const { data } = jwt.verify(token, secret, { maxAge: expiration });
        req.user = data;
    } catch {
        console.log('Invalid token');
    }
    return req;
}
