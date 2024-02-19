/*Constant & variable declaration*/
const page = document.querySelector(".page");

const currentProfileName = document.querySelector(".profile__name");
const currentProfileDescription = document.querySelector(".profile__subtitle");

const modal = document.querySelector(".modal");
const profileEditModal = document.querySelector(".modal_type_profile-edit");
const modalContainer = modal.querySelector(".modal__container");

const closeProfileButton = modal.querySelector(".modal__close-icon");
const editProfileButton = document.querySelector(".profile__edit");
const profileNameInput = modal.querySelector(".modal__profile-name");
const profileDescriptionInput = modal.querySelector(
  ".modal__profile-description"
);
const saveProfileButton = modal.querySelector(".modal__save-button");

const addDestinationButton = document.querySelector(".profile__button");
const addDestinationModal = document
  .querySelector(".modal_add");
const closeAddDestinationButton =
  addDestinationModal.querySelector(".modal__close-icon");
addDestinationModal.classList.add("modal_type_add-destination");
const destinationForm = addDestinationModal.querySelector(
  ".modal_type_add-destination .modal__container"
);
const destinationFormTitle = addDestinationModal.querySelector(".modal__title");
const destinationTitle = addDestinationModal.querySelector(".modal__destination-title");
const destinationImageUrl = addDestinationModal.querySelector(".modal__destination-image-URL");
let destinationTitleValue = "";
let destinationImageUrlValue ="./images/yosemite.jpg";




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


const previewModal = document.querySelector(".modal_preview");
let previewModalImage = previewModal.querySelector(".modal__image");
let previewModalCloseButton = previewModal.querySelector(".modal__close-icon_type_image");
let previewModalCaption = previewModal.querySelector(".modal__preview-caption");
let cardImages = Array.from(document.querySelectorAll(".destinations__card-image"));
const trashIcons = Array.from(
  document.querySelectorAll(".destinations__trash-icon")
);

/*function definitions*/
function openPopup(){

}

function openProfileModal() {
  profileEditModal.classList.add("modal_opened");
}


function openDestinationModal() {
  addDestinationModal.classList.add("modal_opened");
  destinationTitle.value=destinationTitleValue;
  destinationImageUrl.value = destinationImageUrlValue;
}
function closePopUp(close_button) {
  close_button.closest("div").classList.remove("modal_opened");
}

function createImageModal(image,index,modalClass){
  let cardImageModal = modalTemplate.querySelector(".modal").cloneNode(true);

  cardImageModal.querySelector(".modal__container").remove();
  let modalFigure = document.createElement("figure");
  modalFigure.classList.add("modal__figure");

  let modalImageTitleText = document.createElement("figcaption");
  modalImageTitleText.classList.add("modal__image-title-text");
  modalImageTitleText.textContent = image.alt.split(" ").splice(2).join(" ");

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


  page.append(cardImageModal);

}

function openPreviewModal(image){

previewModalCaption.textContent = image.alt.split(" ").splice(2).join(" ");
previewModalImage.src=image.src;
previewModalImage.alt=image.alt;
previewModal.classList.add("modal_opened");
previewModal.classList.remove("modal_firstRun");
previewModal.classList.remove("modal_closed");
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
  cardImage.alt =
    "Photo of " + data.name;
  cardImage.addEventListener("click",function(){
    openPreviewModal(cardImage);
  })
  previewModalCloseButton.addEventListener("click",function(e){
    closePopUp(previewModalCloseButton);
  })

  deleteIcon.addEventListener("click", function(){
    deleteIcon.closest("div").remove();
  })

  likeIcon.addEventListener("click", function(){
    likeIcon.classList.toggle("destinations_caption-icon_style_liked");
  })

  cardElement.querySelector(".destinations__caption-text").textContent =
    data.name;



  return cardElement;
}

function renderCards(array) {
  array.forEach(function (item) {
    let newCard = getCardElement(item);

    cardContainer.append(newCard);

  });
  /*
  likeButtons = Array.from(
    document.querySelectorAll(".destinations__caption-icon")
  );
  likeButtons.forEach(function (item) {
    item.addEventListener("click", function (e) {
      e.preventDefault();
      item.classList.toggle("destinations_caption-icon_style_liked");
    });
  });


  let renderedCards = Array.from(document.querySelectorAll(".destinations__card"));
  let deleteIcons = Array.from(document.querySelectorAll(".destinations__trash-icon"));


  deleteIcons.forEach(function (item) {

    item.addEventListener("click", function () {
      item.closest("div").remove();
    });


  });
  */
  /*
  configureCardImages();
  */

}

/*
function configNewTrashIcon() {
  newTrashIcon = document.querySelector(".destinations__trash-icon");

    newTrashIcon.addEventListener("click", function (e) {
      newTrashIcon.closest("div").remove();
    });

  }

function configNewLikeIcon() {
  newLikeButton = document.querySelector(".destinations__caption-icon");


    newLikeButton.addEventListener("click", function (e) {
      e.preventDefault();
      newLikeButton.classList.toggle("destinations_caption-icon_style_liked");
    });
}

function configureCardImages(){
  cardImages = Array.from(document.querySelectorAll(".destinations__card-image"));

  cardImages.forEach(function(item,index){
    let modalClass = item.alt.split(' ').join('-') +"_" + index;
    let imageModal = document.querySelector("." + modalClass);


    item.addEventListener("click", function(e){

      openPreviewModal(item);

    })

    previewModalCloseButton.addEventListener("click",function(e){
      closePopUp(previewModalCloseButton);
    })
  })
}
*/
/*
function configNewImage(newCardImage=document.querySelector(".destinations__card-image"))
{

  newCardImage.addEventListener("click", function(e){

    openPreviewModal(newCardImage);

  })
}
*/

editProfileButton.addEventListener("click", function (e) {
  openProfileModal();
  profileNameInput.value = currentProfileName.textContent;
  profileDescriptionInput.value = currentProfileDescription.textContent;
});

closeProfileButton.addEventListener("click", function (e) {
  closePopUp(closeProfileButton);
});

closeAddDestinationButton.addEventListener("click", function (e) {
  closePopUp(closeAddDestinationButton);
});
profileEditModal.addEventListener("submit", function (e) {
  e.preventDefault();
  currentProfileName.textContent = profileNameInput.value;
  currentProfileDescription.textContent = profileDescriptionInput.value;
  closePopUp(closeProfileButton);
});

destinationForm.addEventListener("submit", function (e) {
  e.preventDefault();

  const newElement = getCardElement({
    name: destinationTitle.value,
    link: destinationImageUrl.value,
  });
  cardContainer.prepend(newElement);
  /*
  Trash icons and Like icons functions

  configNewTrashIcon();
  configNewLikeIcon();
  configNewImage();
  */
  closePopUp(closeAddDestinationButton);
});

addDestinationButton.addEventListener("click", function (e) {
  destinationTitle.value = "";
  destinationImageUrl.value = "";
  openDestinationModal();
});

renderCards(initialCards);

