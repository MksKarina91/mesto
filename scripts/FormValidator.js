export class FormValidator {
    constructor(enableConfig, formElement) {
        this.enableConfig = enableConfig;
        this.formElement = formElement;
        this.inputList = Array.from(this.formElement.querySelectorAll(this.enableConfig.inputSelector));
        this.buttonElement = this.formElement.querySelector(this.enableConfig.submitButtonSelector);
    }

    _showInputError(inputElement, errorMessage) {
        const errorElement = this.formElement.querySelector(`.${inputElement.id}-error`);
        inputElement.classList.add(this.enableConfig.inputErrorClass);
        errorElement.textContent = errorMessage;
        errorElement.classList.add(this.enableConfig.errorClass);
    };

    _hideInputError(inputElement) {
        const errorElement = this.formElement.querySelector(`.${inputElement.id}-error`);
        inputElement.classList.remove(this.enableConfig.inputErrorClass);
        errorElement.classList.remove(this.enableConfig.errorClass);
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
        this._toggleButtonState();
        this.inputList.forEach(inputElement => {
            inputElement.addEventListener('input', () => {
                this._checkInputValidity(inputElement);
                this._toggleButtonState();
            });
        });
    };


    _hasInvalidInput = (inputList) => {
        return inputList.some((inputElement) => {
            return !inputElement.validity.valid;
        });
    }
    resetForm() {
        this._toggleButtonState()
        this.inputList.forEach((inputElement) => {
            this._hideInputError(inputElement)
        });
    }

    _toggleButtonState() {
        if (this._hasInvalidInput(this.inputList)) {
            this.buttonElement.setAttribute('disabled', true);
            this.buttonElement.classList.add(this.enableConfig.inactiveButtonClass);
        } else {
            this.buttonElement.removeAttribute('disabled');
            this.buttonElement.classList.remove(this.enableConfig.inactiveButtonClass);
        }
    }
    enableValidation() {
        this._setEventListeners();
    };
}
export const enableConfig = {
    formSelector: '.popup__form',
    inputSelector: '.popup__input',
    submitButtonSelector: '.popup__button',
    inactiveButtonClass: 'popup__button_disabled',
    inputErrorClass: 'popup__input_type_error',
    errorClass: 'popup__error_visible'
}; 