import { gql } from "@apollo/client"

export const QUERY_USER = gql`
  query user($id: ID!) {
    user(id: $id) {
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
    }
  }
<<<<<<< HEAD
}`;
=======
}`

export const QUERY_POSTS = gql`
query Posts {
  posts {
    id
    author {
      id
      firstName
      photoUrl
    }
    content
    photoUrl
    comments {
      id
      author {
        firstName
        id
      }
      content
      created
    }
    created
    modified
    postingAs {
      petName
      id
      photoUrl
    }
  }
}
`
>>>>>>> main
