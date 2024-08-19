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
  query pet($petId: ID!) {
    pet(id: $petId){
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
        owners {
            id
            firstName
            lastName
        }
    }
}`;

export const QUERY_PETS = gql`
  query Pets {
  pets {
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
`;

export const QUERY_ME = gql`
query me {
  me {
    id
    email
    firstName
    lastName
    created
    modified
    pets {
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
}`;

export const QUERY_POSTS = gql`
query Query {
  posts {
    id
    content
    photoUrl
    comments {
      content
      id
      created
    }
    created
    author {
      id
      firstName
      lastName
    }
    postingAs {
      id
      petName
      photoUrl
    }
  }
}
`;

export const QUERY_PET_POSTS = gql`
query PetPosts($petId: ID!) {
  petPosts(id: $petId) {
    author {
      id
      firstName
      lastName
    }
    comments {
      id
      author {
        id
        firstName
        lastName
      }
    }
    content
    created
    id
    modified
    photoUrl
    postingAs {
      id
      petName
      photoUrl
    }
  }
}
`;

export const QUERY_POST = gql`
query Post($postId: ID!) {
  post(id: $postId) {
    id
    author {
      id
      firstName
      lastName
    }
    postingAs {
      petName
      id
    }
    content
    photoUrl
    created
    comments {
      id
      author {
        id
        firstName
      }
      content
      created
    }
  }
}`;