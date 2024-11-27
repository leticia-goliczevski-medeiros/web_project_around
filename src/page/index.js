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
import PopupWithConfirmation from "../components/PopupWithConfirmation.js";
import API from "../components/API.js";

const api = new API({
  makeRequest: (endpoint, requestOptions) => {
    return fetch(
      `https://around-api.pt-br.tripleten-services.com/v1/${endpoint}`,
      requestOptions
    );
  },
  headers: {
    authorization: "46bfb3be-dbce-4d6f-9db9-127f775222d9",
    "Content-Type": "application/json",
  },
});

//função parâmetro da classe Card
function addLike(item) {
  item.isLiked = true;
  const cardId = item._id;

  api
    .addCardLike(cardId)
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
}
//função parâmetro da classe Card
function removeLike(item) {
  item.isLiked = false;
  const cardId = item._id;

  api
    .removeCardLike(cardId)
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
}
//função parâmetro da classe PopupWithConfirmation. Ela deleta o card do servidor e remove o card da árvore DOM
function removeCard(cardId, DOMElement) {
  api
    .deleteCard(cardId)
    .then((res) => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(`Error: ${res.status}`);
    })
    .then((result) => {
      console.log(result);

      DOMElement.remove();
    })
    .catch((error) => {
      console.log(error);
    });
}
//função parâmetro de Card
function handleDeleteClick(cardId, DOMElement) {
  const popupWithConfirmation = new PopupWithConfirmation({
    popupSelector: ".popup-with-confirmation__container",
    removeCard,
    cardId,
    DOMElement,
  });

  popupWithConfirmation.open();
}

/* Busca dados do usuário e adiciona os cards iniciais na tela */
let user;
let cardRenderer;
let popupWithImage;
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
    userInfo.setUserInfo(user);

    api
      .getInitialCards()
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
        return Promise.reject(`Error: ${res.status}`);
      })
      .then((cards) => {
        console.log(cards);
        const reversedCards = cards.reverse();
        popupWithImage = new PopupWithImage(".image-popup__container");
        cardRenderer = new Section(
          {
            items: reversedCards,
            renderer: (item) => {
              const card = new Card({
                item,
                templateSelector: "#card-template",
                handleCardClick: (item) => popupWithImage.open(item),
                addLike,
                removeLike,
                user,
                removeCard,
                handleDeleteClick,
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
  })
  .catch((error) => {
    console.log(error);
  });

/* Aplicar validação aos formulários */
const formList = Array.from(document.forms);

formList.forEach((formElement) => {
  const validation = new FormValidator(config, formElement);
  validation.enableValidation(config, formElement);
});

const editProfilePopupWithForm = new PopupWithForm({
  popupSelector: ".edit-profile-popup__container",
  formSubmiter: (event, inputsValues) => {
    event.preventDefault();

    const name = inputsValues[0];
    const about = inputsValues[1];

    //UX
    const button = document.querySelector(".edit-profile-popup__submit-button");
    button.textContent = "Salvando...";

    api
      .saveProfileInfo({ name, about })
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
      })
      .finally(() => {
        button.textContent = "Salvar";
      });
  },
  formResetter: resetValidation,
});
const editProfileButton = document.querySelector(".profile__edit-icon");
editProfileButton.addEventListener("click", () => {
  /* quando o popup de editar perfil for aberto, os dados do usuário já vão aparecer nos campos*/
  const info = userInfo.getUserInfo();
  document.querySelector(".edit-profile-popup__input_name").value =
    info.userName;
  document.querySelector(".edit-profile-popup__input_about").value =
    info.userDescription;
  editProfilePopupWithForm.open();
});

const addCardPopupWithForm = new PopupWithForm({
  popupSelector: ".add-card-popup__container",
  formSubmiter: (event, inputsValues) => {
    event.preventDefault();

    const name = inputsValues[0];
    const link = inputsValues[1];

    //UX
    const createButton = document.querySelector(
      ".add-card-popup__submit-button"
    );
    createButton.textContent = "Salvando...";

    api
      .addCard(name, link)
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
        return Promise.reject(`Error: ${res.status}`);
      })
      .then((result) => {
        console.log(result);
        const item = result;

        //criar a instância do card e adicioná-lo na tela
        const card = new Card({
          item,
          templateSelector: "#card-template",
          handleCardClick: (item) => popupWithImage.open(item),
          addLike,
          removeLike,
          user,
          removeCard,
          handleDeleteClick,
        });
        const cardElement = card.generateCard();
        cardRenderer.addItem(cardElement);
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => {
        createButton.textContent = "Criar";
      });

    /*Depois que um card é adicionado, na próxima vez que o popup for aberto, o botão criar já estará desativado */
    createButton.classList.add("popup__submit-button_inactive");
    createButton.setAttribute("disabled", true);
  },
  formResetter: resetValidation,
});

const addCardButton = document.querySelector(".profile__add-button");
addCardButton.addEventListener("click", () => {
  addCardPopupWithForm.open();
});

const profilePicturePopupWithForm = new PopupWithForm({
  popupSelector: ".update-profile-picture-popup__container",
  formSubmiter: (event, inputsValues) => {
    event.preventDefault();

    const avatar = inputsValues[0];

    //UX
    const button = document.querySelector(
      ".update-profile-picture-popup__submit-button"
    );
    button.textContent = "Salvando...";

    api
      .updateProfilePicture(avatar)
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
        return Promise.reject(`Error: ${res.status}`);
      })
      .then((userData) => {
        userInfo.setUserInfo(userData);
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => {
        button.textContent = "Salvar";
      });
  },
  formResetter: resetValidation,
});
const profilePicture = document.querySelector(".profile__picture-container");
profilePicture.addEventListener("click", () => {
  profilePicturePopupWithForm.open();
});
