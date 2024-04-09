import FormValidator from "../utils/FormValidator.js";
const yosemiteImage = new URL("../images/yosemite.jpg", import.meta.url);

//FormValidator Settings
/*
const validationConfig = {
  formSelector: ".modal__container",
  inputSelector: ".modal__input",
  submitButtonSelector: ".modal__save-button",
  inactiveButtonClass: "modal__button_disabled",
  inputErrorClass: "modal__input_type_error",
  errorClass: "modal__error_visible",
};
*/

/*Constant & variable declaration*/
const page = document.querySelector(".page");

const validatorConfig = {
  formSelector: ".modal__container",
  inputSelector: ".modal__input",
  submitButtonSelector: ".modal__save-button",
  inactiveButtonClass: "modal__button_disabled",
  inputErrorClass: "modal__input_type_error",
  errorClass: "modal__error_visible",
};

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

const editProfileButton = document.querySelector(".profile__edit");
const profileNameInput = profileEditModal.querySelector(".modal__profile-name");
const profileDescriptionInput = profileEditModal.querySelector(
  ".modal__profile-description"
);
const saveProfileButton = profileEditModal.querySelector(".modal__save-button");

/********************************************************************************* */

const addDestinationButton = document.querySelector(".profile__button");
const addDestinationModal = document.querySelector(".modal_type_add-card");
const destinationEditValidation = new FormValidator(
  validatorConfig,
  addDestinationModal
);
const destinationFormTitle = addDestinationModal.querySelector(".modal__title");
const destinationTitle = addDestinationModal.querySelector(
  ".modal__destination-title"
);
const destinationImageUrl = addDestinationModal.querySelector(
  ".modal__destination-image-URL"
);

const cardTemplate = document.querySelector("#card").content;
const cardClassSelector = ".destinations.page__section";
const cardContainer = document.querySelector(cardClassSelector);
const initialCards = [
  {
    link: yosemiteImage,
    name: "Yosemite Valley",
  },

  {
    link: require("../images/lake-louise.jpg"),
    name: "Lake Louise",
  },
  {
    link: require("../images/bald-mountains.jpg"),
    name: "Bald Mountains",
  },
  {
    link: require("../images/latemar.jpg"),
    name: "Latemar",
  },
  {
    link: require("../images/vanoise.jpg"),
    name: "Vanoise National Park",
  },
  {
    link: require("../images/lago.jpg"),
    name: "Lago di Braies",
  },
];
const closeButtons = document.querySelectorAll(".modal__close-icon");

const cardForm = document.forms.cardForm;

const previewModal = document.querySelector(".modal_type_preview");
const previewModalImage = previewModal.querySelector(".modal__image");
const previewModalCaption = previewModal.querySelector(
  ".modal__preview-caption"
);

//validate import/export
const importStatus = "constants.js import successful";

export {
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
};
