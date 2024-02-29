/*Constant & variable declaration*/
const page = document.querySelector(".page");

/*Profile Editing******************************************************************/
const currentProfileName = document.querySelector(".profile__name");
const currentProfileDescription = document.querySelector(".profile__subtitle");

const profileEditModal = document.querySelector(".modal_type_profile-edit");
const profileForm = document.forms.profileForm;

const editProfileButton = document.querySelector(".profile__edit");
const profileNameInput = profileEditModal.querySelector(".modal__profile-name");
console.log(currentProfileName.textContent);

console.log(profileNameInput.value);

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
const cardForm = document.forms.cardForm;

const previewModal = document.querySelector(".modal_type_preview");
const previewModalImage = previewModal.querySelector(".modal__image");
const previewModalCaption = previewModal.querySelector(
  ".modal__preview-caption"
);

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
  document.addEventListener("keydown", (e) => {
    console.log(e);
  });

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
  const cardElement = cardTemplate
    .querySelector(".destinations__card")
    .cloneNode(true);
  const cardImage = cardElement.querySelector(".destinations__card-image");
  const deleteIcon = cardElement.querySelector(".destinations__trash-icon");
  const likeIcon = cardElement.querySelector(".destinations__caption-icon");

  cardElement.classList.add(data.name.replaceAll(" ", "_"));
  cardImage.src = data.link;
  cardImage.alt = "Photo of " + data.name;
  cardImage.addEventListener("click", function () {
    previewModalImage.src = cardImage.src;
    previewModalImage.alt = cardImage.alt;
    previewModalCaption.textContent = data.name;
    openPopup(previewModal);
  });

  deleteIcon.addEventListener("click", function () {
    cardElement.remove();
  });

  likeIcon.addEventListener("click", function () {
    likeIcon.classList.toggle("destinations_caption-icon_style_liked");
  });

  cardElement.querySelector(".destinations__caption-text").textContent =
    data.name;

  return cardElement;
}

closeButtons.forEach(function (item) {
  const modal = item.closest(".modal");
  item.addEventListener("click", function () {
    closePopUp(modal);
  });
});

function renderCards(array) {
  array.forEach(function (item) {
    const newCard = getCardElement(item);

    cardContainer.append(newCard);
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

  const newElement = getCardElement({
    name: destinationTitle.value,
    link: destinationImageUrl.value,
  });
  cardContainer.prepend(newElement);

  closePopUp(addDestinationModal);

  e.target.reset();
});

addDestinationButton.addEventListener("click", function (e) {
  openPopup(addDestinationModal);
});

/***ESCAPE HANDLER */

/*****LEFT MOUSE CLICK HANDLER */

/****LOAD INITIAL CARDS ONTO PAGE */
renderCards(initialCards);

/*FORM VALIDATION*/

/***
 * enableValidation()
 * setEventListeners()
 *
 */

/*
const formElement = document.querySelector(".form");
const formInput = formElement.querySelector(".form__input");
const formError = formElement.querySelector(`.${formInput.id}-error`);
*/

/*
const toggleButtonState = (inputList, buttonElement) => {
  if (hasInvalidInput(inputList)) {
    //buttonElement.classList.add("form__submit_inactive");
  } else {
    //buttonElement.classList.remove("form__submit_inactive");
  }
};
*/
/*
const hasInvalidInput = (inputList) => {
  return inputList.some((inputElement) => {
    // If the field is invalid, the callback will return true.
    // The method will then stop, and hasInvalidInput() function will return true
    // hasInvalidInput returns true
    return !inputElement.validity.valid;
  });
};
*/

/*
const showInputError = (element) => {
  element.classList.add("form__input_type_error");

  formError.textContent = errorMessage;
  formError.classList.add("form__input-error_active");
};
*/

/*
const hideInputError = (element) => {
  element.classList.remove("form__input_type_error");

  formError.textContent = "";
  formError.classList.remove("form__input-error_active");
};
*/

//const checkInputValidity = () => {
/*
  if (!formInput.validity.valid) {
    // If NOT (!), show the error element
    showInputError(formInput);
  } else {
    // If it's valid, hide the error element
    hideInputError(formInput);
  }
  */
//call hideInputError or showInputError function based on logic here
//};

/*****************/

/*EXPERIMENTAL CONTEXT MENU CUSTOMIZATION
page.addEventListener("contextmenu", (e) => {
  //e.preventDefault();
  openPopup(contextMenu);
});
page.addEventListener("mousedown", (e) => {
  if (e.buttons === 1) {
    closePopUp(contextMenu);
  }
});

*/
