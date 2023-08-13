export class Popup {
  constructor(selector) {
    this._popup = document.querySelector(selector);
    this._close = this.close.bind(this);
    this._closeButton = this._popup.querySelector(".popup__close-icon");
  }

  open() {
    this._popup.classList.add("popup_opened");
    document.addEventListener("keydown", this._handleEscClose);
    this.setEventListeners();
  }
  close() {
    this._popup.classList.remove("popup_opened");
    document.removeEventListener("keydown", this._handleEscClose);
  }
  _handleEscClose = (evt) => {
    if (evt.key === "Escape") {
      this.close();
    }
  };
  _closePopupByClickOverlay = (evt) => {
    if (evt.target === evt.currentTarget) {
      this.close();
    }
  };
  setEventListeners() {
    this._popup.addEventListener("click", this._closePopupByClickOverlay);
    this._closeButton.addEventListener("click", this._close);
  }
}
