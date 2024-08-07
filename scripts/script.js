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

let HTMLlist = [];
HTMLlist = initialCards.map((card) => {
  const cardTemplate = document.querySelector("#card-template").content;
  const cardElement = cardTemplate
    .querySelector(".gallery__card")
    .cloneNode(true);

  cardElement.querySelector(".gallery__card-image").src = `${card.link}`;
  cardElement.querySelector(
    ".gallery__card-title"
  ).textContent = `${card.name}`;

  cardList.append(cardElement);

  return card;
});
likeOrDislike();
deleteCard();
expandImage();

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

  HTMLlist.unshift({
    name: document.querySelector(".add-card-popup__input_title").value,
    link: document.querySelector(".add-card-popup__input_link").value,
  });

  openCloseAddCardPopup();

  document.querySelector(".add-card-popup__input_link").value = "";
  document.querySelector(".add-card-popup__input_title").value = "";

  likeOrDislike();
  deleteCard();
  expandImage();
}

addCardformElement.addEventListener("submit", handleAddCardFormSubmit);

/* like button */
function likeOrDislike() {
  const likeButton = document.querySelectorAll(".gallery__heart-icon");

  Array.from(likeButton).forEach((item) => {
    item.addEventListener("click", (event) => {
      const eventTarget = event.target;
      const source = eventTarget.getAttribute("src");
      if (source === "./images/heart-icon.png") {
        eventTarget.setAttribute("src", "./images/heart-icon-active.png");
      }
      if (source === "./images/heart-icon-active.png") {
        eventTarget.setAttribute("src", "./images/heart-icon.png");
      }
    });
  });
}

/* delete button */
function deleteCard() {
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
function expandImage() {
  const images = document.querySelectorAll(".gallery__card-image");

  Array.from(images).forEach((image) => {
    image.addEventListener("click", (event) => {
      const eventTarget = event.target;

      const imageSource = eventTarget.getAttribute("src");
      const expandedImage = document.querySelector(".image-popup__image");
      expandedImage.setAttribute("src", `${imageSource}`);

      /* deixar a section image-popup visível, adicionando a classe */
      document
        .querySelector(".image-popup")
        .classList.toggle("image-popup_opened");

      /* close icon */
      expandedImage.previousElementSibling.addEventListener("click", () => {
        document
          .querySelector(".image-popup")
          .classList.remove("image-popup_opened");
      });

      /* selecionar o título h2 do card desse evenTarget (dessa imagem), pegar o conteúdo e colocar abaixo da imagem expandida */
      const cardTitle =
        eventTarget.closest(".gallery__card").lastElementChild.firstElementChild
          .textContent;
      document.querySelector(".image-popup__title").textContent = cardTitle;
    });
  });
}
