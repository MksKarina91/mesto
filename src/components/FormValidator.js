export class FormValidator {
    constructor(enableConfig, formElement) {
        this._enableConfig = enableConfig;
        this._formElement = formElement;
        this._inputList = Array.from(formElement.querySelectorAll(enableConfig.inputSelector));
        this._buttonElement = formElement.querySelector(enableConfig.submitButtonSelector);
    }

    _showInputError(inputElement, errorMessage) {
        const errorElement = this._formElement.querySelector(`.${inputElement.id}-error`);
        inputElement.classList.add(this._enableConfig.inputErrorClass);
        errorElement.textContent = errorMessage;
        errorElement.classList.add(this._enableConfig.errorClass);
    };

    _hideInputError(inputElement) {
        const errorElement = this._formElement.querySelector(`.${inputElement.id}-error`);
        inputElement.classList.remove(this._enableConfig.inputErrorClass);
        errorElement.classList.remove(this._enableConfig.errorClass);
        errorElement.textContent = '';
    };

    _checkInputValidity(inputElement) {
        if (!inputElement.validity.valid) {
            this._showInputError(inputElement, inputElement.validationMessage);
        } else {
            this._hideInputError(inputElement);
        };
    };

    _setEventListeners() {
        this._inputList.forEach(inputElement => {
            inputElement.addEventListener('input', () => {
                this._checkInputValidity(inputElement);
                this._toggleButtonState();
            });
        });
    };


    _hasInvalidInput = (inputList) => {
        return inputList.some(function (inputElement) {
            return !inputElement.validity.valid; 
          });
        }

    resetValidation() {
        this._toggleButtonState();
        this._inputList.forEach(inputElement => {
          this._hideInputError(inputElement);
        });
      }

    _toggleButtonState() {
        if (this._hasInvalidInput(this._inputList)) {
            this._buttonElement.setAttribute('disabled', true);
            this._buttonElement.classList.add(this._enableConfig.inactiveButtonClass);
        } else {
            this._buttonElement.removeAttribute('disabled');
            this._buttonElement.classList.remove(this._enableConfig.inactiveButtonClass);
        }
    }
    enableValidation() {
        this._setEventListeners();
    };
}