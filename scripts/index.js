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

/*function definitions*/
function openPopup(requestedModal) {
  requestedModal.classList.add("modal_opened");
}

function closePopUp(openedModal) {
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

renderCards(initialCards);
