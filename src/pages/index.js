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
  initialCards_old,
  previewModalSelector,
  confirmModalSelector,
  deleteConfirmModal,
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

const deleteDestinationPopup = new PopupWithForm({
  popupSelector: confirmModalSelector,
  handleFormSubmit: (cardId) => {
    console.log(cardId);
    api
      .deleteCard(cardId)
      .then(() => {
        //need a way to uniquely identify and delete the card on the local page
        //do not immediately have the card id until it is retrieved from the server
        console.log(
          "#\\3" + cardId.slice(1, 2) + " " + cardId.slice(2, cardId.length)
        );

        //converting first digit of id to unicode
        document
          .querySelector(
            "#\\3" + cardId.slice(0, 1) + " " + cardId.slice(1, cardId.length)
          )
          .closest("div")
          .remove();
      })
      .catch((err) => {
        console.error(err);
      }); //removed catch from Api class and added in the api call
  },
});
deleteDestinationPopup.setEventListeners();

const cardSection = new Section(
  {
    renderer: (cardObject) => {
      const newElement = new Card(
        cardObject,
        "#card",
        (data) => {
          imagePopup.open(data);
        },
        (cardId) => {
          deleteDestinationPopup.open("", cardId);
          /*

          */
        },
        (cardLiked, cardId) => {
          if (cardLiked) {
            api
              .likeCard(cardId)
              .then(() => {
                newElement.handleLikeButton();
              })
              .catch((err) => {
                console.error(err);
              }); //removed catch from Api class and added in the api call;
          } else {
            api
              .dislikeCard(cardId)
              .then(() => {
                newElement.handleLikeButton();
              })
              .catch((err) => {
                console.error(err);
              }); //removed catch from Api class and added in the api call;
          }
        }
      );
      return newElement.getView();
    },
  },
  cardClassSelector
);

console.log(initialCards_old);
api
  .getCards()
  .then((cards) => {
    const initialCards = cards;
    return initialCards;
  })
  .then((initialCards) => {
    cardSection.renderItems(initialCards);
  })
  .catch((err) => {
    console.error(err);
  }); //removed catch from Api class and added in the api call;

/*

//api.likeCard("6629f92f8bacc8001aedf65b");

//api.dislikeCard("6629f92f8bacc8001aedf65b");

*/

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
    if (profileData.name) {
      api.updateProfileInfo(profileData).catch((err) => {
        console.error(err);
      }); //removed catch from Api class and added in the api call;
    }
  }
);

const profilePopup = new PopupWithForm({
  popupSelector: profileEditSelector,
  handleFormSubmit: (formData) => {
    formData.input1 = formData.profile_title;
    delete formData.profile_title;

    formData.input2 = formData.profile_description;
    delete formData.profile_description;

    api
      .updateProfileInfo({ name: formData.input1, about: formData.input2 })
      .then((res) => {
        /*
        api.getUserInfo().then((formData) => {
          formData.input1 = formData.name;
          formData.input2 = formData.about;
          profileUserData.setUserInfo(formData);
          //new code to remove api requests from user info
          api.getUserInfo();
        })
      */
        res.input1 = res.name;
        res.input2 = res.about;
        profileUserData.setUserInfo(res);
        console.log(res.name + " " + res.about + " " + JSON.stringify(res));
      })
      .catch((err) => {
        console.error(err);
      }) //removed catch from Api class and added in the api call
      .finally(() => {
        profilePopup.renderLoading(false);
      });
  },
});

profileUserData.setUserInfo(profileUserData.getUserInfo());

/*
api.getUserInfo().then((formData) => {
  formData.input1 = formData.name;
  formData.input2 = formData.about;
  profileUserData.setUserInfo(formData);
});
*/

profilePopup.setEventListeners();
//console.log(profileUserData.getUserInfo());

//SPRINT 9
editProfileButton.addEventListener("click", (e) => {
  //.then((res) => {
  profilePopup.open(profileUserData.getUserInfo());
  //});
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
  handleFormSubmit: (newAvatarUrl) => {
    api
      .updateProfileAvatar(newAvatarUrl.profile_avatar)
      .then(() => {
        return api.getUserInfo();
      })
      .then((formData) => {
        profileUserData.setUserInfo(formData);
      })
      .catch((err) => {
        console.error(err);
      }) //removed catch from Api class and added in the api call
      .finally(() => {
        profilePopup.renderLoading(false);
      });
  },
});

editAvatarPopup.setEventListeners();

editAvatarButton.addEventListener("click", (e) => {
  editAvatarPopup.open();
  avatarEditValidation.toggleButtonState();
});
///////////////////////////////////////////////////////////////////////////////////////////////

/************************************ADD DESTINATIONS******************************************/

const destinationEditValidation = new FormValidator(
  validatorConfig,
  addDestinationModal
);

destinationEditValidation.enableValidation();

//Create section class for destination cards
/*
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
*/

const imagePopup = new PopupWithImage({ popupSelector: previewModalSelector });

const addDestinationPopup = new PopupWithForm({
  popupSelector: addDestinationSelector,
  handleFormSubmit: (formData) => {
    console.log(formData);
    console.log(formData);
    formData.link = formData.destination_image_URL;
    delete formData.destination_image_URL;

    formData.name = formData.destination_title;
    delete formData.destination_title;
    api
      .addNewCard(formData)
      .then((res) => {
        //if (res.ok) {
        //console.log(JSON.stringify(res));
        //console.log(res._id);
        cardSection.addItem({ _id: res._id, link: res.link, name: res.name });

        return res._id;
        //}
      })
      .finally(() => {
        profilePopup.renderLoading(false);
      });
  },
});

addDestinationPopup.setEventListeners();

addDestinationButton.addEventListener("click", function (e) {
  addDestinationPopup.open();
  destinationEditValidation.toggleButtonState();
});

/************************************LOAD INITIAL CARDS ONTO PAGE******************************************/

//////////////////////////////////////////////////////////////////////
