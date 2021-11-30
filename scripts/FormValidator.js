class FormValidator {
    constructor(form) {
        this._form = form;
    }

    _showInputError(form, inputElement, errorMessage) {
        this._errorElement = form.querySelector(`.${inputElement.id}-error`);
        inputElement.classList.add(config.inputErrorClass);
        this._errorElement.classList.add(config.errorClass);
        this._errorElement.textContent = errorMessage;
    };
    
    _hideInputError(form, inputElement) {
        this._errorElement = form.querySelector(`.${inputElement.id}-error`);
        inputElement.classList.remove(config.inputErrorClass);
        this._errorElement.classList.remove(config.errorClass);
        this._errorElement.textContent = '';
    };

    _checkInputValidity(form, inputElement) {
        if (!inputElement.validity.valid) {
            this._showInputError(form, inputElement, inputElement.validationMessage);
        } else {
            this._hideInputError(form, inputElement);
        };
    };

    _hasInvalidInput(inputList) {
        return inputList.some((inputElement) => {
            return !inputElement.validity.valid;
        });
    };

    toggleButtonState() {
        if (this._hasInvalidInput(this._inputList)) {
            this._buttonElement.classList.remove(config.buttonActive);
            this._buttonElement.setAttribute('disabled', '');
        } else {
            this._buttonElement.classList.add(config.buttonActive);
            this._buttonElement.removeAttribute('disabled',);
        };
    }

    _setEventListeners(form) {
        this._inputList = Array.from(form.querySelectorAll(config.inputSelector));
        this._buttonElement = form.querySelector(config.buttonSelector);
        this.toggleButtonState();
        this._inputList.forEach((inputElement) => {
            inputElement.addEventListener('input', () => {
                this._checkInputValidity(this._form, inputElement);
                this.toggleButtonState(this._inputList);
            })
        })
    }

    enableValidation() {
        this._setEventListeners(this._form);
    }
}

export default FormValidator;