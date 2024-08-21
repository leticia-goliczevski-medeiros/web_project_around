const showInputError = (formElement, inputElement, inputElement.validationMessage)=> {
  
}

const isValid = (formElement, inputElement)=> {
  if (!inputElement.validity.valid) {
    showInputError(formElement, inputElement, inputElement.validationMessage);
  } else {
    hideInputError(formElement, inputElement);
  }
}

const validateInputs = (formElement) => {
  const inputList = Array.from(formElement.querySelectorAll(".form__input"));

  inputList.forEach((inputElement) => {
    inputElement.addEventListener('input', ()=> {
      isValid(formElement, inputElement);
    })
  });
};

const enableValidation = () => {
  const formList = Array.from(document.forms);

  formList.forEach((formElement) => {
    formElement.addEventListener("submit", (event) => {
      event.preventDefault();
    });

    validateInputs(formElement);
  });
};

enableValidation();
