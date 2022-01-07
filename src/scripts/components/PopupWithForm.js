import Popup from "./Popup.js";

class PopupWithForm extends Popup {
    constructor({popupSelector, handleFormSubmit}) {
        super(popupSelector)
        this._handleFormSubmit = handleFormSubmit;
        this._popup = document.querySelector(popupSelector);
        this._button = this._popup.querySelector('.popup__button');
        this._form = this._popup.querySelector('.popup__form');
        this._inputs = Array.from(this._form.querySelectorAll('.popup__input'));
    }

    _getInputValues() {
        this._inputValue = {};

        this._inputs.forEach((input) => {
            this._inputValue[input.name] = input.value;
        })

        return this._inputValue;
    }

    close() {
        this._form.reset();
        super.close();
    }

    renderLoading(isLoading) {
        if (isLoading) {
            this._button.textContent = 'Сохранение...';
        } else if (!isLoading) {
            this._button.textContent = 'Сохранить';
        }
    }

    setEventListeners() {
        super.setEventListeners();
        this._form.addEventListener('submit', (event) => {
            event.preventDefault();

            this.renderLoading(true);

            this._handleFormSubmit(this._getInputValues());
        })
    }
}

export default PopupWithForm;