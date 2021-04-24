import GameItem from "./GameItem";

import {useSelector, useDispatch} from "react-redux";
import { useEffect } from "react";
import { getGames } from "../../redux/actions";

function GamesList(props) {

    const games = useSelector(state => state.games);

    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(getGames());
    }, []);
    const getGamesList = () => {
        if(!games.length){
            return null;
        }
        const gamesList = games.map(game => {
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
            { getGamesList() }
        </div>
    </>
}
export default GamesList;