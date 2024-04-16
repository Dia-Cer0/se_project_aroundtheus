import Popup from "./Popup.js";

export default class PopupWithForm extends Popup {
  constructor({ popupSelector, handleFormSubmit }) {
    super({ popupClassSelector: popupSelector }); //uses parent popup class to define this._popupElement by accessing parent constructor
    this._popupFormInputs = Array.from(
      this._popupElement.querySelectorAll(".modal__input")
    );
    //console.log(super._closePopupButton);
    this._popupForm = this._popupElement.querySelector("form");

    //this._popupForm = this._popupElement.querySelector(".modal__container");

    this._handleFormSubmit = handleFormSubmit;
    this._popupSubmitButton = this._popupForm.querySelector(
      ".modal__save-button"
    );

    this._inputBuffer1 = "";
    this._inputBuffer2 = "";
  }

  open(
    { name, job } = {
      name: this._popupFormInputs[0].value,
      job: this._popupFormInputs[1].value,
    }
  ) {
    this._popupFormInputs[0].value = name;
    this._popupFormInputs[1].value = job;

    super.open(); //call parent open methods
  }

  _submit(e) {
    e.preventDefault();

    this._handleFormSubmit(this._getInputValues()); //BULLET POINT #6 RESOLUTION
    this._popupForm.reset();
    super.close(); //call parent close method
  }

  _getInputValues() {
    return {
      input1: this._popupFormInputs[0].value,
      input2: this._popupFormInputs[1].value,
    };
  }

  //BULLET POINT #4 RESOLUTION
  setEventListeners() {
    this._submitThis = this._submit.bind(this);
    this._popupForm.addEventListener("submit", this._submitThis);
  }

  /*
  _removeFormEventListeners() {
    this._popupForm.removeEventListener("submit", this._submitThis);
  }
  */
}

//index.js
