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

const showInputError = (formElement, inputElement, errorMessage, config) => {
  const errorElement = formElement.querySelector(config.errorSelector);

  inputElement.classList.add(config.inputErrorClass);
  errorElement.classList.add(config.errorClass);
  errorElement.textContent = errorMessage;
};

const hideInputError = (formElement, inputElement, config) => {
  const errorElement = formElement.querySelector(config.errorSelector);

  inputElement.classList.remove(config.inputErrorClass);
  errorElement.classList.add(config.errorClass);
  errorElement.textContent = "";
};

const isValid = (formElement, inputElement, config) => {
  if (!inputElement.validity.valid) {
    showInputError(
      formElement,
      inputElement,
      inputElement.validationMessage,
      config
    );
  } else {
    hideInputError(formElement, inputElement, config);
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
      isValid(formElement, inputElement, config);
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
  errorSelector: `.${inputElement.id}_error`,
  errorClass: "popup__input-error_active",
  inputErrorClass: "popup__input_type_error",
});
