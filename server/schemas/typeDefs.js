export default `#graphql
    type User {
        id: ID!

        email: String!
        password: String!

        firstName: String!
        lastName: String!
        photoUrl: String!

        created: String!
        modified: String!
    }

    type Auth {
        token: ID!
        user: User!
    }

    type Comment {
        id: ID!

        author: User!
        content: String!
        created: String!
    }

    type Post {
        id: ID!

        author: User!
        content: String!
        photoUrl: String
        comments: [Comment]!

        created: String!
        modified: String!
    }

    input UserCreationInput {    
        email: String!
        password: String!

        firstName: String!
        lastName: String!
        photoUrl: String!
    }

    enum DogSize {
        xs
        sm
        md
        lg
        xl
    }

    enum DogGender {
        male
        female
    }

    type Dog {
        id: ID!

        firstName: String!
        lastName: String!
        size: DogSize!
        breed: String!
        gender: DogGender!
        gotchaDate: String!
        altered: Boolean!
        energyLevel: Int!
        photoUrl: String!

        created: String!
        modified: String!
    }

    input DogCreationInput {
        firstName: String!
        lastName: String!
        size: DogSize!
        breed: String!
        gender: DogGender!
        gotchaDate: String!
        altered: Boolean!
        energyLevel: Int!
        photoUrl: String!
    }

    input LoginInput {
        email: String!
        password: String!
    }

    type Query {
        me: User!
        users: [User]!
        dogs: [Dog]!
    }
        
    type Mutation {
        createDog(dog: DogCreationInput!): Dog!

        register(user: UserCreationInput!, dog: DogCreationInput!): Auth
        login(credentials: LoginInput!): Auth
    }
`;
