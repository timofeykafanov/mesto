class Card {
    constructor(item, template, openPopup) {
        this._item = item;
        this._element = template.querySelector(config.elementSelector).cloneNode(true);
        this._image = this._element.querySelector(config.imageSelector);
        this._title = this._element.querySelector(config.titleSelector);
        this._delete = this._element.querySelector(config.deleteSelector);
        this._likeButton = this._element.querySelector(config.likeSelector);
        this._openPopup = openPopup;
        this._figurePopup = document.querySelector(config.figurePopupSelector);
        this._figureImage = this._figurePopup.querySelector(config.figureImageSelector);
        this._figureCaption = this._figurePopup.querySelector(config.figureCaptionSelector);
    }

    _addListeners() {
        this._image.addEventListener('click', (event) => {
            if (event.target.classList.contains(config.imageClass)) {
                this._openFigure();
            }
        });
        this._delete.addEventListener('click', () => this._remove());
        this._likeButton.addEventListener('click', () => this._like());
    }

    _openFigure() {
        this._openPopup(this._figurePopup);
        this._figureImage.src = this._item.link;
        this._figureImage.alt = this._item.name;
        this._figureCaption.textContent = this._item.name;
    }

    _like() {
        this._likeButton.classList.toggle(config.likeActiveClass);
    }

    _remove() {
        this._element.remove();
    }

    renderCard() {
        this._image.style.backgroundImage = `url('${this._item.link}')`;
        this._title.textContent = this._item.name;

        this._addListeners();

        return this._element;
    }
}

export default Card;