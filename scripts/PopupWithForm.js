import Popup from "./Popup.js";

export default class PopupWithForm extends Popup {
  constructor({ popupSelector, formSubmiter }) {
    super(popupSelector);
    this._formSubmiter = formSubmiter;
    this._popupForm = this._popup.querySelector(".popup__form");
  }

  _getInputValues() {
    this._inputs = Array.from(this._popup.querySelectorAll(".popup__input"));
    return this._inputs.map((input) => input.value);
  }
  setEventListeners() {
    super.setEventListeners();

    this._popupForm.addEventListener("submit", (event) => {
      this._formSubmiter(event);
      this.close();
    });
    // adicionar o ouvinte de eventos click para o ícone de fechamento. Mas a classe popup já faz isso
  }
  close() {
    super.close();

    //this._popupForm.reset();          //importar a função resetValidation?
  }
}
