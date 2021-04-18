import { useQuery, gql } from '@apollo/client';
import GameItem from "./GameItem";

const GET_GAMES = gql`
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

function GamesList(props) {

    const { loading, error, data } = useQuery(GET_GAMES);

    const getGames = () => {
        if(!data){
            return null;
        }
        const gamesList = data.games.map(game => {
            return <GameItem
                key={game._id}
                title={game.title}
                description={game.description}
                rating={game.rating}
                image={game.image}
            ></GameItem>
        })
        return gamesList;
    }

    return <>
        <div className="row">
            { getGames() }
        </div>
    </>
}
export default GamesList;