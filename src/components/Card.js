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
    this._likes = item.likes;
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

    //like info
    this._likeCount = this._likes.length;
    this._element.querySelector(".gallery__like-count").textContent =
      this._likeCount;
    this._likeButton = this._element.querySelector(".gallery__heart-icon");

    this._heartIcon = new URL("../images/heart-icon.png", import.meta.url);
    this._heartIconActive = new URL(
      "../images/heart-icon-active.png",
      import.meta.url
    );

    //verifica se eu já curti o cartão para que apareça na tela o botão de like ativo. Compara o id de cada objeto do vetor de likes do cartão com o id do usuário
    const hasUserLike = this._likes.some((like) => {
      if (like._id === this._userId) {
        return true;
      }
    });

    if (hasUserLike) {
      this._likeButton.setAttribute("src", this._heartIconActive);
    } else {
      this._likeButton.setAttribute("src", this._heartIcon);
    }

    this._setEventListeners();

    //verifica se o card foi criado por mim para mostrar ou não o delete icon
    this._deleteIcon = this._element.querySelector(".gallery__delete-icon");

    if (this._owner._id !== this._userId) {
      this._deleteIcon.classList.add("gallery__delete-icon_inactive");
    } else {
      this._deleteIcon.addEventListener("click", () => {
        this._handleDeleteClick(this._cardId, this._element);
      });
    }

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
      this._addLike(this._item, this._user);

      /* atualizar contagem de likes */
      this._likeCount++;
      this._element.querySelector(".gallery__like-count").textContent =
        this._likeCount;
    } else {
      this._likeButton.setAttribute("src", this._heartIcon);
      this._removeLike(this._item, this._userId);

      this._likeCount--;
      this._element.querySelector(".gallery__like-count").textContent =
        this._likeCount;
    }
  }
}
