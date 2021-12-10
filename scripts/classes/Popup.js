class Popup {
    constructor(popupConfig) {
        this._config = popupConfig;
        this._popupArray = document.querySelectorAll(this._config.popupSelector);
        this._openedPopup = document.querySelector(this._config.popupOpenedSelector);
    }

    _handleEscClose(event) {
        if (event.key === 'Escape') {
            closePopup(this._openedPopup);
        };
    }

    open(popup) {
        popup.classList.add(this._config.popupOpenedClass);
        document.addEventListener('keydown', () => this._handleEscClose());
    }

    close(popup) {
        popup.classList.remove(this._config.popupOpenedClass);
        document.removeEventListener('keydown', () => this._handleEscClose());
    }

    setEventListeners() {
        this._popupArray.forEach((popup) => {
            popup.addEventListener('click', (evt) => {
                if (evt.target.classList.contains(this._config.popupOpenedClass) || (evt.target.classList.contains(this._config.closeButtonClass))) {
                    this.close(popup);
                }
            })
        })
    }
}

export default Popup;