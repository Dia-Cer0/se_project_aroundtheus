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
const ProfileNameSelector = ".profile__name";
const ProfileDescriptionSelector = ".profile__subtitle";
const profile = { name: ProfileNameSelector, job: ProfileDescriptionSelector };
const currentProfileName = document.querySelector(ProfileNameSelector);
const currentProfileDescription = document.querySelector(
  ProfileDescriptionSelector
);

const profileEditSelector = ".modal_type_profile-edit";
const profileEditModal = document.querySelector(profileEditSelector);
const profileForm = document.forms.profileForm;
const profileFormSelector = profileForm.className;

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
const addDestinationSelector = ".modal_type_add-card";
const addDestinationModal = document.querySelector(addDestinationSelector);
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

const previewModalSelector = ".modal_type_preview";
const previewModal = document.querySelector(previewModalSelector);
const previewModalImage = previewModal.querySelector(".modal__image");
const previewModalCaption = previewModal.querySelector(
  ".modal__preview-caption"
);

//validate import/export
const importStatus = "constants.js import successful";

export {
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
};
