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


