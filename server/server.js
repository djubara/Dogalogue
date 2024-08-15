import 'dotenv/config.js';
import express from 'express';
import { ApolloServer } from '@apollo/server';
import { expressMiddleware } from '@apollo/server/express4';
import path from 'path';
import mongoose from 'mongoose';
import imagesRoutes from './routes/images.js'

import { typeDefs, resolvers } from './schemas/index.js';

import { join, normalize, dirname } from "path"
import { fileURLToPath } from 'url';
import { authMiddleware } from './utils/auth.js';

// import userRoutes from './routes/user.js';


const PORT = process.env.PORT || 3001;
const app = express();
const server = new ApolloServer({
    typeDefs,
    resolvers,
});

await Promise.all([
    server.start(),
    mongoose.connect(process.env.MONGODB_URI, {})
]);

// routes
// app.use('/user', userRoutes);

app.use('/usercontent/images', imagesRoutes)
app.use('public', express.static("public"))
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use('/graphql', expressMiddleware(server, {
    context: authMiddleware
}));

// if we're in production, serve client/dist as static assets
if (process.env.NODE_ENV === 'production') {
    const currentDir = dirname(fileURLToPath(import.meta.url))

    app.use(express.static(path.join(currentDir, '../client/dist')));

    app.get('*', (req, res) => {
        res.sendFile(path.join(currentDir, '../client/dist/index.html'));
    });
}

app.listen(PORT, () => {
    console.log(`API server running on port ${PORT}!`);
    console.log(`Use GraphQL at http://localhost:${PORT}/graphql`);
});

