import Popup from "./Popup.js";

export default class PopupWithForm extends Popup {
  constructor({ popupSelector, handleFormSubmit }) {
    super({ popupClassSelector: popupSelector }); //uses parent popup class to define this._popupElement
    this._popupFormInputs = Array.from(
      this._popupElement.querySelectorAll(".modal__input")
    );

    this._popupForm = this._popupElement.querySelector("form");

    //this._popupForm = this._popupElement.querySelector(".modal__container");

    this._handleFormSubmit = handleFormSubmit;
    this._popupSubmitButton = this._popupForm.querySelector(
      ".modal__save-button"
    );
  }

  open({ name, job } = { name: "", job: "" }) {
    this._popupFormInputs[0].value = name;
    this._popupFormInputs[1].value = job;
    super.open(); //call parent open methods
  }

  close() {
    super.close(); //call parent close method
  }

  _submit() {
    super.close(); //call parent close method
    this._getInputValues();
    this._popupForm.reset();
  }

  _getInputValues() {
    return this._handleFormSubmit({
      input1: this._popupFormInputs[0].value,
      input2: this._popupFormInputs[1].value,
    });
  }

  _setFormEventListeners() {
    this._popupSubmitButton.addEventListener("submit", (e) => {});
  }
}

//index.js
