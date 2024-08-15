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

    enum PetSize {
        xs
        sm
        md
        lg
        xl
    }

    enum PetGender {
        male
        female
    }

    type Pet {
        id: ID!

        petName: String!
        size: PetSize!
        breed: String!
        gender: PetGender!
        gotchaDate: String!
        altered: Boolean!
        energyLevel: Int!
        photoUrl: String!

        created: String!
        modified: String!
    }

    input PetCreationInput {
        petName: String!

        size: PetSize!
        breed: String!
        gender: PetGender!
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
        pets: [Pet]!
    }
        
    type Mutation {
        createPet(pet: PetCreationInput!): Pet!

        register(user: UserCreationInput!, pet: PetCreationInput!): Auth
        login(credentials: LoginInput!): Auth
    }
`;
