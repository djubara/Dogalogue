import { gql } from '@apollo/client';

export const ADD_USER = gql`
mutation register($firstName: String!, $lastName: String!, $email: String!, $password: String!, $photoUrl: String!) {
    register(firstName: $firstName, lastName: $lastName, email: $email, password: $password, photoUrl: $photoUrl) {
        token
        
    }
}
`