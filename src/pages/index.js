import './index.css';

import { initialCards } from '../scripts/constants/initialCards.js';
import { cardConfig } from '../scripts/constants/cardConfig.js';
import { popupConfig } from '../scripts/constants/popupConfig.js';
import { validationConfig } from '../scripts/constants/validationConfig.js';

import FormValidator from '../scripts/components/FormValidator.js';
import Section from '../scripts/components/Section.js';
import Card from '../scripts/components/Card.js';
import PopupWithImage from '../scripts/components/PopupWithImage.js';
import PopupWithForm from '../scripts/components/PopupWithForm.js';
import UserInfo from '../scripts/components/UserInfo.js';

const editButton = document.querySelector(popupConfig.editButtonSelector);
const addButton = document.querySelector(popupConfig.addButtonSelector);
const editForm = document.querySelector(popupConfig.editFormSelector);
const addForm = document.querySelector(popupConfig.addFormSelector);
const nameField = document.querySelector(popupConfig.nameFieldSelector);
const postField = document.querySelector(popupConfig.postFieldSelector);
const userNameSelector = '.profile__name';
const userPostSelector = '.profile__post';
const editPopupSelector = '.popup_type_edit';
const addPopupSelector = '.popup_type_add';
const imagePopupSelector = '.popup_type_figure';
const elementListSelector = '.elements';

const section = new Section({
    items: initialCards,
    renderer: (item) => {
        const card = new Card(cardConfig, item, handleCardClick);
        section.addItem(card.renderCard());
    }
}, elementListSelector);

const addFormValidator = new FormValidator(validationConfig, addForm);
const editFormValidator = new FormValidator(validationConfig, editForm);
const popupWithImage = new PopupWithImage(imagePopupSelector);
const popupWithAddForm = new PopupWithForm(addPopupSelector, submitAddForm);
const popupWithEditForm = new PopupWithForm(editPopupSelector, submitEditForm);
const userInfo = new UserInfo({userNameSelector, userPostSelector});

function handleCardClick(item) {
    popupWithImage.open(item);
}

function submitEditForm(inputValues) {
    popupWithEditForm.setEventListeners();
    userInfo.setUserInfo(inputValues);
    popupWithEditForm.close();
};

function submitAddForm({place: placeValue, link: linkValue}) {
    const place = placeValue;
    const link = linkValue;
    const item = {
        name: place,
        link: link
    }

    const card = new Card(cardConfig, item, handleCardClick);

    section.addItem(card.renderCard());

    addFormValidator.toggleButtonState();

    popupWithAddForm.close();
};

function setUserInfo({name: nameValue, post: postValue}) {
    nameField.value= nameValue;
    postField.value = postValue;
}

section.renderItems();

editButton.addEventListener('click', ()=> {
    editFormValidator.resetValidation();
    setUserInfo(userInfo.getUserInfo());
    editFormValidator.toggleButtonState();
    popupWithEditForm.open();
});

addButton.addEventListener('click', ()=> {
    addFormValidator.resetValidation();
    popupWithAddForm.open();
});

addFormValidator.enableValidation();
editFormValidator.enableValidation();