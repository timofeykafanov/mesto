import './index.css';

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

api.getInitialCards()
    .then(data => {
        section.renderItems(data);
    })
    .catch(err => {
        console.log(`Ошибка: ${err}`);
    })

api.getUserInfo()
    .then(data => {
        userInfo.setUserInfo(data);
        userInfo.setUserAvatar(data);
    })
    .catch(err => {
        console.log(`Ошибка: ${err}`);
    })

const userId = '8bea5aa598e66ec59bc67b0e';

const editButton = document.querySelector(popupConfig.editButtonSelector);
const addButton = document.querySelector(popupConfig.addButtonSelector);
const avatarButton = document.querySelector(popupConfig.avatarButtonSelector);
const editForm = document.querySelector(popupConfig.editFormSelector);
const addForm = document.querySelector(popupConfig.addFormSelector);
const avatarForm = document.querySelector(popupConfig.avatarFormSelector);
const deleteForm = document.querySelector(popupConfig.deleteFormSelector);
const nameField = document.querySelector(popupConfig.nameFieldSelector);
const aboutField = document.querySelector(popupConfig.aboutFieldSelector);
const userNameSelector = userConfig.userNameSelector;
const userAboutSelector = userConfig.userAboutSelector;
const userAvatarSelector = userConfig.userAvatarSelector;

const section = new Section({
    renderer: (item) => {
        const card = new Card(cardConfig, item, handleCardClick, {
            handleDeleteButtonClick: () => {
                const popupWithDeleteForm = new PopupWithForm({
                    popupSelector: '.popup_type_delete', 
                    handleFormSubmit: () => {
                        api.deleteCard(item)
                            .catch(err => {
                                console.log(`Ошибка: ${err}`);
                            })
                            .finally(() => {
                                popupWithDeleteForm.renderLoading(false);
                            })
                        card.removeCard();
                    },
                    renderLoading: (isLoading) => {
                        if (isLoading) {
                            deleteForm.querySelector('.popup__button').textContent = 'Удаление...';
                        } else if (!isLoading) {
                            deleteForm.querySelector('.popup__button').textContent = 'Да';
                        }
                    } 
                });
                popupWithDeleteForm.open();
                popupWithDeleteForm.setEventListeners();
            },
            handleLikeClick: () => {
                card.like();
                if (item.likes.some(like => like._id === userId)) {
                    api.deleteLike(item)
                        .then(data => {
                            card.setCounter(data);
                        })
                        .catch(err => {
                            console.log(err);
                        })
                } else {
                    api.putLike(item)
                        .then(data => {
                            card.setCounter(data);
                        })
                        .catch(err => {
                            console.log(err);
                        })
                }
                card.setCounter(item);
            }
        });
        
        section.addItem(card.renderCard());

        if (item.owner._id === userId) {} else {
            card.deleteButton();
        }

        if (item.likes.some(like => like._id === userId)) {
            card.like();
        }

        card.setCounter(item);
    }
}, popupConfig.elementListSelector);

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
            .then(() => {
                api.getInitialCards()
                    .then(res => {
                        Array.from(document.querySelectorAll('.element')).forEach((element) => {
                            element.remove();
                        })
                        section.renderItems(res);
                    })
                    .catch(err => {
                        console.log(`Ошибка: ${err}`);
                    })
                    .finally(() => {
                        popupWithAddForm.renderLoading(false);
                    })
            }) 
            .catch(err => {
                console.log(err);
            });

        addFormValidator.toggleButtonState();

        popupWithAddForm.close();
    },
    renderLoading: (isLoading) => {
        if (isLoading) {
            addForm.querySelector('.popup__button').textContent = 'Сохранение...';
        } else if (!isLoading) {
            addForm.querySelector('.popup__button').textContent = 'Создать';
        }
    }
});

const popupWithEditForm = new PopupWithForm({
    popupSelector: '.popup_type_edit',
    handleFormSubmit: (inputValues) => {
        userInfo.setUserInfo(inputValues)
        api.setUserInfo(inputValues)
            .catch(err => {
                console.log(err);
            })
            .finally(() => {
                popupWithEditForm.renderLoading(false);
            })
        popupWithEditForm.close();
    },
    renderLoading: (isLoading) => {
        if (isLoading) {
            editForm.querySelector('.popup__button').textContent = 'Сохранение...';
        } else if (!isLoading) {
            editForm.querySelector('.popup__button').textContent = 'Сохранить';
        }
    }
});

const popupWithAvatarForm = new PopupWithForm({
    popupSelector: '.popup_type_avatar',
    handleFormSubmit: (inputValue) => {
        userInfo.setUserAvatar(inputValue);
        api.setUserAvatar(inputValue)
            .catch(err => {
                console.log(err);
            })
            .finally(() => {
                popupWithAvatarForm.renderLoading(false);
            })
    },
    renderLoading: (isLoading) => {
        if (isLoading) {
            avatarForm.querySelector('.popup__button').textContent = 'Сохранение...';
        } else if (!isLoading) {
            avatarForm.querySelector('.popup__button').textContent = 'Сохранить';
        }
    }
});

const userInfo = new UserInfo({userNameSelector, userAboutSelector, userAvatarSelector});
const addFormValidator = new FormValidator(validationConfig, addForm);
const editFormValidator = new FormValidator(validationConfig, editForm);
const avatarFormValidator = new FormValidator(validationConfig, avatarForm);
const popupWithImage = new PopupWithImage(popupConfig.imagePopupSelector);

function handleCardClick(item) {
    popupWithImage.open(item);
}

function setUserInfo({name: nameValue, about: aboutValue}) {
    nameField.value= nameValue;
    aboutField.value = aboutValue;
}

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