/***********************************************************/
/*************************index.js**************************/
/***********************************************************/
//from sprint 9 theory: remember you can use form.elements."name-attribute" (no quotes)
//branch: sprint 9
//IMPORTS
/**********************************************************/
console.log("index.js loaded");

import "./index.css";
import FormValidator from "../components/FormValidator.js";
import Section from "../components/Section.js";
import Popup from "../components/Popup.js";
import PopupWithForm from "../components/PopupWithForm.js";
import PopupWithImage from "../components/PopupWithImage.js";
import UserInfo from "../components/UserInfo.js";
import {
  validatorConfig,
  profile,
  profileEditSelector,
  profileEditModal,
  editProfileButton,
  addDestinationButton,
  addDestinationSelector,
  addDestinationModal,
  destinationTitle,
  destinationImageUrl,
  cardClassSelector,
  initialCards,
  previewModalSelector,
  importStatus,
} from "../utils/constants.js";
console.log(`${importStatus} -> index.js`);

import Card from "../components/Card.js";
//import { handleImageClick } from "../utils/utils.js";
//////////////////////////////////////////////////////////////

//EVENT LISTENERS AND CLASS OPERATIONS
/*************************EDIT PROFILE***********************************/
const profileEditValidation = new FormValidator(
  validatorConfig,
  profileEditModal
);

profileEditValidation.enableValidation();

addDestinationModal.classList.add("modal_type_add-destination");
const destinationForm = addDestinationModal.querySelector(
  ".modal_type_add-destination .modal__container"
);

const profileUserData = new UserInfo(profile);

const profilePopup = new PopupWithForm({
  popupSelector: profileEditSelector,
  handleFormSubmit: (formData) => {
    formData.input1 = formData.profile_title;
    delete formData.profile_title;

    formData.input2 = formData.profile_description;
    delete formData.profile_description;

    profileUserData.setUserInfo(formData);
  },
});

profilePopup.setEventListeners(); //BULLET POINT #4 RESOLUTION

editProfileButton.addEventListener("click", (e) => {
  profilePopup.open(profileUserData.getUserInfo());
});

/************************************ADD DESTINATIONS******************************************/

const destinationEditValidation = new FormValidator(
  validatorConfig,
  addDestinationModal
);

destinationEditValidation.enableValidation();

//Create section class for destination cards
const cardSection = new Section(
  {
    items: initialCards,
    renderer: (cardObject) => {
      const newElement = new Card(cardObject, "#card", (data) => {
        imagePopup.open(data);
      });
      return newElement.getView();
    },
  },
  cardClassSelector
);

const imagePopup = new PopupWithImage({ popupSelector: previewModalSelector });

const addDestinationPopup = new PopupWithForm({
  popupSelector: addDestinationSelector,
  handleFormSubmit: (formData) => {
    console.log(formData);

    formData.link = formData.destination_image_URL;
    delete formData.destination_image_URL;

    formData.name = formData.destination_title;
    delete formData.destination_title;

    cardSection.addItem(formData); //BULLET POINT #12 RESOLUTION
    //test
  },
});

addDestinationPopup.setEventListeners(); //BULLET POINT #4 RESOLUTION

addDestinationButton.addEventListener("click", function (e) {
  addDestinationPopup.open();
  destinationEditValidation.toggleButtonState(); //BULLET POINT 2 RESOLUTION
});

/************************************LOAD INITIAL CARDS ONTO PAGE******************************************/

cardSection.renderItems();

//////////////////////////////////////////////////////////////////////
