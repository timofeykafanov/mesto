class Section {
    constructor({renderer }, elementListSelector) {
        this._section = document.querySelector(elementListSelector);
        this._renderer = renderer;
    }

    prependItem(item) {
        this._section.prepend(item);
    }

    appendItem(item) {
        this._section.append(item);
    }

    renderItems(items) {
        items.forEach((item) => {
            this._renderer(item);
        });
    }
}

export default Section;