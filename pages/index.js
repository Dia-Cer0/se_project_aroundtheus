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

const cardData = {
  link: "./images/yosemite.jpg",
  name: "Yosemite Valley",
};

const card = new Card(cardData, "#card", handleImageClick);

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
  console.log("escapeHandler called ");
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

function getCardElement(data) {
  /*
  const cardElement = cardTemplate
    .querySelector(".destinations__card")
    .cloneNode(true);
    */
  //const cardImage = cardElement.querySelector(".destinations__card-image");
  //const deleteIcon = cardElement.querySelector(".destinations__trash-icon");
  // const likeIcon = cardElement.querySelector(".destinations__caption-icon");
  //cardElement.classList.add(data.name.replaceAll(" ", "_"));
  //cardImage.src = data.link;
  //cardImage.alt = "Photo of " + data.name;
  /*
  cardImage.addEventListener("click", function () {
    previewModalImage.src = cardImage.src;
    previewModalImage.alt = cardImage.alt;
    previewModalCaption.textContent = data.name;
    handleImageClick(previewModal);
  });
  */
  /*
  deleteIcon.addEventListener("click", function () {
    cardElement.remove();
  });
  */
  /*
  likeIcon.addEventListener("click", function () {
    likeIcon.classList.toggle("destinations_caption-icon_style_liked");
  });
  */
  /*
  cardElement.querySelector(".destinations__caption-text").textContent =
    data.name;
    */
  //return cardElement;
}

closeButtons.forEach(function (item) {
  const modal = item.closest(".modal");
  item.addEventListener("click", function () {
    closePopUp(modal);
  });
});

function renderCards(array) {
  array.forEach(function (item) {
    const card = new Card(item, "#card", handleImageClick);
    //const newCard = getCardElement(item);

    //cardContainer.append(newCard);
    cardContainer.append(card.getView());
  });
}

editProfileButton.addEventListener("click", function (e) {
  profileNameInput.value = currentProfileName.textContent;
  profileDescriptionInput.value = currentProfileDescription.textContent;

  const profileEditValidation = new FormValidator(
    validatorConfig,
    profileEditModal
  );

  profileEditValidation.enableValidation();
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

  const newElement = new Card(
    {
      name: destinationTitle.value,
      link: destinationImageUrl.value,
    },
    "#card",
    handleImageClick
  );
  cardContainer.prepend(newElement.getView());

  closePopUp(addDestinationModal);

  e.target.reset();
});

addDestinationButton.addEventListener("click", function (e) {
  const destinationEditValidation = new FormValidator(
    validatorConfig,
    addDestinationModal
  );

  destinationEditValidation.enableValidation();
  openPopup(addDestinationModal);
});

/***ESCAPE HANDLER */

/*****LEFT MOUSE CLICK HANDLER */

/****LOAD INITIAL CARDS ONTO PAGE */
renderCards(initialCards);
