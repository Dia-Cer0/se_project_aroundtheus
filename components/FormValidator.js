export default class FormValidator {
  constructor(config, formElement) {
    this._config = config;
    this._formElement = formElement;

    console.log(this._formElement);

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

  hideInputError(inputElement) {
    console.log("inputElement hideinputerror: ");
    console.log(inputElement.id);

    const errorMessageElement = this._formElement.querySelector(
      `#${inputElement.id}-error`
    );
    console.log("inputElement: " + inputElement);

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
    console.log("inputElement out: ");
    console.log(inputElement.id);
    if (!inputElement.validity.valid) {
      return this.showInputError(inputElement);
    }

    this.hideInputError(inputElement);
  }

  toggleButtonState() {
    // 4
    console.log("Form Validity: " + this._checkFormValidity());

    if (!this._checkFormValidity()) {
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
    console.log("this._inputElements:");
    console.log(this._inputElements);

    this._submitButton = this._formElement.querySelector(
      this._config.submitButtonSelector
    );

    this._inputElements.forEach((inputElement) => {
      inputElement.addEventListener("input", (e) => {
        console.log("inputElement in: ");
        console.log(inputElement.id);
        this.checkInputValidity(inputElement);
        this.toggleButtonState();
      });
    });
  }

  enableValidation() {
    this._setEventListeners();
  }
}
