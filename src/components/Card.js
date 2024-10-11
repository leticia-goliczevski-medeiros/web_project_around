export default class Card {
  constructor({
    item,
    templateSelector,
    handleCardClick,
    addLike,
    removeLike,
    user,
  }) {
    this._item = item;
    this._name = item.name;
    this._link = item.link;
    this._likes = item.likes;
    this._templateSelector = templateSelector;
    this._handleCardClick = handleCardClick;
    this._addLike = addLike;
    this._removeLike = removeLike;
    this._user = user;
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
    this._likeCount = this._likes.length;
    this._element.querySelector(".gallery__like-count").textContent =
      this._likeCount;
    this._likeButton = this._element.querySelector(".gallery__heart-icon");

    this._heartIcon = new URL("../images/heart-icon.png", import.meta.url);
    this._heartIconActive = new URL(
      "../images/heart-icon-active.png",
      import.meta.url
    );

    //verifica se eu já curti o cartão para que apareça na tela o botão de like ativo. Compara dois objetos, cada objeto do vetor de likes do cartão com o objeto com os meus dados de usuário
    const hasUserLike = this._likes.some((like) => {
      const keysOfLike = Object.keys(like);
      for (const key in keysOfLike) {
        if (like[key] == this._user[key]) {
          return true;
        }
      }
    });

    if (hasUserLike) {
      this._likeButton.setAttribute("src", this._heartIconActive);
    } else {
      this._likeButton.setAttribute("src", this._heartIcon);
    }

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

    this._likeButton.addEventListener("click", () => {
      this._enableLikeButton();
    });
  }
  _enableDeletingCards() {
    this._element.remove();
  }
  _enableLikeButton() {
    this._heartIconSource = this._likeButton.getAttribute("src");
    if (this._heartIcon.href.includes(this._heartIconSource)) {
      this._likeButton.setAttribute("src", this._heartIconActive);
      this._addLike(this._item);

      /* atualizar contagem de likes */
      this._likeCount++;
      this._element.querySelector(".gallery__like-count").textContent =
        this._likeCount;
    } else {
      this._likeButton.setAttribute("src", this._heartIcon);
      this._removeLike(this._item);

      this._likeCount--;
      this._element.querySelector(".gallery__like-count").textContent =
        this._likeCount;
    }
  }
}
