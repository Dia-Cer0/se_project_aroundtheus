import FormValidator from "../components/FormValidator.js";

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
const profileNameSelector = ".profile__name";
const profileDescriptionSelector = ".profile__subtitle";
const avatarSelector = ".profile__image";

const profile = {
  name: profileNameSelector,
  job: profileDescriptionSelector,
  avatar: avatarSelector,
};
const currentProfileName = document.querySelector(profileNameSelector);
const currentProfileDescription = document.querySelector(
  profileDescriptionSelector
);

const profileEditSelector = ".modal_type_profile-edit";
const profileEditModal = document.querySelector(profileEditSelector);
const profileForm = document.forms.profileForm;
const profileFormSelector = profileForm.className;

//global validation variables

const editProfileButton = document.querySelector(".profile__edit");
const editAvatarButton = document.querySelector(".profile__editImageIcon");
const profileNameInput = profileEditModal.querySelector(".modal__profile-name");
const profileDescriptionInput = profileEditModal.querySelector(
  ".modal__profile-description"
);
const saveProfileButton = profileEditModal.querySelector(".modal__save-button");

const avatarEditSelector = ".modal_type_avatar-edit";
const avatarEditModal = document.querySelector(avatarEditSelector);

/********************************************************************************* */

const addDestinationButton = document.querySelector(".profile__button");
const addDestinationSelector = ".modal_type_add-card";
const addDestinationModal = document.querySelector(addDestinationSelector);

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
const initialCards_old = [
  {
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/yosemite.jpg",
    name: "Yosemite Valley",
  },

  {
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/lake-louise.jpg",
    name: "Lake Louise",
  },
  {
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/bald-mountains.jpg",
    name: "Bald Mountains",
  },
  {
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/latemar.jpg",
    name: "Latemar",
  },
  {
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/vanoise.jpg",
    name: "Vanoise National Park",
  },
  {
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/lago.jpg",
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

const confirmModalSelector = ".modal_type_delete-confirm";
const deleteConfirmModal = document.querySelector(confirmModalSelector);

//validate import/export
const importStatus = "constants.js import successful";

//API
const token = "71f5bc36-47ff-474a-afa7-bfcc7399d91e";

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
  editProfileButton,
  editAvatarButton,
  profileNameInput,
  profileDescriptionInput,
  saveProfileButton,
  avatarEditSelector,
  avatarEditModal,
  addDestinationButton,
  addDestinationSelector,
  addDestinationModal,
  destinationFormTitle,
  destinationTitle,
  destinationImageUrl,
  cardTemplate,
  cardClassSelector,
  cardContainer,
  initialCards_old,
  closeButtons,
  cardForm,
  previewModalSelector,
  previewModal,
  previewModalImage,
  previewModalCaption,
  confirmModalSelector,
  deleteConfirmModal,
  importStatus,
  token,
};
