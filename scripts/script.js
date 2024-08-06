/* Editar perfil */
const editProfileButton = document.querySelector(".profile__edit-icon");
const closeButton = document.querySelector(".popup__close-icon");

function openClosePopup() {
  const editProfileSection = document.querySelector(".popup");
  editProfileSection.classList.toggle("popup_popup_opened");
}
editProfileButton.addEventListener("click", openClosePopup);
closeButton.addEventListener("click", openClosePopup);

/* Implementar dados de editar perfil */
const nameInput = document.querySelector(".popup__input_name");
const aboutInput = document.querySelector(".popup__input_about");

const profileName = document.querySelector(".profile__name");
const profileDescription = document.querySelector(".profile__description");
profileName.textContent = nameInput.value;
profileDescription.textContent = aboutInput.value;

const formElement = document.querySelector(".popup__form");
function handleProfileFormSubmit(evt) {
  evt.preventDefault();

  profileName.textContent = nameInput.value;
  profileDescription.textContent = aboutInput.value;
  openClosePopup();
}
formElement.addEventListener("submit", handleProfileFormSubmit);

/* Botão adicionar Card */
const addCardButton = document.querySelector(".profile__add-button");
const closeButtonElement = document.querySelector(
  ".add-card-popup__close-icon"
);

function openCloseAddCardPopup() {
  const addCardSection = document.querySelector(".add-card-popup");
  addCardSection.classList.toggle("add-card-popup_opened");
}
addCardButton.addEventListener("click", openCloseAddCardPopup);
closeButtonElement.addEventListener("click", openCloseAddCardPopup);

/* cartões iniciais sendo adicionados via JS assim que a página carrega */
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

initialCards.forEach((card) => {
  const cardTemplate = document.querySelector("#card-template").content;
  const cardElement = cardTemplate
    .querySelector(".gallery__card")
    .cloneNode(true);

  cardElement.querySelector(".gallery__card-image").src = `${card.link}`;
  cardElement.querySelector(
    ".gallery__card-title"
  ).textContent = `${card.name}`;

  cardList.append(cardElement);
});

/* adicionar card */
const addCardformElement = document.querySelector(".add-card-popup__form");
function handleAddCardFormSubmit(event) {
  event.preventDefault();

  const cardTemplate = document.querySelector("#card-template").content;
  const cardElement = cardTemplate
    .querySelector(".gallery__card")
    .cloneNode(true);

  cardElement.querySelector(".gallery__card-image").src =
    document.querySelector(".add-card-popup__input_link").value;

  cardElement.querySelector(".gallery__card-title").textContent =
    document.querySelector(".add-card-popup__input_title").value;

  cardList.prepend(cardElement);

  openCloseAddCardPopup();

  document.querySelector(".add-card-popup__input_link").value = "";
  document.querySelector(".add-card-popup__input_title").value = "";
}

addCardformElement.addEventListener("submit", handleAddCardFormSubmit);
