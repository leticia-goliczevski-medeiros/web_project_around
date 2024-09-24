export default class Popup {
  constructor(popupSelector) {
    this._popup = document.querySelector(popupSelector);
    this._popupSection = this._popup.parentElement;
    this._popupCloseIcon = this._popup.querySelector(".popup__close-icon");
  }

  open() {
    this._popupSection.classList.add("popup_popup_opened");
    this.setEventListeners();
  }
  close() {
    this._popupSection.classList.remove("popup_popup_opened");
    //remover eventos no próximo sprint
  }
  _handleEscClose(event) {
    if (event.key === "Escape") {
      this.close();
    }
  }
  setEventListeners() {
    document.addEventListener("keydown", (event) => {
      this._handleEscClose(event);
    });

    this._popupSection.addEventListener("click", (event) => {
      if (event.target.tagName == "SECTION") {
        this.close();
      }
    });

    this._popupCloseIcon.addEventListener("click", () => {
      this.close();
    });
  }
}
