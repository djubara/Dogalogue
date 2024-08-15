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
}`