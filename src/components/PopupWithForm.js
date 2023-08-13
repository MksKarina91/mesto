import { Popup } from "./Popup.js";
export class PopupWithForm extends Popup {
  constructor(selector, handleSubmit, formSelector) {
    super(selector);
    this._handleSubmit = handleSubmit;
    this._form = this._popup.querySelector(formSelector);
  }

  _getInputValues() {
    this._inputList = this._form.querySelectorAll(".popup__input");
    this._formValues = {};
    this._inputList.forEach(
      (input) => (this._formValues[input.name] = input.value)
    );
    return this._formValues;
  }

  _setCardSubmit = (evt) => {
    evt.preventDefault();
    this.values = this._getInputValues();
    this._handleSubmit(this.values);
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
