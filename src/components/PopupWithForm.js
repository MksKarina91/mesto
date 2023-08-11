import { Popup } from "./Popup.js";
export class PopupWithForm extends Popup {
  constructor(selector, handleSubmit, formSelector) {
    super(selector);
    this._handleSubmit = handleSubmit;
    this._form = this._popup.querySelector(formSelector);
    this._inputList = this._form.querySelectorAll(".popup__input"); 
  }

  _getInputValues() {
    this._inputValue = {};
    this._inputList.forEach((input) => {
      this._inputValue[input.name] = input.value;
    });
    return this._inputValue;
  }

  _setCardSubmit = (evt) => {
    evt.preventDefault();
    this._handleSubmit(this._getInputValues())
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
