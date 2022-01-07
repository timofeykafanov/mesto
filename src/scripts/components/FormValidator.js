class FormValidator {
    constructor(validationConfig, form) {
        this._form = form;
        this._config = validationConfig;
        this._inputList = Array.from(this._form.querySelectorAll(this._config.inputSelector));
    }

    _showInputError(inputElement, errorMessage) {
        this._errorElement = this._form.querySelector(`.${inputElement.id}-error`);
        inputElement.classList.add(this._config.inputErrorClass);
        this._errorElement.classList.add(this._config.errorClass);
        this._errorElement.textContent = errorMessage;
    };
    
    _hideInputError(inputElement) {
        this._errorElement = this._form.querySelector(`.${inputElement.id}-error`);
        inputElement.classList.remove(this._config.inputErrorClass);
        this._errorElement.classList.remove(this._config.errorClass);
        this._errorElement.textContent = '';
    };

    _checkInputValidity(inputElement) {
        if (!inputElement.validity.valid) {
            this._showInputError(inputElement, inputElement.validationMessage);
        } else {
            this._hideInputError(inputElement);
        };
    };

    _hasInvalidInput() {
        return this._inputList.some((inputElement) => {
            return !inputElement.validity.valid;
        });
    };

    _hideError(inputElement) {
        this._errorElement = this._form.querySelector(`.${inputElement.id}-error`);
        this._errorElement.classList.remove(this._config.errorClass);
        inputElement.classList.remove(this._config.inputErrorClass);
        this._errorElement.textContent = '';
    }

    disableButton() {
        this._buttonElement.classList.remove(this._config.buttonActive);
        this._buttonElement.setAttribute('disabled', '');
    }

    enableButton() {
        this._buttonElement.classList.add(this._config.buttonActive);
        this._buttonElement.removeAttribute('disabled',);
    }

    resetValidation() {
        this._inputList.forEach((inputElement) => {
            inputElement.value = '';
            this._hideError(inputElement);
        });
    }

    _toggleButtonState() {
        if (this._hasInvalidInput()) {
            this._buttonElement.classList.remove(this._config.buttonActive);
            this._buttonElement.setAttribute('disabled', '');
        } else {
            this._buttonElement.classList.add(this._config.buttonActive);
            this._buttonElement.removeAttribute('disabled',);
        };
    }

    _setEventListeners() {
        this._buttonElement = this._form.querySelector(this._config.buttonSelector);
        this._toggleButtonState();
        this._inputList.forEach((inputElement) => {
            inputElement.addEventListener('input', () => {
                this._checkInputValidity(inputElement);
                this._toggleButtonState();
            })
        })
    }

    enableValidation() {
        this._setEventListeners();
    }
}

export default FormValidator;