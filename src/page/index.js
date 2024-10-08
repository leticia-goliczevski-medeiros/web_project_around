import "./index.css";
import {
  FormValidator,
  config,
  resetValidation,
} from "../components/FormValidator.js";
import Section from "../components/Section.js";
import Card from "../components/Card.js";
import UserInfo from "../components/UserInfo.js";
import PopupWithImage from "../components/PopupWithImage.js";
import PopupWithForm from "../components/PopupWithForm.js";
import API from "../components/API.js";

/* Instância da API */
const api = new API({
  baseUrl: "https://around.nomoreparties.co/v1/web-ptbr-cohort-13",
  headers: {
    authorization: "43bee733-4d07-4864-b830-d3fe06d29659",
    "Content-Type": "application/json",
  },
});
/* Busca usuário */
let user;
let userId;
const userInfo = new UserInfo({
  profileNameSelector: ".profile__name",
  profileDescriptionSelector: ".profile__description",
});
api
  .getUser()
  .then((res) => {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Error: ${res.status}`);
  })
  .then((result) => {
    user = result;
    userId = user._id;
    console.log(result);
    console.log(userId);
    // Carrega informações do usuário na tela
    userInfo.setUserInfo(user);
  })
  .catch((error) => {
    console.log(error);
  });

/* Cartões iniciais sendo adicionados assim que a página carrega */
let cardRenderer;
let popupWithImage;
api
  .getInitialCards()
  .then((res) => {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Error: ${res.status}`);
  })
  .then((cards) => {
    console.log("cards", cards);
    popupWithImage = new PopupWithImage(".image-popup__container");
    cardRenderer = new Section(
      {
        items: cards,
        renderer: (item) => {
          const card = new Card({
            item,
            templateSelector: "#card-template",
            handleCardClick: (item) => popupWithImage.open(item),
          });

          const cardElement = card.generateCard();
          cardRenderer.addItem(cardElement);
        },
      },
      ".gallery__cards"
    );
    cardRenderer.renderItems();
  })
  .catch((error) => {
    console.log(error);
  });

// const ilhaKauaiImage = new URL("../images/kauai-havai.jpg", import.meta.url);
// const grandCanyonImage = new URL("../images/grand-canyon.jpg", import.meta.url);
// const rockyMountainImage = new URL(
//   "../images/parque-nacional-rocky-mountain.jpg",
//   import.meta.url
// );
// const yellowstoneImage = new URL(
//   "../images/yellowstone-national-park.jpg",
//   import.meta.url
// );
// const lagoHaiyahaImage = new URL("../images/lago-haiyaha.jpg", import.meta.url);
// const yosemiteImage = new URL(
//   "../images/vale-de-yosemite.jpg",
//   import.meta.url
// );

// const initialCards = [
//   {
//     name: "Ilha Kauai",
//     link: ilhaKauaiImage,
//   },
//   {
//     name: "Grand Canyon",
//     link: grandCanyonImage,
//   },
//   {
//     name: "Parque Nacional Rocky Mountain",
//     link: rockyMountainImage,
//   },
//   {
//     name: "Parque Nacional Yellowstone",
//     link: yellowstoneImage,
//   },
//   {
//     name: "Lago Haiyaha",
//     link: lagoHaiyahaImage,
//   },
//   {
//     name: "Vale de Yosemite",
//     link: yosemiteImage,
//   },
// ];

/* Aplicar validação aos formulários */
const formList = Array.from(document.forms);

formList.forEach((formElement) => {
  const validation = new FormValidator(config, formElement);
  validation.enableValidation(config, formElement);
});

const editProfilePopupWithForm = new PopupWithForm({
  popupSelector: ".edit-profile-popup__container",
  formSubmiter: (event, name, about) => {
    event.preventDefault();

    //atualiza os dados do usuário no servidor
    api
      .saveProfileInfo(name, about)
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
        return Promise.reject(`Error: ${res.status}`);
      })
      .then((result) => {
        console.log(result);
      })
      .catch((error) => {
        console.log(error);
      });
    //pega os dados atualizados do usuário e mostra na tela
    api
      .getUser()
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
        return Promise.reject(`Error: ${res.status}`);
      })
      .then((result) => {
        user = result;
        userInfo.setUserInfo(user);
      })
      .catch((error) => {
        console.log(error);
      });
  },
  formResetter: resetValidation,
});
const editProfileButton = document.querySelector(".profile__edit-icon");
editProfileButton.addEventListener("click", () => {
  editProfilePopupWithForm.open();
});

api
  .addCard()
  .then((res) => {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Error: ${res.status}`);
  })
  .then((card) => {
    console.log(card);
    /* de const card até addItem() */
  })
  .catch((error) => {
    console.log(error);
  });
const addCardPopupWithForm = new PopupWithForm({
  popupSelector: ".add-card-popup__container",
  formSubmiter: (event) => {
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
      handleCardClick: (item) => popupWithImage.open(item),
    });
    const cardElement = card.generateCard();
    cardRenderer.addItem(cardElement);

    /*Depois que um card é adicionado, na próxima vez que o popup for aberto, o botão criar já estará desativado */
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
  addCardPopupWithForm.open();
});
