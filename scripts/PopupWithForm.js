class PopupWithForm extends Popup {
  constructor(popupSelector, formSubmiter) {
    super(popupSelector);
    this._formSubmiter = formSubmiter;
    this._popupForm = super._popup.document.querySelctor(".popup__form");
  }

  _getInputValues() {}
  setEventListeners() {
    super.setEventListeners();

    this._popupForm.addEventListener("submit", () => {
      this._formSubmiter();
    });
    // adicionar o ouvinte de eventos click para o ícone de fechamento. Mas a classe popup já faz isso
  }
  close() {
    super.close();

    this._popupForm.reset(); //????
  }
}
