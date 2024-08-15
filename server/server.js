import 'dotenv/config.js';
import express from 'express';
import { ApolloServer } from '@apollo/server';
import { expressMiddleware } from '@apollo/server/express4';
import path from 'path';
import mongoose from 'mongoose';
import imagesRoutes from './routes/images.js'

import { typeDefs, resolvers } from './schemas/index.js';


const PORT = process.env.PORT || 3001;
const app = express();
const server = new ApolloServer({
    typeDefs,
    resolvers,
});

await Promise.all([
    server.start(),
    mongoose.connect(process.env.MONGODB_URI, {

    })
])

app.use('/usercontent/images', imagesRoutes)
app.use('public', express.static("public"))
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use('/graphql', expressMiddleware(server, {
    context: async ({ req }) => {
        const token = req.headers.authorization?.trim().split(' ').at(-1);
        if (!token) return {};
        try {
            return { user: await verifyToken(token) }
        } catch {
            console.error('Invalid token');
            return {};
        }
    }
}));

// if we're in production, serve client/dist as static assets
if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.join(__dirname, '../client/dist')));

    app.get('*', (req, res) => {
        res.sendFile(path.join(__dirname, '../client/dist/index.html'));
    });
}

app.listen(PORT, () => {
    console.log(`API server running on port ${PORT}!`);
    console.log(`Use GraphQL at http://localhost:${PORT}/graphql`);
});

