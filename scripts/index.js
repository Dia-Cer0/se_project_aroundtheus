/*Constant & variable declaration*/
const page = document.querySelector(".page");

let currentProfileName = document.querySelector(".profile__name");
let currentProfileDescription = document.querySelector(".profile__subtitle");

const profileEditModal = document.querySelector(".modal_type_profile-edit");

const closeButtons = document.querySelectorAll(".modal__close-icon");
const closeProfileButton = profileEditModal.querySelector(".modal__close-icon");

const editProfileButton = document.querySelector(".profile__edit");
const profileNameInput = profileEditModal.querySelector(".modal__profile-name");
console.log(currentProfileName.textContent);
let profileNameValue= "";
profileNameInput.value=profileNameValue;

console.log(profileNameInput.value);


const profileDescriptionInput = profileEditModal.querySelector(
  ".modal__profile-description"
);
let profileDescriptionValue = "";
profileDescriptionInput.value = profileDescriptionValue;

const saveProfileButton = profileEditModal.querySelector(".modal__save-button");
profileNameInput.value =currentProfileName.textContent;
profileDescriptionInput.value =currentProfileDescription.textContent;

const addDestinationButton = document.querySelector(".profile__button");
const addDestinationModal = document
  .querySelector(".modal_type_add-card");
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
destinationTitle.value=destinationTitleValue;
let destinationImageUrlValue ="";
destinationImageUrl.value = destinationImageUrlValue;



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
let previewModalCloseButton = previewModal.querySelector(".modal__close-icon_type_image");
let previewModalCaption = previewModal.querySelector(".modal__preview-caption");

/*function definitions*/
function openPopup(requestedModal,inputVariable1,inputVariable2){
requestedModal.classList.add("modal_opened");

if(inputVariable1 != null && inputVariable2 != null){

  let inputs = requestedModal.querySelectorAll("input");
  inputs[0].value=inputVariable1;
  inputs[1].value=inputVariable2;

  console.log("inputVariable1 = "+inputVariable1);

}

}


function closePopUp(close_button,inputVariable1,inputVariable2) {
  close_button.closest("div").classList.remove("modal_opened");

  if(inputVariable1 != null && inputVariable2 != null){
    let inputs = close_button.closest("div").querySelectorAll("input");

    inputVariable1=inputs[0].value;
    console.log("inputVariable1 close = "+ inputVariable1);
    inputVariable2=inputs[1].value;

    return [inputVariable1,inputVariable2];
  }

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
    previewModalImage.src=cardImage.src;
    previewModalCaption.textContent=cardImage.alt.split(" ").splice(2).join(" ");
    openPopup(previewModal);
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

  previewModalCaption.textContent = cardImage.alt.split(" ").splice(2).join(" ");
  previewModalImage.src=cardImage.src;
  previewModalImage.alt=cardImage.alt;

  return cardElement;
}

function renderCards(array) {
  array.forEach(function (item) {
    let newCard = getCardElement(item);

    cardContainer.append(newCard);

  });

}

editProfileButton.addEventListener("click", function (e) {
  profileNameInput.value = profileNameValue;
  profileDescriptionInput.value = profileDescriptionValue;
  openPopup(profileEditModal,profileNameValue,profileDescriptionValue);

});

closeProfileButton.addEventListener("click", function (e) {
  let profileData = closePopUp(closeProfileButton,profileNameValue,profileDescriptionValue);
  profileNameValue = profileData[0];
  profileDescriptionValue = profileData[1];

});

closeAddDestinationButton.addEventListener("click", function (e) {
  let destinationData=closePopUp(closeAddDestinationButton,destinationTitleValue,destinationImageUrlValue);
  destinationTitleValue=destinationData[0];
  destinationImageUrlValue = destinationData[1];
});
profileEditModal.addEventListener("submit", function (e) {
  e.preventDefault();

  let profileData = closePopUp(closeProfileButton,profileNameValue,profileDescriptionValue);
  profileNameValue = profileData[0];
  profileDescriptionValue = profileData[1];

  /*********ASSIGN FORM VALUES TO PROFILE ELEMENTS*****************/
  currentProfileName.textContent = profileNameValue;
  currentProfileDescription.textContent = profileDescriptionValue;
  /***************************************************************/

  /*************CLEAR FORM**************/
  profileNameValue="";
  profileDescriptionValue="";
  /************************************/
});

destinationForm.addEventListener("submit", function (e) {
  e.preventDefault();

  const newElement = getCardElement({
    name: destinationTitle.value,
    link: destinationImageUrl.value,
  });
  cardContainer.prepend(newElement);

  closePopUp(closeAddDestinationButton);
  destinationTitleValue="";
  destinationImageUrlValue="";
});

addDestinationButton.addEventListener("click", function (e) {

  destinationTitle.value = destinationTitleValue;
  destinationImageUrl.value = destinationImageUrlValue;
  openPopup(addDestinationModal,destinationTitleValue,destinationImageUrlValue);
});

renderCards(initialCards);

