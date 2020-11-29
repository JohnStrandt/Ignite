import axios from "axios";
import { gameDetailsURL, gameScreenshotURL } from "../api";

export const loadDetail = (id) => async (dispatch) => {
  
  dispatch({
    type: "LOADING_DETAIL",
  });
  // dispatching LOADING_DETAIL, sets the isLoading boolean in
  // the detailReducer to true.  then we use this as an argument
  // in a conditional render in GameDetail.  So it will wait for 
  // isLoading to be false before it tries to render.  that way,
  // everything will work nicely, and there will be no error 
  // of cannot map over property undefined

  const detailData = await axios.get(gameDetailsURL(id));
  const screenShotData = await axios.get(gameScreenshotURL(id));

    dispatch({
      type: "GET_DETAIL",
      payload: {
        game: detailData.data,
        screen: screenShotData.data,
      },
  });

};