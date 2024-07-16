let editProfileButton = document.querySelector(".profile__edit-icon");
let closeButton = document.querySelector(".edit-profile__close-icon");

function editProfile() {
  let editProfileSection = document.querySelector(".edit-profile");
  editProfileSection.classList.toggle("edit-profile_popup_opened");
}
editProfileButton.addEventListener("click", editProfile);
closeButton.addEventListener("click", editProfile);

let formElement = document.querySelector(".edit-profile__form");

function handleProfileFormSubmit(evt) {
  evt.preventDefault();

  let nameInput = document.querySelector(".edit-profile__input_name");
  let aboutInput = document.querySelector(".edit-profile__input_about");
  let nameInputValue = nameInput.value;
  let aboutInputValue = aboutInput.value;

  document.querySelector(".profile__name").textContent = nameInputValue;
  document.querySelector(".profile__description").textContent = aboutInputValue;
  editProfile();
}
formElement.addEventListener("submit", handleProfileFormSubmit);
