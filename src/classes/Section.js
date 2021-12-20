class Section {
    constructor({ items, renderer }, sectionConfig) {
        this._config = sectionConfig;
        this._cardList = document.querySelector(this._config.elementListSelector);
        this._items = items;
        this._renderer = renderer;
    }

    addItem(item) {
        this._cardList.prepend(item);
    }

    renderItems() {
        this._items.forEach((item) => {
            this._renderer(item);
        });
    }
}

export default Section;