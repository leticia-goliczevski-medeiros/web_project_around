import * as validateModule from "./validate.js";

/* Botões dos popups */
const editProfileButton = document.querySelector(".profile__edit-icon");
const editProfileSection = document.querySelector(".edit-profile-popup");

const addCardButton = document.querySelector(".profile__add-button");
const addCardSection = document.querySelector(".add-card-popup");
const createButton = document.querySelector(".add-card-popup__submit-button");

const expandedImage = document.querySelector(".image-popup__image");
const imagePopupSection = document.querySelector(".image-popup");

function openPopup(event) {
  let closeButton;
  let popupSection;
  const openPopupButton = event.target;
  if (openPopupButton.classList.contains("profile__edit-icon")) {
    popupSection = editProfileSection;
    closeButton = editProfileSection.querySelector(".popup__close-icon");
  }
  if (openPopupButton.classList.contains("profile__add-button")) {
    popupSection = addCardSection;
    closeButton = addCardSection.querySelector(".popup__close-icon");
  }
  if (openPopupButton.classList.contains("gallery__card-image")) {
    popupSection = imagePopupSection;
    closeButton = imagePopupSection.querySelector(".popup__close-icon");
  }

  popupSection.classList.add("popup_popup_opened");

  document.addEventListener("keydown", closePopupWithEsc);
  popupSection.addEventListener("click", closePopupWithClick);
  closeButton.addEventListener("click", closePopup);
}

function closePopup() {
  const openedPopup = document.querySelector(".popup_popup_opened");
  openedPopup.classList.remove("popup_popup_opened");

  document.removeEventListener("keydown", closePopupWithEsc);

  // Precisa remover os eventos do click no X e da Section
  popupSection.removeEventListener("click", closePopupWithClick);
  closeButton.removeEventListener("click", closePopup);

  validateModule.resetValidation();
}
function closePopupWithEsc(event) {
  if (event.key === "Escape") {
    closePopup();
  }
}
function closePopupWithClick(event) {
  if (event.target.tagName == "SECTION") {
    closePopup();
  }
}

editProfileButton.addEventListener("click", openPopup);
addCardButton.addEventListener("click", openPopup);

/* A página já carrega com as informações do perfil */
const nameInput = document.querySelector(".edit-profile-popup__input_name");
const aboutInput = document.querySelector(".edit-profile-popup__input_about");

const profileName = document.querySelector(".profile__name");
const profileDescription = document.querySelector(".profile__description");
function updateUserInfo() {
  profileName.textContent = nameInput.value;
  profileDescription.textContent = aboutInput.value;
}
updateUserInfo();

/* Implementar mudança dos dados no perfil */
const editProfileFormElement = document.querySelector(
  ".edit-profile-popup__form"
);
editProfileFormElement.addEventListener("submit", submitProfileForm);
function submitProfileForm(event) {
  event.preventDefault();

  updateUserInfo();

  /* o valor dos inputs é atualizado depois do formulário ser resetado */
  closePopup();
  nameInput.value = profileName.textContent;
  aboutInput.value = profileDescription.textContent;
}

/* Cartões iniciais sendo adicionados via JS assim que a página carrega */
const initialCards = [
  {
    name: "Ilha Kauai",
    link: "./images/kauai-havai.jpg",
  },
  {
    name: "Grand Canyon",
    link: "./images/grand-canyon.jpg",
  },
  {
    name: "Parque Nacional Rocky Mountain",
    link: "./images/parque-nacional-rocky-mountain.jpg",
  },
  {
    name: "Parque Nacional Yellowstone",
    link: "./images/yellowstone-national-park.jpg",
  },
  {
    name: "Lago Haiyaha",
    link: "./images/lago-haiyaha.jpg",
  },
  {
    name: "Vale de Yosemite",
    link: "./images/vale-de-yosemite.jpg",
  },
];

function renderCard(card) {
  const galleryCards = document.querySelector(".gallery__cards");
  const cardTemplate = document.querySelector("#card-template").content;
  const cardElement = cardTemplate
    .querySelector(".gallery__card")
    .cloneNode(true);
  const cardImage = cardElement.querySelector(".gallery__card-image");
  const cardTitle = cardElement.querySelector(".gallery__card-title");

  const likeButton = cardElement.querySelector(".gallery__heart-icon");
  const deleteButton = cardElement.querySelector(".gallery__delete-icon");

  cardImage.src = `${card.link}`;
  cardImage.setAttribute("alt", `${card.name}`);
  cardTitle.textContent = `${card.name}`;

  cardImage.addEventListener("click", enableExpandingImage);
  likeButton.addEventListener("click", enableLikeButton);
  deleteButton.addEventListener("click", enableDeletingCards);

  galleryCards.prepend(cardElement);
}

initialCards.forEach((card) => {
  renderCard(card);
});

/* adicionar novo card */
const addCardformElement = document.querySelector(".add-card-popup__form");
addCardformElement.addEventListener("submit", submitAddCardForm);
function submitAddCardForm(event) {
  event.preventDefault();

  const inputLink = document.querySelector(".add-card-popup__input_link");
  const inputTitle = document.querySelector(".add-card-popup__input_title");

  const card = {
    name: inputTitle.value,
    link: inputLink.value,
  };

  renderCard(card);

  validateModule.resetValidation();
  /* depois que um card é adicionado, na próxima vez que o popup for aberto, o botão criar já estará desativado */
  createButton.classList.add("popup__submit-button_inactive");
  createButton.setAttribute("disabled", true);

  closePopup();
}

function enableExpandingImage(event) {
  openPopup(event);

  const imageSource = event.target.getAttribute("src");
  expandedImage.setAttribute("src", `${imageSource}`);

  /* selecionar o título do card dessa imagem, pegar o conteúdo e colocar abaixo da imagem expandida */
  const cardTitle =
    event.target.closest(".gallery__card").lastElementChild.firstElementChild
      .textContent;
  document.querySelector(".image-popup__title").textContent = cardTitle;
}
function enableDeletingCards(event) {
  const card = event.target.closest(".gallery__card");
  card.remove();
}
function enableLikeButton(event) {
  const heartIconSource = event.target.getAttribute("src");
  if (heartIconSource === "./images/heart-icon.png") {
    event.target.setAttribute("src", "./images/heart-icon-active.png");
  } else {
    event.target.setAttribute("src", "./images/heart-icon.png");
  }
}
