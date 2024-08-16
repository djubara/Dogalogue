import { gql } from '@apollo/client';

export const ADD_USER = gql`
mutation Mutation($user: UserCreationInput!, $pet: PetCreationInput!) {
  register(user: $user, pet: $pet) {
  token
    user {
      id
      email
    }
  }
}
`;
export const LOGIN_USER = gql`
mutation Mutation($credentials: LoginInput!) {
  login(credentials: $credentials) {
    token
    user {
      id
      email
    }
  }
}
`;

export const CREATE_DOG = gql`
mutation createDog($petName: String!, $size: DogSize!, $age: Int!, $breed: String!, $gender: DogGender!, $gotchaDate: Date!, $energyLevel: Int!  $photoUrl: String!) {
    createDog(petName: $petName, size: $size, age: $age, breed: $breed, gender: $gender, gotchaDate: $gotchaDate, energyLevel: $energyLevel, photoUrl: $photoUrl) {
        token
        user {
            id
            firstName
            }
    }
}`;

export const CREATE_POST = gql`
mutation createPost($post: PostCreationInput!) {
  createPost(post: $post) {
    id
  }
}
`