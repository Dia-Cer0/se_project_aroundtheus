import "../favicon-chrome.png";
//import "../favicon.ico";
import "./index.css";

console.log("index.js loaded");

import Section from "../components/Section.js";

//import constants from constants.js
import {
  page,
  validatorConfig,
  currentProfileName,
  currentProfileDescription,
  profileEditModal,
  profileForm,
  profileEditValidation,
  editProfileButton,
  profileNameInput,
  profileDescriptionInput,
  saveProfileButton,
  addDestinationButton,
  addDestinationModal,
  destinationEditValidation,
  destinationFormTitle,
  destinationTitle,
  destinationImageUrl,
  cardTemplate,
  cardClassSelector,
  cardContainer,
  initialCards,
  closeButtons,
  cardForm,
  previewModal,
  previewModalImage,
  previewModalCaption,
  importStatus,
} from "../utils/constants.js";
console.log(`${importStatus} -> index.js`);

//import Card class from Card.js
import Card from "../components/Card.js";
//import FormValidator from "../utils/FormValidator.js";

//import renderCards function from utils.js
import {
  openPopup,
  closePopUp,
  handleImageClick,
  createCard,
  renderCards,
} from "../utils/utils.js";

profileEditValidation.enableValidation();

addDestinationModal.classList.add("modal_type_add-destination");
const destinationForm = addDestinationModal.querySelector(
  ".modal_type_add-destination .modal__container"
);

destinationEditValidation.enableValidation();

//Event Listeners & class instantiation
closeButtons.forEach(function (item) {
  const modal = item.closest(".modal");
  item.addEventListener("click", function () {
    closePopUp(modal);
  });
});

editProfileButton.addEventListener("click", function (e) {
  profileNameInput.value = currentProfileName.textContent;
  profileDescriptionInput.value = currentProfileDescription.textContent;

  openPopup(profileEditModal);
});

profileForm.addEventListener("submit", function (e) {
  e.preventDefault();

  closePopUp(profileEditModal);

  /*********ASSIGN FORM VALUES TO PROFILE ELEMENTS*****************/
  currentProfileName.textContent = profileNameInput.value;
  currentProfileDescription.textContent = profileDescriptionInput.value;

  /***************************************************************/
  e.target.reset();
});

destinationForm.addEventListener("submit", function (e) {
  e.preventDefault();

  const newCard = {
    link: destinationImageUrl.value,
    name: destinationTitle.textContent,
  };
  console.log(`destinationImageUrl.value:${destinationImageUrl.value}`);
  const addSection = new Section(
    {
      items: newCard,
      renderer: (cardObject) => {
        const newElement = new Card(cardObject, "#card", handleImageClick);
        return newElement.getView();
      },
    },
    cardClassSelector
  );

  addSection.addItem();

  closePopUp(addDestinationModal);

  e.target.reset();
});

addDestinationButton.addEventListener("click", function (e) {
  openPopup(addDestinationModal);
});

/****LOAD INITIAL CARDS ONTO PAGE */
//renderCards(initialCards);

const initialSection = new Section(
  {
    items: initialCards,
    renderer: (cardObject) => {
      const newElement = new Card(cardObject, "#card", handleImageClick);
      return newElement.getView();
    },
  },
  cardClassSelector
);

const itemTest = {
  link: require("../images/lake-louise.jpg"),
  name: "Lake Louise",
};

/*
const testSection = new Section(
  {
    items: itemTest,
    renderer: (cardObject) => {
      const newElement = new Card(cardObject, "#card", handleImageClick);
      return newElement.getView();
    },
  },
  cardClassSelector
);
*/

initialSection.renderItems();

//testSection.addItem();
