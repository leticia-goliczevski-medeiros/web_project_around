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
    const inputsValues = this._getInputValues();
    this._formSubmiter(event, inputsValues);
    this.close();
  }
  close() {
    super.close();
    this._popupForm.removeEventListener("submit", this._sumbitHandler);
    this._formResetter();
  }
}
