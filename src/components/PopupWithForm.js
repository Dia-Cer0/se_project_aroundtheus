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

    this._inputBuffer1 = "";
    this._inputBuffer2 = "";
  }

  open(data) {
    this._popupFormInputs.forEach((input) => {
      input.value = data[input.id];
    });

    super.open(); //call parent open methods
  }

  _submit(e) {
    e.preventDefault();

    this._handleFormSubmit(this._getInputValues()); //BULLET POINT #6 RESOLUTION
    this._popupForm.reset();
    super.close(); //call parent close method
  }

  _getInputValues() {
    const inputValues = [];
    this._popupFormInputs.forEach((input) => {
      const inputID = input.id;

      const inputValue = input.value;
      inputValues.push({ inputname: inputID, inputvalue: inputValue }); //REMOVED HARDCODED INPUTS
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
