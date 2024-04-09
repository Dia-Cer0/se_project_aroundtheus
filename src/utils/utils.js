//import from constants.js
import { cardContainer, previewModal } from "./constants.js";

//import Card from Card.js
import Card from "../components/Card.js";

/***ESCAPE HANDLER */
const escapeHandler = (e) => {
  if (e.key === "Escape") {
    closePopUp(document.querySelector(".modal_opened"));

    console.log(e);
  }
};

/*LEFT MOUSE CLICK HANDLER */
const leftMouseClickHandler = (e) => {
  const isModal = e.target.classList.contains("modal");
  if (e.buttons === 1 && isModal) {
    closePopUp(e.target);
  }
};

export function openPopup(requestedModal) {
  requestedModal.classList.add("modal_opened");
  document.addEventListener("keydown", escapeHandler);
  requestedModal.addEventListener("mousedown", leftMouseClickHandler);
}

export function closePopUp(openedModal) {
  document.removeEventListener("keydown", escapeHandler);
  openedModal.removeEventListener("mousedown", leftMouseClickHandler);
  openedModal.classList.remove("modal_opened");
}

export function handleImageClick(data) {
  //this is where you can define src
  //and everything before opening the preview modal
  openPopup(previewModal);
}

export const createCard = (item, card, foo) => {
  const newCard = new Card(item, card, foo);
  return newCard.getView();
};

export function renderCards(array) {
  array.forEach(function (item) {
    cardContainer.append(createCard(item, "#card", handleImageClick));
  });
}
