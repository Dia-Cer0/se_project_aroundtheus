/***********************************************************/
/*************************index.js**************************/
/***********************************************************/
//from sprint 9 theory: remember you can use form.elements."name-attribute" (no quotes)
//branch: sprint_9'
//"token":"71f5bc36-47ff-474a-afa7-bfcc7399d91e"
//IMPORTS
/**********************************************************/
console.log("index.js loaded");

import "./index.css";
import FormValidator from "../components/FormValidator.js";
import Section from "../components/Section.js";
import Popup from "../components/Popup.js";
import PopupWithForm from "../components/PopupWithForm.js";
import PopupWithImage from "../components/PopupWithImage.js";
import UserInfo from "../components/UserInfo.js";
import Api from "../components/Api.js"; //SPRINT 9
import {
  validatorConfig,
  profile,
  profileEditSelector,
  profileEditModal,
  editProfileButton,
  editAvatarButton,
  avatarEditSelector,
  avatarEditModal,
  addDestinationButton,
  addDestinationSelector,
  addDestinationModal,
  destinationTitle,
  destinationImageUrl,
  cardClassSelector,
  initialCards,
  previewModalSelector,
  importStatus,
  token, //SPRINT 9
} from "../utils/constants.js";
console.log(`${importStatus} -> index.js`);

import Card from "../components/Card.js";

//////////////////////////////////////////////////////////////

/************************************API REQUESTS******************************************/
//SPRINT 9
const api = new Api({
  baseUrl: "https://around-api.en.tripleten-services.com/v1",
  headers: {
    authorization: token,
    "Content-Type": "application/json",
  },
});
/*
api
  .updateProfileInfo({
    name: "ted2.0",
    about: "professional computer programmer",
  })
  .then(
    api.getUserInfo().then((res) => {
      console.log(res);
    })
  );

api.getUserInfo().then((res) => {
  console.log(res);
});
*/
/*
api.addNewCard({
  name: "Yosemite National Park",
  link: "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fwallpaperaccess.com%2Ffull%2F2558322.jpg&f=1&nofb=1&ipt=458196d6fbea86cfd089063dcf32e7fa167a937715796a1bed2557e735cfd67f&ipo=images",
});
*/ //this runs every time the page refreshes so it will keep adding cards to the server on each iteration
//this is not the desired behavior, but is currently here for test purposes. Needs to be modified before submission

//api.deleteCard("6629f86b8bacc8001aedf612");

//api.likeCard("6629f92f8bacc8001aedf65b");

//api.dislikeCard("6629f92f8bacc8001aedf65b");

api.updateProfileAvatar(
  "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fwww.tripsavvy.com%2Fthmb%2FcUF2vJj7MZMmTXYmfE8_U3JM94A%3D%2F3877x2568%2Ffilters%3Afill(auto%2C1)%2Fyosemite-falls-yosemite-national-park-california-usa-683750029-58b0dfc75f9b5860462db5b0.jpg&f=1&nofb=1&ipt=9f414940d52d25591a4609abc6c69232e15c58c560bf06132b03ef6c48d7c889&ipo=images"
);

const testCardObject = api.getCards().then((res) => {
  console.log(res);
});

//////////////////////////////////////////////////////////////////////

//EVENT LISTENERS AND CLASS OPERATIONS
/*************************EDIT PROFILE***********************************/
const profileEditValidation = new FormValidator(
  validatorConfig,
  profileEditModal
);

profileEditValidation.enableValidation();

addDestinationModal.classList.add("modal_type_add-destination");
const destinationForm = addDestinationModal.querySelector(
  ".modal_type_add-destination .modal__container"
);

const profileUserData = new UserInfo(
  profile,
  function pullServerProfileData() {
    //SPRINT 9
    return api.getUserInfo();
  },
  function updateServerProfileData(profileData) {
    console.log(profileData);
    api.updateProfileInfo(profileData);
  }
);

const profilePopup = new PopupWithForm({
  popupSelector: profileEditSelector,
  handleFormSubmit: (formData) => {
    formData.input1 = formData.profile_title;
    delete formData.profile_title;

    formData.input2 = formData.profile_description;
    delete formData.profile_description;

    profileUserData.setUserInfo(formData);
  },
});

profilePopup.setEventListeners();

//SPRINT 9
editProfileButton.addEventListener("click", (e) => {
  profileUserData.getUserInfo().then((res) => {
    profilePopup.open(res);
  });
});
///////////////////////////////////////////////////////////////////////////////////////

/************************************EDIT AVATAR******************************************/
//SPRINT 9 Still need to handle form submission

const avatarEditValidation = new FormValidator(
  validatorConfig,
  avatarEditModal
);

avatarEditValidation.enableValidation();

const editAvatarPopup = new PopupWithForm({
  popupSelector: avatarEditSelector,
  handleFormSubmit: () => {
    //need to finish this callback
    console.log("submitting data, this callback is under construction");
  },
});

editAvatarPopup.setEventListeners();

editAvatarButton.addEventListener("click", (e) => {
  editAvatarPopup.open();
});
///////////////////////////////////////////////////////////////////////////////////////////////

/************************************ADD DESTINATIONS******************************************/

const destinationEditValidation = new FormValidator(
  validatorConfig,
  addDestinationModal
);

destinationEditValidation.enableValidation();

//Create section class for destination cards
const cardSection = new Section(
  {
    items: initialCards,
    renderer: (cardObject) => {
      const newElement = new Card(cardObject, "#card", (data) => {
        imagePopup.open(data);
      });
      return newElement.getView();
    },
  },
  cardClassSelector
);

const imagePopup = new PopupWithImage({ popupSelector: previewModalSelector });

const addDestinationPopup = new PopupWithForm({
  popupSelector: addDestinationSelector,
  handleFormSubmit: (formData) => {
    console.log(formData);

    formData.link = formData.destination_image_URL;
    delete formData.destination_image_URL;

    formData.name = formData.destination_title;
    delete formData.destination_title;

    cardSection.addItem(formData);
  },
});

addDestinationPopup.setEventListeners();

addDestinationButton.addEventListener("click", function (e) {
  addDestinationPopup.open();
  destinationEditValidation.toggleButtonState();
});

/************************************LOAD INITIAL CARDS ONTO PAGE******************************************/

cardSection.renderItems();

//////////////////////////////////////////////////////////////////////
