import Popup from "./Popup.js";

export default class PopupWithForm extends Popup {
  constructor({ popupSelector, formSubmiter, formResetter }) {
    super(popupSelector);
    this._formSubmiter = formSubmiter;
    this._popupForm = this._popup.querySelector(".popup__form");
    this._formResetter = formResetter;
    this._sumbitHandler = this._sumbitHandler.bind(this);
  }

  _getInputValues() {
    this._inputs = Array.from(this._popup.querySelectorAll(".popup__input"));
    return this._inputs.map((input) => input.value);
  }
  setEventListeners() {
    super.setEventListeners();

    this._popupForm.addEventListener("submit", this._sumbitHandler);
  }
  _sumbitHandler(event) {
    this._formSubmiter(event);
    this.close();
  }
  close() {
    this._formResetter();
    super.close();
    this._popupForm.removeEventListener("submit", this._sumbitHandler);
  }
}
