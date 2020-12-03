
// Resize the large images in the api

export const smallImage = (imagePath, size) => {

  let image;
  if (imagePath) {
    image = imagePath.match(/media\/screenshots/)
      ? imagePath.replace(
          "media/screenshots",
          `media/resize/${size}/-/screenshots`
        )
      : imagePath.replace("/media/games", `/media/resize/${size}/-/games`);
  } else {
    image = imagePath;
  }

  return image;
};

//    Some of my api searches were returning without a background image:
//    background_image(pin):null
//    ...and crashing the app!!
//    This is why we check if there is an imagePath