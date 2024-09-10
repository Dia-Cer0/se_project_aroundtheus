/***********************************************************/
/*************************index.js**************************/
/***********************************************************/
console.log("index.js loaded");

import "./index.css";
import FormValidator from "../components/FormValidator.js";
import Section from "../components/Section.js";
import Popup from "../components/Popup.js";
import PopupWithForm from "../components/PopupWithForm.js";
import PopupWithImage from "../components/PopupWithImage.js";
import UserInfo from "../components/UserInfo.js";
import Api from "../components/Api.js"; //SPRINT 9
import Card from "../components/Card.js"; // Added missing import
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
  cardClassSelector,
  previewModalSelector,
  confirmModalSelector,
  importStatus,
  token, //SPRINT 9
} from "../utils/constants.js";

console.log(`${importStatus} -> index.js`);

// Cache DOM elements
const addDestinationFormContainer =
  addDestinationModal.querySelector(".modal__container");
const profileEditFormContainer =
  profileEditModal.querySelector(".modal__container");
const avatarEditFormContainer =
  avatarEditModal.querySelector(".modal__container");

// API initialization
const api = new Api({
  baseUrl: "https://around-api.en.tripleten-services.com/v1",
  headers: {
    authorization: token,
    "Content-Type": "application/json",
  },
});

// Popup instances
const deleteDestinationPopup = new PopupWithForm({
  popupSelector: confirmModalSelector,
  handleFormSubmit: async (cardId) => {
    try {
      await api.deleteCard(cardId);

      // Remove the card from the DOM
      const cardElement = document
        .getElementById(cardId)
        .closest(".destinations__card");
      if (cardElement) {
        cardElement.remove(); // Remove the card element from the DOM
      }
    } catch (err) {
      console.error(err);
    }
  },
});
deleteDestinationPopup.setEventListeners();

const imagePopup = new PopupWithImage({ popupSelector: previewModalSelector });

const profilePopup = new PopupWithForm({
  popupSelector: profileEditSelector,
  handleFormSubmit: async (formData) => {
    try {
      const { profile_title, profile_description } = formData;
      const res = await api.updateProfileInfo({
        name: profile_title,
        about: profile_description,
      });
      profileUserData.setUserInfo(res);
    } catch (err) {
      console.error(err);
    } finally {
      profilePopup.renderLoading(false);
    }
  },
});
profilePopup.setEventListeners();

const editAvatarPopup = new PopupWithForm({
  popupSelector: avatarEditSelector,
  handleFormSubmit: async (newAvatarUrl) => {
    try {
      await api.updateProfileAvatar(newAvatarUrl.profile_avatar);
      const formData = await api.getUserInfo();
      profileUserData.setUserInfo(formData);
    } catch (err) {
      console.error(err);
    } finally {
      profilePopup.renderLoading(false);
    }
  },
});
editAvatarPopup.setEventListeners();

const addDestinationPopup = new PopupWithForm({
  popupSelector: addDestinationSelector,
  handleFormSubmit: async (formData) => {
    try {
      const { destination_image_URL, destination_title } = formData;
      const res = await api.addNewCard({
        link: destination_image_URL,
        name: destination_title,
      });
      cardSection.addItem({ _id: res._id, link: res.link, name: res.name });
    } catch (err) {
      console.error(err);
    } finally {
      addDestinationPopup.renderLoading(false);
    }
  },
});
addDestinationPopup.setEventListeners();

// Form Validations
const profileEditValidation = new FormValidator(
  validatorConfig,
  profileEditModal
);
profileEditValidation.enableValidation();

const avatarEditValidation = new FormValidator(
  validatorConfig,
  avatarEditModal
);
avatarEditValidation.enableValidation();

const destinationEditValidation = new FormValidator(
  validatorConfig,
  addDestinationModal
);
destinationEditValidation.enableValidation();

// UserInfo instance
const profileUserData = new UserInfo(
  profile,
  () => api.getUserInfo(),
  (profileData) => {
    if (profileData.name) {
      api.updateProfileInfo(profileData).catch(console.error);
    }
  }
);

// Card Section instance
const cardSection = new Section(
  {
    renderer: (cardObject) => {
      const newElement = new Card(
        cardObject,
        "#card",
        (data) => imagePopup.open(data),
        (cardId) => deleteDestinationPopup.open("", cardId),
        async (cardLiked, cardId) => {
          try {
            if (cardLiked) {
              await api.likeCard(cardId);
            } else {
              await api.dislikeCard(cardId);
            }
            newElement.handleLikeButton();
          } catch (err) {
            console.error(err);
          }
        }
      );
      return newElement.getView();
    },
  },
  cardClassSelector
);

// Load initial cards
const loadInitialCards = async () => {
  try {
    const cards = await api.getCards();
    cardSection.renderItems(cards);
  } catch (err) {
    console.error(err);
  }
};
loadInitialCards();

// Event Listeners
editProfileButton.addEventListener("click", () =>
  profilePopup.open(profileUserData.getUserInfo())
);
editAvatarButton.addEventListener("click", () => {
  editAvatarPopup.open();
  avatarEditValidation.toggleButtonState();
});
addDestinationButton.addEventListener("click", () => {
  addDestinationPopup.open();
  destinationEditValidation.toggleButtonState();
});
