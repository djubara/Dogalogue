export default `#graphql
    type User {
        id: ID!

        email: String!
        password: String!

        firstName: String!
        lastName: String!

        created: String!
        modified: String!

        pets: [Pet]!
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
    }

    enum PetSize {
        xs
        sm
        md
        lg
        xl
    }

    enum PetGender {
        Male
        Female
    }

    type Pet {
        id: ID!

        petName: String!
        size: PetSize!
        age: Int!
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

        age: Int!
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

    input PostCreationInput {
        postingAs: String!
        content: String!
        photoUrl: String
    }
        
    type Mutation {
        createPet(pet: PetCreationInput!): Pet!
        createPost(post: PostCreationInput!): Post!

        register(user: UserCreationInput!, pet: PetCreationInput!): Auth
        login(credentials: LoginInput!): Auth
    }
`;
