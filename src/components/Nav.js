import React, { useState } from "react";
// Styling and Animation
import styled from "styled-components";
import { motion } from "framer-motion";
import logo from "../img/logo.svg";
import { fadeIn } from "../animations";
// Redux and Routes
import { fetchSearch } from "../actions/gamesAction";
import { useDispatch } from "react-redux";

const Nav = () => {
  const dispatch = useDispatch();
  const [textInput, setTextInput] = useState("");

  const inputHandler = (e) => {
    setTextInput(e.target.value);
  };
  const submitSearch = (e) => {
    e.preventDefault();
    dispatch(fetchSearch(textInput));
    setTextInput(""); // clear field after search
  };
  const clearSearch = () => {
    dispatch({ type: "CLEAR_SEARCHED" });
  };

  return (
    <StyledNav variants={fadeIn} initial="hidden" animate="show">
      <Logo onClick={clearSearch}>
        <img src={logo} alt="logo" />
        <h1>ignite</h1>
      </Logo>
      <form className="search">
        <input onChange={inputHandler} value={textInput} type="text" />
        <button onClick={submitSearch} type="submit">
          Search
        </button>
      </form>
    </StyledNav>
  );
};

const StyledNav = styled(motion.nav)`
  padding: 3rem 5rem;
  text-align: center;
  @media only screen and (max-width: 600px) {
    padding: 1rem;
  }

  form {
    /* Mediea Queries in Home & Nav  */
    @media only screen and (max-width: 600px) {
      button {
        font-size: 1.2rem;
        padding: 0.5rem;
      }
      input {
        font-size: 1.2rem;
        width: 50%;
        min-width: 100px;
      }
    }
  }

  input {
    width: 30%;
    min-width: 250px;
    font-size: 1.5rem;
    padding: 0.4rem;
    margin-top: 1rem;
    box-shadow: 0px 0px 30px rgba(0, 0, 0, 0.2);
    outline: none;
    border: 2px solid rgba(3, 3, 3, 0.2);
  }

  button {
    font-size: 1.5rem;
    padding: 0.5rem 2rem;
    border: none;
    outline: none;
    background: #ff7676;
    color: white;
    cursor: pointer;
  }
`;

const Logo = styled(motion.div)`
  display: flex;
  justify-content: center;
  padding: 1rem;
  cursor: pointer;
  img {
    height: 2rem;
    width: 2rem;
  }
`;

export default Nav;
