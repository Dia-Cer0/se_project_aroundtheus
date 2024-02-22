/*Constant & variable declaration*/
const page = document.querySelector(".page");

/*Profile Editing******************************************************************/
let currentProfileName = document.querySelector(".profile__name");
let currentProfileDescription = document.querySelector(".profile__subtitle");

const profileEditModal = document.querySelector(".modal_type_profile-edit");

const editProfileButton = document.querySelector(".profile__edit");
const profileNameInput = profileEditModal.querySelector(".modal__profile-name");
console.log(currentProfileName.textContent);
profileNameInput.value = currentProfileName.textContent;

console.log(profileNameInput.value);

const profileDescriptionInput = profileEditModal.querySelector(
  ".modal__profile-description"
);
profileDescriptionInput.value = currentProfileDescription.textContent;

const saveProfileButton = profileEditModal.querySelector(".modal__save-button");
profileNameInput.value = currentProfileName.textContent;
profileDescriptionInput.value = currentProfileDescription.textContent;
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
destinationTitle.value = "";

destinationImageUrl.value = "";

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

const previewModal = document.querySelector(".modal_type_preview");
let previewModalImage = previewModal.querySelector(".modal__image");
let previewModalCaption = previewModal.querySelector(".modal__preview-caption");

const closeButtons = document.querySelectorAll(".modal__close-icon");

/*function definitions*/
function openPopup(requestedModal) {
  requestedModal.classList.add("modal_opened");
}

function closePopUp(openedModal) {
  openedModal.classList.remove("modal_opened");
}

function keepPopUpData() {}

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

  closeButtons.forEach(function (item) {
    item.addEventListener("click", function () {
      closePopUp(item.closest("div"));
    });
  });

  /*
  previewModalCloseButton.addEventListener("click", function (e) {
    closePopUp(previewModalCloseButton.closest("div"));
  });
  */

  deleteIcon.addEventListener("click", function () {
    deleteIcon.closest("div").remove();
  });

  likeIcon.addEventListener("click", function () {
    likeIcon.classList.toggle("destinations_caption-icon_style_liked");
  });

  cardElement.querySelector(".destinations__caption-text").textContent =
    data.name;

  /*
  previewModalCaption.textContent = cardImage.name;
  previewModalImage.src = cardImage.src;
  previewModalImage.alt = cardImage.alt;
  */

  return cardElement;
}

function renderCards(array) {
  array.forEach(function (item) {
    let newCard = getCardElement(item);

    cardContainer.append(newCard);
  });
}

editProfileButton.addEventListener("click", function (e) {
  openPopup(profileEditModal);
});

profileEditModal.addEventListener("submit", function (e) {
  e.preventDefault();

  closePopUp(profileEditModal);

  /*********ASSIGN FORM VALUES TO PROFILE ELEMENTS*****************/
  currentProfileName.textContent = profileNameInput.value;
  currentProfileDescription.textContent = profileDescriptionInput.value;
  /***************************************************************/
  currentProfileName = document.querySelector(".profile__name");
  currentProfileDescription = document.querySelector(".profile__subtitle");
  /*************CLEAR FORM**************/
  profileNameInput.value = currentProfileName.textContent;
  profileDescriptionValue = currentProfileDescription.textContent;
  /************************************/
});

destinationForm.addEventListener("submit", function (e) {
  e.preventDefault();

  const newElement = getCardElement({
    name: destinationTitle.value,
    link: destinationImageUrl.value,
  });
  cardContainer.prepend(newElement);

  closePopUp(addDestinationModal);
  destinationTitle.value = "";
  destinationImageUrl.value = "";
});

addDestinationButton.addEventListener("click", function (e) {
  openPopup(addDestinationModal);
});

renderCards(initialCards);
