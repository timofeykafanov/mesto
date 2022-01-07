import Popup from './Popup.js';

class DeletePopup extends Popup {
    constructor({popupSelector}) {
        super(popupSelector)
        this._popup = document.querySelector(popupSelector);
        this._button = this._popup.querySelector('.popup__button');
    }

    close() {
        super.close();
    }

    setHandler(action) {
        this._handleSubmitCallBack = action;
    }

    setEventListeners() {
        super.setEventListeners();

        this._button.addEventListener('click', () => {
            this._handleSubmitCallBack();
        })
    }
}

export default DeletePopup;