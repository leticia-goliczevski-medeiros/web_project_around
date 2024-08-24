/* a função retorna true se houver algum input inválido */
const hasInvalidInput = (inputList) => {
  return inputList.some((inputElement) => {
    return !inputElement.validity.valid;
  });
};

const toogleButtonState = (inputList, buttonElement, config) => {
  if (hasInvalidInput(inputList)) {
    buttonElement.classList.add(config.buttonElementClass);
    buttonElement.setAttribute("disabled", true);
  } else {
    buttonElement.classList.remove(config.buttonElementClass);
    buttonElement.removeAttribute("disabled", true);
  }
};

const showInputError = (inputElement, errorMessage, config) => {
  const errorElement = inputElement.nextElementSibling;

  inputElement.classList.add(config.inputErrorClass);
  errorElement.classList.add(config.errorClass);
  errorElement.textContent = errorMessage;
};

const hideInputError = (inputElement, config) => {
  const errorElement = inputElement.nextElementSibling;

  inputElement.classList.remove(config.inputErrorClass);
  errorElement.classList.add(config.errorClass);
  errorElement.textContent = "";
};

const isValid = (inputElement, config) => {
  if (!inputElement.validity.valid) {
    showInputError(inputElement, inputElement.validationMessage, config);
  } else {
    hideInputError(inputElement, config);
  }
};

const validateInputs = (formElement, config) => {
  const inputList = Array.from(
    formElement.querySelectorAll(config.inputListSelector)
  );
  const buttonElement = formElement.querySelector(config.buttonElementSelector);
  toogleButtonState(inputList, buttonElement, config);

  inputList.forEach((inputElement) => {
    inputElement.addEventListener("input", () => {
      isValid(inputElement, config);
      toogleButtonState(inputList, buttonElement, config);
    });
  });
};

const enableValidation = (config) => {
  const formList = Array.from(document.forms);

  formList.forEach((formElement) => {
    validateInputs(formElement, config);
  });
};

enableValidation({
  inputListSelector: ".popup__input",
  buttonElementSelector: ".popup__submit-button",
  buttonElementClass: "popup__submit-button_inactive",
  errorClass: "popup__input-error_active",
  inputErrorClass: "popup__input_type_error",
});
