import { gql } from '@apollo/client';

export const ADD_USER = gql`
mutation register($firstName: String!, $lastName: String!, $email: String!, $password: String!, $photoUrl: String!) {
    register(firstName: $firstName, lastName: $lastName, email: $email, password: $password, photoUrl: $photoUrl) {
        token
        user {
            _id
            firstName
            }
        
    }
}
`;
export const LOGIN_USER = gql`
mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
        token
        user {
            _id
            firstName
            }
        
    }
}
`;

export const CREATE_DOG = gql`
mutation createDog($petName: String!, $size: DogSize!, $age: Int!, $breed: String!, $gender: DogGender!, $gotchaDate: Date!, $energyLevel: Int!  $photoUrl: String!) {
    createDog(petName: $petName, size: $size, age: $age, breed: $breed, gender: $gender, gotchaDate: $gotchaDate, energyLevel: $energyLevel, photoUrl: $photoUrl) {
        token
        user {
            _id
            firstName
            }
    }
}`;