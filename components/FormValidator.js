export default class FormValidator {
  constructor(config, formElement) {
    this._config = config;
    this._formElement = formElement;

    console.log("FormValidator.js imported to index.js");
  }

  showInputError(
    // 5
    inputElement
  ) {
    const errorMessageElement = this._formElement.querySelector(
      `#${inputElement.id}-error`
    );

    inputElement.classList.add(this._config.inputErrorClass);
    errorMessageElement.textContent = inputElement.validationMessage;
    errorMessageElement.classList.add(this._config.errorClass);
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

  _checkFormValidity() {
    return this._inputElements.every(
      (inputElement) => inputElement.validity.valid
    );
  }

  checkInputValidity(inputElement) {
    // 3

    if (!inputElement.validity.valid) {
      return this.showInputError(inputElement, this._config);
    }

    this.hideInputError(this._formElement, inputElement, this._config);
  }

  toggleButtonState() {
    // 4
    console.log("Form Validity: " + this._checkFormValidity());

    if (!this._checkFormValidity) {
      this._submitButton.classList.add(this._inactiveButtonClass);
      return (this._submitButton.disabled = true);
    }
    this._submitButton.classList.remove(this._inactiveButtonClass);
    this._submitButton.disabled = false;
  }

  _setEventListeners() {
    this._inputElements = [
      ...this._formElement.querySelectorAll(this._config.inputSelector),
    ];
    this._submitButton = this._formElement.querySelector(
      this._config.submitButtonSelector
    );
    this._inactiveButtonClass = this._formElement.querySelector(
      this._config.inactiveButtonClass
    );

    this._inputElements.forEach((inputElement) => {
      inputElement.addEventListener("input", (e) => {
        this.checkInputValidity(inputElement);
        this.toggleButtonState();
      });
    });
  }

  enableValidation() {
    console.log(this._formElement.querySelector(".modal__container"));
    this._setEventListeners();
  }
}
