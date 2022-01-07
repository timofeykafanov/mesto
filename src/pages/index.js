import './index.css';

import { cardConfig } from '../scripts/constants/cardConfig.js';
import { popupConfig } from '../scripts/constants/popupConfig.js';
import { validationConfig } from '../scripts/constants/validationConfig.js';

import {
    editButton,
    addButton,
    avatarButton,
    editForm,
    addForm,
    avatarForm,
    nameField,
    aboutField,
    userNameSelector,
    userAboutSelector,
    userAvatarSelector
} from '../scripts/constants/constants.js' 

import FormValidator from '../scripts/components/FormValidator.js';
import Section from '../scripts/components/Section.js';
import Card from '../scripts/components/Card.js';
import PopupWithImage from '../scripts/components/PopupWithImage.js';
import PopupWithForm from '../scripts/components/PopupWithForm.js';
import DeletePopup from '../scripts/components/DeletePopup.js';
import UserInfo from '../scripts/components/UserInfo.js';
import Api from '../scripts/components/Api.js';

const api = new Api({
    adress: 'https://mesto.nomoreparties.co/v1/cohort-32',
    token: '62434932-64a7-4dd4-b60b-76c0e0336349'
})

const userInfo = new UserInfo({userNameSelector, userAboutSelector, userAvatarSelector});
const addFormValidator = new FormValidator(validationConfig, addForm);
const editFormValidator = new FormValidator(validationConfig, editForm);
const avatarFormValidator = new FormValidator(validationConfig, avatarForm);
const popupWithImage = new PopupWithImage(popupConfig.imagePopupSelector);

const section = new Section({
    renderer: (item) => {
        const card = createCard(item);

        card.setCounter(item);

        section.appendItem(card.renderCard());
    }
}, popupConfig.elementListSelector);

let userId;

Promise.all([api.getInitialCards(), api.getUserInfo()])
.then(([cards, userData]) => {
    userInfo.setUserInfo(userData);
    userInfo.setUserAvatar(userData);
    userId = userInfo.getUserId(userData);
    section.renderItems(cards);
})

const deletePopup = new DeletePopup({popupSelector: '.popup_type_delete'});

function handleCardClick(item) {
    popupWithImage.open(item);
}

function setUserInfo({name: nameValue, about: aboutValue}) {
    nameField.value= nameValue;
    aboutField.value = aboutValue;
}

function createCard(item) {
    const card = new Card(cardConfig, item, handleCardClick, {
        handleDeleteButtonClick: () => {
            deletePopup.open();
            deletePopup.setHandler(() => {
                api.deleteCard(item)
                .then(() => {
                    card.removeCard();
                    deletePopup.close();
                })
                .catch(err => {
                    console.log(`Ошибка: ${err}`);
                })
            })
        },
        putLike: () => {
            api.putLike(item)
            .then(data => {
                card.like();
                card.setCounter(data);
            })
            .catch(err => {
                console.log(err);
            })
        },
        deleteLike: () => {
            api.deleteLike(item)
            .then(data => {
                card.like();
                card.setCounter(data);
                })
            .catch(err => {
                console.log(err);
            })
        }
    })

    if (item.owner._id === userId) {} else {
        card.deleteButton();
    }

    if (item.likes.some(like => like._id === userId)) {
        card.like();
    }

    return card;
}

const popupWithAddForm = new PopupWithForm({
    popupSelector: '.popup_type_add',
    handleFormSubmit: ({place: placeValue, link: linkValue}) => {
        const place = placeValue;
        const link = linkValue;
        const item = {
        name: place,
        link: link
        }

        api.setCard(item)
        .then((res) => {
            const card = createCard(res);

            section.prependItem(card.renderCard());

            popupWithAddForm.close();
        })
        .catch(err => {
            console.log(`Ошибка: ${err}`);
        })
        .finally(() => {
            popupWithAddForm.renderLoading(false);
        }) 
        .catch(err => {
            console.log(err);
        });
    }
});

const popupWithEditForm = new PopupWithForm({
    popupSelector: '.popup_type_edit',
    handleFormSubmit: (inputValues) => {
        userInfo.setUserInfo(inputValues)
        api.setUserInfo(inputValues)
        .then(() => {
            popupWithEditForm.close();
        })
        .catch(err => {
            console.log(err);
        })
        .finally(() => {
            popupWithEditForm.renderLoading(false);
        })
    }
});

const popupWithAvatarForm = new PopupWithForm({
    popupSelector: '.popup_type_avatar',
    handleFormSubmit: (inputValue) => {
        userInfo.setUserAvatar(inputValue);
        api.setUserAvatar(inputValue)
        .then(() => {
            popupWithAvatarForm.close();
        })
        .catch(err => {
            console.log(err);
        })
        .finally(() => {
            popupWithAvatarForm.renderLoading(false);
        })
    }
});

editButton.addEventListener('click', ()=> {
    editFormValidator.resetValidation();
    editFormValidator.enableButton();
    setUserInfo(userInfo.getUserInfo());
    popupWithEditForm.open();
});

addButton.addEventListener('click', ()=> {
    addFormValidator.disableButton();
    addFormValidator.resetValidation();
    popupWithAddForm.open();
});

avatarButton.addEventListener('click', () => {
    avatarFormValidator.disableButton();
    avatarFormValidator.resetValidation();
    popupWithAvatarForm.open();
})

popupWithEditForm.setEventListeners();
popupWithAddForm.setEventListeners();
popupWithImage.setEventListeners();
popupWithAvatarForm.setEventListeners();
deletePopup.setEventListeners();

addFormValidator.enableValidation();
editFormValidator.enableValidation();
avatarFormValidator.enableValidation();