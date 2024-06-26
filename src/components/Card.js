export default class Card {
  constructor({ link, name }, cardSelector, handleImageClick) {
    //console.log("Card.js imported to index.js");
    this._name = name;

    this._link = link;

    this._cardSelector = cardSelector;
    this._handleImageClick = handleImageClick;
  }

  createCard() {
    return this.getView();
  }

  _setEventListeners() {
    //define card image

    this._cardImage.addEventListener("click", (e) => {
      this._handleImageClick(this);
    });

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

    //ISSUE # 5 CLICK HANDLERS FOR IMAGES SHOULD ONLY BE INSIDE OF THE CARD CLASS
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
    //console.log(this._cardElement);
    //console.log(this._cardElement.className);

    //get the card view
    //set event listeners,
    //return the card

    this._cardElement.querySelector(".destinations__caption-text").textContent =
      this._name;

    this._cardElement.classList.add(this._name.replaceAll(" ", "_"));

    this._cardImage = this._cardElement.querySelector(
      ".destinations__card-image"
    );
    this._cardImage.src = this._link;

    this._cardImage.alt = "Photo of " + this._name;

    this._setEventListeners();

    const cardElement = this._cardElement;

    return cardElement;
  }
}
