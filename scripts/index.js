
let currentProfileName = document.querySelector('.profile__name');
console.log(currentProfileName.textContent);

let currentProfileDescription = document.querySelector('.profile__subtitle');
console.log(currentProfileDescription.textContent);

let modal = document.querySelector('.modal');
console.log(modal);

let modalContainer = modal.querySelector('.modal__container');

let editProfileButton = document.querySelector('.profile__edit');
console.log(editProfileButton);

let closeProfileEdit = modal.querySelector('.modal__close-icon');
console.log(closeProfileEdit);

let profileNameInput = modal.querySelector('.modal__profile-name');
console.log(profileNameInput);

let profileDescriptionInput = modal.querySelector('.modal__profile-description');

let saveProfileButton = modal.querySelector('.modal__save-button');

let cardTemplate = document.querySelector("#card").content;
let cardElement = cardTemplate.querySelector(".destinations__card").cloneNode(true);
let cardContainer = document.querySelector(".destinations.page__section");

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
  cardElement.querySelector(".destinations__card-image").src=data.link;
  cardElement.querySelector(".destinations__card-image").alt= "Photo of " + data.name;
  cardElement.querySelector(".destinations__caption-text").textContent=data.name;
  return cardElement.cloneNode(true);
}

for(let n=0; n<6;n++){
  cardContainer.append(getCardElement(initialCards[n]));
}

editProfileButton.addEventListener("click",function(e){
  modal.classList.toggle('modal_opened');
  profileNameInput.value=currentProfileName.textContent;
  profileDescriptionInput.value=currentProfileDescription.textContent;

});

closeProfileEdit.addEventListener("click", function(e){
  toggleModal();
});

modalContainer.addEventListener("submit", function(e){
  toggleModal();
  e.preventDefault();
  currentProfileName.textContent=profileNameInput.value;
  currentProfileDescription.textContent=profileDescriptionInput.value;
  toggleModal();

})

saveProfileButton.addEventListener('click',function(e){
  toggleModal();
  e.preventDefault();
  currentProfileName.textContent=profileNameInput.value;
  currentProfileDescription.textContent=profileDescriptionInput.value;

})


