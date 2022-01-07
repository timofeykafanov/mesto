import Popup from "./Popup.js";

class PopupWithImage extends Popup {
    constructor(popupConfig) {
        super(popupConfig);
        this._figure = document.querySelector('.popup_type_figure');
        this._image = this._figure.querySelector('.popup__image');
        this._caption = this._figure.querySelector('.popup__caption');
    }

    open(item) {
        this._image.src = item.link;
        this._image.alt = item.name;
        this._caption.textContent = item.name;
        super.open();
    }
}

export default PopupWithImage;