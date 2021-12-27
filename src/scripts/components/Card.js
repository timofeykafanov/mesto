class Card {
    constructor(cardConfig, item, handleCardClick) {
        this._item = item;
        this._config = cardConfig;
        this._template = document.querySelector(this._config.templateElementSelector).content;
        this._element = this._template.querySelector(this._config.elementSelector).cloneNode(true);
        this._image = this._element.querySelector(this._config.imageSelector);
        this._title = this._element.querySelector(this._config.titleSelector);
        this._button = this._element.querySelector(this._config.deleteSelector);
        this._likeButton = this._element.querySelector(this._config.likeSelector);
        this._handleCardClick = handleCardClick;
    }

    _addListeners() {
        this._image.addEventListener('click', (event) => {
            if (event.target.classList.contains(this._config.imageClass)) {
                this._handleCardClick(this._item);
            }
        });
        this._button.addEventListener('click', () => this._remove());
        this._likeButton.addEventListener('click', () => this._like());
    }

    _like() {
        this._likeButton.classList.toggle(this._config.likeActiveClass);
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