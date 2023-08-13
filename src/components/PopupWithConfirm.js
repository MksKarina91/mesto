import { Popup } from "./Popup.js";

export class PopupWithConfirm extends Popup {
  constructor(selector, confirmButton, handleCardDelete) {
    super(selector);
    this._confirmButton = this._popup.querySelector(confirmButton);
    this._handleCardDelete = handleCardDelete;
  }

  open(card, cardId) {
    super.open();
    this._card = card;
    this._cardId = cardId;
  }

  setEventListeners() {
    super.setEventListeners();

    this._confirmButton.addEventListener("click", () => {
      this._handleCardDelete(this._card, this._cardId);
    });
  }
}
