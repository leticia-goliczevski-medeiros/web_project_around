const editProfileButton = document.querySelector(".profile__edit-icon");
const closeButton = document.querySelector(".popup__close-icon");

function openClosePopup() {
  const editProfileSection = document.querySelector(".popup");
  editProfileSection.classList.toggle("popup_popup_opened");
}
editProfileButton.addEventListener("click", openClosePopup);
closeButton.addEventListener("click", openClosePopup);

const nameInput = document.querySelector(".popup__input_name");
const aboutInput = document.querySelector(".popup__input_about");
let nameInputValue = nameInput.value;
let aboutInputValue = aboutInput.value;

const profileName = document.querySelector(".profile__name");
const profileDescription = document.querySelector(".profile__description");
profileName.textContent = nameInput.value;
profileDescription.textContent = aboutInput.value;

const formElement = document.querySelector(".popup__form");
function handleProfileFormSubmit(evt) {
  evt.preventDefault();

  let nameInputValue = nameInput.value;
  let aboutInputValue = aboutInput.value;

  profileName.textContent = nameInputValue;
  profileDescription.textContent = aboutInputValue;
  openClosePopup();
}
formElement.addEventListener("submit", handleProfileFormSubmit);

document.querySelector(".popup").addEventListener("keydown", (event) => {
  if (event.key === "Enter") {
    handleProfileFormSubmit();
  }
});
