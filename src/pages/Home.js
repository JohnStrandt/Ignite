import React,{ useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
// Components
import Game from "../components/Game";
import GameDetail from "../components/GameDetail";
// Actions
import { loadGames } from "../actions/gamesAction";
// Styling and Animation
import styled from "styled-components";
import { motion, AnimatePresence, AnimateSharedLayout } from "framer-motion";
import { fadeIn } from "../animations";


const Home = () => {

  // Current Location - trick to extract id from url
  // split returns an array - so index that sucker
  // the third part is always the game id#
  // pathID was a string in the URL - cast to a number
  // pathID and game.id need to match in type and value
  // for AnimatePresence to work 
  const location = useLocation();
  const pathID = 1*location.pathname.split("/")[2];

  // FETCH GAMES (ran once, as far as I can see)
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(loadGames());
  }, [dispatch]);//useEffect only ran when dispatch occurs


  // Get Data back
  const {popular, upcoming, newGames, searched} = useSelector((state) => state.games);

  return(
    <GameList variants={fadeIn} initial="hidden" animate="show">
      <AnimateSharedLayout type="crossfade">
        <AnimatePresence>
          {pathID && <GameDetail pathId={pathID} />}
        </AnimatePresence>
        {searched.length ? (
        <div className="searched">
        
          <h2>Search Results</h2>
          <Games>
            {searched.map(game => (
              <Game 
              name={game.name} 
              released={game.released} 
              id={game.id} 
              image={game.background_image}
              key={game.id}
              />
            ))}
          </Games>
        </div>
        ) : ""}
        <h2>Upcoming Games</h2>
        <Games>
          {upcoming.map(game => (
            <Game 
            name={game.name} 
            released={game.released} 
            id={game.id} 
            image={game.background_image}
            key={game.id}
            />
          ))}
        </Games>
        <h2>Popular Games</h2>
        <Games>
          {popular.map(game => (
            <Game 
            name={game.name} 
            released={game.released} 
            id={game.id} 
            image={game.background_image}
            key={game.id}
            />
          ))}
        </Games>
        <h2>New Games</h2>
        <Games>
          {newGames.map(game => (
            <Game 
            name={game.name} 
            released={game.released} 
            id={game.id} 
            image={game.background_image}
            key={game.id}
            />
          ))}
        </Games>
      </AnimateSharedLayout>
    </GameList>
  );
};


const GameList = styled(motion.div)`
  padding: 0rem 5rem 5rem 5rem;
  h2{
    padding: 5rem 0rem;
  }

  /* Mediea Queries in Home & Nav  */
  @media only screen and (max-width: 600px){
    padding: 0rem 2rem 2rem 2rem;
  h2{
    font-size: 2rem;
    padding: 2rem 0rem;
    }
  }

`;


const Games = styled(motion.div)`
  min-height: 80vh;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(500px, 1fr));
  grid-column-gap: 3rem;
  grid-row-gap: 5rem;
  @media only screen and (max-width: 600px){
    display: flex;
    flex-direction: column;
    grid-column-gap: 1rem;
    grid-row-gap: 2rem;
  }
`;


export default Home;