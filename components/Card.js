export default class Card {
  constructor({ link, name }, cardSelector, handleImageClick) {
    console.log("Card.js imported to index.js");
    this._name = name;
    this._link = link;
    this._cardSelector = cardSelector;
  }

  _setEventListeners() {
    //event Listeners for like icon
    this._likeButton = this._cardElement.querySelector(
      ".destinations__caption-icon"
    );
    this._likeButton.addEventListener("click", () => {
      this._handleLikeButton();
    });

    //delete button
    this._deleteButton = this._cardElement.querySelector(
      ".destinations__trash-icon"
    );
    this._deleteButton.addEventListener("click", () => {
      this._handleDeleteButton();
    });
  }

  _handleLikeButton() {
    this._likeButton.classList.toggle("destinations_caption-icon_style_liked");
  }

  _handleDeleteButton() {
    this._cardElement.remove();
    this._cardElement = null;
  }

  getView() {
    this._cardElement = document
      .querySelector(this._cardSelector)
      .content.querySelector(".destinations__card")
      .cloneNode(true);

    //get the card view
    //set event listeners,
    //return the card
    this._setEventListeners();

    const cardElement = this._cardElement.content;

    return cardElement;
  }
}
