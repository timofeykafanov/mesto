import './index.css';

import { initialCards } from '../scripts/constants/initialCards.js';
import { cardConfig } from '../scripts/config/cardConfig.js';
import { popupConfig } from '../scripts/config/popupConfig.js';
import { sectionConfig } from '../scripts/config/sectionConfig.js';
import { userConfig } from '../scripts/config/userConfig.js';
import { validationConfig } from '../scripts/config/validationConfig.js';

import FormValidator from '../scripts/components/FormValidator.js';
import Section from '../scripts/components/Section.js';
import Card from '../scripts/components/Card.js';
import PopupWithImage from '../scripts/components/PopupWithImage.js';
import PopupWithForm from '../scripts/components/PopupWithForm.js';
import UserInfo from '../scripts/components/UserInfo.js';

const editButton = document.querySelector(popupConfig.editButtonSelector);
const addButton = document.querySelector(popupConfig.addButtonSelector);
const editPopup = document.querySelector(popupConfig.editPopupSelector);
const addPopup = document.querySelector(popupConfig.addPopupSelector);
const editForm = editPopup.querySelector(popupConfig.editFormSelector);
const addForm = addPopup.querySelector(popupConfig.addFormSelector);
const placeField = addForm.querySelector(popupConfig.placeFieldSelector);
const linkField = addForm.querySelector(popupConfig.linkFieldSelector);

const section = new Section({
    items: initialCards,
    renderer: (item) => {
        const card = new Card(cardConfig, item, handleCardClick);
        const cardElement = card.renderCard();
        section.addItem(cardElement);
    }
}, sectionConfig);

const addFormValidator = new FormValidator(validationConfig, addForm);
const editFormValidator = new FormValidator(validationConfig, editForm);
const popupWithImage = new PopupWithImage(popupConfig);
const popupWithAddForm = new PopupWithForm(popupConfig);
const popupWithEditForm = new PopupWithForm(popupConfig);
const userInfo = new UserInfo(userConfig);

function handleCardClick(item) {
    popupWithImage.open(item);
}

function submitEditForm(event) {
    event.preventDefault()

    userInfo.setUserInfo();

    popupWithEditForm.close();
};

function addCard(event) {
    event.preventDefault();

    const place = placeField.value;
    const link = linkField.value;
    const item = {
        name: place,
        link: link
    }

    const card = new Card(cardConfig, item, handleCardClick);
    const cardElement = card.renderCard();

    section.addItem(cardElement);

    addFormValidator.toggleButtonState();

    popupWithAddForm.close();
};

section.renderItems();

editButton.addEventListener('click', ()=> {
    editFormValidator.resetValidation();
    userInfo.getUserInfo();
    editFormValidator.toggleButtonState();
    popupWithEditForm.open(editPopup);
});

addButton.addEventListener('click', ()=> {
    addFormValidator.resetValidation();
    popupWithAddForm.open(addPopup);
});


editForm.addEventListener('submit', submitEditForm);

addForm.addEventListener('submit', addCard);

addFormValidator.enableValidation();
editFormValidator.enableValidation();