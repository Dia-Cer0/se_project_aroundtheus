export default class Popup {
  constructor({ popupClassSelector }) {
    this._popupElement = document.querySelector(popupClassSelector);
    this._closePopupButton =
      this._popupElement.querySelector(".modal__close-icon");
  }
  open() {
    //public method to open popup
    this._popupElement.classList.add("modal_opened");
    document.addEventListener("keydown", this._handleEscCloseBound);
    //ISSUE #2 SETEVENT LISTENERS NEEDS TO BE PUBLIC AND CALLED IN INDEX.JS
  }

  close() {
    //public method to close popup
    this._popupElement.classList.remove("modal_opened");
    document.removeEventListener("keydown", this._handleEscCloseBound);
  }

  _handleLeftMouseClose(e) {
    const isModal = e.target.classList.contains("modal");
    if (e.buttons === 1 && isModal) {
      this.close();
    }
  }

  _handleEscClose(e) {
    //look for escape button press while modal is opened and close modal when the escape button is pressed
    if (e.key === "Escape") {
      this.close();
    }
  }

  //ISSUE #2 SETEVENT LISTENERS NEEDS TO BE PUBLIC AND CALLED IN INDEX.JS
  setEventListeners() {
    this._handleEscCloseBound = this._handleEscClose.bind(this);
    this._handleLeftMouseCloseBound = this._handleLeftMouseClose.bind(this);

    this._popupElement.addEventListener(
      "mousedown",
      this._handleLeftMouseCloseBound
    );

    this._closePopupButton.addEventListener("click", (e) => {
      e.preventDefault();
      this.close();
    });
  }
}
