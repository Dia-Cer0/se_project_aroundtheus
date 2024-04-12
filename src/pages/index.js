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
import { handleImageClick } from "../utils/utils.js";
//////////////////////////////////////////////////////////////

//EVENT LISTENERS AND CLASS OPERATIONS
/*************************EDIT PROFILE***********************************/
profileEditValidation.enableValidation();

addDestinationModal.classList.add("modal_type_add-destination");
const destinationForm = addDestinationModal.querySelector(
  ".modal_type_add-destination .modal__container"
);

const profileUserData = new UserInfo(profile);

const profilePopup = new PopupWithForm({
  popupSelector: profileEditSelector,
  handleFormSubmit: (formData) => {
    profileUserData.setUserInfo(formData);
  },
});

editProfileButton.addEventListener("click", (e) => {
  profilePopup.open(profileUserData.getUserInfo());
});

/************************************ADD DESTINATIONS******************************************/
destinationEditValidation.enableValidation();

const addDestinationPopup = new PopupWithForm({
  popupSelector: addDestinationSelector,
  handleFormSubmit: (formData) => {
    const addSection = new Section(
      {
        items: { link: formData.input2, name: formData.input1 },
        renderer: (cardObject) => {
          const newElement = new Card(cardObject, "#card", handleImageClick);

          return newElement.getView();
        },
      },
      cardClassSelector
    );

    addSection.addItem();
    destinationEditValidation.toggleButtonState();
  },
});

addDestinationButton.addEventListener("click", function (e) {
  addDestinationPopup.open();
});

/************************************LOAD INITIAL CARDS ONTO PAGE******************************************/
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

//////////////////////////////////////////////////////////////////////
