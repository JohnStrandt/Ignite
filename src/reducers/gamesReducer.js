const initState = {
  upcoming: [],
  popular: [],
  newGames: [],
  searched: [],
}

const gamesReducer = (state=initState, action) => {
  switch(action.type){
    case "FETCH_GAMES":
      return {...state, 
        upcoming: action.payload.upcoming,
        popular: action.payload.popular,
        newGames: action.payload.newGames,
      };
    case "FETCH_SEARCHED":
      return {
        ...state,
        searched: action.payload.searched,
      };
    case "CLEAR_SEARCHED":
      return {
        ...state,
        searched: [],
      };
    default:
      return {...state};
  }
};

export default gamesReducer;