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

let cardImages = Array.from(document.querySelectorAll(".destinations__card-image"));

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
  profileEditModal.classList.remove("modal_firstRun");
  profileEditModal.classList.add("modal_opened");
  profileEditModal.classList.remove("modal_closed");
}
function closeProfileModal() {
  profileEditModal.classList.remove("modal_opened");
  profileEditModal.classList.add("modal_closed");
}

function openDestinationModal() {
  destinationImageUrl.value = "./images/yosemite.jpg";
  addDestinationModal.classList.remove("modal_firstRun");
  addDestinationModal.classList.add("modal_opened");
  profileEditModal.classList.remove("modal_closed");
}
function closeDestinationModal() {
  addDestinationModal.classList.remove("modal_opened");
  profileEditModal.classList.add("modal_closed");
}

function createImageModal(image,index,modalClass){
  let cardImageModal = modalTemplate.querySelector(".modal").cloneNode(true);

  cardImageModal.querySelector(".modal__container").remove();
  let modalFigure = document.createElement("figure");
  modalFigure.classList.add("modal__figure");

  let modalImageTitleText = document.createElement("figcaption");
  modalImageTitleText.classList.add("modal__image-title-text");
  modalImageTitleText.textContent = image.alt;

  let modalImage = document.createElement("img");
  modalImage.src = image.src;
  modalImage.classList.add("modal__image");

  let closeModalImageButton = document.createElement("button");

  closeModalImageButton.classList.add("modal__close-image-icon");


  cardImageModal.append(modalFigure);
  modalFigure.append(modalImage);
  modalFigure.append(closeModalImageButton);

  modalFigure.append(modalImageTitleText);

  cardImageModal.classList.add(`${modalClass}`);
  console.log (modalClass);

  page.append(cardImageModal);

}

function openCardImageModal(modalName){
let imageModal = document.querySelector("." + modalName);
console.log(imageModal);
imageModal.classList.add("modal_opened");
imageModal.classList.remove("modal_firstRun");
imageModal.classList.remove("modal_closed");
}
function closeCardImageModal(){

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
  renderCardImages();
}

function renderCardImages(){
  cardImages = Array.from(document.querySelectorAll(".destinations__card-image"));

  cardImages.forEach(function(item,index){
    let modalClass = item.alt.split(' ').join('-') +"_" + index;
    let imageModal = document.querySelector("." + modalClass);
    let imageModalCloseButton = document.querySelector(".modal__close-image-icon");

    createImageModal(item,index,modalClass);

    imageModal = document.querySelector("." + modalClass);
    imageModalCloseButton = imageModal.querySelector(".modal__close-image-icon");
    let test = item.closest("div");
    console.log(imageModalCloseButton);
    console.log(test);

    item.addEventListener("click", function(e){
      openCardImageModal(modalClass);

    })


    console.log(imageModalCloseButton);
    imageModalCloseButton.addEventListener("click",function(e){
      imageModalCloseButton.closest("div").classList.remove("modal_opened");
      imageModalCloseButton.closest(".modal").classList.add("modal_closed");
    })
  })
}

function renderTrashIcons() {
  trashIcons = Array.from(
    document.querySelectorAll(".destinations__trash-icon")
  );

  trashIcons.forEach(function (item) {
    item.addEventListener("click", function (e) {
      item.closest("div").remove();
    });
  });
}

function renderLikeIcons() {
  likeButtons = Array.from(
    document.querySelectorAll(".destinations__caption-icon")
  );

  likeButtons.forEach(function (item) {
    item.addEventListener("click", function (e) {
      e.preventDefault();
      item.classList.toggle("destinations_caption-icon_style_liked");
    });
  });
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
  cardContainer.prepend(newElement);
  renderTrashIcons();
  renderLikeIcons();
  closeDestinationModal();
  renderCardImages();
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

renderCardImages();
renderLikeIcons();
renderTrashIcons();
