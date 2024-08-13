export default `#graphql
    type User {
        id: ID!

        created: String!
        modified: String!

        email: String!
        password: String!

        firstName: String!
        lastName: String!
        photoUrl: String!
    }

    input RegisterInput {    
        email: String!
        password: String!

        firstName: String!
        lastName: String!
        photoUrl: String!
    }

    input LoginInput {
        email: String!
        password: String!
    }

    type Query {
        me: User!
        users: [User]!
    }
        
    type Mutation {
        register(user: RegisterInput!): String!
        login(credentials: LoginInput!): String!
    }
`;
