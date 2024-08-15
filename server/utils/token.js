const jwt = require('jsonwebtoken');
const secret = 'mysecretsshhhhh';
const expiration = '2h';
module.exports = {
    createToken: function ({ username, email, _id }) {
        const payload = { username, email, _id };
        return jwt.sign({ data: payload }, secret, { expiresIn: expiration });
    }
};