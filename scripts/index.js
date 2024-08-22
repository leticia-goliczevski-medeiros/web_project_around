/* Botões dos popups */
const editProfileButton = document.querySelector(".profile__edit-icon");
const editProfileSection = document.querySelector(".edit-profile-popup");
const editProfilePopupElement = document.querySelector(
  ".edit-profile-popup__container"
);
const editProfileCloseButton = document.querySelector(
  ".edit-profile-popup__close-icon"
);
const saveButton = document.querySelector(".edit-profile-popup__submit-button");

const addCardButton = document.querySelector(".profile__add-button");
const addCardSection = document.querySelector(".add-card-popup");
const addCardPopupElement = document.querySelector(
  ".add-card-popup__container"
);
const addCardCloseButton = document.querySelector(
  ".add-card-popup__close-icon"
);
const createButton = document.querySelector(".add-card-popup__submit-button");

makePopupButtonInteractive(editProfileButton, editProfileSection);
enableClosePopup(
  editProfileSection,
  editProfilePopupElement,
  editProfileCloseButton
);
enableClosePopup(editProfileSection, editProfilePopupElement, saveButton);

makePopupButtonInteractive(addCardButton, addCardSection);
enableClosePopup(addCardSection, addCardPopupElement, addCardCloseButton);
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

  inputTitle.value = "";
  inputLink.value = "";

  createButton.classList.add("popup__submit-button_inactive");
  createButton.setAttribute("disabled", true);
}

/* enable close popup */
function enableClosePopup(popupSection, popupElement, button) {
  popupSection.addEventListener("click", (event) => {
    if (!popupElement.contains(event.target) || event.target == button) {
      popupSection.classList.remove("popup_popup_opened");
    }
  });
}

makeCardsInteractive();

/* expand picture */
function makeCardsInteractive() {
  const galleryCards = document.querySelector(".gallery__cards");

  galleryCards.addEventListener("click", (event) => {
    if (event.target.classList.contains("gallery__card-image")) {
      const imageSource = event.target.getAttribute("src");
      const expandedImage = document.querySelector(".image-popup__image");
      expandedImage.setAttribute("src", `${imageSource}`);

      /* deixar a section image-popup visível, adicionando a classe */
      const imagePopupSection = document.querySelector(".image-popup");
      imagePopupSection.classList.toggle("popup_popup_opened");

      // fechar image-popup
      const imagePopupCloseButton = document.querySelector(
        ".image-popup__close-icon"
      );
      enableClosePopup(imagePopupSection, expandedImage, imagePopupCloseButton);

      /* selecionar o título do card dessa imagem, pegar o conteúdo e colocar abaixo da imagem expandida */
      const cardTitle =
        event.target.closest(".gallery__card").lastElementChild
          .firstElementChild.textContent;
      document.querySelector(".image-popup__title").textContent = cardTitle;
    }
    if (event.target.classList.contains("gallery__delete-icon")) {
      const card = event.target.closest(".gallery__card");
      card.remove();

      HTMLlist.splice(index, 1);
    }
    if (event.target.classList.contains("gallery__heart-icon")) {
      const heartIconSource = event.target.getAttribute("src");
      if (heartIconSource === "./images/heart-icon.png") {
        eventTarget.setAttribute("src", "./images/heart-icon-active.png");
      } else {
        eventTarget.setAttribute("src", "./images/heart-icon.png");
      }
    }
  });
}
