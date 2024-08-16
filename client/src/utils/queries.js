import { gql } from "@apollo/client"

export const QUERY_USER = gql`
  query user($email: String!) {
    user(email: $email) {
      id
      email
      firstName
      lastName
      pet {
        id
        petName
        size
        age
        breed
        gender
        gotchaDate
        altered
        energyLevel
        photoUrl
        }
    }
  }
`;

export const QUERY_PET = gql`
  query pet($petName: String!) {
    pet(petName: $petName){
        id
        petName
        size
        age
        breed
        gender
        gotchaDate
        altered
        energyLevel
        photoUrl
        user {
            id
            firstName
            lastName
            email 
        }
    }
}`;

export const QUERY_ME = gql`
query me {
  me {
    id
    email
    password
    firstName
    lastName
    created
    modified
    pets {
      id
      petName
      size
      breed
      gender
      gotchaDate
      altered
      energyLevel
      photoUrl
      created
      modified
    }
  }
}`