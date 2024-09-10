import Popup from "./Popup.js";

export default class PopupWithForm extends Popup {
  constructor({ popupSelector, handleFormSubmit }) {
    super({ popupClassSelector: popupSelector }); //uses parent popup class to define this._popupElement by accessing parent constructor
    this._popupFormInputs = Array.from(
      this._popupElement.querySelectorAll("input")
    );

    this._popupForm = this._popupElement.querySelector("form");

    //this._popupForm = this._popupElement.querySelector(".modal__container");

    this._handleFormSubmit = handleFormSubmit;
  }

  open(data = undefined, cardId = undefined) {
    if (cardId) {
      this.cardId = cardId;
      console.log("there is an id");
    }
    super.open(); //call parent open method
    if (data) {
      this._popupFormInputs.forEach((input) => {
        input.value = data[input.id];
      });
    }
  }

  _submit(e) {
    e.preventDefault();
    this.renderLoading(true);

    if (this.cardId) {
      console.log(this.cardId);
      this._handleFormSubmit(this.cardId);
    } else {
      this._handleFormSubmit(this._getInputValues()); //BULLET POINT #6 RESOLUTION
    }
    this._popupForm.reset();
    super.close(); //call parent close method
  }
  renderLoading(loading) {
    if (loading) {
      this._popupForm.querySelector('button[type="submit"]').textContent =
        "Saving...";
    }
    this._popupForm.querySelector('button[type="submit"]').textContent = "Save";
  }
  _getInputValues() {
    const inputValues = {};
    this._popupFormInputs.forEach((input) => {
      inputValues[input.id] = input.value;
    });

    return inputValues;
  }

  //BULLET POINT #4 RESOLUTION
  setEventListeners() {
    super.setEventListeners();
    this._submitThis = this._submit.bind(this);
    this._popupForm.addEventListener("submit", this._submitThis);
  }
}

//index.js
