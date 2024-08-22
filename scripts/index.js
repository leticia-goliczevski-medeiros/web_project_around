/* Botões dos popups */
const editProfileButton = document.querySelector(".profile__edit-icon");
const editProfileSection = document.querySelector(".edit-profile-popup");
const closeButton = document.querySelector(".edit-profile-popup__close-icon");
const saveButton = document.querySelector(".edit-profile-popup__submit-button");

const addCardButton = document.querySelector(".profile__add-button");
const addCardSection = document.querySelector(".add-card-popup");
const closeButtonElement = document.querySelector(
  ".add-card-popup__close-icon"
);
const createButton = document.querySelector(".add-card-popup__submit-button");

makePopupButtonInteractive(editProfileButton, editProfileSection);
makePopupButtonInteractive(closeButton, editProfileSection);
makePopupButtonInteractive(saveButton, editProfileSection);
makePopupButtonInteractive(addCardButton, addCardSection);
makePopupButtonInteractive(closeButtonElement, addCardSection);
makePopupButtonInteractive(createButton, addCardSection);

function openClosePopup(section) {
  section.classList.toggle("popup_popup_opened");
}
function makePopupButtonInteractive(button, section) {
  button.addEventListener("click", () => {
    openClosePopup(section);
  });
}

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

const cardList = document.querySelector(".gallery__cards");

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

  cardList.append(cardElement);

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

  cardList.prepend(cardElement);

  HTMLlist.unshift({
    name: inputTitle.value,
    link: inputLink.value,
  });

  inputTitle.value = "";
  inputLink.value = "";

  /* fazendo o like button desse novo card interativo */
  const likeButton = document.querySelector(".gallery__heart-icon");
  makeLikeButtonInteractive(likeButton);

  makeDeleteCardButtonInteractive();
  makeImageExpandable();
}

/* like button */
function makeLikeButtonInteractive(button) {
  button.addEventListener("click", (event) => {
    const eventTarget = event.target;
    const source = eventTarget.getAttribute("src");
    if (source === "./images/heart-icon.png") {
      eventTarget.setAttribute("src", "./images/heart-icon-active.png");
    } else {
      eventTarget.setAttribute("src", "./images/heart-icon.png");
    }
  });
}
/* tornando os botões dos cards iniciais interativos */
const likeButtons = document.querySelectorAll(".gallery__heart-icon");
Array.from(likeButtons).forEach((likeButton) => {
  makeLikeButtonInteractive(likeButton);
});
makeDeleteCardButtonInteractive();
makeImageExpandable();

/* delete button */
function makeDeleteCardButtonInteractive() {
  const deleteCardButtons = document.querySelectorAll(".gallery__delete-icon");

  Array.from(deleteCardButtons).forEach((deleteCardButton, index) => {
    deleteCardButton.addEventListener("click", (event) => {
      const eventTarget = event.target;
      const card = eventTarget.closest(".gallery__card");
      card.remove();

      HTMLlist.splice(index, 1);
    });
  });
}

/* expand picture */
function makeImageExpandable() {
  const images = document.querySelectorAll(".gallery__card-image");

  Array.from(images).forEach((image) => {
    image.addEventListener("click", (event) => {
      const eventTarget = event.target;

      const imageSource = eventTarget.getAttribute("src");
      const expandedImage = document.querySelector(".image-popup__image");
      expandedImage.setAttribute("src", `${imageSource}`);

      /* deixar a section image-popup visível, adicionando a classe */
      const imagePopupSection = document.querySelector(".image-popup");
      imagePopupSection.classList.toggle("popup_popup_opened");

      /* close icon */
      expandedImage.previousElementSibling.addEventListener("click", () => {
        imagePopupSection.classList.remove("popup_popup_opened");
      });

      /* selecionar o título do card dessa imagem, pegar o conteúdo e colocar abaixo da imagem expandida */
      const cardTitle =
        eventTarget.closest(".gallery__card").lastElementChild.firstElementChild
          .textContent;
      document.querySelector(".image-popup__title").textContent = cardTitle;
    });
  });
}
