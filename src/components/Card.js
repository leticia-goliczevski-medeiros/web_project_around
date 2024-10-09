export default class Card {
  constructor({
    item,
    templateSelector,
    handleCardClick,
    addLike,
    removeLike,
  }) {
    this._item = item;
    this._name = item.name;
    this._link = item.link;
    this._likes = item.likes;
    this._templateSelector = templateSelector;
    this._handleCardClick = handleCardClick;
    this._addLike = addLike;
    this._removeLike = removeLike;
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

    cardImage.addEventListener("click", () => {
      this._handleCardClick({ name: this._name, link: this._link });
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
  _enableDeletingCards() {
    this._element.remove();
  }
  _enableLikeButton() {
    const likeButon = this._element.querySelector(".gallery__heart-icon");
    const heartIconSource = likeButon.getAttribute("src");

    const heartIcon = new URL("../images/heart-icon.png", import.meta.url);
    const heartIconActive = new URL(
      "../images/heart-icon-active.png",
      import.meta.url
    );

    if (heartIcon.pathname.includes(heartIconSource)) {
      likeButon.setAttribute("src", heartIconActive);
      this._addLike(this._item);
    } else {
      likeButon.setAttribute("src", heartIcon);
      this._removeLike(this._item);
    }
  }
}
