export default class Popup {
  constructor({ popupClassSelector }) {
    this._popupElement = document.querySelector(popupClassSelector);
    this._closePopupButton =
      this._popupElement.querySelector(".modal__close-icon");
  }
  open() {
    //public method to open popup
    this._popupElement.classList.add("modal_opened");
    this._setEventListeners();
  }

  close() {
    //public method to close popup
    this._popupElement.classList.remove("modal_opened");
    this._removeEventListeners();
  }

  _handleLeftMouseClose(e) {
    const isModal = e.target.classList.contains("modal");
    if (e.buttons === 1 && isModal) {
      this.close();
      console.log("handle Left Mouse Click Called");
    }
  }

  _handleEscClose(e) {
    //look for escape button press while modal is opened and close modal when the escape button is pressed
    if (e.key === "Escape") {
      this.close();
    }
  }

  _setEventListeners() {
    this._handleEscCloseBound = this._handleEscClose.bind(this);
    this._handleLeftMouseCloseBound = this._handleLeftMouseClose.bind(this);

    this._popupElement.parentElement.addEventListener(
      "keydown",
      this._handleEscCloseBound
    );

    this._popupElement.addEventListener(
      "mousedown",
      this._handleLeftMouseCloseBound
    );

    this._closePopupButton.addEventListener("click", (e) => {
      e.preventDefault();
      this.close();
    });
  }

  _removeEventListeners() {
    //debugger;
    this._popupElement.parentElement.removeEventListener(
      "keydown",
      this._handleEscCloseBound
    );
    this._popupElement.removeEventListener(
      "mousedown",
      this._handleLeftMouseCloseBound
    );
  }
}
