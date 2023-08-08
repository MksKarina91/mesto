export class Popup {
  constructor(selector) {
    this._popup = document.querySelector(selector);
    this._closeButton = this._popup.querySelector(".popup__close-icon");
  }

  open() {
    this._popup.classList.add("popup_opened");
    this.setEventListeners();
  }
  close() {
    this._popup.classList.remove("popup_opened");
    this._popup.removeEventListener("click", this._closePopupByClickOverlay);
    document.removeEventListener("keydown", this._handleEscClose);
    this._closeButton.removeEventListener("click", this.close);
  }
  _handleEscClose = (evt) => {
    if (evt.key === "Escape") {
      this.close(this._popup);
    }
  };
  _closePopupByClickOverlay = (evt) => {
    if (evt.target === evt.currentTarget) {
      this.close(this._popup);
    }
  };
  setEventListeners() {
    document.addEventListener("keydown", this._handleEscClose);
    this._popup.addEventListener("click", this._closePopupByClickOverlay);
    this._closeButton.addEventListener("click", () => {
      this.close();
    });
  }
}
