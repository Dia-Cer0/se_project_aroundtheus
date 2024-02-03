let initialCards=[
  destination1={
    name:"Yosemite Valley",
    link:"https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/yosemite.jpg",


},
destination2={
  name:"Lake Louise",
  link:"https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/lake-louise.jpg",
},
destination3={
  name:"Bald Mountains",
  link:"https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/bald-mountains.jpg",
},
destination4={
  name:"Latemar",
  link:"https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/latemar.jpg",
},
destination5={
  name:"Vanoise National Park",
  link:"https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/vanoise.jpg",
},
destination6={
  name:"Lago di Braies",
  link:"https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/lago.jpg ",
},
];

let currentProfileName = document.querySelector('.profile__name');
console.log(currentProfileName.textContent);

let currentProfileDescription = document.querySelector('.profile__subtitle');
console.log(currentProfileDescription.textContent);

let modal = document.querySelector('.modal');
console.log(modal);

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

let data = [ yosemite = {
  link:"./images/yosemite.jpg",
  name: {
   image:"photo of yosemite valley",
   card_caption:"Yosemite Valley"
  }
},

lakeLouise = {
  link:"./images/lake-louise.jpg",
  name: {
   image:"photo of lake louise",
   card_caption:"Lake Louise"
  }
},
baldMountains = {
  link:"./images/bald-mountains.jpg",
  name: {
   image:"photo of the bald mountains",
   card_caption:"Bald Mountains"
  }
},
latemar = {
  link:"./images/latemar.jpg",
  name: {
   image:"photo of latemar",
   card_caption:"Latemar"
  }
},
vanoise = {
  link:"./images/vanoise.jpg",
  name: {
   image:"photo of 'vanoise park'",
   card_caption:"Vanoise National Park"
  }
},
lago = {
  link:"./images/lago.jpg",
  name: {
   image:"photo of lago di braies",
   card_caption:"Lago di Braies"
  }
},
]


function getCardElement(data){
  cardElement.querySelector(".destinations__card-image").src=data.link;
  cardElement.querySelector(".destinations__card-image").alt=data.name.image;
  cardElement.querySelector(".destinations__caption-text").textContent=data.name.card_caption;
  return cardElement.cloneNode(true);
}

for(let n=0; n<6;n++){
  cardContainer.append(getCardElement(data[n]));
}

editProfileButton.addEventListener("click",function(e){
  modal.classList.toggle('modal_opened');
  profileNameInput.value=currentProfileName.textContent;
  profileDescriptionInput.value=currentProfileDescription.textContent;

});

closeProfileEdit.addEventListener("click", function(e){
  modal.classList.toggle('modal_opened');
});

saveProfileButton.addEventListener("click",function(e){
  currentProfileName.textContent=profileNameInput.value;
  currentProfileDescription.textContent=profileDescriptionInput.value;
  modal.classList.toggle('modal_opened');
})


