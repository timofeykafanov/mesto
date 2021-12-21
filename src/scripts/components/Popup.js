class Popup {
    constructor(popupConfig) {
        this._config = popupConfig;
        this._popupArray = document.querySelectorAll(this._config.popupSelector);
    }

    _handleEscClose(event) {
        if (event.key === 'Escape') {
            this.close(document.querySelector(this._config.popupOpenedSelector));
        };
    }

    open(popup) {
        this.setEventListeners();
        popup.classList.add(this._config.popupOpenedClass);
        document.addEventListener('keydown', (event) => this._handleEscClose(event));
    }

    close() {
        this._openedPopup = document.querySelector(this._config.popupOpenedSelector);
        this._openedPopup.classList.remove(this._config.popupOpenedClass);
        document.removeEventListener('keydown', () => this._handleEscClose());
    }

    setEventListeners() {
        this._popupArray.forEach((popup) => {
            popup.addEventListener('click', (evt) => {
                if (evt.target.classList.contains(this._config.popupOpenedClass)
                || (evt.target.classList.contains(this._config.closeButtonClass))) {
                    this.close();
                }
            })
        })
    }
}

export default Popup;