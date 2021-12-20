import Popup from "./Popup.js";

class PopupWithImage extends Popup {
    constructor(popupConfig) {
        super(popupConfig);
        this._config = popupConfig;
        this._figure = document.querySelector(this._config.figurePopupSelector);
        this._image = this._figure.querySelector(this._config.figureImageSelector);
        this._caption = this._figure.querySelector(this._config.figureCaptionSelector);
    }

    open(item) {
        this._image.src = item.link;
        this._image.alt = item.name;
        this._caption.textContent = item.name;
        super.open(this._figure);
    }
}

export default PopupWithImage;