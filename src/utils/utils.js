//import from constants.js
import { cardContainer, previewModal } from "./constants.js";
import popupWithImage from "../components/PopupWithImage.js";
import { previewModalSelector } from "../utils/constants.js";

//import Card from Card.js
import Card from "../components/Card.js";

export function handleImageClick(data) {
  //this is where you can define src
  //and everything before opening the preview modal
  //openPopup(previewModal);
  const imagePopup = new popupWithImage(
    { popupSelector: previewModalSelector },
    data
  );
}
