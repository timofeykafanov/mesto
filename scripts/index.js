import FormValidator from './FormValidator.js';
import CardList from './CardList.js';
import Card from './Card.js';

const popup = document.querySelectorAll(config.popupSelector);
const popupArray = Array.from(popup);
const elementList = document.querySelector(config.elementListSelector);
const templateElement = document.querySelector(config.templateElementSelector).content;
const figurePopup = document.querySelector(config.figurePopupSelector);
const editButton = document.querySelector(config.editButtonSelector);
const addButton = document.querySelector(config.addButtonSelector);
const editPopup = document.querySelector(config.editPopupSelector);
const addPopup = document.querySelector(config.addPopupSelector);
const editForm = editPopup.querySelector(config.editFormSelector);
const addForm = addPopup.querySelector(config.addFormSelector);
const nameField = editForm.querySelector(config.nameFieldSelector);
const postField = editForm.querySelector(config.postFieldSelector);
const placeField = addForm.querySelector(config.placeFieldSelector);
const linkField = addForm.querySelector(config.linkFieldSelector);
const profileName = document.querySelector(config.profileNameSelector);
const profilePost = document.querySelector(config.profilePostSelector);

const cardList = new CardList(elementList, initialCards, createCard);
const addFormValidator = new FormValidator(addForm);
const editFormValidator = new FormValidator(editForm);

nameField.value = profileName.textContent; 
postField.value = profilePost.textContent;

function createCard(item) {
    const card = new Card(item, templateElement, openPopup);
    return card;
}

function openPopup(popup) {
    popup.classList.add(config.popupOpenedClass);
    document.addEventListener('keydown', closeByEscapePress);
};

function closePopup(popup) {
    popup.classList.remove(config.popupOpenedClass);
    document.removeEventListener('keydown', closeByEscapePress);
};

function submitEditForm(event) {
    event.preventDefault()

    profileName.textContent = nameField.value;
    profilePost.textContent = postField.value;

    closePopup(editPopup);
};

function addCard(event) {
    event.preventDefault();

    const place = placeField.value;
    const link = linkField.value;
    const item = {
        name: place,
        link: link
    }
    cardList.addCard(item);
    event.target.reset();

    addFormValidator.toggleButtonState();

    closePopup(addPopup);
};

function setUserInfoValues() {
    nameField.value = profileName.textContent; 
    postField.value = profilePost.textContent;
};

function closeByOverlayClick(event) {
    if (event.target.classList.contains(config.popupClass)) {
        const openedPopup = document.querySelector(config.popupOpenedSelector);
        closePopup(openedPopup);
    };
};

function closeByEscapePress(event) {
    if (event.key === 'Escape') {
        const openedPopup = document.querySelector(config.popupOpenedSelector);
        closePopup(openedPopup);
    };
};

cardList._cards.forEach((item) => {
    cardList.addCard(item);
})

editButton.addEventListener('click', ()=> {
    openPopup(editPopup);
    setUserInfoValues();
});
addButton.addEventListener('click', ()=> openPopup(addPopup));

editForm.addEventListener('submit', submitEditForm);

addForm.addEventListener('submit', addCard);

popupArray.forEach(function(popup) {
    const closeButton = popup.querySelector(config.closeButtonSelector);
    closeButton.addEventListener('click', ()=> {
        closePopup(popup);
    });
});

editPopup.addEventListener('mouseup', closeByOverlayClick);
addPopup.addEventListener('mouseup', closeByOverlayClick);
figurePopup.addEventListener('mouseup', closeByOverlayClick);

addFormValidator.enableValidation();
editFormValidator.enableValidation();