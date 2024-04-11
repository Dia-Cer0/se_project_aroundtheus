/***********************************************************/
/*************************index.js**************************/
/***********************************************************/
//IMPORTS
/**********************************************************/
console.log("index.js loaded");

import "./index.css";
import Section from "../components/Section.js";
import Popup from "../components/Popup.js";
import PopupWithForm from "../components/PopupWithForm.js";
import UserInfo from "../components/UserInfo.js";
import {
  page,
  validatorConfig,
  profile,
  currentProfileName,
  currentProfileDescription,
  profileEditSelector,
  profileEditModal,
  profileForm,
  profileFormSelector,
  profileEditValidation,
  editProfileButton,
  profileNameInput,
  profileDescriptionInput,
  saveProfileButton,
  addDestinationButton,
  addDestinationSelector,
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

import Card from "../components/Card.js";
import {
  openPopup,
  closePopUp,
  handleImageClick,
  createCard,
  renderCards,
} from "../utils/utils.js";

//EVENT LISTENERS AND CLASS OPERATIONS
/************************************************************/
profileEditValidation.enableValidation();

addDestinationModal.classList.add("modal_type_add-destination");
const destinationForm = addDestinationModal.querySelector(
  ".modal_type_add-destination .modal__container"
);

destinationEditValidation.enableValidation();

/*************************REFACTOR************************************/
closeButtons.forEach(function (item) {
  const modal = item.closest(".modal");
  item.addEventListener("click", function () {
    closePopUp(modal);
  });
});
/*************************REFACTOR************************************/

const profileUserData = new UserInfo(profile);

const profilePopup = new PopupWithForm({
  popupSelector: profileEditSelector,
  handleFormSubmit: (formData) => {
    profileUserData.setUserInfo(formData);
  },
});

/*************************REFACTOR************************************/
editProfileButton.addEventListener("click", function (e) {
  profilePopup.open(profileUserData.getUserInfo());
});
/*************************REFACTOR************************************/

/*************************REFACTOR************************************/
profileForm.addEventListener("submit", function (e) {
  e.preventDefault();

  closePopUp(profileEditModal);

  /*********ASSIGN FORM VALUES TO PROFILE ELEMENTS*****************/
  currentProfileName.textContent = profileNameInput.value;
  currentProfileDescription.textContent = profileDescriptionInput.value;

  /***************************************************************/
  e.target.reset();
});
/*************************REFACTOR************************************/

const addDestinationPopup = new PopupWithForm({
  popupSelector: addDestinationSelector,
  handleFormSubmit: (formData) => {
    const addSection = new Section(
      {
        items: { link: formData.input2, name: formData.input1 },
        renderer: (cardObject) => {
          console.log(`from renderer: ${cardObject.input1}`);
          const newElement = new Card(cardObject, "#card", handleImageClick);

          return newElement.getView();
        },
      },
      cardClassSelector
    );

    addSection.addItem();
  },
});

/*************************REFACTOR************************************/
destinationForm.addEventListener("submit", function (e) {
  e.preventDefault();

  const newCard = {
    link: destinationImageUrl.value,
    name: destinationTitle.textContent,
  };

  addDestinationPopup._submit();
  destinationEditValidation.toggleButtonState();
});
/*************************REFACTOR************************************/

/*************************REFACTOR************************************/
addDestinationButton.addEventListener("click", function (e) {
  openPopup(addDestinationModal);
});
/*************************REFACTOR************************************/

/****LOAD INITIAL CARDS ONTO PAGE */
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

initialSection.renderItems();
