console.log("index.js loaded");
import Card from "../components/Card.js";
import FormValidator from "../components/FormValidator.js";

const profileFormConfig = {};

const cardFormConfig = {};

const validatorConfig = {
  formSelector: ".modal__container",
  inputSelector: ".modal__input",
  submitButtonSelector: ".modal__save-button",
  inactiveButtonClass: "modal__button_disabled",
  inputErrorClass: "modal__input_type_error",
  errorClass: "modal__error_visible",
};

/*
const validator = new FormValidator(validatorConfig);
validator.enableValidation();
*/

//FormValidator Settings
const validationConfig = {
  formSelector: ".modal__container",
  inputSelector: ".modal__input",
  submitButtonSelector: ".modal__save-button",
  inactiveButtonClass: "modal__button_disabled",
  inputErrorClass: "modal__input_type_error",
  errorClass: "modal__error_visible",
};

/*Constant & variable declaration*/
const page = document.querySelector(".page");

/*Profile Editing******************************************************************/
const currentProfileName = document.querySelector(".profile__name");
const currentProfileDescription = document.querySelector(".profile__subtitle");

const profileEditModal = document.querySelector(".modal_type_profile-edit");
const profileForm = document.forms.profileForm;

//global validation variables
const profileEditValidation = new FormValidator(
  validatorConfig,
  profileEditModal
);
profileEditValidation.enableValidation();

const editProfileButton = document.querySelector(".profile__edit");
const profileNameInput = profileEditModal.querySelector(".modal__profile-name");
const profileDescriptionInput = profileEditModal.querySelector(
  ".modal__profile-description"
);

const saveProfileButton = profileEditModal.querySelector(".modal__save-button");

/********************************************************************************* */

const addDestinationButton = document.querySelector(".profile__button");
const addDestinationModal = document.querySelector(".modal_type_add-card");
addDestinationModal.classList.add("modal_type_add-destination");
const destinationForm = addDestinationModal.querySelector(
  ".modal_type_add-destination .modal__container"
);

const destinationEditValidation = new FormValidator(
  validatorConfig,
  addDestinationModal
);

destinationEditValidation.enableValidation();

const destinationFormTitle = addDestinationModal.querySelector(".modal__title");
const destinationTitle = addDestinationModal.querySelector(
  ".modal__destination-title"
);
const destinationImageUrl = addDestinationModal.querySelector(
  ".modal__destination-image-URL"
);

const cardTemplate = document.querySelector("#card").content;
const cardContainer = document.querySelector(".destinations.page__section");
const initialCards = [
  {
    link: "./images/yosemite.jpg",
    name: "Yosemite Valley",
  },

  {
    link: "./images/lake-louise.jpg",
    name: "Lake Louise",
  },
  {
    link: "./images/bald-mountains.jpg",
    name: "Bald Mountains",
  },
  {
    link: "./images/latemar.jpg",
    name: "Latemar",
  },
  {
    link: "./images/vanoise.jpg",
    name: "Vanoise National Park",
  },
  {
    link: "./images/lago.jpg",
    name: "Lago di Braies",
  },
];

const cardForm = document.forms.cardForm;

const previewModal = document.querySelector(".modal_type_preview");
const previewModalImage = previewModal.querySelector(".modal__image");
const previewModalCaption = previewModal.querySelector(
  ".modal__preview-caption"
);
function handleImageClick(data) {
  //this is where you can define src
  //and everything before opening the preview modal
  openPopup(previewModal);
}

const closeButtons = document.querySelectorAll(".modal__close-icon");

/*contextMenu to experiment with event handling conceppts*/
const contextMenu = document.querySelector(".context-menu");
const escapeHandler = (e) => {
  if (e.key === "Escape") {
    closePopUp(document.querySelector(".modal_opened"));

    console.log(e);
  }
};

const leftMouseClickHandler = (e) => {
  const isModal = e.target.classList.contains("modal");
  if (e.buttons === 1 && isModal) {
    closePopUp(e.target);
  }
};

/*function definitions*/
function openPopup(requestedModal) {
  requestedModal.classList.add("modal_opened");
  document.addEventListener("keydown", escapeHandler);
  requestedModal.addEventListener("mousedown", leftMouseClickHandler);
}

function closePopUp(openedModal) {
  document.removeEventListener("keydown", escapeHandler);
  openedModal.removeEventListener("mousedown", leftMouseClickHandler);
  openedModal.classList.remove("modal_opened");
}

closeButtons.forEach(function (item) {
  const modal = item.closest(".modal");
  item.addEventListener("click", function () {
    closePopUp(modal);
  });
});

const createCard = (item, card, foo) => {
  const newCard = new Card(item, card, foo);
  return newCard.getView();
};

function renderCards(array) {
  array.forEach(function (item) {
    cardContainer.append(createCard(item, "#card", handleImageClick));
  });
}

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

  cardContainer.prepend(
    createCard(
      {
        name: destinationTitle.value,
        link: destinationImageUrl.value,
      },
      "#card",
      handleImageClick
    )
  );

  closePopUp(addDestinationModal);

  e.target.reset();
  destinationEditValidation.toggleButtonState();
});

addDestinationButton.addEventListener("click", function (e) {
  openPopup(addDestinationModal);
});

/***ESCAPE HANDLER */

/*****LEFT MOUSE CLICK HANDLER */

/****LOAD INITIAL CARDS ONTO PAGE */
renderCards(initialCards);
