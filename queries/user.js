
import { gql } from "@apollo/client"

export const GET_CURRENT_USER = gql`
query getCurrentUser {
  currentUser {
    _id
    email
  }
}
`;