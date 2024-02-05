
const currentProfileName = document.querySelector('.profile__name');

const currentProfileDescription = document.querySelector('.profile__subtitle');

const modal = document.querySelector('.modal');

const modalContainer = modal.querySelector('.modal__container');

const editProfileButton = document.querySelector('.profile__edit');

const closeProfileEdit = modal.querySelector('.modal__close-icon');

const profileNameInput = modal.querySelector('.modal__profile-name');

const profileDescriptionInput = modal.querySelector('.modal__profile-description');

const saveProfileButton = modal.querySelector('.modal__save-button');

const cardTemplate = document.querySelector("#card").content;




const cardContainer = document.querySelector(".destinations.page__section");

let initialCards = [ yosemite = {
  link:"./images/yosemite.jpg",
  name: "Yosemite Valley"
},

{
  link:"./images/lake-louise.jpg",
  name: "Lake Louise"
},
{
  link:"./images/bald-mountains.jpg",
  name: "Bald Mountains"
},
{
  link:"./images/latemar.jpg",
  name: "Latemar"
},
{
  link:"./images/vanoise.jpg",
  name: "Vanoise National Park"
},
{
  link:"./images/lago.jpg",
  name: "Lago di Braies"
},
]

function toggleModal(){
    modal.classList.toggle('modal_opened');

}

function getCardElement(data){

  let cardElement = cardTemplate.querySelector(".destinations__card").cloneNode(true);

  cardElement.querySelector(".destinations__card-image").src =data.link;
  cardElement.querySelector(".destinations__card-image").alt= "Photo of " + data.name;
  cardElement.querySelector(".destinations__caption-text").textContent=data.name;

  return cardElement;
}

for(let n=0; n<6;n++){
  cardContainer.append(getCardElement(initialCards[n]));
}

editProfileButton.addEventListener("click",function(e){
  toggleModal();
  profileNameInput.value=currentProfileName.textContent;
  profileDescriptionInput.value=currentProfileDescription.textContent;

});

closeProfileEdit.addEventListener("click", function(e){
  toggleModal();
});

modalContainer.addEventListener("submit", function(e){

  e.preventDefault();
  currentProfileName.textContent=profileNameInput.value;
  currentProfileDescription.textContent=profileDescriptionInput.value;
  toggleModal();



})
