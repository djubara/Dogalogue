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
        register(user: UserCreationInput!): String!
        login(credentials: LoginInput!): String!
    }
`;
