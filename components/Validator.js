console.log("Validator.js loaded");

// enabling validation by calling enableValidation()
// pass all the settings on call

const hideInputError = (
  // 6
  formElement,
  inputElement,
  { inputSelector, inputErrorClass, errorClass }
) => {
  const errorMessageElement = formElement.querySelector(
    `#${inputElement.id}-error`
  );

  errorMessageElement.textContent = "";
  errorMessageElement.classList.remove(errorClass);
  inputElement.classList.remove(inputErrorClass);
};

const showInputError = (
  // 5
  formElement,
  inputElement,
  { inputErrorClass, errorClass }
) => {
  const errorMessageElement = formElement.querySelector(
    `#${inputElement.id}-error`
  );
  inputElement.classList.add(inputErrorClass);
  errorMessageElement.textContent = inputElement.validationMessage;
  errorMessageElement.classList.add(errorClass);
  console.log(errorMessageElement);
};

const checkInputValidity = (formElement, inputElement, options) => {
  // 3
  if (!inputElement.validity.valid) {
    return showInputError(formElement, inputElement, options);
  }

  hideInputError(formElement, inputElement, options);
};

const toggleButtonState = (
  // 4
  inputElements,
  submitButton,
  { inactiveButtonClass }
) => {
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
};

const setEventListeners = (formElement, options) => {
  // 2
  //destructure options object
  const { inputSelector } = options;
  const { submitButtonSelector } = options;
  const inputElements = [...formElement.querySelectorAll(inputSelector)];
  const submitButton = formElement.querySelector(submitButtonSelector);

  console.log(submitButton);

  inputElements.forEach((inputElement) => {
    inputElement.addEventListener("input", (e) => {
      checkInputValidity(formElement, inputElement, options);
      toggleButtonState(inputElements, submitButton, options);
    });
  });
};

const enableValidation = (options) => {
  // 1
  const formElements = [...document.querySelectorAll(options.formSelector)];

  formElements.forEach((formElement) => {
    formElement.addEventListener("submit", (e) => {
      e.preventDefault();
    });

    // look for all inputs inside of form
    setEventListeners(formElement, options);
    // loop through all the inputs to see if all are valid
    // if input is not valid
    // get validation message
    // add error class to input
    // display error message (span)
    // disable button
    // if all inputs are valid
    //enable button
    //reset error messages
  });
};

const config = {
  formSelector: ".modal__container",
  inputSelector: ".modal__input",
  submitButtonSelector: ".modal__save-button",
  inactiveButtonClass: "modal__button_disabled",
  inputErrorClass: "modal__input_type_error",
  errorClass: "modal__error_visible",
};

enableValidation(config);
/*
export default class FormValidator{
  constructor(){

  }



}
*/
