
import { gql } from '@apollo/client';

export const LOGIN = gql`
mutation Login($email: String!, $password: String!) {
  login(email: $email, password: $password)
}
`;

export const LOGOUT = gql`
mutation Logout {
  logout {
    _id
  }
}
`;
