class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
    this._popupImage = super._popup.querySelector(".image-popup__image");
  }

  open() {
    super.open();

    this._popupImage.src = ; //como selecionar o link da imagem que acionou o evento de click?
  }
}
