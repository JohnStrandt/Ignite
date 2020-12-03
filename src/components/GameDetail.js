import React from "react";
//STYLING and ANIMATION
import styled from "styled-components";
import { motion } from "framer-motion";
// REDUX
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
// RESIZE IMAGES AS WE FETCH FROM API
import { smallImage } from "../util";
//IMAGES
import playstation from "../img/playstation.svg";
import steam from "../img/steam.svg";
import xbox from "../img/xbox.svg";
import nintendo from "../img/nintendo.svg";
import apple from "../img/apple.svg";
import gamepad from "../img/gamepad.svg";
import close from "../img/close.svg";
//Star Images
import starEmpty from "../img/star-empty.png";
import starFull from "../img/star-full.png";


const GameDetail = ({ pathId }) => {

  // Get Platform images
  const getPlatform = (platform) => {
    switch(platform){
      case "PlayStation 4":
        return playstation;
        case "Xbox One":
          return xbox;
        case "PC":
          return steam;
        case "Nintendo Switch":
          return nintendo;
        case "iOS":
          return apple;
        default:
          return gamepad;
    }
  }

  // Get Stars
  const getStars = () => {
    const stars = [];
    const rating = Math.floor(game.rating);
    for(let i = 1; i <= 5; i++){
      if(i <= rating){
        stars.push(<img alt="star" key={i} src={starFull}></img>);
      } else {
        stars.push(<img alt="star" key={i} src={starEmpty}></img>);
      }
    }
    return stars;
  };

  // Exit Detail (get scrolling back)
  // either by clicking shadow on the sides,  or the close img
  const history = useHistory();
  const exitDetailHandler = (e) => {
    const element = e.target;
    if(element.classList.contains('closer') || 
    element.classList.contains('shadow')){
      document.body.style.overflow= 'auto';
      history.push("/");
    } 
  };

  // Data
  const {screen, game, isLoading} = useSelector((state) => state.detail);

  return(
    <>
      {!isLoading && (
      <CardShadow className="shadow" onClick={exitDetailHandler}>
        <Detail layoutId={pathId}>
          <CloseButton>
            <img
            className="closer"
            onClick={exitDetailHandler}
            src={close} 
            alt="close button"
            ></img>
          </CloseButton>
          <Stats>
            <div className="rating">
              <motion.h3 layoutId={`title ${pathId}`}>{game.name}</motion.h3>
              {getStars()}
              <p>Rating: {game.rating}</p>
            </div>
            <Info>
              <h3>Platforms</h3>
              <Platforms>
                {game.platforms.map(data => (
                  <img 
                  alt={data.platform.name}
                  key={data.platform.id}
                  src={getPlatform(data.platform.name)}
                  ></img>
                ))}
              </Platforms>
            </Info>
          </Stats>
          <Media>
            <motion.img
            layoutId={`image ${pathId}`}
            src={smallImage(game.background_image, 1280)} 
            alt="screenshot"
            />
          </Media>
          <Description>
            <p>{game.description_raw}</p>
          </Description>
          <Gallery>
            {screen.results.map(screenshot => (
              <img 
              src={smallImage(screenshot.image, 1280)} 
              key={screenshot.id} 
              alt = "screenshot"
              />
            ))}
          </Gallery>
        </Detail>
      </CardShadow>
      )}
    </>
  );
};


const CardShadow = styled(motion.div)`
  width: 100%;
  min-height: 100vh;
  overflow-y: scroll;
  background: rgba(0,0,0,0.5);
  position: fixed;
  top: 0;
  left: 0;
  z-index: 5;
  &::-webkit-scrollbar {
    width: 0.5rem;
  }
  &::-webkit-scrollbar-thumb {
    background-color: #ff7676;
  }
  &::-webkit-scrollbar-track{
    background: white;
  }
`;

const Detail = styled(motion.div)`
  width: 80%;
  border-radius: 1rem;
  padding: 2rem 5rem;
  background: white;
  position: absolute;
  left: 10%;
  color: black;
  z-index:10; // scroll bug fix (bottom layer leak)
  img{
    width: 100%;
  }

  @media only screen and (max-width: 650px){
    width: 100vw;
    margin: 0;
    left: 0;
    right: 0;
    padding: 5%;
  }
`;

const CloseButton = styled(motion.div)`
  img{
    width: 2em;
    height: 2em;
    position: fixed;
    top: 100px;
    right: 50px;
  }
`;

const Stats = styled(motion.div)`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 2rem;

  img {
    width: 2rem;
    height: 2rem;
    display: inline;
  }

  @media only screen and (max-width: 1020px){
    flex-direction: column;
    text-align: center;
    .rating :first-child {
      margin-bottom: 1.5rem;
    }
    img {
        width: 1.5rem;
        height: 1.5rem;
      }
  }

`;

const Info = styled(motion.div)`
  text-align: center;
`;

const Platforms = styled(motion.div)`
  display: flex;
  justify-content: space-evenly;
  img{
    margin: 0rem 1.5rem;
  }

  @media only screen and (max-width: 800px){
    img{
      margin: 0rem 0.5rem;
    }
  }
`;

const Media = styled(motion.dev)`
  margin-top: 5rem;
  img{
    width: 100%;
  }
`;

const Description = styled(motion.dev)`
p{
  margin-top: 2rem;
  margin-bottom: 4rem;
}
  
`;

const Gallery = styled(motion.dev)`
img{
  width: 100%;
  padding-bottom: 0.5rem;
}
`;

export default GameDetail;