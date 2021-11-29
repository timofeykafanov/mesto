class CardList {
    constructor(component, cards, createCard) {
        this._component = component;
        this._cards = cards;
        this._createCard = createCard;
    }

    addCard(item) {
        const card = this._createCard(item);
        const element = card.renderCard();
        this._component.prepend(element);
    }
}

export default CardList;