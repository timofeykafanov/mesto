import FormValidator from './FormValidator.js';
import CardList from './CardList.js';
import Card from './Card.js';

const popup = document.querySelectorAll(config.popupSelector);
const popupArray = Array.from(popup);
const elementList = document.querySelector(config.elementListSelector);
const templateElement = document.querySelector(config.templateElementSelector).content;
const figurePopup = document.querySelector(config.figurePopupSelector);
const figureContent = figurePopup.querySelector(config.figureContentSelector);
const figureImage = figureContent.querySelector(config.figureImageSelector);
const figureCaption = figureContent.querySelector(config.figureCaptionSelector);
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
const card = new Card(initialCards, templateElement, openPopup);

function createCard(item) {
    const card = new Card(item, templateElement, openPopup);
    return card;
}

initialCards.forEach((item) => {
    cardList.addCard(item);
})


nameField.value = profileName.textContent; 
postField.value = profilePost.textContent;

function openPopup(popup) {
    popup.classList.add(config.popupOpenedClass);
    document.addEventListener('keydown', closeByEscapePress);
};

function closePopup(popup) {
    popup.classList.remove(config.popupOpenedClass);
    document.removeEventListener('keydown', closeByEscapePress);
};

// function createCard(item) {
//     const element = templateElement.querySelector(config.elementSelector).cloneNode(true);
//     const image = element.querySelector(config.imageSelector);
//     image.style.backgroundImage = `url('${item.link}')`;
//     element.querySelector(config.titleSelector).innerText = item.name;

//     element.querySelector(config.deleteSelector).addEventListener('click', function(event) {
//         element.remove();
//     });

//     const likeButton = element.querySelector(config.likeSelector);
//     likeButton.addEventListener('click', function() {
//         likeButton.classList.toggle(config.likeActiveSelector);
//     });

//     image.addEventListener('click', (event) => {
//         if (event.target.classList.contains(config.imageClass)) {
//             openPopup(figurePopup);
//         }
//         figureImage.src = item.link;
//         figureImage.alt = item.name;
//         figureCaption.textContent = item.name;
//     });

//     return element;
// };

// function appendCard(item) {
//     const element = card.renderCard(item);
//     elementList.prepend(element);
// };

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

    const inputList = Array.from(addForm.querySelectorAll(config.inputSelector));
    const buttonElement = addForm.querySelector(config.buttonSelector);
    // toggleButtonState(inputList, buttonElement);

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

// initialCards.forEach(appendCard);

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

// enableValidation();