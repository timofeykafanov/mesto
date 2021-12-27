class Section {
    constructor({ items, renderer }, elementListSelector) {
        this._section = document.querySelector(elementListSelector);
        this._items = items;
        this._renderer = renderer;
    }

    addItem(item) {
        this._section.prepend(item);
    }

    renderItems() {
        this._items.forEach((item) => {
            this._renderer(item);
        });
    }
}

export default Section;