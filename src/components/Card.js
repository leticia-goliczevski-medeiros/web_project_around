export default class Card {
  constructor({
    item,
    templateSelector,
    handleCardClick,
    addLike,
    removeLike,
    user,
    removeCard,
    handleDeleteClick,
  }) {
    this._item = item;
    this._name = item.name;
    this._link = item.link;
    this._owner = item.owner;
    this._cardId = item._id;
    this._templateSelector = templateSelector;
    this._handleCardClick = handleCardClick;
    this._addLike = addLike;
    this._removeLike = removeLike;
    this._user = user;
    this._userId = user._id;
    this._removeCard = removeCard;
    this._handleDeleteClick = handleDeleteClick;
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

    //set card info
    this._element.querySelector(".gallery__card-title").textContent =
      this._name;
    this._element
      .querySelector(".gallery__card-title")
      .setAttribute("alt", this._name);
    this._element.querySelector(".gallery__card-image").src = this._link;

    this._likeButton = this._element.querySelector(".gallery__heart-icon");
    this._heartIcon = new URL("../images/heart-icon.png", import.meta.url);
    this._heartIconActive = new URL(
      "../images/heart-icon-active.png",
      import.meta.url
    );

    //verifica se o cartão foi curtido para que apareça na tela o botão de like ativo.
    if (this._item.isLiked) {
      this._likeButton.setAttribute("src", this._heartIconActive);
    } else {
      this._likeButton.setAttribute("src", this._heartIcon);
    }

    this._setEventListeners();

    this._deleteIcon = this._element.querySelector(".gallery__delete-icon");
    this._deleteIcon.addEventListener("click", () => {
      this._handleDeleteClick(this._cardId, this._element);
    });

    return this._element;
  }
  _setEventListeners() {
    const cardImage = this._element.querySelector(".gallery__card-image");

    cardImage.addEventListener("click", () => {
      this._handleCardClick({ name: this._name, link: this._link });
    });

    this._likeButton.addEventListener("click", () => {
      this._enableLikeButton();
    });
  }

  _enableLikeButton() {
    this._heartIconSource = this._likeButton.getAttribute("src");
    if (this._heartIcon.href.includes(this._heartIconSource)) {
      this._likeButton.setAttribute("src", this._heartIconActive);
      this._addLike(this._item);
    } else {
      this._likeButton.setAttribute("src", this._heartIcon);
      this._removeLike(this._item);
    }
  }
}
