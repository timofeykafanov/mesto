import Popup from "./Popup.js";

class PopupWithImage extends Popup {
    constructor(popupSelector) {
        super(popupSelector);
    }

    open(item) {
        this._figure = document.querySelector('.popup_type_figure');
        this._image = this._figure.querySelector('.popup__image');
        this._caption = this._figure.querySelector('.popup__caption');
        this._image.src = item.link;
        this._image.alt = item.name;
        this._caption.textContent = item.name;
        super.open(this._figure);
    }
}

export default PopupWithImage;