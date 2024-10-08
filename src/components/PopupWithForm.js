import Popup from "./Popup.js";

export default class PopupWithForm extends Popup {
  constructor({ popupSelector, formSubmiter, formResetter }) {
    super(popupSelector);
    this._formSubmiter = formSubmiter;
    this._popupForm = this._popup.querySelector(".popup__form");
    this._inputs = Array.from(
      this._popupForm.querySelectorAll(".popup__input")
    );
    this._formResetter = formResetter;
    this._sumbitHandler = this._sumbitHandler.bind(this);
  }

  _getInputValues() {
    return this._inputs.map((input) => input.value);
  }
  setEventListeners() {
    super.setEventListeners();

    this._popupForm.addEventListener("submit", this._sumbitHandler);
  }
  _sumbitHandler(event) {
    this._inputsValues = this._getInputValues();
    const name = this._inputsValues[0];
    const about = this._inputsValues[1];
    this._formSubmiter(event, name, about);
    this.close();
  }
  close() {
    super.close();
    this._popupForm.removeEventListener("submit", this._sumbitHandler);
    this._formResetter();
  }
}
