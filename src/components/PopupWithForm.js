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

    //ISSUE #2 SETEVENT LISTENERS NEEDS TO BE PUBLIC AND CALLED IN INDEX.JS
    this._setFormEventListeners(); //remember remember remember, event listeners only need to be set once!!!!!
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
  //ISSUE #3 do not duplicate parent methods unless it needs a different implementation
  close() {
    super.close(); //call parent close method

    //this._removeFormEventListeners();
  }

  _submit(e) {
    e.preventDefault();

    //ISSUE #4 REMOVE _HANDLEFORMSUBMIT FROM _GET _GETINPUTVALUES; _GETINPUTVALUES ONLY NEEDS TO RETURN THEO OBJECTF (NOT HIGHLIGHTED)
    this._getInputValues();

    this._popupForm.reset();
    super.close(); //call parent close method
  }

  _getInputValues() {
    //ISSUE #4 REMOVE _HANDLEFORMSUBMIT FROM _GET _GETINPUTVALUES; _GETINPUTVALUES ONLY NEEDS TO RETURN THEO OBJECTF (NOT HIGHLIGHTED)
    return this._handleFormSubmit({
      input1: this._popupFormInputs[0].value,
      input2: this._popupFormInputs[1].value,
    });
  }

  //ISSUE #2 SETEVENT LISTENERS NEEDS TO BE PUBLIC AND CALLED IN INDEX.JS
  _setFormEventListeners() {
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
