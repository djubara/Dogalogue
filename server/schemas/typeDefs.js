export default `#graphql
type User {
    id: ID!
    createdAt: String!
    modified: String!
    firstName: String!
    lastName: String!
    photoUrl: String!
    email: String!
}
input RegisterInput {
    firstName: String!
    lastName: String!
    email: String!
    password: String!
}
input LoginInput {
    email: String!
    password: String!
}
type Query {
    me: User!
}
type Mutation {
    register(user: RegisterInput!): String!
    login(credentials: LoginInput!): String!
}
`;
