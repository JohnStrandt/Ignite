import React from "react";

//STYLING and ANIMATION
import styled from "styled-components";
import { motion } from "framer-motion";
import { popup } from "../animations";

// REDUX
import { useDispatch } from "react-redux";
import { loadDetail } from "../actions/detailAction";
import { Link } from "react-router-dom";

// RESIZE IMAGES AS WE FETCH FROM API
import { smallImage } from "../util";


const Game = ({name, released, image, id}) => {
  // Load Details
  const dispatch = useDispatch();
  // after a game is clicked, and loadDetailHandler is run,
  const loadDetailHandler = () => {
    document.body.style.overflow = "hidden";// stops homepage scrolling
    dispatch(loadDetail(id));
  };

  return(
    <StyledGame 
    variants={popup}
    initial="hidden"
    animate="show"
    layoutId={id}
    onClick={loadDetailHandler}
    >
      <Link to={`/game/${id}`}>
        <motion.h3 layoutId={`title ${id}`}>{name}</motion.h3>
        <p>{released}</p>
        <motion.img 
        layoutId={`image ${id}`}
        src={smallImage(image, 640)}
        alt={name}
        />
      </Link>
    </StyledGame>
  );
};

const StyledGame = styled(motion.div)`
  min-height: 30vh;
  box-shadow: 0px 5px 20px rgba(0, 0, 0, 0.2);// 20px is the blur
  text-align: center;
  border-radius: 1rem;
  overflow: hidden; // bottom corners were poking out of radius in img
  cursor: pointer; 
  img{
    height: 45vh;
    width: 100%;
    object-fit: cover;
  }
`;


export default Game;