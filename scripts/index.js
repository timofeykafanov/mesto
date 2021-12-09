import FormValidator from './classes/FormValidator.js';
import Section from './classes/Section.js';
import Card from './classes/Card.js';

const popupArray = Array.from(document.querySelectorAll(popupConfig.popupSelector));
const templateElement = document.querySelector(popupConfig.templateElementSelector).content;
const editButton = document.querySelector(popupConfig.editButtonSelector);
const addButton = document.querySelector(popupConfig.addButtonSelector);
const editPopup = document.querySelector(popupConfig.editPopupSelector);
const addPopup = document.querySelector(popupConfig.addPopupSelector);
const editForm = editPopup.querySelector(popupConfig.editFormSelector);
const addForm = addPopup.querySelector(popupConfig.addFormSelector);
const nameField = editForm.querySelector(popupConfig.nameFieldSelector);
const postField = editForm.querySelector(popupConfig.postFieldSelector);
const placeField = addForm.querySelector(popupConfig.placeFieldSelector);
const linkField = addForm.querySelector(popupConfig.linkFieldSelector);
const profileName = document.querySelector(popupConfig.profileNameSelector);
const profilePost = document.querySelector(popupConfig.profilePostSelector);
const figurePopup = document.querySelector(popupConfig.figurePopupSelector);
const figureImage = figurePopup.querySelector(popupConfig.figureImageSelector);
const figureCaption = figurePopup.querySelector(popupConfig.figureCaptionSelector);

const section = new Section({
    items: initialCards,
    renderer: (item) => {
            const card = new Card(cardConfig, item, templateElement, handlerCardClick);
            const cardElement = card.renderCard();
            section.addItem(cardElement);
        }
    }, sectionConfig);

section.renderItems();

const addFormValidator = new FormValidator(validationConfig, addForm);
const editFormValidator = new FormValidator(validationConfig, editForm);

function openPopup(popup) {
    popup.classList.add(popupConfig.popupOpenedClass);
    document.addEventListener('keydown', closeByEscapePress);
};

function closePopup(popup) {
    popup.classList.remove(popupConfig.popupOpenedClass);
    document.removeEventListener('keydown', closeByEscapePress);
};

function handlerCardClick(item) {
    figureImage.src = item.link;
    figureImage.alt = item.name;
    figureCaption.textContent = item.name;
    openPopup(figurePopup);
}

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
    const card = new Card(cardConfig, item, templateElement, handlerCardClick);
    const cardElement = card.renderCard();
    section.addItem(cardElement);
    event.target.reset();

    addFormValidator.toggleButtonState();

    closePopup(addPopup);
};

function setUserInfoValues() {
    nameField.value = profileName.textContent; 
    postField.value = profilePost.textContent;
};

function closeByEscapePress(event) {
    if (event.key === 'Escape') {
        const openedPopup = document.querySelector(popupConfig.popupOpenedSelector);
        closePopup(openedPopup);
    };
};

popupArray.forEach((popup) => {
    popup.addEventListener('click', (evt) => {
        if (evt.target.classList.contains(popupConfig.popupOpenedClass)) {
            closePopup(popup)
        }
        if (evt.target.classList.contains(popupConfig.closeButtonClass)) {
            closePopup(popup)
        }
    })
})

editButton.addEventListener('click', ()=> {
    editFormValidator.resetValidation();
    setUserInfoValues();
    editFormValidator.toggleButtonState();
    openPopup(editPopup);
});
addButton.addEventListener('click', ()=> {
    addFormValidator.resetValidation();
    openPopup(addPopup);
});


editForm.addEventListener('submit', submitEditForm);

addForm.addEventListener('submit', addCard);

addFormValidator.enableValidation();
editFormValidator.enableValidation();