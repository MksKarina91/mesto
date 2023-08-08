import { Popup } from "./Popup.js";
export class PopupWithForm extends Popup {
  constructor(selector, handleSubmit, formSelector) {
    super(selector);
    this.handleSubmit = handleSubmit;
    this._form = this._popup.querySelector(formSelector);
  }

  _getInputValues() {
    this._inputList = this._form.querySelectorAll(".popup__input");
    this._inputValue = {};
    this._inputList.forEach((input) => {
      this._inputValue[input.name] = input.value;
    });
    return this._inputValue;
  }

  _setCardSubmit = (evt) => {
    evt.preventDefault();
    this.values = this._getInputValues();
    this.handleSubmit(this.values);
  };

  setEventListeners() {
    super.setEventListeners();
    this._form.addEventListener("submit", this._setCardSubmit);
  }

  close() {
    super.close();
    this._form.removeEventListener("submit", this._setCardSubmit);
    this._form.reset();
  }
}
