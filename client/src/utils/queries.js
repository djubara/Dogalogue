import { gql } from "@apollo/client"

export const QUERY_USER = gql`
  query user($email: String!) {
    user(email: $email) {
      _id
      email
      firstName
      lastName
      photoUrl
      pet {
        _id
        petName
        size
        age
        breed
        gender
        gotchaDate
        altered
        energyLevel
        }
    }
  }
`;

export const QUERY_PET = gql`
  query pet($petName: String!) {
    pet(petName: $petName){
        _id
        petName
        size
        age
        breed
        gender
        gotchaDate
        altered
        energyLevel
        user {
            _id
            firstName
            lastName
            email
            photoUrl
        }
    }
}`;

export const QUERY_ME = gql`
query Query {
  me {
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