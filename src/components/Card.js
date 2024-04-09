export default class Card {
  constructor({ link, name }, cardSelector, handleImageClick) {
    //console.log("Card.js imported to index.js");
    this._name = name;

    this._link = link;
    console.log(`this._name:${this._name}`);
    this._cardSelector = cardSelector;
    this._handleImageClick = handleImageClick;
    this._previewModal = document.querySelector(".modal_type_preview");
    this._previewModalImage = this._previewModal.querySelector(".modal__image");
    this._previewModalCaption = this._previewModal.querySelector(
      ".modal__preview-caption"
    );
  }

  createCard() {
    return this.getView();
  }

  _setEventListeners() {
    //define card image

    this._cardImage.addEventListener("click", (e) => {
      this._previewModalImage.src = this._cardImage.src;
      this._previewModalImage.alt = this._cardImage.alt;
      this._previewModalCaption.textContent = this._name;
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
  }

  _handleLikeButton() {
    this._likeButton.classList.toggle("destinations_caption-icon_style_liked");
  }

  _handleDeleteButton() {
    this._cardElement.remove();
    this._cardElement = null;
  }

  getView() {
    console.log(`this._cardSelector:${this._cardSelector}`);
    this._cardElement = document
      .querySelector(this._cardSelector)
      .content.querySelector(".destinations__card")
      .cloneNode(true);

    //get the card view
    //set event listeners,
    //return the card

    this._cardElement.querySelector(".destinations__caption-text").textContent =
      this._name;

    console.log(this._cardELement);
    //this._cardElement.classList.add(this._name.replaceAll(" ", "_"));

    this._cardImage = this._cardElement.querySelector(
      ".destinations__card-image"
    );
    this._cardImage.src = this._link;
    console.log(this._link);
    this._cardImage.alt = "Photo of " + this._name;

    this._setEventListeners();

    const cardElement = this._cardElement;

    return cardElement;
  }
}
