const page = document.querySelector(".page");

const currentProfileName = document.querySelector(".profile__name");

const currentProfileDescription = document.querySelector(".profile__subtitle");

const modal = document.querySelector(".modal");

const profileEditModal = document.querySelector(".modal_type_profile-edit");

const modalContainer = modal.querySelector(".modal__container");

const editProfileButton = document.querySelector(".profile__edit");

const addDestinationButton = document.querySelector(".profile__button");

const closeProfileButton = modal.querySelector(".modal__close-icon");

const profileNameInput = modal.querySelector(".modal__profile-name");

const profileDescriptionInput = modal.querySelector(
  ".modal__profile-description"
);

const saveProfileButton = modal.querySelector(".modal__save-button");

const cardTemplate = document.querySelector("#card").content;

const modalTemplate = document.querySelector("#modal-template").content;
const addDestinationModal = modalTemplate
  .querySelector(".modal")
  .cloneNode(true);
const closeAddDestinationButton =
  addDestinationModal.querySelector(".modal__close-icon");
addDestinationModal.classList.add("modal_type_add-destination");
const destinationForm = addDestinationModal.querySelector(
  ".modal_type_add-destination .modal__container"
);
let destinationFormTitle = addDestinationModal.querySelector(".modal__title");
let destinationTitle = addDestinationModal.querySelector(".modal__input-1");
let destinationImageUrl = addDestinationModal.querySelector(".modal__input-2");
destinationFormTitle.textContent = "New Place";
destinationTitle.placeholder = "Title";
destinationImageUrl.placeholder = "Image URL";
page.append(addDestinationModal);

const cardContainer = document.querySelector(".destinations.page__section");

let trashIcons = Array.from(
  document.querySelectorAll(".destinations__trash-icon")
);

let initialCards = [
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

function openProfileModal() {
  profileEditModal.classList.add("modal_opened");
}
function closeProfileModal() {
  profileEditModal.classList.remove("modal_opened");
}

function openDestinationModal() {
  addDestinationModal.classList.add("modal_opened");
}
function closeDestinationModal() {
  addDestinationModal.classList.remove("modal_opened");
}

function getCardElement(data) {
  let cardElement = cardTemplate
    .querySelector(".destinations__card")
    .cloneNode(true);

  cardElement.classList.add(data.name.replaceAll(" ", "_"));
  cardElement.querySelector(".destinations__card-image").src = data.link;
  cardElement.querySelector(".destinations__card-image").alt =
    "Photo of " + data.name;
  cardElement.querySelector(".destinations__caption-text").textContent =
    data.name;

  return cardElement;
}

function renderCards(array) {
  const renderedCards = Array.from(
    document.querySelectorAll(".destinations__card")
  );

  renderedCards.forEach(function (item) {
    let deleteIcon = item.querySelector(".destinations__trash-icon");
    deleteIcon.addEventListener("click", function () {
      deleteIcon.closest().remove;
    });
  });

  /*Need to add a filter function here to only render non-duplicate cards*/
  array.forEach(function (item) {
    cardContainer.append(getCardElement(item));
  });
}

function renderCard() {}

function createCard(...data) {
  initialCards.push({
    link: imageUrl,
    name: title,
  });

  renderCards();
  renderTrashIcons();
}

editProfileButton.addEventListener("click", function (e) {
  openProfileModal();
  profileNameInput.value = currentProfileName.textContent;
  profileDescriptionInput.value = currentProfileDescription.textContent;
});

closeProfileButton.addEventListener("click", function (e) {
  closeProfileModal();
});
closeAddDestinationButton.addEventListener("click", function (e) {
  closeDestinationModal();
});
profileEditModal.addEventListener("submit", function (e) {
  e.preventDefault();
  currentProfileName.textContent = profileNameInput.value;
  currentProfileDescription.textContent = profileDescriptionInput.value;
  closeProfileModal();
});

destinationForm.addEventListener("submit", function (e) {
  e.preventDefault();

  const newElement = getCardElement({
    name: destinationTitle.value,
    link: destinationImageUrl.value,
  });
  cardContainer.append(newElement);

  closeDestinationModal();
});

addDestinationButton.addEventListener("click", function (e) {
  destinationTitle.value = "";
  destinationImageUrl.value = "";
  openDestinationModal();
});

renderCards(initialCards);

/*
const renderedCards=Array.from(document.querySelectorAll(".destinations__card"));
*/

function renderTrashIcons() {
  trashIcons = Array.from(
    document.querySelectorAll(".destinations__trash-icon")
  );

  trashIcons.forEach(function (item) {
    item.addEventListener("click", function (e) {
      document.querySelector("." + item.closest("div").classList[1]).remove();
    });
  });
}

renderTrashIcons();
