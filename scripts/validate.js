/* a função retorna true se houver algum input inválido */
export const hasInvalidInput = (inputs) => {
  return inputs.some((inputElement) => {
    return !inputElement.validity.valid;
  });
};

export const toggleButtonState = (inputs, buttonElement, config) => {
  if (hasInvalidInput(inputs)) {
    buttonElement.classList.add(config.buttonElementClass);
    buttonElement.setAttribute("disabled", true);
  } else {
    buttonElement.classList.remove(config.buttonElementClass);
    buttonElement.removeAttribute("disabled", true);
  }
};

export const showInputError = (inputElement, errorMessage, config) => {
  const errorElement = inputElement.nextElementSibling;

  inputElement.classList.add(config.inputErrorClass);
  errorElement.classList.add(config.errorClass);
  errorElement.textContent = errorMessage;
};

export const hideInputError = (inputElement, config) => {
  const errorElement = inputElement.nextElementSibling;

  inputElement.classList.remove(config.inputErrorClass);
  errorElement.classList.remove(config.errorClass);
  errorElement.textContent = "";
};

export const isValid = (inputElement, config) => {
  if (!inputElement.validity.valid) {
    showInputError(inputElement, inputElement.validationMessage, config);
  } else {
    hideInputError(inputElement, config);
  }
};

export const validateInputs = (formElement, config) => {
  const inputs = Array.from(
    formElement.querySelectorAll(config.inputsSelector)
  );
  const buttonElement = formElement.querySelector(config.buttonElementSelector);
  toggleButtonState(inputs, buttonElement, config);

  inputs.forEach((inputElement) => {
    inputElement.addEventListener("input", () => {
      isValid(inputElement, config);
      toggleButtonState(inputs, buttonElement, config);
    });
  });
};

export const enableValidation = (config) => {
  const formList = Array.from(document.forms);

  formList.forEach((formElement) => {
    validateInputs(formElement, config);
  });
};

enableValidation({
  inputsSelector: ".popup__input",
  buttonElementSelector: ".popup__submit-button",
  buttonElementClass: "popup__submit-button_inactive",
  errorClass: "popup__input-error_active",
  inputErrorClass: "popup__input_type_error",
});

class FormValidator {
  constructor(config, formElement) {
    this._inputsSelector = config.inputsSelector;
    this._buttonElementSelector = config.buttonElementSelector;
    this._buttonElementClass = config.buttonElementClass;
    this._errorClass = config.errorClass;
    this._inputErrorClass = config.inputErrorClass;
    this._formElement = formElement;
  }

  enableValidation(config, formElement) {
    this._validateInputs(config, formElement);
  }
  _validateInputs(config, formElement) {
    const inputs = Array.from(
      formElement.querySelectorAll(this._inputsSelector)
    );
    const buttonElement = formElement.querySelector(
      this._buttonElementSelector
    );
    this._toggleButtonState(inputs, buttonElement, config);

    inputs.forEach((inputElement) => {
      inputElement.addEventListener("input", () => {
        this._isValid(inputElement, config);
        this._toggleButtonState(inputs, buttonElement, config);
      });
    });
  }
  _isValid(inputElement, config) {
    if (!inputElement.validity.valid) {
      const inputElementValidationMessage = inputElement.validationMessage;
      this._showInputError(inputElement, inputElementValidationMessage, config);
    } else {
      this._hideInputError(inputElement, config);
    }
  }
  _toggleButtonState(inputs, buttonElement, config) {
    if (this._hasInvalidInput(inputs)) {
      buttonElement.classList.add(config.buttonElementClass);
      buttonElement.setAttribute("disabled", true);
    } else {
      buttonElement.classList.remove(config.buttonElementClass);
      buttonElement.removeAttribute("disabled", true);
    }
  }
  _showInputError(inputElement, inputElementValidationMessage, config) {
    const errorElement = inputElement.nextElementSibling;

    inputElement.classList.add(config.inputErrorClass);
    errorElement.classList.add(config.errorClass);
    errorElement.textContent = inputElementValidationMessage;
  }
  _hideInputError(inputElement, config) {
    const errorElement = inputElement.nextElementSibling;

    inputElement.classList.remove(config.inputErrorClass);
    errorElement.classList.remove(config.errorClass);
    errorElement.textContent = "";
  }
  _hasInvalidInput(inputs) {
    return inputs.some((inputElement) => {
      return !inputElement.validity.valid;
    });
  }
}

const formList = Array.from(document.forms);

formList.forEach((formElement) => {
  const validation = new FormValidator(
    {
      inputsSelector: ".popup__input",
      buttonElementSelector: ".popup__submit-button",
      buttonElementClass: "popup__submit-button_inactive",
      errorClass: "popup__input-error_active",
      inputErrorClass: "popup__input_type_error",
    },
    formElement
  );
  validation.enableValidation(
    {
      inputsSelector: ".popup__input",
      buttonElementSelector: ".popup__submit-button",
      buttonElementClass: "popup__submit-button_inactive",
      errorClass: "popup__input-error_active",
      inputErrorClass: "popup__input_type_error",
    },
    formElement
  );

  //validateInputs(formElement, config);
});

export const resetValidation = () => {
  const formList = Array.from(document.forms);
  const config = {
    inputsSelector: ".popup__input",
    buttonElementSelector: ".popup__submit-button",
    buttonElementClass: "popup__submit-button_inactive",
    errorClass: "popup__input-error_active",
    inputErrorClass: "popup__input_type_error",
  };

  formList.forEach((formElement) => {
    const inputs = Array.from(
      formElement.querySelectorAll(config.inputsSelector)
    );

    formElement.reset();

    inputs.forEach((inputElement) => {
      hideInputError(inputElement, config);
    });
  });
};
