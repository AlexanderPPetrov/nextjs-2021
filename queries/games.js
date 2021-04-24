import { gql } from '@apollo/client';

export const GET_GAMES = gql`
  query getGames {
    games {
      _id
      title
      description
      image
      rating
    }
  }
`;
