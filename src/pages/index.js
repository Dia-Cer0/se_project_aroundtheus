/***********************************************************/
/*************************index.js**************************/
/***********************************************************/

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
    console.log(formData);

    const input1 = formData.find((obj) => {
      return obj.inputname === "profile_title";
    });
    const input2 = formData.find((obj) => {
      return obj.inputname === "profile_description";
    });
    const processedFormData = {
      input1: input1.inputvalue,
      input2: input2.inputvalue,
    };

    profileUserData.setUserInfo(processedFormData);
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

const imagePopup = new PopupWithImage(
  { popupSelector: previewModalSelector },
  { name: "", link: "" }
);

const addDestinationPopup = new PopupWithForm({
  popupSelector: addDestinationSelector,
  handleFormSubmit: (formData) => {
    console.log(formData);

    const input1 = formData.find((obj) => {
      return obj.inputname === "destination_title";
    });
    const input2 = formData.find((obj) => {
      return obj.inputname === "destination_image_URL";
    });
    const processedFormData = {
      name: input1.inputvalue,
      link: input2.inputvalue,
    };
    cardSection.addItem({
      link: processedFormData.link,
      name: processedFormData.name,
    }); //BULLET POINT #12 RESOLUTION
    //test
  },
});

addDestinationPopup.setEventListeners(); //BULLET POINT #4 RESOLUTION

addDestinationButton.addEventListener("click", function (e) {
  addDestinationPopup.open({
    destination_title: destinationTitle.value,
    destination_image_URL: destinationImageUrl.value,
  });
  destinationEditValidation.toggleButtonState(); //BULLET POINT 2 RESOLUTION
});

/************************************LOAD INITIAL CARDS ONTO PAGE******************************************/

cardSection.renderItems();

//////////////////////////////////////////////////////////////////////
