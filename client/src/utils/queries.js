import { gql } from "@apollo/client"

export const QUERY_USER = gql`
  query user($email: String!) {
    user(email: $email) {
      _id
      email
      firstName
      lastName
      photoUrl
    }
  }
`;