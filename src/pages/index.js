import "./index.css";

console.log("index.js loaded");

import Section from "../components/Section.js";
import Popup from "../components/Popup.js";
import PopupWithForm from "../components/PopupWithForm.js";
import UserInfo from "../components/UserInfo.js";

//import constants from constants.js
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

const profileUserData = new UserInfo(profile);

const profilePopup = new PopupWithForm({
  popupSelector: profileEditSelector,
  handleFormSubmit: (formData) => {
    profileUserData.setUserInfo(formData);
  },
});

editProfileButton.addEventListener("click", function (e) {
  profilePopup.open(profileUserData.getUserInfo());
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

destinationForm.addEventListener("submit", function (e) {
  e.preventDefault();

  const newCard = {
    link: destinationImageUrl.value,
    name: destinationTitle.textContent,
  };

  addDestinationPopup._submit();
  /*
  closePopUp(addDestinationModal);

  e.target.reset();
  */
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

//popupTest.close();

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
const newCardPopup = new PopupWithForm({
  popupSelector: profileEditSelector,
  handleFormSubmit: (formData) => {
    console.log("formData:");
    console.log(formData);
  },
});
newCardPopup;

initialSection.renderItems();

const profile1 = new UserInfo(profile);

//console.log(profile1.getUserInfo());

//testSection.addItem();
