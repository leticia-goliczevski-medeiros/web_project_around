import Popup from "./Popup.js";

export default class PopupWithConfirmation extends Popup {
  constructor({ popupSelector, removeCard, cardId, DOMElement }) {
    super(popupSelector);
    this._removeCard = removeCard;
    this._cardId = cardId;
    this._DOMElement = DOMElement;
    this._clickHandler = this._clickHandler.bind(this);
    this._confirmationButton = document.querySelector(
      ".popup-with-confirmation__submit-button"
    );
  }

  setEventListeners() {
    super.setEventListeners();

    this._confirmationButton.addEventListener("click", this._clickHandler);
  }
  _clickHandler() {
    this._removeCard(this._cardId, this._DOMElement);
    this.close();
  }
  close() {
    super.close();
    this._confirmationButton.removeEventListener("click", this._clickHandler);
  }
}
