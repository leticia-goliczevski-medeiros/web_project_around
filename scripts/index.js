import * as validateModule from "./validate.js";

/* Botões dos popups */
const editProfileButton = document.querySelector(".profile__edit-icon");
const editProfileSection = document.querySelector(".edit-profile-popup");

const addCardButton = document.querySelector(".profile__add-button");
const addCardSection = document.querySelector(".add-card-popup");
const createButton = document.querySelector(".add-card-popup__submit-button");

//const expandedImage = document.querySelector(".image-popup__image");
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
  const popupSection = document.querySelector(".popup_popup_opened");
  const closeButton = popupSection.querySelector(".popup__close-icon");
  popupSection.classList.remove("popup_popup_opened");

  document.removeEventListener("keydown", closePopupWithEsc);
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

class Card {
  constructor(data) {
    this._name = data.item.name;
    this._link = data.item.link;
    this._templateSelector = data.templateSelector;
    this._openPopup = data.openPopup;
  }
  _getTemplate() {
    const templateElement = document.querySelector(
      this._templateSelector
    ).content;
    const cardElement = templateElement
      .querySelector(".gallery__card")
      .cloneNode(true);

    return cardElement;
  }
  generateCard() {
    this._element = this._getTemplate();

    this._element.querySelector(".gallery__card-title").textContent =
      this._name;
    this._element
      .querySelector(".gallery__card-title")
      .setAttribute("alt", this._name);
    this._element.querySelector(".gallery__card-image").src = this._link;

    this._setEventListeners();

    return this._element;
  }
  _setEventListeners() {
    const cardImage = this._element.querySelector(".gallery__card-image");

    cardImage.addEventListener("click", (event) => {
      this._openPopup(event);
      this._enableExpandingImage();
    });

    this._element
      .querySelector(".gallery__delete-icon")
      .addEventListener("click", () => {
        this._enableDeletingCards();
      });

    this._element
      .querySelector(".gallery__heart-icon")
      .addEventListener("click", () => {
        this._enableLikeButton();
      });
  }
  _enableExpandingImage() {
    const expandedImage = document.querySelector(".image-popup__image");
    expandedImage.setAttribute("src", `${this._link}`);

    document.querySelector(".image-popup__title").textContent = this._name;
  }
  _enableDeletingCards() {
    this._element.remove();
  }
  _enableLikeButton() {
    const likeButon = this._element.querySelector(".gallery__heart-icon");
    const heartIconSource = likeButon.getAttribute("src");
    if (heartIconSource === "./images/heart-icon.png") {
      likeButon.setAttribute("src", "./images/heart-icon-active.png");
    } else {
      likeButon.setAttribute("src", "./images/heart-icon.png");
    }
  }
}

const galleryCards = document.querySelector(".gallery__cards");
initialCards.forEach((item) => {
  const card = new Card({
    item,
    templateSelector: "#card-template",
    openPopup,
  });
  const cardElement = card.generateCard();

  galleryCards.prepend(cardElement);
});

/* adicionar novo card */
const addCardformElement = document.querySelector(".add-card-popup__form");
addCardformElement.addEventListener("submit", submitAddCardForm);
function submitAddCardForm(event) {
  event.preventDefault();

  const inputLink = document.querySelector(".add-card-popup__input_link");
  const inputTitle = document.querySelector(".add-card-popup__input_title");

  const item = {
    name: inputTitle.value,
    link: inputLink.value,
  };

  const card = new Card({
    item,
    templateSelector: "#card-template",
    openPopup,
  });
  const cardElement = card.generateCard();

  galleryCards.prepend(cardElement);

  /* depois que um card é adicionado, na próxima vez que o popup for aberto, o botão criar já estará desativado */
  createButton.classList.add("popup__submit-button_inactive");
  createButton.setAttribute("disabled", true);

  closePopup();
}
