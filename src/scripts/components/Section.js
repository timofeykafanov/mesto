class Section {
    constructor({renderer }, elementListSelector) {
        this._section = document.querySelector(elementListSelector);
        this._renderer = renderer;
    }

    addItem(item) {
        this._section.prepend(item);
    }

    renderItems(items) {
        items.forEach((item) => {
            this._renderer(item);
        });
    }
}

export default Section;