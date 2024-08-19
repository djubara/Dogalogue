import { gql } from '@apollo/client';

export const ADD_USER = gql`
mutation register($user: UserCreationInput!, $pet: PetCreationInput!) {
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
mutation login($credentials: LoginInput!) {
  login(credentials: $credentials) {
    token
    user {
      id
      email
    }
  }
}
`;

export const CREATE_PET = gql`
mutation createPet($pet: PetCreationInput!) {
    createPet(pet: $pet) {
      id
    }
}`;

export const CREATE_POST = gql`
mutation createPost($post: PostCreationInput!) {
  createPost(post: $post) {
    id
  }
}
`

export const CREATE_COMMENT = gql`
mutation createComment($postId: ID!, $comment: CommentCreationInput!) {
  createComment(postId: $postId, comment: $comment) {
    id
    content
    created
    postingAs {
      petName
    }
  }
}`