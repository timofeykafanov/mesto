

import { cardConfig } from '../scripts/constants/cardConfig.js';
import { popupConfig } from '../scripts/constants/popupConfig.js';
import { validationConfig } from '../scripts/constants/validationConfig.js';
import { userConfig } from '../scripts/constants/userConfig.js'

import FormValidator from '../scripts/components/FormValidator.js';
import Section from '../scripts/components/Section.js';
import Card from '../scripts/components/Card.js';
import PopupWithImage from '../scripts/components/PopupWithImage.js';
import PopupWithForm from '../scripts/components/PopupWithForm.js';
import UserInfo from '../scripts/components/UserInfo.js';
import Api from '../scripts/components/Api.js';

const api = new Api({
    adress: 'https://mesto.nomoreparties.co/v1/cohort-32',
    token: '62434932-64a7-4dd4-b60b-76c0e0336349'
})

const editButton = document.querySelector(popupConfig.editButtonSelector);
const addButton = document.querySelector(popupConfig.addButtonSelector);
const avatarButton = document.querySelector(popupConfig.avatarButtonSelector);
const editForm = document.querySelector(popupConfig.editFormSelector);
const addForm = document.querySelector(popupConfig.addFormSelector);
const avatarForm = document.querySelector(popupConfig.avatarFormSelector);
const nameField = document.querySelector(popupConfig.nameFieldSelector);
const aboutField = document.querySelector(popupConfig.aboutFieldSelector);
const userNameSelector = userConfig.userNameSelector;
const userAboutSelector = userConfig.userAboutSelector;
const userAvatarSelector = userConfig.userAvatarSelector;

const section = new Section({
    renderer: (item) => {
        const card = new Card(cardConfig, item, handleCardClick, openDeletePopup);
        section.addItem(card.renderCard());
    }
}, popupConfig.elementListSelector);

const addFormValidator = new FormValidator(validationConfig, addForm);
const editFormValidator = new FormValidator(validationConfig, editForm);
const avatarFormValidator = new FormValidator(validationConfig, avatarForm);
const popupWithImage = new PopupWithImage(popupConfig.imagePopupSelector);
const popupWithAddForm = new PopupWithForm(popupConfig.addPopupSelector, submitAddForm);
const popupWithEditForm = new PopupWithForm(popupConfig.editPopupSelector, submitEditForm);
const popupWithDeleteForm = new PopupWithForm(popupConfig.deletePopupSelector, submitDeleteForm);
const popupWithAvatarForm = new PopupWithForm(popupConfig.avatarPopupSelector, submitAvatarForm);
const userInfo = new UserInfo({userNameSelector, userAboutSelector, userAvatarSelector});

function handleCardClick(item) {
    popupWithImage.open(item);
}

function openDeletePopup() {
    popupWithDeleteForm.open();
}

function submitEditForm(inputValues) {
    userInfo.setUserInfo(inputValues)
        api.setUserInfo(inputValues)
            .catch(err => {
                console.log(err);
            });
    popupWithEditForm.close();
};

function submitAddForm({place: placeValue, link: linkValue}) {
    const place = placeValue;
    const link = linkValue;
    const item = {
        name: place,
        link: link
    }

    api.setCard(item)
        .catch(err => {
            console.log(err);
        });

    const card = new Card(cardConfig, item, handleCardClick);

    section.addItem(card.renderCard());

    addFormValidator.toggleButtonState();

    popupWithAddForm.close();
};

function submitDeleteForm() {

}

function submitAvatarForm(inputValue) {
    userInfo.setUserAvatar(inputValue);
    api.setUserAvatar(inputValue)
        .catch(err => {
            console.log(err);
        });
}

function setUserInfo({name: nameValue, about: aboutValue}) {
    nameField.value= nameValue;
    aboutField.value = aboutValue;
}

api.getInitialCards()
    .then(res => {
        section.renderItems(res);
    })
    .catch(err => {
        console.log(err);
    })

api.getUserInfo()
    .then(res => {
        userInfo.setUserInfo(res);
        userInfo.setUserAvatar(res);
    })
    .catch(err => {
        console.log(err);
    })

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

avatarButton.addEventListener('click', () => {
    avatarFormValidator.resetValidation();
    popupWithAvatarForm.open();
})

popupWithEditForm.setEventListeners();
popupWithAddForm.setEventListeners();
popupWithImage.setEventListeners();
popupWithAvatarForm.setEventListeners();

addFormValidator.enableValidation();
editFormValidator.enableValidation();
avatarFormValidator.enableValidation();