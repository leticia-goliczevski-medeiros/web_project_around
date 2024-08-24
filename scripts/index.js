import * as validateModule from "./validate.js";

/* Botões dos popups */
const editProfileButton = document.querySelector(".profile__edit-icon");
const editProfileSection = document.querySelector(".edit-profile-popup");
const editProfilePopupElement = document.querySelector(
  ".edit-profile-popup__container"
);
const editProfileCloseButton = document.querySelector(
  ".edit-profile-popup__close-icon"
);
makePopupButtonInteractive(editProfileButton, editProfileSection);
makePopupButtonInteractive(editProfileCloseButton, editProfileSection);

const addCardButton = document.querySelector(".profile__add-button");
const addCardSection = document.querySelector(".add-card-popup");
const addCardPopupElement = document.querySelector(
  ".add-card-popup__container"
);
const addCardCloseButton = document.querySelector(
  ".add-card-popup__close-icon"
);
const createButton = document.querySelector(".add-card-popup__submit-button");
makePopupButtonInteractive(addCardButton, addCardSection);
makePopupButtonInteractive(addCardCloseButton, addCardSection);

const expandedImage = document.querySelector(".image-popup__image");
const imagePopupSection = document.querySelector(".image-popup");
const imagePopupCloseButton = document.querySelector(
  ".image-popup__close-icon"
);
makePopupButtonInteractive(imagePopupCloseButton, imagePopupSection);

function makePopupButtonInteractive(button, section) {
  button.addEventListener("click", () => {
    section.classList.toggle("popup_popup_opened");
  });
}

/* clicar em esc ou fora do popup para fechá-lo */
function enableClosePopup(popupSection, popupElement) {
  popupSection.addEventListener("click", (event) => {
    if (!popupElement.contains(event.target)) {
      popupSection.classList.remove("popup_popup_opened");
      validateModule.resetValidation();
    }
  });
  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
      popupSection.classList.remove("popup_popup_opened");
      validateModule.resetValidation();
    }
  });
}
enableClosePopup(editProfileSection, editProfilePopupElement);
enableClosePopup(addCardSection, addCardPopupElement);
enableClosePopup(imagePopupSection, expandedImage);

/* A página já carrega com as informações do perfil */
const nameInput = document.querySelector(".edit-profile-popup__input_name");
const aboutInput = document.querySelector(".edit-profile-popup__input_about");

const profileName = document.querySelector(".profile__name");
const profileDescription = document.querySelector(".profile__description");
profileName.textContent = nameInput.value;
profileDescription.textContent = aboutInput.value;

/* Implementar mudança dos dados no perfil */
const editProfileFormElement = document.querySelector(
  ".edit-profile-popup__form"
);
editProfileFormElement.addEventListener("submit", submitProfileForm);
function submitProfileForm(event) {
  event.preventDefault();

  profileName.textContent = nameInput.value;
  profileDescription.textContent = aboutInput.value;

  validateModule.resetValidation();

  editProfileSection.classList.remove("popup_popup_opened");
}

/* Cartões iniciais sendo adicionados via JS assim que a página carrega */
const initialCards = [
  {
    name: "Vale de Yosemite",
    link: "./images/vale-de-yosemite.jpg",
  },
  {
    name: "Lago Haiyaha",
    link: "./images/lago-haiyaha.jpg",
  },
  {
    name: "Parque Nacional Yellowstone",
    link: "./images/yellowstone-national-park.jpg",
  },
  {
    name: "Parque Nacional Rocky Mountain",
    link: "./images/parque-nacional-rocky-mountain.jpg",
  },
  {
    name: "Grand Canyon",
    link: "./images/grand-canyon.jpg",
  },
  {
    name: "Ilha Kauai",
    link: "./images/kauai-havai.jpg",
  },
];

const galleryCards = document.querySelector(".gallery__cards");

let HTMLlist = [];
HTMLlist = initialCards.map((card) => {
  const cardTemplate = document.querySelector("#card-template").content;
  const cardElement = cardTemplate
    .querySelector(".gallery__card")
    .cloneNode(true);
  const cardImage = cardElement.querySelector(".gallery__card-image");
  const cardTitle = cardElement.querySelector(".gallery__card-title");

  cardImage.src = `${card.link}`;
  cardImage.setAttribute("alt", `${card.name}`);
  cardTitle.textContent = `${card.name}`;

  galleryCards.append(cardElement);

  return card;
});

/* adicionar novo card */
const addCardformElement = document.querySelector(".add-card-popup__form");
addCardformElement.addEventListener("submit", submitAddCardForm);
function submitAddCardForm(event) {
  event.preventDefault();

  const inputLink = document.querySelector(".add-card-popup__input_link");
  const inputTitle = document.querySelector(".add-card-popup__input_title");

  const cardTemplate = document.querySelector("#card-template").content;
  const cardElement = cardTemplate
    .querySelector(".gallery__card")
    .cloneNode(true);
  const cardImage = cardElement.querySelector(".gallery__card-image");
  const cardTitle = cardElement.querySelector(".gallery__card-title");

  cardImage.src = inputLink.value;
  cardImage.setAttribute("alt", `${inputTitle.value}`);
  cardTitle.textContent = inputTitle.value;

  galleryCards.prepend(cardElement);

  HTMLlist.unshift({
    name: inputTitle.value,
    link: inputLink.value,
  });

  addCardformElement.reset();
  validateModule.resetValidation();
  /* depois que um card é adicionado, na próxima vez que o popup for aberto, o botão criar já estará desativado */
  createButton.classList.add("popup__submit-button_inactive");
  createButton.setAttribute("disabled", true);

  addCardSection.classList.remove("popup_popup_opened");
}

makeCardsInteractive();

/* expand picture, delete button, like button */
function makeCardsInteractive() {
  const galleryCards = document.querySelector(".gallery__cards");

  galleryCards.addEventListener("click", (event) => {
    if (event.target.classList.contains("gallery__card-image")) {
      const imageSource = event.target.getAttribute("src");
      expandedImage.setAttribute("src", `${imageSource}`);

      /* deixar a section image-popup visível, adicionando a classe */
      imagePopupSection.classList.toggle("popup_popup_opened");

      /* selecionar o título do card dessa imagem, pegar o conteúdo e colocar abaixo da imagem expandida */
      const cardTitle =
        event.target.closest(".gallery__card").lastElementChild
          .firstElementChild.textContent;
      document.querySelector(".image-popup__title").textContent = cardTitle;
    }
    if (event.target.classList.contains("gallery__delete-icon")) {
      const card = event.target.closest(".gallery__card");
      card.remove();

      /* lista */
      //HTMLlist.splice(index, 1);
    }
    if (event.target.classList.contains("gallery__heart-icon")) {
      const heartIconSource = event.target.getAttribute("src");
      if (heartIconSource === "./images/heart-icon.png") {
        event.target.setAttribute("src", "./images/heart-icon-active.png");
      } else {
        event.target.setAttribute("src", "./images/heart-icon.png");
      }
    }
  });
}
