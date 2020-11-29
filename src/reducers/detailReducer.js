const initialState = {
  game: {platforms: []}, 
  screen: {results: []}, 
  isLoading: true, 
};
// Setting an initial state of empty arrays solves issue of 
// map not being able to read property of undefined
// as it tries to map before the api info is fetched.
// but there is another solution using redux where
// we an tell it to wait for it to load before trying to render
// this is where we add the property "isLoading"
// so if the state is set to isLoading, when the detail
// is fetched, we can set isLoading to false allowing the
// detail to be rendered.

const detailReducer = (state=initialState, action) => {
  switch(action.type){
    case"GET_DETAIL":
      return{
        ...state,
        game: action.payload.game,
        screen: action.payload.screen,
        isLoading: false,
      };
    case"LOADING_DETAIL":
      return{
        ...state,
        isLoading: true,
      };
    default:
      return{...state};
  }
};

export default detailReducer;