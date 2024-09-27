import { FormValidator, config, resetValidation } from "./FormValidator.js";
import Section from "./Section.js";
import Card from "./Card.js";
import UserInfo from "./UserInfo.js";
import PopupWithImage from "./PopupWithImage.js";
import PopupWithForm from "./PopupWithForm.js";
// import { openPopup } from "./utils.js";

/* A página já carrega com as informações do perfil */
// export const nameInput = document.querySelector(
//   ".edit-profile-popup__input_name"
// );
// export const aboutInput = document.querySelector(
//   ".edit-profile-popup__input_about"
// );

// export const profileName = document.querySelector(".profile__name");
// export const profileDescription = document.querySelector(
// ".profile__description"
// );
// export function updateUserInfo() {
//   profileName.textContent = nameInput.value;
//   profileDescription.textContent = aboutInput.value;
// }
// updateUserInfo();

const userInfo = new UserInfo({
  profileNameSelector: ".profile__name",
  profileDescriptionSelector: ".profile__description",
});
userInfo.setUserInfo();

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
//criar instância de popupwithimage
const popupWithImage = new PopupWithImage(".image-popup__container");

const cardRenderer = new Section(
  {
    items: initialCards,
    renderer: (item) => {
      const card = new Card({
        item,
        templateSelector: "#card-template",
        openPopup: (item) => popupWithImage.open(item),
      });

      const cardElement = card.generateCard();
      cardRenderer.addItem(cardElement);
    },
  },
  ".gallery__cards"
);
cardRenderer.renderItems();

// export const galleryCards = document.querySelector(".gallery__cards");
// initialCards.forEach((item) => {
//   const card = new Card({
//     item,
//     templateSelector: "#card-template",
//     openPopup,
//   });
//   const cardElement = card.generateCard();

//   galleryCards.prepend(cardElement);
// });

/* Aplicar validação aos formulários */
const formList = Array.from(document.forms);

formList.forEach((formElement) => {
  const validation = new FormValidator(config, formElement);
  validation.enableValidation(config, formElement);
});

const editProfilePopup = new PopupWithForm({
  popupSelector: ".edit-profile-popup__container",
  formSubmiter: (event) => {
    event.preventDefault();

    userInfo.setUserInfo();
  },
  formResetter: resetValidation,
});
const editProfileButton = document.querySelector(".profile__edit-icon");
editProfileButton.addEventListener("click", () => {
  editProfilePopup.open();
});

const addCardPopup = new PopupWithForm({
  popupSelector: ".add-card-popup__container",
  formSubmiter: (event) => {
    event.preventDefault();

    const inputLink = document.querySelector(".add-card-popup__input_link");
    const inputTitle = document.querySelector(".add-card-popup__input_title");

    const item = {
      name: inputTitle.value,
      link: inputLink.value,
    };
    //revisar nome das instâncias

    const card = new Card({
      item,
      templateSelector: "#card-template",
      openPopup: (item) => popupWithImage.open(item),
    });
    const cardElement = card.generateCard();
    cardRenderer.addItem(cardElement);

    /* depois que um card é adicionado, na próxima vez que o popup for aberto, o botão criar já estará desativado */
    const createButton = document.querySelector(
      ".add-card-popup__submit-button"
    );
    createButton.classList.add("popup__submit-button_inactive");
    createButton.setAttribute("disabled", true);
  },
  formResetter: resetValidation,
});

const addCardButton = document.querySelector(".profile__add-button");
addCardButton.addEventListener("click", () => {
  addCardPopup.open();
});
