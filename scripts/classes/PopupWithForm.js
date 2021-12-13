import Popup from "./Popup.js";

class PopupWithForm extends Popup {
    constructor(popupConfig) {
        super(popupConfig)
        this._config = popupConfig;
    }

    _getInputValues() {
        
    }

    close() {
        this._openedPopup = document.querySelector(this._config.popupOpenedSelector);
        this._form = document.querySelector(this._config.formSelector);
        this._form.reset();
        super.close(this._openedPopup);
    }

    setEventListeners() {
        super.setEventListeners();
    }
}

export default PopupWithForm;