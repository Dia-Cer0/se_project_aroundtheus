//import from constants.js
import { cardContainer, previewModal } from "./constants.js";
import PopupWithImage from "../components/PopupWithImage.js";
import { previewModalSelector } from "../utils/constants.js";

//import Card from Card.js
import Card from "../components/Card.js";

/*
export function handleImageClick(data) {
  //this is where you can define src
  //and everything before opening the preview modal
  //openPopup(previewModal);
  console.log(data);
  const imagePopup = new PopupWithImage(
    { popupSelector: previewModalSelector },
    data
  );
  imagePopup.open(data._cardImage);
}
*/

//ISSUE #9 CREATE A SEPARATE FUNCTION createCard FOR CREATING A CARD TO FOLLOW DRY CODE PRINCIPLES ( need to review code and determine where this needs to be implemented)
//RAN OUT OF TIME AND DID NOT INCLUDE IN CURRENT SUBMISSION
