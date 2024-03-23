export default class FormValidator {
  constructor(config, formElement) {
    this._config = config;
    this._formElement = formElement;

    console.log("FormValidator.js imported to index.js");
  }

  showInputError(
    // 5
    inputElement,
    { inputErrorClass, errorClass }
  ) {
    const errorMessageElement = this._formElement.querySelector(
      `#${inputElement.id}-error`
    );

    inputElement.classList.add(inputErrorClass);
    errorMessageElement.textContent = inputElement.validationMessage;
    errorMessageElement.classList.add(errorClass);
  }

  hideInputError(
    // 6
    formElement,
    inputElement,
    { inputSelector, inputErrorClass, errorClass }
  ) {
    const errorMessageElement = formElement.querySelector(
      `#${inputElement.id}-error`
    );

    errorMessageElement.textContent = "";
    errorMessageElement.classList.remove(errorClass);
    inputElement.classList.remove(inputErrorClass);
  }

  checkInputValidity(inputElement) {
    // 3
    if (!inputElement.validity.valid) {
      return this.showInputError(inputElement, this._config);
    }

    this.hideInputError(this._formElement, inputElement, this._config);
  }

  toggleButtonState(
    // 4
    inputElements,
    submitButton,
    { inactiveButtonClass }
  ) {
    let foundInvalid = false;
    inputElements.forEach((inputElement) => {
      if (!inputElement.validity.valid) {
        foundInvalid = true;
      }
    });
    if (foundInvalid) {
      submitButton.classList.add(inactiveButtonClass);
      return (submitButton.disabled = true);
    }
    submitButton.classList.remove(inactiveButtonClass);
    submitButton.disabled = false;
  }

  _setEventListeners() {
    const inputElements = [
      ...this._formElement.querySelectorAll(this._config.inputSelector),
    ];
    const submitButton = this._formElement.querySelector(
      this._config.submitButtonSelector
    );

    // console.log(inputElements);
    console.log(submitButton);

    inputElements.forEach((inputElement) => {
      inputElement.addEventListener("input", (e) => {
        this.checkInputValidity(inputElement);
        this.toggleButtonState(inputElements, submitButton, this._config);
      });
    });
  }

  enableValidation() {
    console.log(this._formElement.querySelector(".modal__container"));
    this._setEventListeners();
  }
}
