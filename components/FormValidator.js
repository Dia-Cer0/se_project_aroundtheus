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
      `#${this._inputElement.id}-error`
    );

    this._inputElement.classList.add(this._config.inputErrorClass);
    errorMessageElement.textContent = this._inputElement.validationMessage;
    errorMessageElement.classList.add(this._config.errorClass);
  }

  hideInputError(
    // 6

    inputElement
  ) {
    const errorMessageElement = this._formElement.querySelector(
      `#${this._inputElement.id}-error`
    );
    console.log(inputElement);

    errorMessageElement.textContent = "";
    errorMessageElement.classList.remove(this._config.errorClass);
    inputElement.classList.remove(this._config.inputErrorClass);
  }

  _checkFormValidity() {
    return this._inputElements.every(
      (inputElement) => inputElement.validity.valid
    );
  }

  checkInputValidity(inputElement) {
    // 3

    if (!this._inputElement.validity.valid) {
      return this.showInputError(inputElement, this._config);
    }

    this.hideInputError(this._formElement, inputElement, this._config);
  }

  toggleButtonState() {
    // 4
    console.log("Form Validity: " + this._checkFormValidity());

    if (!this._checkFormValidity) {
      this._submitButton.classList.add(this._config.inactiveButtonClass);
      this._submitButton.disabled = true;
      return;
    }
    this._submitButton.classList.remove(this._config.inactiveButtonClass);
    this._submitButton.disabled = false;
  }

  _setEventListeners() {
    this._inputElements = [
      ...this._formElement.querySelectorAll(this._config.inputSelector),
    ];
    console.log(this._inputElements);
    this._submitButton = this._formElement.querySelector(
      this._config.submitButtonSelector
    );

    this._inputElements.forEach((inputElement) => {
      inputElement.addEventListener("input", (e) => {
        console.log(inputElement.id);
        this._inputElement = inputElement;
        this.checkInputValidity();
        this.toggleButtonState();
      });
    });
  }

  enableValidation() {
    this._setEventListeners();
  }
}
