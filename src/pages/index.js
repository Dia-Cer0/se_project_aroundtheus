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
import PopupWithImage from "../components/PopupWithImage.js";
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
  previewModalSelector,
  previewModal,
  previewModalImage,
  previewModalCaption,
  importStatus,
} from "../utils/constants.js";
console.log(`${importStatus} -> index.js`);

import Card from "../components/Card.js";
//import { handleImageClick } from "../utils/utils.js";
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
const imagePopup = new PopupWithImage(
  { popupSelector: previewModalSelector },
  { name: "", link: "" }
);
const addDestinationPopup = new PopupWithForm({
  popupSelector: addDestinationSelector,
  handleFormSubmit: (formData) => {
    //ISSUE #8 THERE SHOULD ONLY BE ONE INSTANCE OF SECTION BECAUSE THERE IS ONLY ONE SECTION FOR THE CARDS
    const addSection = new Section(
      {
        items: { link: formData.input2, name: formData.input1 },
        renderer: (cardObject) => {
          const newElement = new Card(cardObject, "#card", (data) => {
            console.log("data:");
            console.log(data);

            imagePopup.open(data);
          });

          return newElement.getView();
        },
      },
      cardClassSelector
    );

    addSection.addItem();
  },
});

addDestinationButton.addEventListener("click", function (e) {
  addDestinationPopup.open();
  destinationEditValidation.toggleButtonState(); //BULLET POINT 2 RESOLUTION
});

/************************************LOAD INITIAL CARDS ONTO PAGE******************************************/

//ISSUE #8 THERE SHOULD ONLY BE ONE INSTANCE OF SECTION BECAUSE THERE IS ONLY ONE SECTION FOR THE CARDS
const initialSection = new Section(
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

initialSection.renderItems();

//////////////////////////////////////////////////////////////////////
